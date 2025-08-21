import {calculateCartQuantity} from '../../data/cart.js';
export function renderCheckoutHeader() {
    const checkoutHeaderHTML = `
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-checkout-header-items-in-cart"
            href="amazon.html"></a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `
    
    const checkoutHeaderContainer = document.querySelector('.js-checkout-header');
    checkoutHeaderContainer.innerHTML = checkoutHeaderHTML;
    const checkoutHeaderItems = document.querySelector('.js-checkout-header-items-in-cart');
    const cartQuantity = calculateCartQuantity();
    // Update the checkout header items with the cart quantity
    checkoutHeaderItems.innerHTML = `${cartQuantity} items`;
}