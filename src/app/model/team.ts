import { Player } from './player';
import { Team } from './team';

export interface Team {
  id: number;
  name: string;
  players?: Array<Player>;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  ties?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  streak?: Streak;
  lastTen?: Array<GameScore>;
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
