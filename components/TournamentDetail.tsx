
import React, { useState, useEffect } from 'react';
import { Tournament } from '../types';
import { getBattleStrategy } from '../services/geminiService';

interface TournamentDetailProps {
  tournament: Tournament;
  onJoin: (id: string) => void;
  onClose: () => void;
}

const TournamentDetail: React.FC<TournamentDetailProps> = ({ tournament, onJoin, onClose }) => {
  const [strategies, setStrategies] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const fetchAi = async () => {
      setLoadingAi(true);
      const res = await getBattleStrategy(tournament);
      setStrategies(res);
      setLoadingAi(false);
    };
    fetchAi();
  }, [tournament]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 flex-shrink-0">
          <img 
            src={`https://picsum.photos/seed/${tournament.id}/1200/600`} 
            className="w-full h-full object-cover" 
            alt={tournament.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-8">
            <span className="px-3 py-1 bg-orange-600 rounded text-xs font-bold uppercase tracking-widest mb-2 inline-block">
              {tournament.type} BATTLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold gaming-font text-white uppercase">{tournament.title}</h2>
          </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">About Tournament</h3>
                <p className="text-slate-200 leading-relaxed text-lg">{tournament.description}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Map', value: tournament.map },
                  { label: 'Time', value: tournament.startTime },
                  { label: 'Prize', value: `₹${tournament.prizePool}` },
                  { label: 'Entry', value: `₹${tournament.entryFee}` },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{stat.label}</p>
                    <p className="text-sm font-bold text-white truncate">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* AI Coaching Section */}
              <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-4xl">🤖</div>
                <h4 className="text-indigo-400 font-bold gaming-font text-xl mb-4 flex items-center gap-2">
                  PRO AI COACH STRATEGY
                  {loadingAi && <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>}
                </h4>
                {loadingAi ? (
                  <div className="space-y-3">
                    <div className="h-4 bg-indigo-500/10 rounded-full animate-pulse w-full"></div>
                    <div className="h-4 bg-indigo-500/10 rounded-full animate-pulse w-3/4"></div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {strategies.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-sm text-indigo-100">
                        <span className="text-indigo-400 font-bold">0{i+1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Participation Column */}
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-700 space-y-6">
                <div className="text-center">
                  <p className="text-slate-400 text-xs font-bold uppercase">Prize Breakdown</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-yellow-500 font-bold">Winner</span>
                      <span className="text-white font-bold">₹{(tournament.prizePool * 0.5).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 font-bold">Runner Up</span>
                      <span className="text-white font-bold">₹{(tournament.prizePool * 0.3).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-orange-400 font-bold">Per Kill</span>
                      <span className="text-white font-bold">₹10</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-slate-400">Slots Filled</span>
                    <span className="text-orange-500">{tournament.participants} / {tournament.maxParticipants}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500" 
                      style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => onJoin(tournament.id)}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-orange-900/40"
                >
                  Join for ₹{tournament.entryFee}
                </button>
              </div>

              <div className="text-center p-4">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Registration ends in</p>
                <p className="text-xl font-bold gaming-font text-white">04:22:15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
