import { formatCurrency } from './utils/money.js';
import {cart, removeFromCart, calculateCartQuantity} from '../data/cart.js' ;
import {products} from '../data/products.js' ;
updateCartQuantity()

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
    cartSummary += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
})
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

    


