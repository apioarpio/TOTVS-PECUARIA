import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoContextoComponent } from './selecao-contexto.component';

describe('SelecaoContextoComponent', () => {
  let component: SelecaoContextoComponent;
  let fixture: ComponentFixture<SelecaoContextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoContextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoContextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
