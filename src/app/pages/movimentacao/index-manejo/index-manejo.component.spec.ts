import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexManejoComponent } from './index-manejo.component';

describe('IndexManejoComponent', () => {
  let component: IndexManejoComponent;
  let fixture: ComponentFixture<IndexManejoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexManejoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexManejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
