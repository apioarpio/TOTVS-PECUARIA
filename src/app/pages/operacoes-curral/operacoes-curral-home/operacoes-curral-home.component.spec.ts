import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesCurralHomeComponent } from './operacoes-curral-home.component';

describe('OperacoesCurralHomeComponent', () => {
  let component: OperacoesCurralHomeComponent;
  let fixture: ComponentFixture<OperacoesCurralHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesCurralHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesCurralHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
