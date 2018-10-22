import { Team } from './team';

export interface Player {
  id: number;
  name: string;
  team: Team;
  gamesPlayedSeason: number;
  goalsSeason: number;
  assistsSeason: number;
  pointsSeason: number;
  penaltiesSeason: number;
  gamesPlayedCareer?: number;
  goalsCareer?: number;
  assistsCareer?: number;
  pointsCareer?: number;
  penalteisCareer?: number;
  active: boolean;
}
