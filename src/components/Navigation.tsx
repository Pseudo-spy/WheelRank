import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  User,
  ShieldCheck,
  Zap,
  History,
  Trophy,
  Map as MapIcon,
  Gift,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Types ---

export type Page = 'landing' | 'personal' | 'driver' | 'rides' | 'performance' | 'rewards' | 'signup' | 'heatmap' | 'settings';

// --- Components ---

export const Navbar = ({ currentPage, onPageChange }: { currentPage: Page, onPageChange: (p: Page) => void }) => (
  <header className="flex items-center justify-between border-b border-slate-800 px-8 py-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => onPageChange('landing')}>
        <Car className="w-8 h-8" />
        <h2 className="text-white text-xl font-bold tracking-tight">WheelRank</h2>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <button 
          onClick={() => onPageChange('personal')}
          className={cn("text-sm font-medium transition-colors", currentPage === 'personal' ? "text-primary" : "text-slate-400 hover:text-primary")}
        >
          Dashboard
        </button>
        <button 
          onClick={() => onPageChange('performance')}
          className={cn("text-sm font-medium transition-colors", currentPage === 'performance' ? "text-primary" : "text-slate-400 hover:text-primary")}
        >
          Vehicle Stats
        </button>
        <button 
          onClick={() => onPageChange('personal')}
          className="text-slate-400 hover:text-primary transition-colors text-sm font-medium"
        >
          Maintenance
        </button>
        <button 
          onClick={() => onPageChange('rewards')}
          className={cn("text-sm font-medium transition-colors", currentPage === 'rewards' ? "text-primary" : "text-slate-400 hover:text-primary")}
        >
          Services
        </button>
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input 
          className="bg-slate-800/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary text-white" 
          placeholder="Search data..." 
          type="text" 
        />
      </div>
      <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-primary/10 hover:text-primary transition-all relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-background-dark"></span>
      </button>
      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onPageChange('driver')}>
        <img 
          alt="Profile" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4G4XHVmcsaLggP28_whge0JzPvgAtIDvJQ_6Tzu1rS-o4UhlbTqJVUAjw7YZmpX4KSvtrx2jfOfdVd5-vDRk6QKku-oRp5i8bS8eob3kjhqO6y7hybk9U3rPdesfSk85S3pfsgQeKLasTWcAGD1c0MDHs1jA2dMTa7jwazaGIWweoJUYb4VxErf_UNoJ9ErXgBM0Y6N0rqcwY_UuNkkL449FePje0gJNU6YZN5vSjhqk1mdIFPzHBMPuF7S0TBK3HL6hR-UF1b1R" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </header>
);

export const Sidebar = ({ 
  currentPage, 
  onPageChange,
  driverName = 'Alex Driver',
  driverId = 'WR-8821'
}: { 
  currentPage: Page, 
  onPageChange: (p: Page) => void,
  driverName?: string,
  driverId?: string
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleToggleOnline = () => {
    const newOnlineState = !isOnline;
    setIsOnline(newOnlineState);
    if (newOnlineState) {
      setShowPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <>
      <aside className="w-64 border-r border-surface-darker flex flex-col h-screen sticky top-0 bg-background-dark z-40">
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => onPageChange('landing')}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">WheelRank</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => onPageChange('driver')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'driver' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => onPageChange('rides')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'rides' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <Car className="w-5 h-5" />
            <span>Rides</span>
          </button>
          <button 
            onClick={() => onPageChange('performance')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'performance' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <History className="w-5 h-5" />
            <span>Performance</span>
          </button>
          <button 
            onClick={() => onPageChange('rewards')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'rewards' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <Gift className="w-5 h-5" />
            <span>Rewards</span>
          </button>
          <button 
            onClick={() => onPageChange('heatmap')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'heatmap' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <MapIcon className="w-5 h-5" />
            <span>Heatmap</span>
          </button>
          <button 
            onClick={() => onPageChange('settings')}
            className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors", currentPage === 'settings' ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-surface-darker")}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-surface-dark rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
                 <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvr45FidSdCrLD85HYoQZ9VYJJLdZPWDxdnU9Wp-s-MyFU8CcXUSiQKA-I9-Aa15PDTzQABzL7gFqkZ-zZJAUbi3tUq3jV293ey4dNJFy6jS8MhbDF781yBHKqycDdmonpo8To6W92m-afYic4fAAELIAtmqOYwlWBUz5AluA5XpplkP9kjDVRFbcPg45O3ogTvZX9w7lVR7bs6gqUREJ1OvRS_35RvA_DPYcIszSSPp1N2sL4XnEFEdVWRTV3KonNR8JfOZIW0AVT" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{driverName}</p>
                <p className="text-xs text-slate-400 truncate">ID: #{driverId}</p>
              </div>
            </div>
            <button 
              onClick={handleToggleOnline}
              className={cn(
                "w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300",
                isOnline 
                  ? "bg-accent-green/10 text-accent-green border border-accent-green/20" 
                  : "bg-primary text-white hover:bg-primary/90"
              )}
            >
              <Zap className={cn("w-4 h-4", isOnline && "text-accent-green fill-accent-green")} />
              {isOnline ? "Online" : "Go Online"}
            </button>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-accent-green/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.2)] flex flex-col items-center text-center max-w-md"
            >
              <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-accent-green fill-accent-green" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {driverName.split(' ')[0]}!</h2>
              <p className="text-slate-300 text-lg">Ready for your ride today?</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
