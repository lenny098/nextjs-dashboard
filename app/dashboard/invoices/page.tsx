import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import Table from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page(
    props: {
        searchParams?: Promise<{ query?: string, page?: string }>,
    }
) {
    const searchParams = await props.searchParams;

    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page ?? 1);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table {...{ query, currentPage }} />
            </Suspense>
            <div className="flex w-full justify-center mt-5">
                <Pagination query={query} />
            </div>
        </div>
    );
};
