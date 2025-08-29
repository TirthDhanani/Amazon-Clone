import {renderOrderSummary} from '../scripts/checkout/orderSummary.js';
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import '../data/cart-class.js';
renderCheckoutHeader()
renderOrderSummary();    
renderPaymentSummary();

