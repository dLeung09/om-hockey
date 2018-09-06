import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { Game } from '../game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  upcomingGames: Game[] = [];
  recentGames: Game[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getUpcomingGames();
    this.getRecentGames();
  }

  getUpcomingGames(): void {
    this.scheduleService.getGames(-1)
    .subscribe(games => this.upcomingGames = games.filter( function(game) {

      //TODO: Test this code on real-ish data
      //let today = new Date();
      //return game.date >= today && game.date < new Date(today.getDate() + 3);

      //TODO: Remove this
      return game.id > 55;
    }));
  }

  getRecentGames(): void {
    this.scheduleService.getGames(-1)
    .subscribe(games => this.recentGames = games.filter( function(game) {

      //TODO: Test this code on real-ish data
      //let today = new Date();
      //return game.date >= today && game.date < new Date(today.getDate() + 3);

      //TODO: Remove this
      return game.id <= 5;
    }));
  }

}
