import { products } from "../data/product.js";

export function loadHomePage() {
   window.location.href = "../pages/homePage.html";
}

export function loadLoginPage() {
   window.location.href = "../pages/loginPage.html";
}

export function currUser() {
   return JSON.parse(localStorage.getItem('currUser'));
}

export function centConverter(priceCents) {
   return (priceCents/100).toFixed(2);
}

export function getProduct(productId) {
   let targetProduct;
   products.products.forEach(function(product) {
      if (product.id === productId) {
         targetProduct = product;
      }
   });
   return targetProduct;
}