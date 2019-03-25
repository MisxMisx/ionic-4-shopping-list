import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'new-list', loadChildren: './new-list/new-list.module#NewListPageModule' },
  { path: 'update-list/:id', loadChildren: './update-list/update-list.module#UpdateListPageModule' },
  { path: 'active-list', loadChildren: './active-list/active-list.module#ActiveListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
