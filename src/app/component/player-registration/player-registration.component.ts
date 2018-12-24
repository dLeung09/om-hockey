import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Player } from '../../model/player';

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent implements OnInit {

  public contactDetailsFormGroup: FormGroup;
  public playerDetailsFormGroup: FormGroup;

  public player: Player = { id: -1, name: '', team: '' };

  startDate = new Date(1980, 0, 1);

  constructor() { }

  ngOnInit() { }

  public submit(): void {
    // TODO
    console.log('[DAVID] submit()');
  }

}
