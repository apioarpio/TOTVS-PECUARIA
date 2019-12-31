import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarSyncComponent } from './tool-bar-sync.component';

describe('ToolBarSyncComponent', () => {
  let component: ToolBarSyncComponent;
  let fixture: ComponentFixture<ToolBarSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
