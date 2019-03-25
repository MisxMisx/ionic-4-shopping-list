import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListPage } from './new-list.page';

describe('NewListPage', () => {
  let component: NewListPage;
  let fixture: ComponentFixture<NewListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
