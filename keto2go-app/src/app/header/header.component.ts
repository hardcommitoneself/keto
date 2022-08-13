import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import { Product } from '../shared/Product.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faEgg } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;
  private userSub: Subscription;
  products: Observable<{ products: Product[] }>;
  private subscription: Subscription;
  produ= [] ;
  faCoffee = faCoffee;
  faEgg = faEgg;
  cartTotal = 0




  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
 
      this.products = this.store.select('productsList');
      console.log(this.products);

      this.subscription = this.store
      .select('productsList')
      .pipe(map(productsState => productsState.products))
      .subscribe((products: Product[]) => {
        this.produ = products;
        this.calcCartTotal();
      });

      this.calcCartTotal();


  }

  calcCartTotal() {
    this.cartTotal = 0
    this.produ.forEach(produ => {
      this.cartTotal += (produ.price * produ.amount)
    })
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.subscription.unsubscribe();
  }
}
