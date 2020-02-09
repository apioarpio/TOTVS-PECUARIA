import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesAnimalTroncoComponent } from './informacoes-animal-tronco.component';

describe('InformacoesAnimalTroncoComponent', () => {
  let component: InformacoesAnimalTroncoComponent;
  let fixture: ComponentFixture<InformacoesAnimalTroncoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesAnimalTroncoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesAnimalTroncoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
