'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchInvoicesPages } from './data';

export type State = {
    errors?: {
        customerId?: string[],
        amount?: string[],
        status?: string[],
    },
    message?: string | null,
};

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ required_error: 'Please select a customer.' }),
    amount: z.coerce.number().gt(
        0,
        { message: 'Please enter an amount greater than $0.' }
    ),
    status: z.enum(
        ['pending', 'paid'],
        { required_error: 'Please select an invoice status.' }
    ),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export const createInvoice = async (prevState: State, formData: FormData) => {
    const { success, error, data } = CreateInvoice.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = data;
    const amountInCents = amount * 100;
    const [date] = new Date().toISOString().split('T');

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    }
    catch {
        return { message: 'Database Error: Failed to Create Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export const updateInvoice = async (
    id: string,
    prevState: State,
    formData: FormData,
) => {
    const { success, error, data } = UpdateInvoice.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            message: 'Invalid Fields. Failed to Edit Invoice.',
        };
    }

    const { customerId, amount, status } = data;
    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET
                customer_id = ${customerId},
                amount = ${amountInCents},
                status = ${status}
            WHERE id = ${id}
        `;
    }
    catch {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

export const deleteInvoice = async (id: string) => {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    }
    catch {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
};

export const authenticate = async (
    prevState: string | undefined,
    formData: FormData,
) => {
    try {
        await signIn('credentials', formData);
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
};

export const getPageCount = async (query: string) => {
    return await fetchInvoicesPages(query);
};
