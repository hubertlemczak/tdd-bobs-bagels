const { Basket } = require('../src/basket.js');

describe('bobs bagels', () => {
  it('item added to basket', () => {
    const basket = new Basket();
    const expected = [
      {
        sku: 'BGSS',
        price: 4.99,
        name: 'Bagel Sandwich',
        variant: 'Sesame',
        fillings: ['Cream Cheese', 'Smoked Salmon'],
        quantity: 1,
        totalPrice: 4.99,
      },
    ];
    basket.addToBasket('BGSS').getBasketTotal();
    const result = basket.getBasket();
    expect(result).toEqual(expected);
  });
  it('item that already exists in basket added to basket', () => {
    const basket = new Basket();
    const expected = [
      {
        sku: 'BGSS',
        price: 4.99,
        name: 'Bagel Sandwich',
        variant: 'Sesame',
        fillings: ['Cream Cheese', 'Smoked Salmon'],
        quantity: 2,
        totalPrice: 9.98,
      },
    ];
    basket.addToBasket('BGSS').addToBasket('BGSS').getBasketTotal();
    const result = basket.getBasket();
    expect(result).toEqual(expected);
  });
  it('reduce item quantity from item in basket', () => {
    const basket = new Basket();
    const expected = [
      {
        sku: 'BGSS',
        price: 4.99,
        name: 'Bagel Sandwich',
        variant: 'Sesame',
        fillings: ['Cream Cheese', 'Smoked Salmon'],
        quantity: 1,
        totalPrice: 4.99,
      },
    ];
    basket.addToBasket('BGSS').addToBasket('BGSS').removeFromBasket('BGSS').getBasketTotal();
    const result = basket.getBasket();
    expect(result).toEqual(expected);
  });
  it('remove one item from basket', () => {
    const basket = new Basket();
    const expected = [
      {
        sku: 'BGLO',
        price: 0.49,
        name: 'Bagel',
        variant: 'Onion',
        quantity: 1,
        totalPrice: 0.49,
      },
      {
        sku: 'BGSS',
        price: 4.99,
        name: 'Bagel Sandwich',
        variant: 'Sesame',
        fillings: ['Cream Cheese', 'Smoked Salmon'],
        quantity: 2,
        totalPrice: 9.98,
      },
    ];
    basket
      .addToBasket('BGLO')
      .addToBasket('BGLP')
      .addToBasket('BGSS')
      .addToBasket('BGSS')
      .removeFromBasket('BGLP')
      .getBasketTotal();
    const result = basket.getBasket();
    expect(result).toEqual(expected);
  });
  it('remove item from basket that does not exist', () => {
    const basket = new Basket();
    const expected = 'This item is not in your basket';
    const result = basket.removeFromBasket('BGLP');
    expect(result).toEqual(expected);
  });
  it('total cost of basket', () => {
    const basket = new Basket();
    const expected = '£10.47';
    basket.addToBasket('BGLO').addToBasket('BGSS').addToBasket('BGSS');
    const result = basket.getBasketTotal();
    expect(result).toEqual(expected);
  });
  it('total cost of basket with plain bagel deal', () => {
    const basket = new Basket();
    const expected = '£5.55';
    basket
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP')
      .addToBasket('BGLP');
    const result = basket.getBasketTotal();
    expect(result).toEqual(expected);
  });
  it('total cost of basket with onion bagel deal', () => {
    const basket = new Basket();
    const expected = '£2.49';
    basket
      .addToBasket('BGLO')
      .addToBasket('BGLO')
      .addToBasket('BGLO')
      .addToBasket('BGLO')
      .addToBasket('BGLO')
      .addToBasket('BGLO');
    const result = basket.getBasketTotal();
    expect(result).toEqual(expected);
  });
  it('total cost of basket with everything bagel deal', () => {
    const basket = new Basket();
    const expected = '£2.49';
    basket
      .addToBasket('BGLE')
      .addToBasket('BGLE')
      .addToBasket('BGLE')
      .addToBasket('BGLE')
      .addToBasket('BGLE')
      .addToBasket('BGLE');
    const result = basket.getBasketTotal();
    expect(result).toEqual(expected);
  });
  it('total cost of basket with coffee and plain bagel deal', () => {
    const basket = new Basket();
    const expected = '£1.25';
    basket.addToBasket('BGLP').addToBasket('COF');
    const result = basket.getBasketTotal();
    expect(result).toEqual(expected);
  });
});
