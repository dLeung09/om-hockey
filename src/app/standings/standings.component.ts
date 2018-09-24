import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  private standingsUrl = "api/1/standings";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<any>(this.standingsUrl).subscribe( (response) => {
      console.log(response);
    });
  }

}
