
import React from 'react';
import { User, Tournament, LiveMatchData } from '../types';
import { MOCK_LIVE_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
  liveTournaments: Tournament[];
  onViewTournament: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, liveTournaments, onViewTournament }) => {
  const chartData = [
    { name: 'Kills', value: user.totalKills },
    { name: 'Wins', value: user.wins * 10 }, // Weighted for visualization
    { name: 'Matches', value: user.tournamentsPlayed },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Winnings', value: '₹12,450', color: 'text-orange-500' },
          { label: 'Kill Streak', value: '14', color: 'text-red-500' },
          { label: 'Global Rank', value: '#1,245', color: 'text-blue-500' },
          { label: 'Active Matches', value: '3', color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-orange-500/30 transition-colors">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold gaming-font ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Leaderboard */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gaming-font flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE DASHBOARD
            </h2>
            <button className="text-orange-500 text-sm font-bold hover:underline">VIEW ALL MATCHES</button>
          </div>
          
          <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Rank</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Player</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Kills</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {MOCK_LIVE_DATA.map((player) => (
                    <tr key={player.playerName} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold gaming-font ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' : 
                          player.rank === 2 ? 'bg-slate-300 text-black' :
                          player.rank === 3 ? 'bg-orange-400 text-black' : 'text-slate-400'
                        }`}>
                          #{player.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-200">{player.playerName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">{player.kills}</span>
                          <div className="w-16 h-1 bg-slate-700 rounded-full hidden sm:block">
                            <div className="h-full bg-red-500" style={{ width: `${(player.kills/10)*100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          player.status === 'ALIVE' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'
                        }`}>
                          {player.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold gaming-font">PLAYER PERFORMANCE</h2>
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#f97316', '#ef4444', '#3b82f6'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-2xl font-bold gaming-font">{user.totalKills}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Kills</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold gaming-font">{user.wins}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold gaming-font">{(user.wins / user.tournamentsPlayed * 100).toFixed(0)}%</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Win Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
