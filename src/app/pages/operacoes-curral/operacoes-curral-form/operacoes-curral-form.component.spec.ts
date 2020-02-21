import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesCurralFormComponent } from './operacoes-curral-form.component';

describe('OperacoesCurralFormComponent', () => {
  let component: OperacoesCurralFormComponent;
  let fixture: ComponentFixture<OperacoesCurralFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesCurralFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesCurralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
