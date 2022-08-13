import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../../shared/ingredient.model';
import { Recipe } from '../../recipe.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  
}
