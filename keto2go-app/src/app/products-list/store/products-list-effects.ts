import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../shared/Product.model';


@Injectable()
export class productsEffects {

  produ: Product[]=[];
  private subscription: Subscription;
  cartTotal = 0
  
  UpdateCartTotal(){

    this.cartTotal = 0
    this.produ.forEach(produ => {
      this.cartTotal += (produ.price * produ.amount)
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }
}