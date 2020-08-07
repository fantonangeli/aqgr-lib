import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqgrLibComponent } from './aqgr-lib.component';

describe('AqgrLibComponent', () => {
  let component: AqgrLibComponent;
  let fixture: ComponentFixture<AqgrLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqgrLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqgrLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
