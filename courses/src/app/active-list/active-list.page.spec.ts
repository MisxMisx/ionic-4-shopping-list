import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveListPage } from './active-list.page';

describe('ActiveListPage', () => {
  let component: ActiveListPage;
  let fixture: ComponentFixture<ActiveListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
