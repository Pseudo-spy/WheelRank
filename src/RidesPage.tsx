import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ChevronRight, 
  Download,
  Calendar,
  MapPin,
  Clock,
  Car,
  X
} from 'lucide-react';
import { Sidebar, type Page } from './components/Navigation';
import { type Ride } from './data/rides';
import { cn } from './lib/utils';

interface RidesPageProps {
  onNavigate: (p: Page) => void;
  rides: Ride[];
  onAddRide: (ride: Ride) => void;
  driverProfile: { name: string; id: string };
}

export default function RidesPage({ onNavigate, rides, onAddRide, driverProfile }: RidesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [newRide, setNewRide] = useState<Partial<Ride>>({
    category: 'Business',
    purpose: 'Meeting'
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsDetecting(true);
    
    // Simulate AI/GPS detection
    setTimeout(() => {
      const now = new Date();
      const end = new Date(now.getTime() + 45 * 60000); // +45 mins
      
      const formatDate = (date: Date) => {
        const d = date.toISOString().split('T')[0];
        const t = date.toTimeString().split(' ')[0].substring(0, 5);
        return `${d} ${t}`;
      };

      setNewRide({
        start: formatDate(now),
        end: formatDate(end),
        from: 'Current Location (Downtown)',
        to: 'Airport Terminal 2',
        miles: parseFloat((Math.random() * 15 + 5).toFixed(1)),
        category: 'Business',
        purpose: 'Client Meeting'
      });
      setIsDetecting(false);
    }, 1500);
  };

  const filteredRides = rides.filter(ride => 
    ride.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRide = () => {
    if (newRide.start && newRide.end && newRide.from && newRide.to && newRide.miles) {
      onAddRide(newRide as Ride);
      setIsModalOpen(false);
      setNewRide({ category: 'Business', purpose: 'Meeting' });
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="rides" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Ride History</h1>
            <p className="text-slate-400 mt-1">Manage and review your past trips and mileage logs.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-slate-700">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={handleOpenModal}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Start New Trip
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-surface-dark border border-surface-darker rounded-2xl p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by location or purpose..."
              className="w-full bg-background-dark border border-surface-darker rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-slate-700">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <select className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-bold focus:ring-1 focus:ring-primary text-white outline-none">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        {/* Rides Table */}
        <div className="bg-surface-dark border border-surface-darker rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-darker bg-background-dark/30">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Route</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Distance</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Purpose</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-darker">
                {filteredRides.map((ride, idx) => (
                  <tr key={idx} className="hover:bg-background-dark/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{ride.start.split(' ')[0]}</p>
                          <p className="text-xs text-slate-500">{ride.start.split(' ')[1]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="w-0.5 h-4 bg-slate-700"></div>
                          <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white">{ride.from}</p>
                          <p className="text-sm font-bold text-white">{ride.to}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{ride.miles} km</p>
                      <p className="text-xs text-slate-500">~{Math.round(ride.miles * 1.2)} mins</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full border border-slate-700">
                        {ride.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 text-xs font-bold rounded-full",
                        ride.category === 'Business' ? "bg-primary/10 text-primary" : "bg-accent-green/10 text-accent-green"
                      )}>
                        {ride.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRides.length === 0 && (
            <div className="py-20 text-center">
              <Car className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400">No rides found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Log Trip Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Start New Trip</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4 relative">
                {isDetecting && (
                  <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-primary animate-pulse">Detecting Trip Details via GPS...</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Time</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      value={newRide.start || ''}
                      onChange={(e) => setNewRide(prev => ({ ...prev, start: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Time</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      value={newRide.end || ''}
                      onChange={(e) => setNewRide(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">From</label>
                    <input 
                      type="text" 
                      placeholder="Origin"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      value={newRide.from || ''}
                      onChange={(e) => setNewRide(prev => ({ ...prev, from: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">To</label>
                    <input 
                      type="text" 
                      placeholder="Destination"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      value={newRide.to || ''}
                      onChange={(e) => setNewRide(prev => ({ ...prev, to: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Distance (km)</label>
                    <input 
                      type="number" 
                      placeholder="0.0"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      value={newRide.miles || ''}
                      onChange={(e) => setNewRide(prev => ({ ...prev, miles: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                      onChange={(e) => setNewRide(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Business">Business</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Purpose</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Meeting, Customer Visit"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                    onChange={(e) => setNewRide(prev => ({ ...prev, purpose: e.target.value }))}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-800 flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddRide}
                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all"
                >
                  Save Trip
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
