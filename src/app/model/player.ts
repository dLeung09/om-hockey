import { Team } from './team';

export interface Player {
  id: number;
  name: string;
  team: string;
  //team: Team;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  penalties: number;
  pointsPerGame?: number;
  //gamesPlayedCareer?: number;
  //goalsCareer?: number;
  //assistsCareer?: number;
  //pointsCareer?: number;
  //penalteisCareer?: number;
  //active: boolean;
}
