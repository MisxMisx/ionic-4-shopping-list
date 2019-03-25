import { Component, OnInit } from '@angular/core';
import {ListService} from '../services/list.service';
import {List} from '../models/List.model';

@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.page.html',
  styleUrls: ['./active-list.page.scss'],
})
export class ActiveListPage implements OnInit {

  listActive: List;
  itemsCheck: Array<{id: number, name: string, checked: boolean}> = [];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listActive = this.listService.getListById(this.listService.activeList);
    let counter = 0;
    for (const item of this.listActive.items) {
      this.itemsCheck.push({id: counter, name: item, checked: false});
      counter++;
    }
  }

  onCheck(id: number) {
    this.itemsCheck.filter(item => item.id === id)[0].checked = true;
  }

  onUncheck(id: number) {
    this.itemsCheck.filter(item => item.id === id)[0].checked = false;
  }

}
