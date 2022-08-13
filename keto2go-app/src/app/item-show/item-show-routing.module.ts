import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemShowComponent } from './item-show.component';
import { AuthGuard } from '../auth/auth.guard';
import { ItemShowObComponent } from './item-show-ob/item-show-ob.component';

const routes: Routes = [
  {
    path: '',
    component: ItemShowComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ItemShowObComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemShowRoutingModule {}
