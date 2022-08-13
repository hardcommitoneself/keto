import { Action } from '@ngrx/store';

import { Product } from '../../shared/Product.model';

export const ADD_PRODUCT = '[Products List] Add PRODUCT';
export const ADD_PRODUCTS = '[Products List] Add PRODUCTS';
export const UPDATE_PRODUCT = '[Products List] Update PRODUCT';
export const DELETE_PRODUCT = '[Products List] Delete TIngredient';
export const START_EDIT = '[Products List] Start Edit';
export const STOP_EDIT = '[Products List] Stop Edit';
export const UPDATE_CART_TOTAL = '[Products List] Update Cart Total'

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class AddProducts implements Action {
  readonly type = ADD_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: Product ) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class UpdateCartTotal implements Action {
  readonly type = UPDATE_CART_TOTAL ;


}

export type ProductsListActions =
  | AddProduct
  | AddProducts
  | UpdateProduct
  | DeleteProduct
  | StartEdit
  | StopEdit
  | UpdateCartTotal;
