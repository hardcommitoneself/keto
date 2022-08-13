import { Product } from '../../shared/Product.model';
import * as ProductsListActions from './products-list.actions';

export interface State {
  products: Product[];
  editedProduct: Product;
  editedProductIndex: number;
}

const initialState: State = {
  products: [],
  editedProduct: null,
  editedProductIndex: -1
};

export function productsListReducer(
  state: State = initialState,
  action: ProductsListActions.ProductsListActions
) {
  switch (action.type) {
    case ProductsListActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case ProductsListActions.ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload]
      };
    case ProductsListActions.UPDATE_PRODUCT:
      const product = state.products[state.editedProductIndex];
      const updatedProduct = {
        ...product,
        ...action.payload
      };
      const updatedProducts = [...state.products];
      updatedProducts[state.editedProductIndex] = updatedProduct;

      return {
        ...state,
        products: updatedProducts,
        editedProductIndex: -1,
        editedProduct: null
      };
    case ProductsListActions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((ig, igIndex) => {
          return igIndex !== state.editedProductIndex;
        }),
        editedProductIndex: -1,
        editedProduct: null
      };
    case ProductsListActions.START_EDIT:
      return {
        ...state,
        editedProductIndex: action.payload,
        editedProduct: { ...state.products[action.payload] }
      };
    case ProductsListActions.STOP_EDIT:
      return {
        ...state,
        editedProduct: null,
        editedProductIndex: -1
      };
    default:
      return state;
  }
}
