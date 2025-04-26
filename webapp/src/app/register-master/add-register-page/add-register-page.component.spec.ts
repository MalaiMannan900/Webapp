import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegisterPageComponent } from './add-register-page.component';

describe('AddRegisterPageComponent', () => {
  let component: AddRegisterPageComponent;
  let fixture: ComponentFixture<AddRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegisterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
