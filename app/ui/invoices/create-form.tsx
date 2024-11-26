'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import clsx from 'clsx';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [state, formAction] = useActionState<State, FormData>(
    createInvoice,
    { message: null, errors: {} }
  );

  const CustomerName = () => (
    <div className="grid gap-2">
      <label htmlFor="customer" className="block text-sm font-medium">
        Choose customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          className={clsx(
            'block w-full text-sm placeholder:text-gray-500',
            'rounded-md border border-gray-200 py-2 pl-10 outline-2',
            'cursor-pointer peer'
          )}
          defaultValue=""
          aria-describedby="customer-error"
        >
          <option value="" disabled>Select a customer</option>
          {
            customers.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </select>
        <UserCircleIcon
          className={clsx(
            'absolute top-1/2 left-3 -translate-y-1/2',
            'h-[18px] w-[18px] text-gray-500 pointer-events-none'
          )}
        />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {
          state.errors?.customerId?.map(
            (error: string) => (
              <p key={error} className="text-sm text-red-500">{error}</p>
            )
          )
        }
      </div>
    </div>
  );

  const Amount = () => (
    <div className="grid gap-2">
      <label htmlFor="amount" className="block text-sm font-medium">
        Choose an amount
      </label>
      <div className="relative rounded-md">
        <div className="relative">
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Enter USD amount"
            className={clsx(
              'block w-full text-sm placeholder:text-gray-500',
              'border border-gray-200 rounded-md py-2 pl-10 outline-2',
              'peer'
            )}
            aria-describedby="amount-error"
          />
          <CurrencyDollarIcon
            className={clsx(
              'absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px]',
              'text-gray-500 peer-focus:text-gray-900',
              'pointer-events-none'
            )}
          />
        </div>
      </div>
      <div id="amount-error" aria-live="polite" aria-atomic="true">
        {
          state.errors?.amount?.map(
            (error: string) => (
              <p key={error} className="text-sm text-red-500">{error}</p>
            )
          )
        }
      </div>
    </div>
  );

  const Status = () => (
    <fieldset>
        <div className="grid gap-2">
        <legend
          className="block text-sm font-medium"
          aria-describedby="status-error"
        >
          Set the invoice status
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                className={clsx(
                  'h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2',
                  'cursor-pointer'
                )}
              />
              <label
                htmlFor="pending"
                className={clsx(
                  'flex items-center gap-1.5',
                  'text-xs font-medium text-gray-600 bg-gray-100',
                  'rounded-full px-3 py-1.5',
                  'cursor-pointer'
                )}
              >
                Pending
                <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                className={clsx(
                  'h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2',
                  'cursor-pointer'
                )}
              />
              <label
                htmlFor="paid"
                className={clsx(
                  'flex items-center gap-1.5',
                  'text-xs font-medium text-white',
                  'rounded-full bg-green-500 px-3 py-1.5',
                  'cursor-pointer'
                )}
              >
                Paid
                <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {
            state.errors?.status?.map(
              (error: string) => (
                <p key={error} className="text-sm text-red-500">{error}</p>
              )
            )
          }
        </div>
      </div>
    </fieldset>
  );

  const Buttons = () => (
    <div className="mt-6 flex justify-end gap-4">
      <Link
        href="/dashboard/invoices"
        className={clsx(
          'flex items-center',
          'text-sm font-medium text-gray-600',
          'h-10 rounded-lg px-4 transition-colors bg-gray-100 hover:bg-gray-200'
        )}
      >
        Cancel
      </Link>
      <Button type="submit">Create Invoice</Button>
    </div>
  );

  return (
    <form action={formAction}>
      <div className="grid gap-4 rounded-md bg-gray-50 p-4 md:p-6">
        <CustomerName />
        <Amount />
        <Status />
        <div aria-live="polite" aria-atomic="true">
          {
            state.message &&
            <p className="text-sm text-red-500">{state.message}</p>
          }
        </div>
      </div>
      <Buttons />
    </form>
  );
}
