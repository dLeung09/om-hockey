import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AppRoutingModule } from './app-routing.module';
import { DemoModeInterceptor } from './interceptor/http.interceptor';

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
