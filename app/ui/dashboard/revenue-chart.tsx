import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import clsx from "clsx";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || !revenue.length) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div
          className={clsx(
            'grid grid-cols-12 sm:grid-cols-13 gap-2 md:gap-4 items-end',
            'mt-0 rounded-md p-4',
            'bg-white'
          )}
        >
          <div
            className={
              'hidden sm:flex flex-col justify-between text-sm text-gray-400 mb-6'
            }
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (<p key={label}>{label}</p>))}
          </div>

          {revenue.map(({ month, revenue }) => (
            <div key={month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{ height: `${(revenue / topLabel) * chartHeight}px` }}
              />
              <p className="text-sm text-gray-400 -rotate-90 sm:rotate-0">{month}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
