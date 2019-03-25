import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListPage } from './update-list.page';

describe('UpdateListPage', () => {
  let component: UpdateListPage;
  let fixture: ComponentFixture<UpdateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
