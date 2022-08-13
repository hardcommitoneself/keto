import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../../shared/Product.model';
import * as ProductsListActions from '../store/products-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Product;

  produ: Product[]=[];
  cartTotal = 0

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('productsList')
      .subscribe(stateData => {
        if (stateData.editedProductIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedProduct;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            price: this.editedItem.price
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.calcCartTotal();
    const newProduct = new Product(value.name, value.amount, value.price, value.id);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ProductsListActions.UpdateProduct(newProduct)

      );
      this.store.dispatch(
        new ProductsListActions.UpdateCartTotal()

      );
    } else {
      // this.slService.addIngredient(newIngredient);
     /// this.store.dispatch(new ProductsListActions.AddProduct(newProduct));
    }
    this.editMode = false;
    form.reset();
  }


  calcCartTotal() {
    this.cartTotal = 0
    this.produ.forEach(produ => {
      this.cartTotal += (produ.price * produ.amount)
    })
  }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ProductsListActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ProductsListActions.DeleteProduct());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ProductsListActions.StopEdit());
  }
}
