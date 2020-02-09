import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoFazendaComponent } from './selecao-fazenda.component';

describe('SelecaoFazendaComponent', () => {
  let component: SelecaoFazendaComponent;
  let fixture: ComponentFixture<SelecaoFazendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoFazendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoFazendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
