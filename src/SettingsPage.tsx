import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Lock, Globe, CreditCard, CheckCircle2 } from 'lucide-react';
import { Sidebar, type Page } from './components/Navigation';

interface SettingsPageProps {
  onNavigate: (p: Page) => void;
  driverProfile: { name: string; id: string };
}

export default function SettingsPage({ onNavigate, driverProfile }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { icon: User, label: 'Profile' },
    { icon: Shield, label: 'Privacy' },
    { icon: Bell, label: 'Notifications' },
    { icon: Lock, label: 'Security' },
    { icon: Globe, label: 'Language' },
    { icon: CreditCard, label: 'Billing' },
  ];

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="settings" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your account preferences and application settings.</p>
          </div>
          {showSuccess && (
            <div className="bg-accent-green/10 border border-accent-green/20 px-4 py-2 rounded-xl flex items-center gap-2 text-accent-green animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-bold">Settings updated successfully</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Tabs */}
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button 
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.label ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-surface-dark hover:text-white'}`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {activeTab === 'Profile' && (
              <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6 space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Personal Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input className="w-full bg-background-dark border border-surface-darker rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" defaultValue={driverProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Driver ID</label>
                    <input className="w-full bg-background-dark border border-surface-darker rounded-xl px-4 py-3 text-white/50 cursor-not-allowed outline-none" defaultValue={driverProfile.id} readOnly />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input className="w-full bg-background-dark border border-surface-darker rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" defaultValue="alex.driver@wheelrank.com" />
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Privacy' && (
              <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6 space-y-4 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white">Privacy Preferences</h3>
                <div className="flex items-center justify-between p-4 bg-background-dark/50 rounded-xl border border-surface-darker">
                  <div>
                    <p className="font-bold text-white">Share Driving Data</p>
                    <p className="text-xs text-slate-400">Allow WheelRank to share anonymized data with insurance partners.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-background-dark/50 rounded-xl border border-surface-darker">
                  <div>
                    <p className="font-bold text-white">Leaderboard Visibility</p>
                    <p className="text-xs text-slate-400">Show your name and score on the global leaderboard.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'Profile' && activeTab !== 'Privacy' && (
              <div className="bg-surface-dark border border-surface-darker rounded-2xl p-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                  <SettingsIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{activeTab} Settings</h3>
                  <p className="text-slate-400 max-w-xs mx-auto mt-2">This section is currently being optimized for your driver profile. Check back soon for full control.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('Profile')}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Back to Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
