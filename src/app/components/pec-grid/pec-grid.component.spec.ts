import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecGridComponent } from './pec-grid.component';

describe('PecGridComponent', () => {
  let component: PecGridComponent;
  let fixture: ComponentFixture<PecGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
