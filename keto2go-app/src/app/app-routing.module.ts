import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/item-show', pathMatch: 'full' },
  {  path: "recipes",
  loadChildren: () =>
    import("./recipes/recipes.module").then(m => m.RecipesModule)
 },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        m => m.ShoppingListModule
      )
  },
  {
    path: "products-list",
    loadChildren: () =>
      import("./products-list/products-list.module").then(
        m => m.ProductsListModule
      )
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
  path: "item-show",
  loadChildren: () =>
    import("./item-show/item-show.module").then(
      m => m.ItemShowModule
    )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
