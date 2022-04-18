import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBackofficeComponent } from './users-backoffice.component';

describe('UsersBackofficeComponent', () => {
  let component: UsersBackofficeComponent;
  let fixture: ComponentFixture<UsersBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBackofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
