import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEntidadesComponent } from './index-entidades.component';

describe('IndexEntidadesComponent', () => {
  let component: IndexEntidadesComponent;
  let fixture: ComponentFixture<IndexEntidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexEntidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
