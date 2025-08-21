import {calculateCartQuantity, cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption }  from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
        deliveryPriceCents += deliveryOption.priceCents
    })
    console.log('Total price in cents:', productPriceCents);
    console.log('Total delivery price in cents:', deliveryPriceCents);
    const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;
    const taxRate = 0.1;
    const taxCents = Math.round(totalBeforeTaxCents * taxRate);
    const totalPriceCents = totalBeforeTaxCents + taxCents;

    const payemntSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div class= "js-totalitems-in-cart">:</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`

  
    const paymentSummaryContainer = document.querySelector('.js-payment-summary');
    paymentSummaryContainer.innerHTML = payemntSummaryHTML;
    const itemsInCart = document.querySelector('.js-totalitems-in-cart');
    const cartQuantity = calculateCartQuantity();
    itemsInCart.innerHTML = `Items (${cartQuantity}):`;

}