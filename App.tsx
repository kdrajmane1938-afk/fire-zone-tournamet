
import React, { useState, useEffect } from 'react';
import { User, Tournament, TournamentStatus, Transaction } from './types';
import { INITIAL_USER, MOCK_TOURNAMENTS } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TournamentCard from './components/TournamentCard';
import WalletSection from './components/WalletSection';
import TournamentDetail from './components/TournamentDetail';
import AdminSection from './components/AdminSection';

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showNotification, setShowNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [pendingDeposits, setPendingDeposits] = useState<Transaction[]>([]);

  // Simulation registration
  const [regName, setRegName] = useState('');
  const [regFFId, setRegFFId] = useState('');

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regFFId) return;
    setUser({
      ...INITIAL_USER,
      username: regName,
      ffId: regFFId,
      role: regName.toLowerCase().includes('admin') ? 'ADMIN' : 'PLAYER'
    });
    setIsRegistered(true);
    setShowNotification({ message: 'Account Created Successfully!', type: 'success' });
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setRegName('');
    setRegFFId('');
    setActiveTab('dashboard');
    setShowNotification({ message: 'Logged out successfully!', type: 'success' });
  };

  const handleJoinTournament = (id: string) => {
    const tournament = tournaments.find(t => t.id === id);
    if (!tournament) return;
    if (user.balance < tournament.entryFee) {
      setShowNotification({ message: 'Insufficient balance! Please deposit money.', type: 'error' });
      setActiveTab('wallet');
      return;
    }
    setTournaments(prev => prev.map(t => t.id === id ? { ...t, participants: t.participants + 1 } : t));
    setUser(prev => ({ ...prev, balance: prev.balance - tournament.entryFee }));
    setShowNotification({ message: `Successfully joined ${tournament.title}!`, type: 'success' });
    setSelectedTournament(null);
  };

  const handleDepositRequest = (amount: number, transactionId: string) => {
    const newRequest: Transaction = {
      id: transactionId,
      amount: amount,
      username: user.username,
      type: 'DEPOSIT',
      date: new Date().toLocaleString(),
      description: `Pending verification for UTR: ${transactionId}`
    };
    setPendingDeposits(prev => [newRequest, ...prev]);
    setShowNotification({ message: 'Deposit request sent to Admin for approval!', type: 'success' });
  };

  const handleApproveDeposit = (id: string) => {
    const request = pendingDeposits.find(tx => tx.id === id);
    if (request) {
      setUser(prev => ({ ...prev, balance: prev.balance + request.amount }));
      setPendingDeposits(prev => prev.filter(tx => tx.id !== id));
      setShowNotification({ message: 'Deposit Approved!', type: 'success' });
    }
  };

  const handleRejectDeposit = (id: string) => {
    setPendingDeposits(prev => prev.filter(tx => tx.id !== id));
    setShowNotification({ message: 'Deposit Rejected!', type: 'error' });
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl space-y-8 animate-in fade-in zoom-in-95">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl gaming-font shadow-lg shadow-orange-900/40">FZ</div>
            <h1 className="text-3xl font-bold gaming-font text-white uppercase tracking-wider">FIREZONE</h1>
            <p className="text-slate-400 text-sm">Elite Free Fire Tournaments</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Game Nickname</label>
              <input 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 font-bold"
                placeholder="e.g. SKY_GAMER"
                value={regName}
                onChange={e => setRegName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Free Fire ID</label>
              <input 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 font-bold"
                placeholder="e.g. 123456789"
                value={regFFId}
                onChange={e => setRegFFId(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/40 uppercase tracking-widest transition-all">
              Join Arena
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-500 italic">By joining, you agree to battle rules and fair play.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      
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
          <div className="p-4 sm:p-6 space-y-6">
            <h2 className="text-3xl font-bold gaming-font uppercase text-white">Battle Arenas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} onJoin={handleJoinTournament} onView={(id) => setSelectedTournament(tournaments.find(t => t.id === id) || null)} />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'wallet' && <WalletSection user={user} onDepositRequest={handleDepositRequest} />}
        {activeTab === 'admin' && user.role === 'ADMIN' && (
          <AdminSection 
            pendingDeposits={pendingDeposits} 
            onApprove={handleApproveDeposit} 
            onReject={handleRejectDeposit} 
          />
        )}
        {activeTab === 'profile' && (
          <div className="p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <div className="h-40 bg-gradient-to-r from-orange-600 to-red-600 relative">
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                  <div className="w-32 h-32 rounded-[2rem] border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-4xl font-bold text-white gaming-font shadow-xl">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="pb-4">
                    <h2 className="text-3xl font-bold gaming-font text-white">{user.username}</h2>
                    <p className="text-orange-400 font-bold tracking-wider">FF ID: {user.ffId}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">
                    {user.role} ACCOUNT
                  </span>
                </div>
              </div>
              
              <div className="pt-24 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Kills</p>
                      <p className="text-3xl font-bold text-red-500 gaming-font">{user.totalKills}</p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Wins</p>
                      <p className="text-3xl font-bold text-green-500 gaming-font">{user.wins}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-bold gaming-font uppercase tracking-wider border-b border-slate-700 pb-2">Account Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400 text-sm">Push Notifications</span>
                        <div className="w-10 h-5 bg-orange-600 rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400 text-sm">Privacy Mode</span>
                        <div className="w-10 h-5 bg-slate-700 rounded-full relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-8">
                  <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-3xl space-y-4">
                    <p className="text-sm text-slate-300 italic">"Remember to always check the rules before joining any high-stakes tournament. Fair play is our top priority."</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span className="text-[10px] font-bold text-orange-500 uppercase">System Notice</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="group flex items-center justify-center gap-3 w-full bg-red-500/10 hover:bg-red-500 border border-red-500/30 text-red-500 hover:text-white font-bold py-5 rounded-2xl transition-all uppercase tracking-widest shadow-xl shadow-red-950/20"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        {['dashboard', 'tournaments', 'wallet', 'admin', 'profile'].map(tab => (
           (tab !== 'admin' || user.role === 'ADMIN') && (
             <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'text-orange-500' : 'text-slate-500 capitalize font-bold text-[10px]'}>
                {tab.toUpperCase()}
             </button>
           )
        ))}
      </footer>

      {selectedTournament && <TournamentDetail tournament={selectedTournament} onJoin={handleJoinTournament} onClose={() => setSelectedTournament(null)} />}
    </div>
  );
};

export default App;
