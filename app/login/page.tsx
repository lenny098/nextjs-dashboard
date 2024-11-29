import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
}

const Page = () => (
    <main className="flex items-center justify-center md:h-screen">
        <div
            className={clsx(
                'w-full max-w-[400px] p-4 md:-mt-32',
                'flex flex-col gap-2.5'
            )}
        >
            <div
                className={clsx(
                    'flex items-end bg-blue-500 rounded-lg p-3',
                    'h-20 md:h-36'
                )}
            >
                <div className="w-32 text-white md:w-36">
                    <AcmeLogo />
                </div>
            </div>
            <LoginForm />
        </div>
    </main>
);

export default Page;
