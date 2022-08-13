import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Recipe } from '../../recipes/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as ProductsListActions from '../../products-list/store/products-list.actions';


@Component({
  selector: 'app-item-show-ob',
  templateUrl: './item-show-ob.component.html',
  styleUrls: ['./item-show-ob.component.css']
})
export class ItemShowObComponent implements OnInit {

  isCompraMode=true;
  @Input() recipe: Recipe;
  @Input() index: number;
            id: number;

            constructor(
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
            ) {}

  ngOnInit() {
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onAddToProductsList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ProductsListActions.AddProducts(this.recipe.products)
    );
  }
  onSwitchcompraMode(){
    this.isCompraMode= !this.isCompraMode;
  }

}

