import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import {Router} from '@angular/router';
import {List} from '../models/List.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  lists: List[];
  listSubscription: Subscription;
  activeList: string;
  activeListSubscription: Subscription;

constructor(private listService: ListService, private router: Router) {}

  ngOnInit(): void {
  this.lists = this.listService.getLists();
    this.listSubscription = this.listService.listSubject.subscribe(
        (lists: List[]) => {
          this.lists = lists;
        }
    );
    this.listService.emitLists();
    this.activeList = this.listService.getActiveList();
    this.activeListSubscription = this.listService.activeListSubject.subscribe(
        (active: string) => {
          this.activeList = active;
        }
    );
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }

  goNew() {
   this.router.navigateByUrl('/new-list');
  }

  onViewList(id: string) {
    this.router.navigateByUrl('update-list/' + id);
  }

  onListeActive() {
    this.router.navigateByUrl('/active-list');
  }

  goActive(id: string, event: Event) {
    event.stopPropagation();
    this.listService.changeActiveList(id);
  }
}
