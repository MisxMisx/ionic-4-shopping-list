import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../services/list.service';
import {List} from '../models/List.model';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-update-list',
    templateUrl: './update-list.page.html',
    styleUrls: ['./update-list.page.scss'],
})
export class UpdateListPage implements OnInit {

    list: List;
    editListForm: FormGroup;

    // itemCount = 1;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public formBuilder: FormBuilder,
        private listService: ListService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.list = this.listService.getListById(this.route.snapshot.paramMap.get('id'));
        this.initForm();
    }

    initForm() {
        this.editListForm = this.formBuilder.group({
            items: this.formBuilder.array([])
        });

        const itemsTemp = this.editListForm.get('items') as FormArray;
        // empty form array
        while (itemsTemp.length) {
            itemsTemp.removeAt(0);
        }

        this.list.items.forEach((value: any) => {
            const newItemControl = this.formBuilder.control('', Validators.required);
            newItemControl.setValue(value);
            const news = this.editListForm.controls.items as FormArray;
            news.push(newItemControl);
        });
        // this.itemCount = this.list.items.length;
    }

    getItems(): FormArray {
        return this.editListForm.get('items') as FormArray;
    }

    onAddItem() {
        // this.itemCount++;
        const newItemControl = this.formBuilder.control('', Validators.required);
        const news = this.editListForm.controls.items as FormArray;
        news.push(newItemControl);
    }

    onRemoveItem(control) {
        console.log(control.key);
        this.getItems().removeAt(control);
    }

    async onDeleteList(id: string) {
        const tempoTitle = this.listService.getListById(id).title;
        const alert = await this.alertController.create({
            header: 'Etes vous certain(e) ?',
            subHeader: 'Cette action supprimera la liste ' + tempoTitle,
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel'
                }, {
                    text: 'Ok',
                    handler: () => {
                        this.callDeleteList(id);
                    }
                }
            ]
        });
        await alert.present();
    }

    callDeleteList(id: string) {
        const tempoTitle = this.listService.getListById(id).title;
        this.listService.removeValue(id);
        this.listService.presentDeleteToast(tempoTitle);
        this.router.navigateByUrl('/home');
    }

    onSubmitForm() {
        const formValue = this.editListForm.value;
        const newValues = {
            id: this.list.id,
            title: this.list.title,
            items: formValue.items
        };
        this.listService.updateList(newValues);
        this.listService.presentSaveToast(this.list.title);
    }

}
