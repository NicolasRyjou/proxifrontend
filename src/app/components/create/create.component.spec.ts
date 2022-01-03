import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateChatComponent;
  let fixture: ComponentFixture<CreateChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
