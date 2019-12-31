import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuPecuariaComponent } from './side-menu-pecuaria.component';

describe('SideMenuPecuariaComponent', () => {
  let component: SideMenuPecuariaComponent;
  let fixture: ComponentFixture<SideMenuPecuariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuPecuariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuPecuariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
