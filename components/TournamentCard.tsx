
import React from 'react';
import { Tournament, TournamentStatus } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
  onJoin: (id: string) => void;
  onView: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onJoin, onView }) => {
  const isLive = tournament.status === TournamentStatus.LIVE;
  const isUpcoming = tournament.status === TournamentStatus.UPCOMING;
  const fillPercentage = (tournament.participants / tournament.maxParticipants) * 100;

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden group hover:border-orange-500/50 transition-all">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${tournament.id}/600/400`} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          alt={tournament.title} 
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${isLive ? 'bg-red-500 animate-pulse' : isUpcoming ? 'bg-blue-600' : 'bg-slate-600'}`}>
            {tournament.status}
          </span>
          <span className="px-2 py-1 bg-slate-900/80 backdrop-blur rounded text-[10px] font-bold uppercase">
            {tournament.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold gaming-font text-white drop-shadow-lg truncate">
            {tournament.title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-slate-400 text-xs uppercase font-semibold">Prize Pool</p>
            <p className="text-2xl font-bold text-orange-500 gaming-font">₹{tournament.prizePool}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs uppercase font-semibold">Entry Fee</p>
            <p className="text-lg font-bold text-white gaming-font">₹{tournament.entryFee}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Slots filled</span>
            <span>{tournament.participants} / {tournament.maxParticipants}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all" 
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => onView(tournament.id)}
            className="px-4 py-2 rounded-lg bg-slate-700 text-sm font-bold hover:bg-slate-600 transition-colors"
          >
            DETAILS
          </button>
          <button 
            onClick={() => onJoin(tournament.id)}
            disabled={!isUpcoming || tournament.participants >= tournament.maxParticipants}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isUpcoming && tournament.participants < tournament.maxParticipants
                ? 'bg-orange-600 hover:bg-orange-500 text-white'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isUpcoming ? 'JOIN NOW' : isLive ? 'SPECTATE' : 'ENDED'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
