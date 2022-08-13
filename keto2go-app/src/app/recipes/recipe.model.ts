import { Ingredient } from '../shared/ingredient.model';
import { Product } from '../shared/Product.model';

export class Recipe {
  public name: string;
  public price: number;
  public amount: number;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public products: Product[];

  constructor(name: string, price: number, amount: number, desc: string, imagePath: string, ingredients: Ingredient[], products: Product[]) {
    this.name = name;
    this.price= price;
    this.amount= amount;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.products = products;
  }
}
