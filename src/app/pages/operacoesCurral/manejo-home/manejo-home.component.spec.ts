import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoHomeComponent } from './manejo-home.component';

describe('ManejoHomeComponent', () => {
  let component: ManejoHomeComponent;
  let fixture: ComponentFixture<ManejoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
