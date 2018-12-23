import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent} from './component/dashboard/dashboard.component';
import { PlayerRegistrationComponent } from './component/player-registration/player-registration.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { GameStatusComponent } from './component/game-status/game-status.component';
import { TeamsComponent } from './component/teams/teams.component';
import { RosterComponent } from './component/roster/roster.component';
import { StandingsComponent } from './component/standings/standings.component';
import { PlayerStatsComponent } from './component/player-stats/player-stats.component';
import { GoalieStatsComponent } from './component/goalie-stats/goalie-stats.component';
import { CareerStatsComponent } from './component/career-stats/career-stats.component';
import { HotStreaksComponent } from './component/hot-streaks/hot-streaks.component';
import { TeamStatsComponent } from './component/team-stats/team-stats.component';
import { TeamLeadersComponent } from './component/team-leaders/team-leaders.component';
import { HeadToHeadComponent } from './component/head-to-head/head-to-head.component';
import { UpcomingEventsComponent } from './component/upcoming-events/upcoming-events.component';
import { ArenaMapsComponent } from './component/arena-maps/arena-maps.component';
import { RulesRegulationsComponent } from './component/rules-regulations/rules-regulations.component';
import { ContactInfoComponent } from './component/contact-info/contact-info.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'player-stats', component: PlayerStatsComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'teams', component: TeamsComponent },

    { path: 'player-registration', component: PlayerRegistrationComponent },
    { path: 'game-status', component: GameStatusComponent },
    { path: 'roster', component: RosterComponent },
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
