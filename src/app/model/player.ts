import { Team } from './team';

export interface Player {
  // Meta
  id: number;

  // Contact details
  name: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: Date;

  // Player details
  team: string;
  jersey?: string;
  center?: boolean;
  rightWing?: boolean;
  leftWing?: boolean;
  defence?: boolean;
  goalie?: boolean;

  // Player stats
  gamesPlayed?: number;
  goals?: number;
  assists?: number;
  points?: number;
  penalties?: number;
  pointsPerGame?: number;
}
