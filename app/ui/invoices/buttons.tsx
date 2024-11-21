import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

export const CreateInvoice = () => (
  <Link
    href="/dashboard/invoices/create"
    className={clsx(
      'flex items-center gap-4',
      'h-10 px-4 rounded-lg',
      'font-medium text-white text-sm',
      'bg-blue-600 hover:bg-blue-500',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-blue-600',
      'transition-colors',
    )}
  >
    <span className="hidden md:block">Create Invoice</span>
    <PlusIcon className="h-5" />
  </Link>
);

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
