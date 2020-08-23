import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEditComponent } from './PermissionEditComponent';

describe('PermissionEditComponent', () => {
  let component: PermissionEditComponent;
  let fixture: ComponentFixture<PermissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
