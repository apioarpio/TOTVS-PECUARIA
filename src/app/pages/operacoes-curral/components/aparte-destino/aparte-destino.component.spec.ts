import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparteDestinoComponent } from './aparte-destino.component';

describe('AparteDestinoComponent', () => {
  let component: AparteDestinoComponent;
  let fixture: ComponentFixture<AparteDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparteDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparteDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
