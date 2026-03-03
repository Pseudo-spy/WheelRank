import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  ArrowRight, 
  User, 
  Shield, 
  Mail, 
  Lock,
  ChevronLeft,
  CheckCircle2,
  Car
} from 'lucide-react';
import { type Page } from './components/Navigation';

interface SignUpPageProps {
  onNavigate: (p: Page) => void;
  onLogin: (name: string, id: string) => void;
}

export default function SignUpPage({ onNavigate, onLogin }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [driverId, setDriverId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && driverId) {
      onLogin(name, driverId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-dark relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-green/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center space-y-2">
          <div 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-3 text-primary cursor-pointer mb-6"
          >
            <Zap className="w-10 h-10" />
            <h1 className="text-3xl font-bold tracking-tight text-white">WheelRank</h1>
          </div>
          <h2 className="text-2xl font-bold text-white">Driver Authentication</h2>
          <p className="text-slate-400">Enter your credentials to access your dashboard.</p>
        </div>

        <div className="bg-surface-dark border border-surface-darker p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Driver"
                  className="w-full bg-background-dark border border-surface-darker rounded-xl pl-12 pr-4 py-3.5 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Driver ID</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. WR-8821"
                  className="w-full bg-background-dark border border-surface-darker rounded-xl pl-12 pr-4 py-3.5 text-white focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary" required />
              <label htmlFor="terms" className="text-xs text-slate-400">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Access Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-surface-darker text-center">
            <p className="text-sm text-slate-500">
              Don't have a driver account? <a href="#" className="text-primary font-bold hover:underline">Register Fleet</a>
            </p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
