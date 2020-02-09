import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoServidorComponent } from './configuracao-servidor.component';

describe('ConfiguracaoServidorComponent', () => {
  let component: ConfiguracaoServidorComponent;
  let fixture: ComponentFixture<ConfiguracaoServidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoServidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
