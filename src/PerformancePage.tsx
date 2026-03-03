import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Shield, 
  Zap, 
  Activity, 
  Clock, 
  BarChart2,
  ChevronUp,
  ChevronDown,
  Target,
  BarChart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as ReBarChart,
  Bar
} from 'recharts';
import { Sidebar, type Page } from './components/Navigation';
import { cn } from './lib/utils';

const earningsData = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 150 },
  { day: 'Wed', amount: 180 },
  { day: 'Thu', amount: 140 },
  { day: 'Fri', amount: 210 },
  { day: 'Sat', amount: 250 },
  { day: 'Sun', amount: 190 },
];

const consistencyData = [
  { time: '0', val: 80 },
  { time: '1', val: 85 },
  { time: '2', val: 82 },
  { time: '3', val: 88 },
  { time: '4', val: 92 },
  { time: '5', val: 90 },
  { time: '6', val: 95 },
  { time: '7', val: 93 },
  { time: '8', val: 98 },
];

interface PerformancePageProps {
  onNavigate: (p: Page) => void;
  driverProfile: { name: string; id: string };
}

export default function PerformancePage({ onNavigate, driverProfile }: PerformancePageProps) {
  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="performance" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
            <p className="text-slate-400 mt-1">Deep dive into your driving metrics and earnings potential.</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-surface-dark border border-surface-darker rounded-xl px-4 py-2 text-sm font-bold focus:ring-1 focus:ring-primary text-white outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Reliability Score', value: '98.2%', change: '+1.2%', icon: Shield, color: 'text-accent-green' },
            { label: 'Consistency Index', value: '84/100', change: '+5.4%', icon: Target, color: 'text-primary' },
            { label: 'Total Earnings', value: '$1,240', change: '+12%', icon: Award, color: 'text-primary' },
            { label: 'Avg Speed Stability', value: '92%', change: '-0.5%', icon: Activity, color: 'text-accent-red' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-dark border border-surface-darker p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn("flex items-center gap-1 text-xs font-bold", stat.change.includes('+') ? "text-accent-green" : "text-accent-red")}>
                  {stat.change.includes('+') ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Earnings */}
          <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Weekly Earnings Potential</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Earnings ($)
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223c49" vertical={false} />
                  <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#182b34', border: '1px solid #223c49', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="amount" fill="#0da6f2" radius={[6, 6, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Speed Consistency */}
          <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Speed Consistency Index</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                Stability %
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={consistencyData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0bda57" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0bda57" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#223c49" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#182b34', border: '1px solid #223c49', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#0bda57" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-surface-dark border border-surface-darker rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-8">Driving Consistency Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Urban Driving', val: 88, desc: 'High traffic stability' },
              { label: 'Highway Driving', val: 95, desc: 'Excellent cruise control' },
              { label: 'Night Driving', val: 76, desc: 'Needs more focus' },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <span className="text-xl font-bold text-primary">{item.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${item.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
