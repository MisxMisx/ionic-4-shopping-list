import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ListService} from '../services/list.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.page.html',
  styleUrls: ['./new-list.page.scss'],
})
export class NewListPage implements OnInit {

  newList: FormGroup;
  itemCount = 1;

  constructor(private router: Router,
              public formBuilder: FormBuilder,
              private listService: ListService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newList = this.formBuilder.group({
      title: ['', Validators.required],
      items: this.formBuilder.array([])
    });
  }

  getItems(): FormArray {
    return this.newList.get('items') as FormArray;
  }

  onAddItem() {
    this.itemCount++;
    const newItemControl = this.formBuilder.control('', Validators.required);
    const news = this.newList.controls.items as FormArray;
    news.push(newItemControl);
  }

  onRemoveItem(control) {
    this.getItems().removeAt(control.key);
  }

  onSubmitForm() {
    const formValue = this.newList.value;
    this.listService.createList(formValue['title'], formValue['items'] ? formValue['items'] : []);
    this.router.navigateByUrl('/home');
  }

}
