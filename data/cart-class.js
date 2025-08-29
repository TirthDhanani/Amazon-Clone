class Cart{
    cartItems;
    localStorageKey;
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;;
        this.loadFromStorage();
    }
    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) 
        if (!this.cartItems){
            this.cartItems = [{
            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2,
            deliveryOptionId: '1'
        },{
            productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
            }];
        }
    }
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    }
    addToCart(productId, quantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId){
            matchingItem = cartItem; 
        }})
        if (matchingItem) {
            matchingItem.quantity  +=  quantity || 1;
        } else {
            this.cartItems.push(
            {
                productId,
                quantity,
                deliveryOptionId: '1' // Default delivery option
            }
        );
        }
        this.saveToStorage()
    }
    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId){
                newCart.push(cartItem)
            }

        });
        this.cartItems = newCart;
        this.saveToStorage()
    }
    updateDeliveryOption(productId,deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem
            }
        })
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
    calculateCartQuantity(){
    let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        })
        this.saveToStorage()
        return cartQuantity
    }
    saveQuantity(productId){
        const quantity = document.querySelector(`.js-updated-quantity-${productId}`).value
        if (quantity <= 0 || quantity > 100){
            alert('Quantity entered is out of bounds')
            return
            
        }else{
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId){
                    cartItem.quantity = parseInt(quantity)
                }
            })
        }
    }

}


// Create instances for regular and business carts
const cart =  new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// Load carts from local storage
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);





