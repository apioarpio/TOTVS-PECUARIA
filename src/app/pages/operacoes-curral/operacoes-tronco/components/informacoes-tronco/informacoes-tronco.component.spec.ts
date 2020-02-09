import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesTroncoComponent } from './informacoes-tronco.component';

describe('InformacoesTroncoComponent', () => {
  let component: InformacoesTroncoComponent;
  let fixture: ComponentFixture<InformacoesTroncoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesTroncoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesTroncoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
