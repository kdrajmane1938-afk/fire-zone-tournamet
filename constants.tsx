
import { TournamentType, TournamentStatus, Tournament, User, Transaction, LiveMatchData } from './types';

export const INITIAL_USER: User = {
  id: 'u1',
  ffId: '987654321',
  username: 'FF_Warrior_07',
  avatar: 'https://picsum.photos/seed/warrior/200',
  balance: 250,
  totalKills: 452,
  tournamentsPlayed: 12,
  wins: 3,
  role: 'ADMIN', // Set to ADMIN to demonstrate the admin features
};

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Bermuda Clash Championship',
    type: TournamentType.SQUAD,
    status: TournamentStatus.UPCOMING,
    entryFee: 100,
    prizePool: 1000,
    map: 'Bermuda',
    startTime: '2024-06-15 18:00',
    participants: 12,
    maxParticipants: 48,
    description: 'Elite squad battle on the classic Bermuda map. Winner takes home the lion share of ₹1,000.'
  },
  {
    id: 't2',
    title: 'Duo Deathmatch: Purgatory',
    type: TournamentType.DUO,
    status: TournamentStatus.LIVE,
    entryFee: 30,
    prizePool: 1200,
    map: 'Purgatory',
    startTime: '2024-06-14 14:00',
    participants: 24,
    maxParticipants: 24,
    description: 'Fast paced duo survival in the treacherous terrains of Purgatory.'
  },
  {
    id: 't5',
    title: 'Lone Wolf: Iron Cage 1v1',
    type: TournamentType.LONE_WOLF,
    status: TournamentStatus.UPCOMING,
    entryFee: 50,
    prizePool: 80,
    map: 'Iron Cage',
    startTime: '2024-06-17 15:00',
    participants: 1,
    maxParticipants: 2,
    description: 'The ultimate skill test. Strictly one on one battle in the Iron Cage. No help, just pure aim and gloo wall skills. Win ₹80 prize.'
  },
  {
    id: 't3',
    title: 'Solo Survivor Alpha',
    type: TournamentType.SOLO,
    status: TournamentStatus.UPCOMING,
    entryFee: 20,
    prizePool: 800,
    map: 'Kalahari',
    startTime: '2024-06-16 10:00',
    participants: 35,
    maxParticipants: 50,
    description: 'One vs All. Prove you are the ultimate survivor.'
  },
  {
    id: 't4',
    title: 'Squad Rush Night',
    type: TournamentType.SQUAD,
    status: TournamentStatus.COMPLETED,
    entryFee: 100,
    prizePool: 1000,
    map: 'Bermuda Remastered',
    startTime: '2024-06-12 20:00',
    participants: 48,
    maxParticipants: 48,
    description: 'High stakes squad combat under the neon lights. Massive ₹1,000 prize pool.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', amount: 500, type: 'DEPOSIT', date: '2024-06-01', description: 'Wallet top-up via UPI' },
  { id: 'tx2', amount: 50, type: 'ENTRY_FEE', date: '2024-06-10', description: 'Bermuda Championship Entry' },
  { id: 'tx3', amount: 300, type: 'WINNING', date: '2024-06-11', description: '2nd Place: Purgatory Duo' },
];

export const GLOBAL_DEPOSIT_HISTORY: Transaction[] = [
  { id: 'g1', username: 'Shadow_Hunter', amount: 1500, type: 'DEPOSIT', date: '2024-06-14 10:00', description: 'UPI Deposit' },
  { id: 'g2', username: 'Killer_Queen', amount: 200, type: 'DEPOSIT', date: '2024-06-14 11:30', description: 'Card Deposit' },
  { id: 'g3', username: 'Bolt_FF', amount: 5000, type: 'DEPOSIT', date: '2024-06-14 12:15', description: 'Net Banking' },
  { id: 'g4', username: 'Pro_Gamer_001', amount: 100, type: 'DEPOSIT', date: '2024-06-14 14:45', description: 'UPI Deposit' },
  { id: 'g5', username: 'Night_Wolf', amount: 750, type: 'DEPOSIT', date: '2024-06-14 16:20', description: 'UPI Deposit' },
  { id: 'g6', username: 'FF_Warrior_07', amount: 250, type: 'DEPOSIT', date: '2024-06-14 17:05', description: 'UPI Deposit' },
];

export const MOCK_LIVE_DATA: LiveMatchData[] = [
  { rank: 1, playerName: 'Shadow_Ninja', kills: 8, status: 'ALIVE' },
  { rank: 2, playerName: 'StormBreaker', kills: 6, status: 'ALIVE' },
  { rank: 3, playerName: 'GhostProtocol', kills: 5, status: 'ALIVE' },
  { rank: 4, playerName: 'FF_Warrior_07', kills: 4, status: 'ELIMINATED' },
  { rank: 5, playerName: 'DragonSlayer', kills: 3, status: 'ELIMINATED' },
];
