import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoSaidaComponent } from './manejo-saida.component';

describe('ManejoSaidaComponent', () => {
  let component: ManejoSaidaComponent;
  let fixture: ComponentFixture<ManejoSaidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejoSaidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejoSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
