import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseclaimComponent } from './raiseclaim.component';

describe('RaiseclaimComponent', () => {
  let component: RaiseclaimComponent;
  let fixture: ComponentFixture<RaiseclaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseclaimComponent]
    });
    fixture = TestBed.createComponent(RaiseclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
