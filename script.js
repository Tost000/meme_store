const productPrice = document.getElementById("product-price");
const span = document.createElement("span");

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
    productPrice.textContent = product.price;
    span.textContent = "руб.";
    document.getElementById("counter-box").append(span);

    document.getElementById("add-to-cart-btn").onclick = () =>
      addToCart(product.name, +productPrice.textContent);
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
const plus = document.getElementById("counter");
const minus = document.getElementById("counter2");
const prise = document.getElementById("product-price");
const value = document.getElementById("value");
const gb256 = document.getElementById("256");
const gb512 = document.getElementById("512");

function increment() {
  let result = Number(value.textContent) + 1;
  value.textContent = result;
  if (gb512.classList.contains("active")) {
    var priseIphone =
      Number(prise.textContent) +
      JSON.parse(localStorage.getItem("currentProduct")).price +
      200;
  } else {
    var priseIphone =
      Number(prise.textContent) +
      JSON.parse(localStorage.getItem("currentProduct")).price;
  }
  prise.textContent = priseIphone;
}

function decrement() {
  let result = Number(value.textContent) - 1;
  value.textContent = result;
  if (value.innerText == 0) {
    increment();
  }
  if (gb512.classList.contains("active")) {
    var priseIphone =
      Number(prise.textContent) -
      JSON.parse(localStorage.getItem("currentProduct")).price -
      200;
  } else {
    var priseIphone =
      Number(prise.textContent) -
      JSON.parse(localStorage.getItem("currentProduct")).price;
  }
  prise.textContent = priseIphone;
}

function gb256Size() {
  gb512.classList.remove("active");
  gb256.classList.add("active");
  prise.textContent = JSON.parse(localStorage.getItem("currentProduct")).price;
  value.textContent = 1;
}

function gb512Size() {
  gb256.classList.remove("active");
  gb512.classList.add("active");
  prise.textContent =
    JSON.parse(localStorage.getItem("currentProduct")).price + 200;
  value.textContent = 1;
}

gb256.addEventListener("click", gb256Size);
gb512.addEventListener("click", gb512Size);
plus.addEventListener("click", increment);
minus.addEventListener("click", decrement);
