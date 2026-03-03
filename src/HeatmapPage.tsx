import React from 'react';
import { Map as MapIcon, Zap } from 'lucide-react';
import { Sidebar, type Page } from './components/Navigation';
import LiveMap from './components/LiveMap';

interface HeatmapPageProps {
  onNavigate: (p: Page) => void;
  driverProfile: { name: string; id: string };
}

export default function HeatmapPage({ onNavigate, driverProfile }: HeatmapPageProps) {
  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="heatmap" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Live Driver Heatmap</h1>
            <p className="text-slate-400 mt-1">Real-time density of active WheelRank drivers in your city.</p>
          </div>
          <div className="bg-accent-green/10 border border-accent-green/20 px-4 py-2 rounded-xl flex items-center gap-2 text-accent-green">
            <Zap className="w-4 h-4 fill-accent-green" />
            <span className="text-sm font-bold">428 Drivers Online</span>
          </div>
        </div>

        <div className="h-[calc(100vh-220px)] rounded-3xl overflow-hidden border border-surface-darker relative shadow-2xl">
          <LiveMap center={[40.7128, -74.0060]} zoom={12} className="w-full h-full" />
          
          {/* Heatmap Overlay Legend */}
          <div className="absolute bottom-8 right-8 z-20 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Driver Density</p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                <span className="text-[10px] text-slate-500">Low</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-primary/60"></div>
                <span className="text-[10px] text-slate-500">Med</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <span className="text-[10px] text-slate-500">High</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
