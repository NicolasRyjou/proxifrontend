import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whatisthis',
  templateUrl: './whatisthis.component.html',
  styleUrls: ['./whatisthis.component.css']
})
export class WhatisthisComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goContact(){
    this.router.navigate([`contact-us`])
  }

}
