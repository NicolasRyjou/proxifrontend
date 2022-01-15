import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatisthisComponent } from './whatisthis.component';

describe('WhatisthisComponent', () => {
  let component: WhatisthisComponent;
  let fixture: ComponentFixture<WhatisthisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatisthisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatisthisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
