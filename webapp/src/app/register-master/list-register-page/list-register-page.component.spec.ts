import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegisterPageComponent } from './list-register-page.component';

describe('ListRegisterPageComponent', () => {
  let component: ListRegisterPageComponent;
  let fixture: ComponentFixture<ListRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegisterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
