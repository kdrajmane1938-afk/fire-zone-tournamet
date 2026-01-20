
import React from 'react';
import { Transaction } from '../types';
import { GLOBAL_DEPOSIT_HISTORY } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AdminSectionProps {
  pendingDeposits: Transaction[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AdminSection: React.FC<AdminSectionProps> = ({ pendingDeposits, onApprove, onReject }) => {
  const totalDeposits = GLOBAL_DEPOSIT_HISTORY.reduce((acc, curr) => acc + curr.amount, 0);
  
  const trendData = [
    { day: 'Mon', amount: 4000 },
    { day: 'Tue', amount: 3000 },
    { day: 'Wed', amount: 2000 },
    { day: 'Thu', amount: 5500 },
    { day: 'Fri', amount: totalDeposits },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold gaming-font uppercase tracking-wider text-white">Admin Control Center</h2>
          <p className="text-slate-400 text-sm">Review deposits and manage the platform</p>
        </div>
      </div>

      {/* HOW TO GO LIVE - GUIDE */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 rounded-3xl border border-indigo-500/30">
        <h3 className="text-xl font-bold text-white gaming-font mb-4 flex items-center gap-2">
          🚀 HOW TO MAKE THIS APP LIVE (FOR PLAYERS)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-xl space-y-2">
            <span className="text-indigo-400 font-bold">STEP 1</span>
            <p className="text-xs text-slate-300">Create a free account on <a href="https://vercel.com" target="_blank" className="text-orange-500 underline">Vercel.com</a></p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl space-y-2">
            <span className="text-indigo-400 font-bold">STEP 2</span>
            <p className="text-xs text-slate-300">Connect your GitHub and upload these files.</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl space-y-2">
            <span className="text-indigo-400 font-bold">STEP 3</span>
            <p className="text-xs text-slate-300">Share your new "vercel.app" link with players!</p>
          </div>
        </div>
      </div>

      {/* PENDING APPROVALS */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold gaming-font text-orange-500 uppercase tracking-widest">
          Pending Deposits ({pendingDeposits.length})
        </h3>
        {pendingDeposits.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-dashed border-slate-700 text-center text-slate-500">
            No pending deposits to verify.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingDeposits.map(tx => (
              <div key={tx.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-white font-bold">{tx.username || 'Unknown Player'}</p>
                  <p className="text-xs text-slate-400">UTR: <span className="text-orange-400 font-mono">{tx.id}</span></p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500 gaming-font">₹{tx.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onReject(tx.id)}
                    className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                  >
                    REJECT
                  </button>
                  <button 
                    onClick={() => onApprove(tx.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all"
                  >
                    APPROVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Platform Total Deposits</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-4xl font-bold gaming-font text-white">₹{totalDeposits.toLocaleString()}</h3>
          </div>
        </div>
        {/* Other stats... */}
      </div>

      <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
        <h3 className="text-lg font-bold gaming-font text-white mb-6 uppercase tracking-wider">Deposit Velocity (Weekly)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#f97316" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
