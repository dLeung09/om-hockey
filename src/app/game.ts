import { Arena } from './arena';
import { Team } from './team';

export interface Game {
  id: number;
  date: Date;
  gameType: GameType;
  arena: string;
  awayTeam: string;
  awayScore: number;
  homeTeam: string;
  homeScore: number;
}

export enum GameType {
  League = 'league',
  Playoff = 'playoff',
}
