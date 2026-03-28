import React from 'react';

const SchoolDashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Driving School Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">Manage your instructors, packages, and view analytics.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total Revenue</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">$12,450.00</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Active Students</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">45</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Instructors</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">8</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pending Payout</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">$1,200.00</h3>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Instructors List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Instructors</h2>
            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">Add Instructor</button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">SM</div>
                <p className="font-medium text-gray-800 dark:text-white">Samuel Miller</p>
              </div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AL</div>
                <p className="font-medium text-gray-800 dark:text-white">Alice Lawson</p>
              </div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Packages</h2>
            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">Create New</button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800 dark:text-white">Basic (10 Lessons)</p>
              <p className="text-gray-800 dark:text-neutral-200 font-semibold">$350.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800 dark:text-white">Premium (20 Lessons)</p>
              <p className="text-gray-800 dark:text-neutral-200 font-semibold">$600.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
