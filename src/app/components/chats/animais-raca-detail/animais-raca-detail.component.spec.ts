import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisRacaDetailComponent } from './animais-raca-detail.component';

describe('AnimaisRacaDetailComponent', () => {
  let component: AnimaisRacaDetailComponent;
  let fixture: ComponentFixture<AnimaisRacaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimaisRacaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisRacaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
