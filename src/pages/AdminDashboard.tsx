import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Platform Admin Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">Manage schools, verifications, and platform analytics.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total Schools</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">156</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pending Verifications</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">12</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total Platform Revenue</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">$84,200.00</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Support Tickets</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">3</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Pending School Verifications</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">School Name</th>
                <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Submitted Date</th>
                <th className="px-6 py-3 text-end text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">Quick Turn Driving</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">Mar 26, 2026</td>
                <td className="px-6 py-4 text-end">
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-800">Review</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">Elite Road Skills</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">Mar 27, 2026</td>
                <td className="px-6 py-4 text-end">
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-800">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
