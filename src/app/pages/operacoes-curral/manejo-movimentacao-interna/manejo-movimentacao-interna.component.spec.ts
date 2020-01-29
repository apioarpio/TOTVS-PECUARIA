import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoMovimentacaoInternaComponent } from './manejo-movimentacao-interna.component';

describe('ManejoMovimentacaoInternaComponent', () => {
  let component: ManejoMovimentacaoInternaComponent;
  let fixture: ComponentFixture<ManejoMovimentacaoInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoMovimentacaoInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoMovimentacaoInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
