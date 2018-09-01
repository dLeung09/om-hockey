import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent} from './dashboard/dashboard.component';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { TeamsComponent } from './teams/teams.component';
import { RosterComponent } from './roster/roster.component';
import { StandingsComponent } from './standings/standings.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { GoalieStatsComponent } from './goalie-stats/goalie-stats.component';
import { CareerStatsComponent } from './career-stats/career-stats.component';
import { HotStreaksComponent } from './hot-streaks/hot-streaks.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { TeamLeadersComponent } from './team-leaders/team-leaders.component';
import { HeadToHeadComponent } from './head-to-head/head-to-head.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { ArenaMapsComponent } from './arena-maps/arena-maps.component';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'player-registration', component: PlayerRegistrationComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'game-status', component: GameStatusComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'roster', component: RosterComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'player-stats', component: PlayerStatsComponent },
    { path: 'goalie-stats', component: GoalieStatsComponent },
    { path: 'career-stats', component: CareerStatsComponent },
    { path: 'hot-streaks', component: HotStreaksComponent },
    { path: 'team-stats', component: TeamStatsComponent },
    { path: 'team-leaders', component: TeamLeadersComponent },
    { path: 'head-to-head', component: HeadToHeadComponent },
    { path: 'upcoming-events', component: UpcomingEventsComponent },
    { path: 'arena-maps', component: ArenaMapsComponent },
    { path: 'rules-regulations', component: RulesRegulationsComponent },
    { path: 'contact-info', component: ContactInfoComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
