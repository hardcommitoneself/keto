import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Product } from '../shared/Product.model';
import { LoggingService } from '../logging.service';
import * as ProductsListActions from './store/products-list.actions';
import * as fromApp from '../store/app.reducer';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Observable<{ products: Product[] }>;
  produ: Product[]=[];
  private subscription: Subscription;
  cartTotal = 0
  showEdit=false;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  @Input() product!: Product;

  ngOnInit() {
    this.products = this.store.select('productsList');
    console.log(this.products);
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.loggingService.printLog('Hello from ProductsListComponent ngOnInit!');
    
    this.subscription = this.store
    .select('productsList')
    .pipe(map(productsState => productsState.products))
    .subscribe((products: Product[]) => {
      this.produ = products;
    });

    this.calcCartTotal();


  }

  calcCartTotal() {
    this.cartTotal = 0
    this.produ.forEach(produ => {
      this.cartTotal += (produ.price * produ.amount)
    })
  }


  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.showEdit=true;
    console.log(this.showEdit);
    this.store.dispatch(new ProductsListActions.StartEdit(index));

  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  onBuy() {


  }



}

