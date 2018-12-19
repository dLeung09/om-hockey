import { Player } from './player';
import { Team } from './team';

export interface Team {
  id: number;
  name: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  ties: number;
  points?: number;
  goalsFor: number;
  goalsAgainst: number;
  streak: Streak;
  lastTen: Array<GameScore>;
  players?: Array<Player>;
}

export interface GameScore {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
}

export interface Streak {
  streakType: string;
  streakCount: number;
}
