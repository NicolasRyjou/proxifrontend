import { Injectable } from '@angular/core';
import {DOCUMENT, ɵgetDOM as getDOM} from '@angular/common';
import {Inject, ɵɵinject} from '@angular/core';

export function createTitle() {
  return new TitleService(ɵɵinject(DOCUMENT));
}

@Injectable({
  providedIn: 'root'
})
@Injectable({providedIn: 'root', useFactory: createTitle, deps: []})
export class TitleService {
  constructor(@Inject(DOCUMENT) private _doc: any) {}
  
  getTitle(): string {
    return this._doc.title;
  }

  setTitle(newTitle: string) {
    this._doc.title = newTitle+' - Proxi' || '';
  }
}
