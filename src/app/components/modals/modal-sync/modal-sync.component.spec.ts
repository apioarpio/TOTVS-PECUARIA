import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSyncComponent } from './modal-sync.component';

describe('ModalSyncComponent', () => {
  let component: ModalSyncComponent;
  let fixture: ComponentFixture<ModalSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
