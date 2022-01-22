import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title-service/title.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Contact us')
  }

}
