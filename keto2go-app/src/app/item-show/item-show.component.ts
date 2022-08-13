import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import { LoggingService } from '../logging.service';


@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css']
})
export class ItemShowComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  cartItems : Recipe[]=[];


  cartTotal = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
    ) {}

  ngOnInit() {
    this.loggingService.printLog('Hello from itemShowComponent ngOnInit!');
        this.subscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

      this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}


