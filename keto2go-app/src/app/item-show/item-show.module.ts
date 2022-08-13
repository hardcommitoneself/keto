import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemShowComponent } from './item-show.component'; 
import { ItemShowRoutingModule } from './item-show-routing.module';
import { ItemShowObComponent } from '../item-show/item-show-ob/item-show-ob.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';




@NgModule({
  declarations: [
    ItemShowComponent,
    ItemShowObComponent],
  
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: ItemShowComponent}]),
    SharedModule,
    ItemShowRoutingModule
  ],
  // providers: [LoggingService]
})
export class ItemShowModule {}
