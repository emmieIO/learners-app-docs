import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Master the Road with <span className="text-blue-600">DrivingSchool</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            The easiest way to find, book, and pay for driving lessons near you. Share your live location with loved ones for a safe learning experience.
          </p>

          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <Link className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" to="/student">
              Get started as Student
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
            <Link className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" to="/school">
              Register your School
            </Link>
          </div>
        </div>

        <div className="relative ms-4">
          <img className="w-full rounded-md" src="https://images.unsplash.com/photo-1591033594798-33227a05780d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Driving Lesson" />
          <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -ms-4 lg:-ms-6 dark:from-neutral-800"></div>
        </div>
      </div>
      {/* End Hero */}

      {/* Features */}
      <div className="mt-20 lg:mt-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          <div>
            <svg className="flex-shrink-0 w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">Nearby Schools</h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Find the best driving schools in your neighborhood with ease.</p>
          </div>
          <div>
            <svg className="flex-shrink-0 w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">Secure Payments</h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Pay for your lessons safely using integrated payment gateways.</p>
          </div>
          <div>
            <svg className="flex-shrink-0 w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">Live Tracking</h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Share your live location with family during every driving session.</p>
          </div>
          <div>
            <svg className="flex-shrink-0 w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">Expert Instructors</h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">Learn from certified instructors vetted by our platform.</p>
          </div>
        </div>
      </div>
      {/* End Features */}
    </div>
  );
};

export default HomePage;
