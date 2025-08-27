import { formatCurrency } from '../utils/money.js';
import {cart, removeFromCart, calculateCartQuantity, updateDeliveryOption, saveQuantity} from '../../data/cart.js' ;
import {products, getProduct} from '../../data/products.js' ;
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import { calculateDeliveryDate } from './deliveryOptions.js';
// Function to render the order summary
// This function will be called to display the items in the cart.
export function renderOrderSummary(){
  // custom function for updating cart quantity.
// Producing html for displaying items added in cart.
  let cartSummary = ''
  cart.forEach((cartItem) => {
      const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
      const {deliveryOptionId} = cartItem
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      const deliveryDate = calculateDeliveryDate(deliveryOption);
      
      cartSummary += `
          <div class="cart-item-container js-cart-item-container 
          js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span >Quantity: <span class="quantity-label  js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
                    <span class="update-quantity-link link-primary 
                    js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class = "quantity-input 
                    js-updated-quantity-${matchingProduct.id}" ">
                    <span class ="save-quantity-link link-primary
                    js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary
                    js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}"> 
                      Delete
                    </span>
                  </div>
                </div>
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`
  })
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId


      html += `
        
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    })
    return html;
  }
  document.querySelector('.js-order-summary')
  .innerHTML = cartSummary

  // forEach and addEventListener is being used for making delete and update button on checkout page functional. 
  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
      link.addEventListener('click', () => {
          const  {productId}  = link.dataset
          removeFromCart(productId)
          // Re-render the order summary to reflect the changes
          // This will remove the item from the cart display.
          // It will also update the cart quantity and payment summary.
          renderOrderSummary();
          // Update the cart quantity after removing an item
          renderCheckoutHeader();
          renderPaymentSummary();
      })
  })

  document.querySelectorAll('.js-update-link')
  .forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
          const  {productId}  = updateLink.dataset
          const container = document.querySelector(`.js-cart-item-container-${productId}`)
          container.classList.add('is-editing-quantity')
      })
  })

  document.querySelectorAll(".js-save-link")
  .forEach((link) => {
      const {productId} = link.dataset
      const quantityLabel = document.querySelector(`.js-updated-quantity-${productId}`)
      link.addEventListener('click', () => {
          saveQuantity(productId)
          renderOrderSummary()
          renderCheckoutHeader();
          renderPaymentSummary();
          })
      
      quantityLabel.addEventListener('keydown', (event) => {
      if (event.key === 'Enter'){
          saveQuantity(productId)
          renderOrderSummary()
          renderCheckoutHeader();
          renderPaymentSummary();
      }
      })
      })
  document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          // Get the productId and deliveryOptionId from the dataset
          const {productId, deliveryOptionId} = element.dataset
          // Update the delivery option for the product in the cart
          updateDeliveryOption(productId, deliveryOptionId)
          // Re-render the order summary to reflect the changes
          renderOrderSummary();
          renderPaymentSummary();
        })

      })}
