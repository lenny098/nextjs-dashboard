import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export default async (props: { params: Promise<{ id: string }> }) => {
    const id = (await props.params).id;

    const [invoice, customers] = await Promise.all(
        [fetchInvoiceById(id), fetchCustomers()]
    );

    if (!invoice) notFound();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={
                    [
                        { label: 'Invoices', href: '/dashboard/invoices' },
                        {
                            label: 'Edit Invoices',
                            href: `/dashboard/inovices/${id}/edit`,
                            active: true,
                        }
                    ]
                }
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
};
