
import React, { useState, useEffect } from 'react';
import { User, Tournament, TournamentStatus, TournamentType } from './types';
import { INITIAL_USER, MOCK_TOURNAMENTS } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TournamentCard from './components/TournamentCard';
import WalletSection from './components/WalletSection';
import TournamentDetail from './components/TournamentDetail';
import AdminSection from './components/AdminSection';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showNotification, setShowNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleJoinTournament = (id: string) => {
    const tournament = tournaments.find(t => t.id === id);
    if (!tournament) return;

    if (user.balance < tournament.entryFee) {
      setShowNotification({ message: 'Insufficient balance! Please deposit money.', type: 'error' });
      setActiveTab('wallet');
      return;
    }

    // Process joining
    setTournaments(prev => prev.map(t => 
      t.id === id ? { ...t, participants: t.participants + 1 } : t
    ));
    setUser(prev => ({ ...prev, balance: prev.balance - tournament.entryFee }));
    setShowNotification({ message: `Successfully joined ${tournament.title}!`, type: 'success' });
    setSelectedTournament(null);
  };

  const handleDeposit = (amount: number) => {
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
    setShowNotification({ message: `₹${amount} added to your wallet!`, type: 'success' });
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl font-bold animate-in slide-in-from-bottom-10 ${
          showNotification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {showNotification.message}
        </div>
      )}

      <main className="max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={user} 
            liveTournaments={tournaments.filter(t => t.status === TournamentStatus.LIVE)}
            onViewTournament={(id) => setSelectedTournament(tournaments.find(t => t.id === id) || null)}
          />
        )}

        {activeTab === 'tournaments' && (
          <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-3xl font-bold gaming-font uppercase tracking-wider">Battle Arenas</h2>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                {['ALL', 'SOLO', 'DUO', 'SQUAD'].map(filter => (
                  <button 
                    key={filter} 
                    className="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-700 hover:border-orange-500 transition-colors whitespace-nowrap"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments.map(tournament => (
                <TournamentCard 
                  key={tournament.id} 
                  tournament={tournament}
                  onJoin={handleJoinTournament}
                  onView={(id) => setSelectedTournament(tournaments.find(t => t.id === id) || null)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <WalletSection user={user} onDeposit={handleDeposit} />
        )}

        {activeTab === 'admin' && user.role === 'ADMIN' && (
          <AdminSection />
        )}

        {activeTab === 'profile' && (
          <div className="p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-orange-600 to-red-600 relative">
                   <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                      <img src={user.avatar} className="w-32 h-32 rounded-3xl border-4 border-slate-900 object-cover" alt="User Avatar" />
                      <div className="pb-4">
                        <h2 className="text-3xl font-bold gaming-font">{user.username}</h2>
                        <p className="text-orange-500 font-bold">FF ID: {user.ffId} <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-[10px]">{user.role}</span></p>
                      </div>
                   </div>
                </div>
                <div className="pt-20 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-slate-400 font-bold uppercase text-xs">Account Info</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                          <span className="text-slate-500">Email</span>
                          <span>warrior@gmail.com</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                          <span className="text-slate-500">Phone</span>
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                          <span className="text-slate-500">Member Since</span>
                          <span>Jan 2024</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-slate-400 font-bold uppercase text-xs">Gaming Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 text-center">
                          <p className="text-2xl font-bold gaming-font text-white">{user.tournamentsPlayed}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Played</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 text-center">
                          <p className="text-2xl font-bold gaming-font text-green-500">{user.wins}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Wins</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 text-center">
                          <p className="text-2xl font-bold gaming-font text-red-500">{user.totalKills}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Kills</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 text-center">
                          <p className="text-2xl font-bold gaming-font text-orange-500">1.4</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">K/D Ratio</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-slate-400 font-bold uppercase text-xs">Achievements</h3>
                      <div className="flex flex-wrap gap-2">
                         {['Sharpshooter', 'Survivor', 'Tactician', 'Top 100'].map(badge => (
                           <span key={badge} className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500 text-xs font-bold">
                             🏆 {badge}
                           </span>
                         ))}
                      </div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Footer Navigation for Mobile */}
      <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-orange-500' : 'text-slate-500'}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </button>
        <button onClick={() => setActiveTab('tournaments')} className={activeTab === 'tournaments' ? 'text-orange-500' : 'text-slate-500'}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </button>
        {user.role === 'ADMIN' && (
          <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'text-orange-500' : 'text-slate-500'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </button>
        )}
        <button onClick={() => setActiveTab('wallet')} className={activeTab === 'wallet' ? 'text-orange-500' : 'text-slate-500'}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'text-orange-500' : 'text-slate-500'}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </button>
      </footer>

      {/* Modals */}
      {selectedTournament && (
        <TournamentDetail 
          tournament={selectedTournament} 
          onJoin={handleJoinTournament}
          onClose={() => setSelectedTournament(null)}
        />
      )}
    </div>
  );
};

export default App;
