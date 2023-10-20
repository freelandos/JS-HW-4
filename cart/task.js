const products = document.querySelector('.products');
const productsList = document.querySelectorAll('.product');
const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');
let cartData;

loadCartFromLocalStorage();

productsList.forEach((product) => {
  const productId = product.dataset.id;
  const productImage = product.querySelector('.product__image');
  const productQuantity = product.querySelector('.product__quantity-value');
  
  const decButton = product.querySelector('.product__quantity-control_dec');
  const incButton = product.querySelector('.product__quantity-control_inc');
  const addToCartButton = product.querySelector('.product__add');
  
  decButton.addEventListener('click', () => {
    if (productQuantity.textContent > 1) {
      productQuantity.textContent--;
    }
  })

  incButton.addEventListener('click', () => {
    productQuantity.textContent++;
  })

  addToCartButton.addEventListener('click', () => {
    const existingCartProduct = cartProducts.querySelector(`[data-id="${productId}"]`);

    if (existingCartProduct) {
      const cartProductImage = existingCartProduct.querySelector('.cart__product-image');
      const cartProductQuantity = existingCartProduct.querySelector('.cart__product-count');
      cartProductQuantity.textContent = Number(cartProductQuantity.textContent) + Number(productQuantity.textContent);
      productQuantity.textContent = 1;
      
      const productImageRect = productImage.getBoundingClientRect();
      const cartProductImageRect = cartProductImage.getBoundingClientRect();
      let productTop = Math.round(productImageRect.top);
      let productLeft = Math.round(productImageRect.left);
      const cartProductTop = Math.round(cartProductImageRect.top);
      const cartProductLeft = Math.round(cartProductImageRect.left);

      const deltaTop = cartProductTop - productTop;
      const deltaLeft = cartProductLeft - productLeft;
      const step = 100;

      const productImageCopy = productImage.cloneNode(true);
      productImageCopy.classList.add('product__image-copy');
      productImageCopy.style.top = productTop + 'px';
      productImageCopy.style.left = productLeft + 'px';
      productImage.insertAdjacentElement('afterend', productImageCopy);

      const timerId = setInterval(() => {
        productTop = +(productTop + deltaTop / step).toFixed(2);
        productLeft = +(productLeft + deltaLeft / step).toFixed(2);
          
        if (productTop === cartProductTop) {
          clearInterval(timerId);
          productImageCopy.remove();
          
          cartData[productId].quantity = cartProductQuantity.textContent;
          localStorage.setItem('cart', JSON.stringify(cartData));
        }

        productImageCopy.style.top = productTop + 'px';
        productImageCopy.style.left = productLeft + 'px';
      }, 1);
    } else {
      const prodImage = productImage.src;
      const prodQuantity = productQuantity.textContent;
      productQuantity.textContent = 1;

      addProductToCart(productId, prodImage, prodQuantity);
      updateCartVisibility();
      
      cartData[productId] = {
        image: prodImage,
        quantity: prodQuantity
      }
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
    
  })
})

cartProducts.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart__product-remove')) {
    const cartProduct = event.target.closest('.cart__product');
    const cartProductId = cartProduct.dataset.id;

    cartProduct.remove();
    updateCartVisibility();

    delete cartData[cartProductId];
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
})

function updateCartVisibility() {
  cart.classList.toggle('hidden', cartProducts.children.length === 0);
}

function loadCartFromLocalStorage() {
  cartData = JSON.parse(localStorage.getItem('cart')) || {};

  for (const productId in cartData) {
    const productImage = cartData[productId].image;
    const productQuantity = cartData[productId].quantity;
    
    addProductToCart(productId, productImage, productQuantity);
  }

  updateCartVisibility();
}

function addProductToCart(id, image, quantity) {
  const ProductHTML = `
    <div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${image}">
      <div class="cart__product-count">${quantity}</div>
      <div class="cart__product-remove">Удалить</div>
    </div>
  `;
  cartProducts.insertAdjacentHTML('beforeend', ProductHTML);
}