import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorQuantidadeAnimalComponent } from './indicador-quantidade-animal.component';

describe('IndicadorQuantidadeAnimalComponent', () => {
  let component: IndicadorQuantidadeAnimalComponent;
  let fixture: ComponentFixture<IndicadorQuantidadeAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorQuantidadeAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorQuantidadeAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
