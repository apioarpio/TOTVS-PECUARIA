import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAnimaisComponent } from './index-animais.component';

describe('IndexAnimaisComponent', () => {
  let component: IndexAnimaisComponent;
  let fixture: ComponentFixture<IndexAnimaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexAnimaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
