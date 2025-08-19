import { formatCurrency } from './utils/money.js';
import {cart, removeFromCart, calculateCartQuantity, updateDeliveryOption} from '../data/cart.js' ;
import {products} from '../data/products.js' ;
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
// Importing hello function from supersimpledev package.
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
// custom function for updating cart quantity.
updateCartQuantity()

hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days')
console.log(`Delivery date : ${deliveryDate.format('dddd, MMMM D')}`);
function renderOrderSummary(){
// Producing html for displaying items added in cart.
  let cartSummary = ''
  cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      let matchingProduct;
      products.forEach((product) => {
          if (product.id === productId) {
              matchingProduct = product;
          }
      });
      const {deliveryOptionId} = cartItem
      let deliveryOption;

      deliveryOptions.forEach((option) => {
          if (option.id === deliveryOptionId){
              deliveryOption = option;
          }
      });
      hello();
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
      
      cartSummary += `
          <div class="cart-item-container 
          js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate.format('dddd, MMMM D')}
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
                  <div class="product-quantity">
                    <span >
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary 
                    js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class = "quantity-input 
                    js-updated-quantity-${matchingProduct.id}" ">
                    <span class ="save-quantity-link link-primary
                    js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary
                    js-delete-link" data-product-id="${matchingProduct.id}"> 
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
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
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

  // custom updateCartQuantity function for displaying number of cart items.
  function updateCartQuantity(){
      const cartQuantity = calculateCartQuantity()
      document.querySelector('.js-items-in-cart')
          .innerHTML = `${cartQuantity} items`
      }

  // forEach and addEventListener is being used for making delete and update button on checkout page functional. 
  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
      link.addEventListener('click', () => {
          const  {productId}  = link.dataset
          removeFromCart(productId)

          const container = document.querySelector(`.js-cart-item-container-${productId}`)
          container.remove();
          updateCartQuantity();
      })
  })

  document.querySelectorAll('.js-update-link')
  .forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {
          const  {productId}  = deleteLink.dataset
          const container = document.querySelector(`.js-cart-item-container-${productId}`)
          container.classList.add('is-editing-quantity')
      })
  })

  function saveQuantity(productId){
      const quantity = document.querySelector(`.js-updated-quantity-${productId}`).value
      if (quantity <= 0 || quantity > 100){
          alert('Quantity entered is out of bounds')
          return
          
      }else{
          cart.forEach((cartItem) => {
              if (cartItem.productId === productId){
                  cartItem.quantity = parseInt(quantity)
              }
          })

          document.querySelector(`.js-quantity-label-${productId}`)
              .innerHTML = quantity
          updateCartQuantity()
          const container =document.querySelector(`.js-cart-item-container-${productId}`)
          container.classList.remove('is-editing-quantity');
      }} 
  document.querySelectorAll(".js-save-link")
  .forEach((link) => {
      const {productId} = link.dataset
      const quantityLabel = document.querySelector(`.js-updated-quantity-${productId}`)
      link.addEventListener('click', () => {
          saveQuantity(productId)
          })
      
      quantityLabel.addEventListener('keydown', (event) => {
      if (event.key === 'Enter'){
          saveQuantity(productId)
      }
      })
      })
  document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          // Get the productId and deliveryOptionId from the dataset
          const {productId, deliveryOptionId} = element.dataset
          console.log(`Product ID: ${productId}, Delivery Option ID: ${deliveryOptionId}`);
          // Update the delivery option for the product in the cart
          updateDeliveryOption(productId, deliveryOptionId)
          // Re-render the order summary to reflect the changes
          renderOrderSummary();
        })

      })}

      


