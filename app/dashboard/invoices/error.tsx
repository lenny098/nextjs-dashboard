'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

export default ({
    error,
    reset,
}: {
    error: Error & { digest?: string },
    reset: () => void,
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center gap-4">
            <h2>Something went wrong!</h2>
            <button
                className={clsx(
                    'bg-blue-500 text-sm text-white',
                    'rounded-md px-4 py-2',
                    'transition-colors hover:bg-blue-400'
                )}
                onClick={reset}
            >
                Try again
            </button>
        </main>
    );
};
