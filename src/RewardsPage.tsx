import React from 'react';
import { 
  Gift, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Tag, 
  Zap, 
  Award,
  Star
} from 'lucide-react';
import { Sidebar, type Page } from './components/Navigation';
import { cn } from './lib/utils';

const rewards = [
  {
    id: 1,
    title: '15% Insurance Discount',
    desc: 'Get 15% off your next insurance premium renewal with Progressive.',
    code: 'WHEEL15SAFE',
    expiry: 'Dec 31, 2024',
    category: 'Insurance',
    points: 500,
    icon: Shield
  },
  {
    id: 2,
    title: 'Free Tire Rotation',
    desc: 'One free tire rotation service at any participating Firestone location.',
    code: 'TIRE-ROT-24',
    expiry: 'Oct 15, 2024',
    category: 'Maintenance',
    points: 350,
    icon: Wrench
  },
  {
    id: 3,
    title: '$20 Fuel Voucher',
    desc: 'Redeem for $20 worth of fuel at any Shell station nationwide.',
    code: 'SHELL-20-WR',
    expiry: 'Nov 20, 2024',
    category: 'Fuel',
    points: 800,
    icon: Zap
  },
  {
    id: 4,
    title: 'Premium Car Wash',
    desc: 'Full exterior and interior detailing service at Sparkle Auto Spa.',
    code: 'SPARKLE-WR',
    expiry: 'Sep 30, 2024',
    category: 'Service',
    points: 200,
    icon: Star
  }
];

import { Shield, Wrench } from 'lucide-react';

interface RewardsPageProps {
  onNavigate: (p: Page) => void;
  driverProfile: { name: string; id: string };
}

export default function RewardsPage({ onNavigate, driverProfile }: RewardsPageProps) {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      <Sidebar currentPage="rewards" onPageChange={onNavigate} driverName={driverProfile.name} driverId={driverProfile.id} />
      
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Driver Rewards</h1>
            <p className="text-slate-400 mt-1">Redeem your Wheel Score points for exclusive partner discounts.</p>
          </div>
          <div className="bg-primary/20 border border-primary/30 px-6 py-3 rounded-2xl flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Available Points</p>
              <p className="text-xl font-bold text-white">2,450 pts</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-surface-dark border border-surface-darker rounded-2xl overflow-hidden flex flex-col group">
              <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-slate-800 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <reward.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                    {reward.points} pts
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{reward.title}</h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{reward.desc}</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Expires: {reward.expiry}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {reward.category}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-background-dark/50 border-t border-surface-darker flex gap-3">
                <div className="flex-1 bg-slate-800 rounded-xl px-4 py-2 flex items-center justify-between border border-slate-700">
                  <span className="text-sm font-mono font-bold text-white tracking-wider">{reward.code}</span>
                  <button 
                    onClick={() => handleCopy(reward.id, reward.code)}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {copiedId === reward.id ? <CheckCircle2 className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                  Redeem <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Section */}
        <div className="bg-surface-dark border border-surface-darker rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-xl font-bold text-white">Our Reward Partners</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {['Shell', 'Progressive', 'Firestone', 'Tesla', 'Michelin'].map(partner => (
              <span key={partner} className="text-2xl font-black text-slate-500 tracking-tighter italic">{partner}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
