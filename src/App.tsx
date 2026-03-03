import React, { useState } from 'react';
import LandingPage from './LandingPage';
import PersonalDashboard from './PersonalDashboard';
import DriverDashboard from './DriverDashboard';
import RidesPage from './RidesPage';
import PerformancePage from './PerformancePage';
import RewardsPage from './RewardsPage';
import SignUpPage from './SignUpPage';
import HeatmapPage from './HeatmapPage';
import SettingsPage from './SettingsPage';
import { type Page } from './components/Navigation';
import { ridesData as initialRides, type Ride } from './data/rides';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [rides, setRides] = useState<Ride[]>(initialRides);
  const [driverProfile, setDriverProfile] = useState({ name: 'Alex Driver', id: 'WR-8821' });

  const addRide = (newRide: Ride) => {
    setRides(prev => [newRide, ...prev]);
  };

  const handleLogin = (name: string, id: string) => {
    setDriverProfile({ name, id });
    navigate('driver');
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background-dark font-sans">
      {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={navigate} onLogin={handleLogin} />}
      {currentPage === 'personal' && <PersonalDashboard onNavigate={navigate} />}
      {currentPage === 'driver' && <DriverDashboard onNavigate={navigate} rides={rides} onAddRide={addRide} driverProfile={driverProfile} />}
      {currentPage === 'rides' && <RidesPage onNavigate={navigate} rides={rides} onAddRide={addRide} driverProfile={driverProfile} />}
      {currentPage === 'performance' && <PerformancePage onNavigate={navigate} driverProfile={driverProfile} />}
      {currentPage === 'rewards' && <RewardsPage onNavigate={navigate} driverProfile={driverProfile} />}
      {currentPage === 'heatmap' && <HeatmapPage onNavigate={navigate} driverProfile={driverProfile} />}
      {currentPage === 'settings' && <SettingsPage onNavigate={navigate} driverProfile={driverProfile} />}
    </div>
  );
}
