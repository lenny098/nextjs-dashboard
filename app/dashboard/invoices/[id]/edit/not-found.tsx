import { FaceFrownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

export default () => (
    <main className="flex h-full flex-col items-center justify-center gap-2">
        <FaceFrownIcon className="w-10 text-gray-400" />
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested invoice.</p>
        <Link
            href="/dashboard/invoices"
            className={clsx(
                'bg-blue-500 text-sm text-white',
                'px-4 py-2 mt-4 rounded-md',
                'transition-colors hover:bg-blue-400',
            )}
        >
            Go Back
        </Link>
    </main>
);