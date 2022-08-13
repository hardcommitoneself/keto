import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsListComponent } from './products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [ProductsListComponent, ProductsEditComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProductsListComponent }]),
    SharedModule
  ],
  // providers: [LoggingService]
})
export class ProductsListModule {}
