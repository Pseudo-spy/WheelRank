import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Zap, 
  AlertCircle, 
  TrendingUp, 
  Map as MapIcon, 
  Navigation,
  Clock,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Activity,
  Shield,
  Award,
  Gift,
  X
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
  Area
} from 'recharts';
import { Sidebar, type Page } from './components/Navigation';
import { type Ride } from './data/rides';
import { cn } from './lib/utils';
import { predictionService, type DrivingMetrics } from './services/predictionService';
import LiveMap from './components/LiveMap';

const behaviorData = [
  { time: '10:00', score: 85 },
  { time: '10:05', score: 88 },
  { time: '10:10', score: 82 },
  { time: '10:15', score: 90 },
  { time: '10:20', score: 95 },
  { time: '10:25', score: 92 },
  { time: '10:30', score: 89 },
];

const initialLeaderboard = [
  { rank: 1, name: 'Sarah Miller', score: 98, avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { rank: 2, name: 'John Doe', score: 96, avatar: 'https://picsum.photos/seed/john/100/100' },
  { rank: 3, name: 'Alex Driver', score: 94, avatar: 'https://picsum.photos/seed/alex/100/100', isUser: true },
  { rank: 4, name: 'Emily Chen', score: 92, avatar: 'https://picsum.photos/seed/emily/100/100' },
  { rank: 5, name: 'Mike Ross', score: 91, avatar: 'https://picsum.photos/seed/mike/100/100' },
];

interface DriverDashboardProps {
  onNavigate: (p: Page) => void;
  rides: Ride[];
  onAddRide: (ride: Ride) => void;
  driverProfile: { name: string; id: string };
}

export default function DriverDashboard({ onNavigate, rides, onAddRide, driverProfile }: DriverDashboardProps) {
  const [wheelScore, setWheelScore] = useState(94);
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboard);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [metrics, setMetrics] = useState<DrivingMetrics>({
    braking: 85,
    acceleration: 90,
    corners: 88,
    overspeedAlerts: 1,
    avgGForce: 1.2
  });

  // Simulate real-time leaderboard updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardData(prev => prev.map(driver => {
        if (driver.isUser) {
          return { ...driver, score: wheelScore };
        }
        // Randomly fluctuate other scores slightly
        const fluctuation = Math.random() > 0.5 ? 1 : -1;
        const newScore = Math.min(100, Math.max(80, driver.score + (Math.random() > 0.8 ? fluctuation : 0)));
        return { ...driver, score: Math.round(newScore) };
      }).sort((a, b) => b.score - a.score).map((d, i) => ({ ...d, rank: i + 1 })));
    }, 5000);

    return () => clearInterval(interval);
  }, [wheelScore]);

  // Update score when metrics change
  useEffect(() => {
    const newScore = predictionService.predictWheelScore(metrics);
    setWheelScore(newScore);
  }, [metrics]);

  const handleMetricChange = (key: keyof DrivingMetrics, val: number) => {
    setMetrics(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="driver" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <AnimatePresence>
        {selectedDriver && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative"
            >
              <button onClick={() => setSelectedDriver(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center gap-4">
                <img src={selectedDriver.avatar} className="w-24 h-24 rounded-full border-4 border-primary/30" alt={selectedDriver.name} referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedDriver.name}</h3>
                  <p className="text-primary font-bold">Rank #{selectedDriver.rank}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-slate-800/50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-500 uppercase font-bold">Wheel Score</p>
                    <p className="text-xl font-bold text-white">{selectedDriver.score}</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-500 uppercase font-bold">Badges</p>
                    <p className="text-xl font-bold text-white">12</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-4">View Profile</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {driverProfile.name.split(' ')[0]}!</h1>
            <p className="text-slate-400 mt-1">Your driving performance is in the top 5% this week.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-dark px-4 py-2 rounded-xl flex items-center gap-2 border border-surface-darker">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">Shift: 4h 22m</span>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              Start New Trip
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Score & Behavior */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* Prediction Tool Card */}
            <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">AI Score Prediction Tool</h2>
                </div>
                <button 
                  onClick={() => setMetrics(predictionService.generateRandomMetrics())}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Simulate Random Trip
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sliders */}
                <div className="space-y-6">
                  {[
                    { label: 'Braking Smoothness', key: 'braking', min: 0, max: 100 },
                    { label: 'Acceleration Control', key: 'acceleration', min: 0, max: 100 },
                    { label: 'Cornering Stability', key: 'corners', min: 0, max: 100 },
                    { label: 'Overspeed Alerts', key: 'overspeedAlerts', min: 0, max: 10 },
                    { label: 'Avg G-Force', key: 'avgGForce', min: 0, max: 5, step: 0.1 },
                  ].map((m) => (
                    <div key={m.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>{m.label}</span>
                        <span className="text-white">{metrics[m.key as keyof DrivingMetrics]}</span>
                      </div>
                      <input 
                        type="range" 
                        min={m.min} 
                        max={m.max} 
                        step={m.step || 1}
                        value={metrics[m.key as keyof DrivingMetrics]}
                        onChange={(e) => handleMetricChange(m.key as keyof DrivingMetrics, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  ))}
                </div>

                {/* Score Display */}
                <div className="flex flex-col items-center justify-center bg-background-dark/50 rounded-2xl border border-surface-darker p-8 text-center">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-800" cx="80" cy="80" fill="none" r="74" stroke="currentColor" strokeWidth="12"></circle>
                      <circle 
                        className={cn("transition-all duration-1000", wheelScore > 80 ? "text-accent-green" : wheelScore > 60 ? "text-primary" : "text-accent-red")} 
                        cx="80" cy="80" fill="none" r="74" stroke="currentColor" 
                        strokeDasharray="464.95" 
                        strokeDashoffset={464.95 - (464.95 * wheelScore) / 100} 
                        strokeWidth="12" strokeLinecap="round"
                      ></circle>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-bold text-white tracking-tighter">{wheelScore}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wheel Score</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-bold text-white">Predicted Performance</p>
                    <p className="text-xs text-slate-400 max-w-[200px]">Based on your current metrics, your predicted score is <span className="text-primary font-bold">{wheelScore >= 90 ? 'Excellent' : wheelScore >= 75 ? 'Good' : 'Needs Improvement'}</span>.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Behavior Chart */}
            <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Driving Behavior (Last 30m)</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Safety Score
                  </div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={behaviorData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0da6f2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0da6f2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#223c49" vertical={false} />
                    <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#182b34', border: '1px solid #223c49', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0da6f2" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Overspeed Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent-red/10 border border-accent-red/20 rounded-2xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent-red/20 flex items-center justify-center text-accent-red">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent-red uppercase tracking-widest">Overspeed Alerts</p>
                  <h3 className="text-3xl font-bold text-white mt-1">02</h3>
                  <p className="text-xs text-slate-400 mt-1">↓ 50% from last week</p>
                </div>
              </div>
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-2xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent-green/20 flex items-center justify-center text-accent-green">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent-green uppercase tracking-widest">Fuel Efficiency</p>
                  <h3 className="text-3xl font-bold text-white mt-1">18.4</h3>
                  <p className="text-xs text-slate-400 mt-1">km/l • Optimal performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard & Map */}
          <div className="xl:col-span-4 space-y-8">
            
            {/* Leaderboard */}
            <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">City Leaderboard</h2>
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4">
                {leaderboardData.map((user) => (
                  <div 
                    key={user.name} 
                    onClick={() => setSelectedDriver(user)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer",
                      user.isUser ? "bg-primary/20 border border-primary/30" : "hover:bg-background-dark"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "w-6 text-sm font-bold",
                        user.rank === 1 ? "text-primary" : "text-slate-500"
                      )}>
                        #{user.rank}
                      </span>
                      <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-700" alt={user.name} referrerPolicy="no-referrer" />
                      <span className={cn("text-sm font-bold", user.isUser ? "text-white" : "text-slate-300")}>
                        {user.name} {user.isUser && "(You)"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">{user.score}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-widest">
                View Full Rankings
              </button>
            </div>

            {/* Active Navigation */}
            <div className="bg-surface-dark border border-surface-darker rounded-2xl p-6 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Active Navigation</h2>
                <div className="flex items-center gap-2 px-2 py-1 bg-accent-green/20 rounded text-[10px] font-bold text-accent-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                  LIVE
                </div>
              </div>
              <div className="h-64 rounded-xl bg-background-dark relative overflow-hidden mb-6">
                <LiveMap center={[40.7128, -74.0060]} zoom={14} className="w-full h-full absolute inset-0" />
                <div className="absolute top-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 shadow-2xl z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                      <Navigation className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Turn</p>
                      <p className="text-sm font-bold text-white">400m • Turn Right on 5th Ave</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">ETA</span>
                  </div>
                  <span className="text-sm font-bold text-white">12:45 PM (18 min)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">Distance</span>
                  </div>
                  <span className="text-sm font-bold text-white">4.2 km</span>
                </div>
              </div>
            </div>

            {/* Quick Rewards */}
            <div className="bg-gradient-to-br from-primary/20 to-accent-green/20 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-white">Available Reward</h2>
                </div>
                <p className="text-sm text-slate-300 mb-6">You've earned a <span className="text-white font-bold">15% Discount</span> on your next insurance premium renewal.</p>
                <button 
                  onClick={() => onNavigate('rewards')}
                  className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-primary/10"
                >
                  Redeem Now
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Award className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
