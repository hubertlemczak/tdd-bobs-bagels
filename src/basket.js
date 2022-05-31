const inventory = [
  {
    sku: 'BGLO',
    price: 0.49,
    name: 'Bagel',
    variant: 'Onion',
  },
  {
    sku: 'BGLP',
    price: 0.39,
    name: 'Bagel',
    variant: 'Plain',
  },
  {
    sku: 'BGLE',
    price: 0.49,
    name: 'Bagel',
    variant: 'Everything',
  },
  {
    sku: 'BGLS',
    price: 0.49,
    name: 'Bagel',
    variant: 'Sesame',
  },
  {
    sku: 'COF',
    price: 0.99,
    name: 'Coffee',
    variant: '',
  },
  {
    sku: 'BGSE',
    price: 2.99,
    name: 'Bagel Sandwich',
    variant: 'Everything',
    fillings: ['Bacon', 'Egg', 'Cheese'],
  },
  {
    sku: 'BGSS',
    price: 4.99,
    name: 'Bagel Sandwich',
    variant: 'Sesame',
    fillings: ['Cream Cheese', 'Smoked Salmon'],
  },
];

class Basket {
  constructor() {
    this.basket = [];
  }
  addToBasket(sku) {
    if (!this.basket.includes(inventory.find((x) => x.sku === sku))) {
      this.basket.push(inventory.find((x) => x.sku === sku));
      inventory.find((x) => x.sku === sku).quantity = 1;
    } else inventory.find((x) => x.sku === sku).quantity++;
    return this;
  }
  getBasket() {
    return this.basket;
  }
  removeFromBasket(sku) {
    if (this.basket.includes(this.basket.find((x) => x.sku === sku))) {
      if (this.basket.find((x) => x.sku === sku).quantity === 1) {
        const removeIndex = this.basket.findIndex((x) => x.sku === sku);
        this.basket.splice(removeIndex, removeIndex);
      } else this.basket.find((x) => x.sku === sku).quantity--;
    } else return 'This item is not in your basket';

    return this;
  }
  getBasketTotal() {
    let total = 0;
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].sku === 'BGLO' || this.basket[i].sku === 'BGLE') {
        const dealPrice = Math.floor(this.basket[i].quantity / 6) * 2.49;
        const dealRemainder = (this.basket[i].quantity % 6) * this.basket[i].price;
        total += dealPrice + dealRemainder;
      } else if (this.basket[i].sku === 'BGLP') {
        const dealPrice = Math.floor(this.basket[i].quantity / 12) * 3.99;
        const dealRemainder = (this.basket[i].quantity % 12) * this.basket[i].price;
        total += dealPrice + dealRemainder;
      } else {
        total += this.basket[i].price * this.basket[i].quantity;
      }
    }
    return `£${total.toFixed(2)}`;
  }
}
// class Manager extends Basket {
//   constructor() {
//     super();
//   }
//   changeBasketLimit(limit) {
//     this.basketLimit = limit;
//     console.log(this.basketLimit);
//   }
// }

// const manager = new Manager();
// const basket = new Basket();
// basket.addToBasket('BGLO').addToBasket('BGSS').addToBasket('BGSS');
// // .removeFromBasket('BGLP');
// console.log('basket', basket.getBasket());
// console.log(basket.getBasketTotal());
//I'd like to know when my basket is full when I try adding an item beyond my basket capacity. sum quantity

module.exports = { Basket };
