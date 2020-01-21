import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecModalFormAnimalComponent } from './pec-modal-form-animal.component';

describe('PecModalFormAnimalComponent', () => {
  let component: PecModalFormAnimalComponent;
  let fixture: ComponentFixture<PecModalFormAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecModalFormAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecModalFormAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
