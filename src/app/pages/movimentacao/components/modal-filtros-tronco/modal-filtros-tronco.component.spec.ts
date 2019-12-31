import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltrosTroncoComponent } from './modal-filtros-tronco.component';

describe('ModalFiltrosTroncoComponent', () => {
  let component: ModalFiltrosTroncoComponent;
  let fixture: ComponentFixture<ModalFiltrosTroncoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltrosTroncoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltrosTroncoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
