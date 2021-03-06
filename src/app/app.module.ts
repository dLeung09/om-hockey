import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
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

import { AppRoutingModule } from './app-routing.module';
import { DemoModeInterceptor } from './demo/interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayerRegistrationComponent,
    ScheduleComponent,
    GameStatusComponent,
    TeamsComponent,
    RosterComponent,
    StandingsComponent,
    PlayerStatsComponent,
    GoalieStatsComponent,
    CareerStatsComponent,
    HotStreaksComponent,
    TeamStatsComponent,
    TeamLeadersComponent,
    HeadToHeadComponent,
    UpcomingEventsComponent,
    ArenaMapsComponent,
    RulesRegulationsComponent,
    ContactInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DemoModeInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
