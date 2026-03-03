import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Trophy, 
  Car, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  MessageSquare, 
  Rss,
  Activity,
  Award,
  Settings,
  Bell,
  Lock,
  LayoutDashboard
} from 'lucide-react';
import { type Page } from './components/Navigation';

export default function LandingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [showScoreModal, setShowScoreModal] = React.useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
  const [randomScore, setRandomScore] = React.useState(0);

  const revealScore = () => {
    setRandomScore(Math.floor(Math.random() * (98 - 85 + 1)) + 85);
    setShowScoreModal(true);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <AnimatePresence>
        {showScoreModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-primary/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(13,166,242,0.2)] text-center max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary fill-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your Potential Score</h3>
              <div className="text-6xl font-black text-primary mb-4">{randomScore}</div>
              <p className="text-slate-400 text-sm mb-8">Based on your vehicle profile, you could be in the top 10% of drivers!</p>
              <button 
                onClick={() => setShowScoreModal(false)}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}

        {showPrivacyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center text-accent-green">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Secure Data Privacy</h3>
              </div>
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>At WheelRank, your privacy is our top priority. All driving telemetry is end-to-end encrypted and stored securely.</p>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green" /> Zero-knowledge encryption</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green" /> You own your data</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-green" /> GDPR & CCPA Compliant</li>
                  </ul>
                </div>
                <p>We never sell your personal information to third parties without your explicit consent.</p>
              </div>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-8"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Zap className="text-primary w-8 h-8" />
              <span className="text-xl font-bold tracking-tight">WheelRank</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('personal')}
                className="text-sm font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => onNavigate('driver')}
                className="text-sm font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                Leaderboard
              </button>
              <button 
                onClick={() => onNavigate('personal')}
                className="text-sm font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                Vehicle Health
              </button>
              <button 
                onClick={() => onNavigate('rewards')}
                className="text-sm font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                Rewards
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('signup')}
                className="px-4 py-2 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-lg shadow-primary/20"
              >
                Login as Driver
              </button>
              <button 
                onClick={() => onNavigate('personal')}
                className="hidden sm:block px-4 py-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-green/10 rounded-full blur-[100px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">AI-Powered Performance</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                  Drive Smart.<br />Drive Safe.<br /><span className="text-primary">Earn Rewards.</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Experience the future of driving with WheelRank's AI-powered vehicle health monitoring and performance tracking platform. Connect your car and start optimizing today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onNavigate('signup')}
                    className="flex items-center justify-center gap-2 min-w-[180px] h-14 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:scale-105 transition-transform"
                  >
                    <Zap className="w-5 h-5" />
                    Login as Driver
                  </button>
                  <button 
                    onClick={() => onNavigate('personal')}
                    className="flex items-center justify-center gap-2 min-w-[180px] h-14 bg-slate-800 border border-slate-700 font-bold rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Personal Dashboard
                  </button>
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-background-dark" 
                        src={`https://picsum.photos/seed/user${i}/100/100`}
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background-dark bg-slate-800 text-xs font-bold text-white">+12k</div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Joined by 12,000+ active drivers</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-green opacity-25 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200&h=800" 
                      alt="Car driving" 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary">
                        <Activity className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Telemetry</p>
                        <p className="text-xs font-bold text-white">System Active • 60 FPS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Active Drivers', value: '12k+' },
                { label: 'Miles Tracked', value: '5.2M' },
                { label: 'Safety Score Avg', value: '88/100' },
                { label: 'Rewards Paid', value: '$2.4M' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-primary text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Advanced Driving Intelligence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Our AI-driven platform monitors every aspect of your journey to ensure safety, efficiency, and maximum reward potential.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              onClick={revealScore}
              className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Wheel Score</h3>
                <p className="text-slate-400 leading-relaxed">Proprietary algorithms analyze your acceleration, braking, and cornering patterns in real-time to provide a safety score.</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => onNavigate('driver')}>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Driver Leaderboard</h3>
                <p className="text-slate-400 leading-relaxed">Compete with drivers globally or in your region. Climb the rankings to unlock exclusive insurance tiers and digital rewards.</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => onNavigate('personal')}>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Health Monitoring</h3>
                <p className="text-slate-400 leading-relaxed">Get predictive maintenance alerts before parts fail. Monitor engine telemetry, battery health, and fluid levels directly from your phone.</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('performance')}
              className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Emission Tracking</h3>
                <p className="text-slate-400 leading-relaxed">Reduce your carbon footprint with eco-driving tips. Track your CO2 output and earn 'Green Miles' for sustainable driving habits.</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('personal')}
              className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Insurance Reminders</h3>
                <p className="text-slate-400 leading-relaxed">Never miss a renewal. Our system automatically scans your documents and alerts you to upcoming deadlines and lower rates.</p>
              </div>
            </div>

            <div 
              onClick={() => setShowPrivacyModal(true)}
              className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Data Privacy</h3>
                <p className="text-slate-400 leading-relaxed">Your data is encrypted and owned by you. Choose what you share with insurers and third parties for total control over your privacy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Ready to transform your drive?</h2>
            <p className="text-xl text-slate-400">Join thousands of smart drivers who are saving money and improving vehicle longevity with WheelRank.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('personal')}
                className="px-10 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-105 transition-all"
              >
                Get Started Free
              </button>
              <button className="px-10 py-4 border border-slate-700 text-lg font-bold rounded-xl hover:bg-slate-800 transition-all">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="text-primary w-8 h-8" />
                <span className="text-xl font-bold tracking-tight text-white">WheelRank</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">The world's leading AI-powered platform for smart driving and vehicle health metrics. Built for the modern driver.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" href="#"><Globe className="w-5 h-5" /></a>
                <a className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" href="#"><MessageSquare className="w-5 h-5" /></a>
                <a className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" href="#"><Rss className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Safety Score</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Leaderboards</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">API Integration</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Rewards Engine</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Subscribe</h4>
              <p className="text-slate-400 text-sm mb-4">Get the latest driving tips and tech updates.</p>
              <form className="flex gap-2">
                <input className="bg-slate-800 border-none rounded-lg flex-1 text-sm focus:ring-1 focus:ring-primary text-white p-2" placeholder="Email" type="email" />
                <button className="bg-primary p-2 rounded-lg text-white">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2024 WheelRank SaaS Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-white" href="#">Privacy Policy</a>
              <a className="hover:text-white" href="#">Terms of Service</a>
              <a className="hover:text-white" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
