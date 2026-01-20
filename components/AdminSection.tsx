
import React from 'react';
import { Transaction } from '../types';
import { GLOBAL_DEPOSIT_HISTORY } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminSection: React.FC = () => {
  const totalDeposits = GLOBAL_DEPOSIT_HISTORY.reduce((acc, curr) => acc + curr.amount, 0);
  
  // Mock trend data for chart
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
          <p className="text-slate-400 text-sm">Real-time platform financial monitoring</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Platform Total Deposits</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-4xl font-bold gaming-font text-white">₹{totalDeposits.toLocaleString()}</h3>
            <span className="text-green-500 text-xs font-bold">+12.5%</span>
          </div>
          <p className="mt-4 text-xs text-slate-500">Across {GLOBAL_DEPOSIT_HISTORY.length} transactions today</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Players</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-4xl font-bold gaming-font text-white">1,482</h3>
            <span className="text-green-500 text-xs font-bold">+4%</span>
          </div>
          <p className="mt-4 text-xs text-slate-500">Currently browsing or playing</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Net Revenue</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-4xl font-bold gaming-font text-orange-500">₹45,210</h3>
            <span className="text-orange-500 text-xs font-bold">+8.2%</span>
          </div>
          <p className="mt-4 text-xs text-slate-500">Platform fees from entries</p>
        </div>
      </div>

      {/* Analytics Chart */}
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

      {/* Global Transaction Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold gaming-font text-white uppercase">User Deposit Logs</h3>
          <button className="text-xs font-bold text-orange-500 hover:underline">EXPORT CSV</button>
        </div>
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Player Username</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Method</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {GLOBAL_DEPOSIT_HISTORY.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                          {tx.username?.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-200">{tx.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm italic">{tx.description}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{tx.date}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-500 gaming-font">₹{tx.amount}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] font-bold">COMPLETED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
