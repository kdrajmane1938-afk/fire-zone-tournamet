
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl gaming-font">
          FZ
        </div>
        <span className="text-xl font-bold gaming-font tracking-wider text-orange-500 hidden sm:block">FIREZONE</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`text-[10px] sm:text-xs font-bold transition-colors uppercase tracking-widest ${activeTab === 'dashboard' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
        >
          DASHBOARD
        </button>
        <button 
          onClick={() => setActiveTab('tournaments')}
          className={`text-[10px] sm:text-xs font-bold transition-colors uppercase tracking-widest ${activeTab === 'tournaments' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
        >
          TOURNAMENTS
        </button>
        
        {user.role === 'ADMIN' && (
          <button 
            onClick={() => setActiveTab('admin')}
            className={`text-[10px] sm:text-xs font-bold transition-colors uppercase tracking-widest px-2 py-1 rounded bg-orange-500/10 border border-orange-500/30 ${activeTab === 'admin' ? 'text-orange-500 border-orange-500' : 'text-orange-400/60 hover:text-orange-400'}`}
          >
            ADMIN
          </button>
        )}

        <button 
          onClick={() => setActiveTab('wallet')}
          className={`flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 hover:border-orange-500 transition-colors ${activeTab === 'wallet' ? 'border-orange-500 text-orange-400' : ''}`}
        >
          <span className="text-xs text-slate-400">₹</span>
          <span className="font-bold text-sm">{user.balance}</span>
        </button>
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-orange-500 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
