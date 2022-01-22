import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service/title.service';

@Component({
  selector: 'app-whatisthis',
  templateUrl: './whatisthis.component.html',
  styleUrls: ['./whatisthis.component.css']
})
export class WhatisthisComponent implements OnInit {

  constructor(
    private router: Router,
    private title: TitleService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('About')

  }

  goContact(){
    this.router.navigate([`contact-us`])
  }

}
