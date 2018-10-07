import { Arena } from './arena';
import { Team } from './team';

export interface Game {
  id: number;
  date: Date;
  gameType: GameType;
  arena: Arena;
  awayTeam: Team;
  awayScore: number;
  homeTeam: Team;
  homeScore: number;
}

export enum GameType {
  League = 'league',
  Playoff = 'playoff',
}
