import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, LayoutDashboard, BookMarked, AlertCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/dashboard',         icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/books',   icon: BookOpen,        label: 'Browse Books' },
  { to: '/dashboard/borrows', icon: BookMarked,      label: 'My Borrows' },
  { to: '/dashboard/fines',   icon: AlertCircle,     label: 'My Fines' },
  { to: '/dashboard/profile', icon: User,            label: 'Profile' },
];

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex w-60 flex-col bg-white dark:bg-gray-900 border-r">
        <div className="p-5 border-b">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white"/>
            </div>
            <span className="font-display font-bold">OBITO STORE</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                 ${isActive ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`
              }>
              <Icon size={17}/>{label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 font-bold text-sm">
              {user?.full_name?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{user?.full_name}</div>
              <div className="text-xs text-gray-400">Member</div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
            <LogOut size={15}/> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6">
        <Outlet />
      </main>
    </div>
  );
}
