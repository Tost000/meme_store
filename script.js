function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name: productName, price: productPrice });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(productName + " добавлен в корзину!");
}

function viewProduct(name, image, price) {
  localStorage.setItem(
    "currentProduct",
    JSON.stringify({ name, image, price })
  );
  window.location.href = "product.html";
}

function loadProduct() {
  let product = JSON.parse(localStorage.getItem("currentProduct"));
  if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-price").textContent =
      product.price + " руб.";
    document.getElementById("add-to-cart-btn").onclick = () =>
      addToCart(product.name, product.price);
  }
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let totalPriceDiv = document.getElementById("total-price");
  cartItemsDiv.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    let itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - ${item.price} руб.`;
    cartItemsDiv.appendChild(itemDiv);
    totalPrice += item.price;
  });

  totalPriceDiv.textContent = `Общая стоимость: ${totalPrice} руб.`;
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}

// Load product details if on the product page
if (window.location.pathname.endsWith("product.html")) {
  window.onload = loadProduct;
}

// Load cart details if on the cart page
if (window.location.pathname.endsWith("cart.html")) {
  window.onload = loadCart;
}
