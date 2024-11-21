'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChange = useDebouncedCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.delete('page');

      if (value) {
        params.set('query', value);
      }
      else {
        params.delete('query');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        className={clsx(
          'block w-full text-sm',
          'rounded-md border border-gray-200 py-[9px] pl-10 outline-2',
          'placeholder:text-gray-500',
          'peer'
        )}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={searchParams.get('query')?.toString()}
      />
      {/* <MagnifyingGlassIcon> must be placed below <input> for peer to work */}
      <MagnifyingGlassIcon
        className={clsx(
          'absolute left-3 top-1/2 -translate-y-1/2',
          'h-[18px] w-[18px]',
          'text-gray-500 peer-focus:text-gray-900'
        )}
      />
    </div>
  );
};
