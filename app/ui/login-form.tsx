'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import clsx from 'clsx';

const Email = () => (
  <div className="grid gap-3">
    <label className="text-xs font-medium text-gray-900" htmlFor="email">
      Email
    </label>
    <div className="relative">
      <input
        className={clsx(
          'block w-full peer',
          'text-sm placeholder:text-gray-500',
          'rounded-md border border-gray-200 py-[9px] pl-10 outline-2',
        )}
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
      />
      <AtSymbolIcon
        className={clsx(
          'absolute left-3 top-1/2 -translate-y-1/2',
          'h-[18px] w-[18px] pointer-events-none',
          'text-gray-500 peer-focus:text-gray-900',
        )}
      />
    </div>
  </div>
);

const Password = () => (
  <div className="grid gap-3">
    <label className="text-xs font-medium text-gray-900" htmlFor="password">
      Password
    </label>
    <div className="relative">
      <input
        className={clsx(
          'block w-full peer',
          'text-sm placeholder:text-gray-500',
          'rounded-md border border-gray-200 py-[9px] pl-10 outline-2',
        )}
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      />
      <KeyIcon
        className={clsx(
          'absolute left-3 top-1/2 -translate-y-1/2',
          'h-[18px] w-[18px] pointer-events-none',
          'text-gray-500 peer-focus:text-gray-900'
        )}
      />
    </div>
  </div>
);

export default function LoginForm() {
  const [
    errorMessage,
    formAction,
    isPending,
  ] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="grid gap-3 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full grid gap-4">
          <Email />
          <Password />
        </div>
        <Button className="mt-1 w-full" aria-disabled={isPending}>
          Log in
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        {
          errorMessage &&
          <div className="flex gap-1 text-red-500">
            <ExclamationCircleIcon className="h-5 w-5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        }
      </div>
    </form>
  );
}
