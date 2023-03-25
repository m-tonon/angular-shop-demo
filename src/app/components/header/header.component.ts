import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  isAuthenticated = false;
  private userSub!: Subscription;
  
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    
    this.itemsQuantity = cart.items.
      map((item) => item.quantity).
      reduce((prev, curr) => prev + curr, 0);
  }

  constructor (
    private cartService: CartService,
    private authService: AuthService) {}
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onLogout() {
    this.authService.user.unsubscribe();
    this.isAuthenticated = false;
    console.log(this.authService.user);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
