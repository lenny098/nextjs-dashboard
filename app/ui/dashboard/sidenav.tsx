import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import clsx from 'clsx';

export default function SideNav() {
  const signOutAction = async () => {
    'use server';
    await signOut();
  };

  return (
    <div className="flex h-full gap-2 flex-col px-3 py-4 md:px-2">
      <Link
        className="flex items-end rounded-md bg-blue-600 p-4 h-20 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40 text-white">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between gap-2 md:flex-col">
        <NavLinks />
        <div className="hidden md:block w-full grow rounded-md bg-gray-50" />
        <form action={signOutAction}>
          <button
            className={clsx(
              'flex items-center justify-center md:justify-start gap-2',
              'text-sm font-medium hover:text-blue-600',
              'h-[48px] w-full bg-gray-50 p-3 hover:bg-sky-100',
              'rounded-md md:px-3 md:py-2'
            )}
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
