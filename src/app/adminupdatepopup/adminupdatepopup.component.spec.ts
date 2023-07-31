import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupdatepopupComponent } from './adminupdatepopup.component';

describe('AdminupdatepopupComponent', () => {
  let component: AdminupdatepopupComponent;
  let fixture: ComponentFixture<AdminupdatepopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminupdatepopupComponent]
    });
    fixture = TestBed.createComponent(AdminupdatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
