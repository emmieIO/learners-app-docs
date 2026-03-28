import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HSStaticMethods } from 'preline';
import {
  ShieldCheck,
  LogIn,
  UserCheck,
  GraduationCap,
  MapPin,
  CreditCard,
  ChevronRight,
  Menu,
  FileText
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    HSStaticMethods.autoInit();
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { label: 'Authentication', path: '/modules/auth', icon: <LogIn className="size-4" /> },
    { label: 'Learner', path: '/modules/student', icon: <GraduationCap className="size-4" /> },
    { label: 'Instructor', path: '/modules/instructor', icon: <UserCheck className="size-4" /> },
    { label: 'Driving School', path: '/modules/school', icon: <MapPin className="size-4" /> },
    { label: 'Payment', path: '/modules/payment', icon: <CreditCard className="size-4" /> },
    { label: 'Tracking & Guardian', path: '/modules/tracking', icon: <MapPin className="size-4" /> },
    { label: 'Admin', path: '/modules/admin', icon: <ShieldCheck className="size-4" /> },
  ];

  const currentLabel = navItems.find(i => i.path === location.pathname)?.label || 'Documentation';

  const handleNavClick = (path: string) => {
    navigate(path);
    // Close mobile sidebar if open
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar && sidebar.classList.contains('hs-overlay-open')) {
      const backdrop = sidebar.querySelector('[data-hs-overlay-backdrop]') as HTMLElement;
      if (backdrop) backdrop.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-primary">
        <div className="h-1 bg-primary"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary size-10 flex items-center justify-center text-white">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 uppercase tracking-wide">Learners Platform</h1>
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Backend API Documentation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border-2 border-blue-200 text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                <FileText className="size-3.5" />
                <span>v1.0</span>
              </div>
              <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 lg:hidden" data-hs-overlay="#mobile-sidebar">
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div id="mobile-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform fixed inset-0 z-[60] lg:hidden">
        <div className="absolute inset-0 bg-black/50" data-hs-overlay-backdrop onClick={() => handleNavClick(location.pathname)}></div>
        <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r-2 border-gray-300 shadow-xl pt-6">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-3 py-2.5 px-3 text-sm font-medium border-l-2 ${
                  location.pathname === item.path
                    ? 'bg-blue-50 border-primary text-blue-900 font-semibold'
                    : 'border-transparent text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar - Fixed */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-4">
              <div>
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3 border-b-2 border-gray-300 pb-2">
                  Backend Modules
                </h2>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 py-2.5 px-3 text-sm font-medium border-l-2 transition-all ${
                        location.pathname === item.path
                          ? 'bg-blue-50 border-primary text-blue-900 font-semibold'
                          : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="bg-gray-50 border-2 border-gray-300 p-3">
                <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  <span className="font-bold">7 Modules</span>
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Complete API specs</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="font-semibold text-gray-600 uppercase tracking-wide">Modules</span>
              <ChevronRight className="size-4 text-gray-400" />
              <span className="font-bold text-gray-900 uppercase tracking-wide">{currentLabel}</span>
            </div>

            {/* Content Card */}
            <div className="bg-white border-2 border-gray-300 shadow-sm">
              <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-primary"></div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{currentLabel}</h2>
                </div>
              </div>

              <div className="p-6">
                <article className="prose max-w-none">
                  <Outlet />
                </article>
              </div>

              <div className="px-4 py-2 border-t-2 border-gray-300 bg-gray-50">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t-2 border-gray-300 text-center lg:text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                © 2026 Learners Platform. Official Backend API Documentation. v1.0
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
