
export enum TournamentType {
  SOLO = 'SOLO',
  DUO = 'DUO',
  SQUAD = 'SQUAD'
}

export enum TournamentStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED'
}

export type UserRole = 'PLAYER' | 'ADMIN';

export interface User {
  id: string;
  ffId: string;
  username: string;
  avatar: string;
  balance: number;
  totalKills: number;
  tournamentsPlayed: number;
  wins: number;
  role: UserRole;
}

export interface Tournament {
  id: string;
  title: string;
  type: TournamentType;
  status: TournamentStatus;
  entryFee: number;
  prizePool: number;
  map: string;
  startTime: string;
  participants: number;
  maxParticipants: number;
  description: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  username?: string;
  amount: number;
  type: 'DEPOSIT' | 'ENTRY_FEE' | 'WINNING' | 'WITHDRAWAL';
  date: string;
  description: string;
}

export interface LiveMatchData {
  rank: number;
  playerName: string;
  kills: number;
  status: 'ALIVE' | 'ELIMINATED';
}
