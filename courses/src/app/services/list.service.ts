import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {List} from '../models/List.model';


import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ListService {

    listSubject = new Subject<List[]>();
    activeListSubject = new Subject<string>();
    activeList = '';

    public counterTest: number;


    data: any;

    public listes: List[] = [];

    constructor(private storage: Storage, public toastController: ToastController) {
    }

    createList(title: string, items: string[]) {

        const randomId = Math.random().toString(36).substr(2, 5);

        this.listes.push({
            'id': randomId,
            'title': title,
            'items': items
        });
        this.emitLists();
        this.setValue(randomId, this.getListById(randomId));

    }

    getLists() {

        // this.getValue('j5f5d');
        this.traverseKeys();
        // return this.listRecup;
        return this.listes;
    }

    getListById(id) {
        return this.listes.filter(liste => liste.id === id)[0];
    }

    getActiveList() {
        return this.activeList;
    }

    updateList(newValues) {
        const listIndex = this.listes.findIndex(list => list.id === newValues.id);
        this.listes[listIndex] = newValues;
    }

    emitLists() {
        this.listSubject.next(this.listes.slice());
        // this.listSubject.next(this.listRecup.slice());
    }

    emitActive() {
        this.activeListSubject.next(this.activeList);
    }

    changeActiveList(id: string) {
        this.activeList = id;
        this.emitActive();
        this.presentActiveToast(id);
    }

    clearActiveList() {
        this.activeList = '';
    }

    async presentActiveToast(id: string) {
        const title = this.getListById(id).title;
        const toast = await this.toastController.create({
            message: title + ' est maintenant active',
            duration: 2000,
            position: 'top',
            color: 'success',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

    async presentDeleteToast(title: string) {
        const toast = await this.toastController.create({
            message: title + ' a été supprimée',
            duration: 2000,
            position: 'top',
            color: 'success',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

    async presentSaveToast(title: string) {
        const toast = await this.toastController.create({
            message: title + ' a été sauvegardée',
            duration: 2000,
            position: 'top',
            color: 'success',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

    /////////////////////// storage ///////////////////


    traverseKeys() {
        this.counterTest = 0;
        this.listes = [];
        this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
            this.listes.push(value);
            this.emitLists();
        });
        this.emitLists();
    }

    // set a key/value
    setValue(key: string, value: any) {
        this.storage.set(key, value).then((response) => {
            console.log('set' + key + ' ', response);


        }).catch((error) => {
            console.log('set error for ' + key + ' ', error);
        });
    }

    getValue(key: string) {
        this.storage.get(key).then((val) => {
            console.log('get ' + key + ' ', val);
            this.listes.push(val);
            this.emitLists();
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    removeValue(key: string) {
        this.storage.remove(key);
        this.traverseKeys();
    }

}
