import React from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Leaf, 
  Wrench, 
  Zap, 
  Map as MapIcon,
  ChevronRight,
  Calendar,
  Settings as SettingsIcon,
  Car
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Navbar, type Page } from './components/Navigation';
import { cn } from './lib/utils';
import DocumentUploadModal, { type ExtractedData } from './DocumentUploadModal';
import LiveMap from './components/LiveMap';

const performanceData = [
  { name: '1', rpm: 2000, speed: 40 },
  { name: '2', rpm: 3500, speed: 65 },
  { name: '3', rpm: 5500, speed: 85 },
  { name: '4', rpm: 4500, speed: 75 },
  { name: '5', rpm: 6500, speed: 95 },
  { name: '6', rpm: 8500, speed: 110 },
  { name: '7', rpm: 7500, speed: 100 },
  { name: '8', rpm: 9000, speed: 120 },
  { name: '9', rpm: 8000, speed: 115 },
  { name: '10', rpm: 9500, speed: 130 },
];

const healthMetrics = [
  { label: 'Engine Temp', value: '92°C', change: '↑ 1%', color: '#0da6f2' },
  { label: 'Battery Voltage', value: '14.2V', change: '↑ 0.2%', color: '#0da6f2' },
  { label: 'O2 Sensor', value: '0.9V', change: '↓ 0.1%', color: '#fa5f38' },
  { label: 'Fuel-Air Ratio', value: '14.7:1', change: '0%', color: '#0da6f2' },
];

export default function PersonalDashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [extractedData, setExtractedData] = React.useState<ExtractedData | null>(null);

  const handleDataExtracted = (data: ExtractedData) => {
    setExtractedData(data);
    // You could also trigger alerts or other side effects here
  };

  // Helper to calculate days remaining
  const getDaysRemaining = (dateStr: string) => {
    const expiry = new Date(dateStr);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const insuranceDays = extractedData ? getDaysRemaining(extractedData.insuranceExpiry) : 14;
  const pollutionDays = extractedData ? getDaysRemaining(extractedData.pollutionExpiry) : 240;

  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <Navbar currentPage="personal" onPageChange={onNavigate} />
      
      <DocumentUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDataExtracted={handleDataExtracted} 
      />

      <main className="max-w-[1440px] mx-auto w-full p-6 lg:p-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Vehicle Dashboard</h1>
            <p className="text-slate-400 mt-1">Tesla Model 3 • Performance Edition • AWD</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-primary" /> Sync Documents
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent-green/10 border border-accent-green/20 rounded-lg text-accent-green">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold text-sm">System Healthy</span>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh Data
            </button>
          </div>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Insurance Expiry */}
          <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl space-y-4 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <span className={cn(
                "px-2 py-1 text-xs font-bold rounded",
                insuranceDays < 30 ? "bg-accent-red/10 text-accent-red" : "bg-accent-green/10 text-accent-green"
              )}>
                {insuranceDays < 30 ? 'Warning' : 'Healthy'}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Insurance Expiry</p>
              <h3 className="text-3xl font-bold mt-1 text-white">{insuranceDays} Days</h3>
              {extractedData?.policyNumber && (
                <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-tighter">Policy: {extractedData.policyNumber}</p>
              )}
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className={cn(
                "h-full transition-all duration-1000",
                insuranceDays < 30 ? "bg-accent-red" : "bg-accent-green"
              )} style={{ width: `${Math.min(100, (insuranceDays / 365) * 100)}%` }}></div>
            </div>
          </div>

          {/* Pollution Certificate */}
          <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-accent-green/10 rounded-lg text-accent-green">
                <Leaf className="w-5 h-5" />
              </div>
              <span className={cn(
                "px-2 py-1 text-xs font-bold rounded",
                pollutionDays < 30 ? "bg-accent-red/10 text-accent-red" : "bg-accent-green/10 text-accent-green"
              )}>
                {pollutionDays < 30 ? 'Expiring' : 'Healthy'}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Pollution Cert.</p>
              <h3 className="text-3xl font-bold mt-1 text-white">{pollutionDays < 0 ? 'Expired' : 'Valid'}</h3>
            </div>
            <p className="text-xs text-slate-400">
              {pollutionDays < 0 ? `Expired ${Math.abs(pollutionDays)} days ago` : `Expires in ${pollutionDays} days`}
            </p>
          </div>

          {/* Next Service */}
          <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-bold rounded">In 2k KM</span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Next Maintenance</p>
              <h3 className="text-3xl font-bold mt-1 text-white">
                {extractedData?.nextMaintenanceDate 
                  ? new Date(extractedData.nextMaintenanceDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                  : 'Oct 24'}
              </h3>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-[8px] font-bold">
                  {i === 3 ? '+2' : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Fuel/Charge Level */}
          <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-accent-green/10 rounded-lg text-accent-green">
                <Zap className="w-5 h-5" />
              </div>
              <span className="px-2 py-1 bg-accent-green/10 text-accent-green text-xs font-bold rounded">82%</span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Estimated Range</p>
              <h3 className="text-3xl font-bold mt-1 text-white">342 KM</h3>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-1 flex-1 bg-accent-green rounded-full"></div>)}
              <div className="h-1 flex-1 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Health Monitoring */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Car Health Monitoring Panel</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded">Live</button>
                  <button className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-bold rounded">History</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {healthMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <p className="text-slate-400 text-sm">{metric.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">{metric.value}</span>
                      <span className={cn("text-xs font-bold", metric.change.includes('↑') ? "text-accent-green" : "text-accent-red")}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="h-16 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData.slice(0, 5)}>
                          <defs>
                            <linearGradient id={`color${metric.label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={metric.color} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="speed" stroke={metric.color} fillOpacity={1} fill={`url(#color${metric.label.replace(/\s/g, '')})`} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RPM vs Speed Chart */}
            <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Performance Trend: RPM vs Speed</h2>
                <div className="flex gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> RPM (x1000)</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-green"></span> Speed (km/h)</div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="rpm" fill="#0da6f2" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="speed" fill="#0bda57" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Status & Map */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-white self-start mb-6">Overall Health Status</h2>
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-700" cx="96" cy="96" fill="none" r="88" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-accent-green" cx="96" cy="96" fill="none" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="55.29" strokeWidth="12" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold text-white">90%</span>
                  <span className="text-accent-green text-sm font-bold">HEALTHY</span>
                </div>
              </div>
              <div className="w-full mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Powertrain', val: '98%' },
                  { label: 'Tires/Brakes', val: '82%' },
                  { label: 'Electronics', val: '95%' },
                  { label: 'Fluids', val: '88%' },
                ].map(item => (
                  <div key={item.label} className="text-left">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="font-bold text-white">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map UI */}
            <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl overflow-hidden relative group flex flex-col">
              <div className="flex items-center justify-between mb-4 z-20 relative">
                <h2 className="text-lg font-bold text-white">Nearby Charging & Fuel</h2>
                <MapIcon className="w-5 h-5 text-primary cursor-pointer" />
              </div>
              <div className="h-64 rounded-lg bg-slate-900 relative overflow-hidden">
                <LiveMap center={[40.7128, -74.0060]} zoom={13} className="w-full h-full absolute inset-0" />
                <div className="absolute bottom-2 left-2 right-2 p-3 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl z-20">
                  <p className="text-xs font-bold text-white">Tesla Supercharger - SOMA</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400">1.2 KM away</span>
                    <span className="text-[10px] bg-accent-green/20 text-accent-green px-1.5 rounded-sm">12/16 Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Maintenance Timeline */}
        <div className="bg-slate-800/50 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6 text-white">Predictive Maintenance Timeline</h2>
          <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4 items-start md:items-center py-4">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
            {[
              { status: 'Completed', title: 'Oil Change', date: 'Jan 12, 2024', icon: CheckCircle2, color: 'bg-accent-green' },
              { status: 'In 2 Weeks', title: 'Tire Rotation', date: 'Feb 28, 2024', icon: Calendar, color: 'bg-primary' },
              { status: 'Projected', title: 'Brake Pad Replace', date: 'May 2024', icon: Wrench, color: 'bg-slate-700' },
              { status: 'Projected', title: 'Coolant Flush', date: 'Aug 2024', icon: SettingsIcon, color: 'bg-slate-700' },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 group">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white ring-8 ring-background-dark", step.color)}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="md:text-center">
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest", step.status === 'In 2 Weeks' ? 'text-primary' : 'text-slate-500')}>
                    {step.status}
                  </p>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                  <p className="text-xs text-slate-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-800 py-10 px-8 text-center bg-slate-900/50">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Car className="text-primary w-6 h-6" />
          <span className="text-lg font-bold text-white tracking-tight">WheelRank</span>
        </div>
        <p className="text-slate-500 text-sm">© 2024 WheelRank Fleet Systems. All vehicle data is encrypted end-to-end.</p>
        <div className="flex justify-center gap-6 mt-6">
          <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium uppercase tracking-widest" href="#">Terms</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium uppercase tracking-widest" href="#">Privacy</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium uppercase tracking-widest" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
