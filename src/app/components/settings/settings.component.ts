import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/structures/user-d-struc';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: UserClass

  constructor() { }

  ngOnInit(): void {
  }



}
