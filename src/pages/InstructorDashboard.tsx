import React from 'react';

const InstructorDashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Instructor Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">Manage your schedule and conduct driving sessions.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Today's Lessons</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">4</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pending Requests</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">1</h3>
          </div>
        </div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Weekly Earnings</p>
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">$450.00</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Today's Schedule</h2>
        </div>
        <div className="p-6 space-y-4">
          {/* Schedule Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-neutral-800">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">John Doe</p>
              <p className="text-sm text-gray-600 dark:text-neutral-400">09:00 AM - 11:00 AM</p>
            </div>
            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
              Start Session
            </button>
          </div>
          {/* Schedule Item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-neutral-800">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Jane Smith</p>
              <p className="text-sm text-gray-600 dark:text-neutral-400">01:00 PM - 03:00 PM</p>
            </div>
            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
