import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Student Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">Manage your bookings and track your progress.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">Active Bookings</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">2</h3>
            </div>
          </div>
        </div>
        {/* End Card */}

        {/* Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">Completed Lessons</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">12</h3>
            </div>
          </div>
        </div>
        {/* End Card */}

        {/* Card */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-x-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">Remaining Lessons</p>
            </div>
            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">8</h3>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Recent Bookings</h2>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start"><div className="flex items-center gap-x-2"><span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">School</span></div></th>
                    <th scope="col" className="px-6 py-3 text-start"><div className="flex items-center gap-x-2"><span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Package</span></div></th>
                    <th scope="col" className="px-6 py-3 text-start"><div className="flex items-center gap-x-2"><span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Status</span></div></th>
                    <th scope="col" className="px-6 py-3 text-start"><div className="flex items-center gap-x-2"><span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Date</span></div></th>
                    <th scope="col" className="px-6 py-3 text-end"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">City Driving Academy</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">Premium Package (20 Lessons)</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">Active</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">Mar 25, 2026</span></div></td>
                    <td className="h-px w-px whitespace-nowrap text-end"><div className="px-6 py-3"><button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">Details</button></div></td>
                  </tr>
                  <tr>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">Safe Roads School</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">Basic Package (10 Lessons)</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/10 dark:text-neutral-400">Completed</span></div></td>
                    <td className="h-px w-px whitespace-nowrap"><div className="px-6 py-3"><span className="text-sm text-gray-800 dark:text-neutral-200">Jan 10, 2026</span></div></td>
                    <td className="h-px w-px whitespace-nowrap text-end"><div className="px-6 py-3"><button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">Details</button></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
