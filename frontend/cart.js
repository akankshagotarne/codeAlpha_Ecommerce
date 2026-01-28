const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const token = localStorage.getItem("token");

// auth check
if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// render cart
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='center'>Your cart is empty 🛒</p>";
    totalElement.innerText = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button class="remove-btn" onclick="removeItem(${index})">❌</button>
    `;

    cartContainer.appendChild(div);
    total += item.price;
  });

  totalElement.innerText = `₹${total}`;
}

renderCart();

// PLACE ORDER
async function placeOrder() {
  try {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const products = cart.map(item => ({
      productId: item._id,
      quantity: 1
    }));

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        products,
        totalAmount: cart.reduce((sum, i) => sum + i.price, 0)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Order failed");
    }

    alert("Order placed successfully ✅");
    localStorage.removeItem("cart");
    window.location.href = "orders.html";

  } catch (error) {
    console.error("ORDER ERROR:", error.message);
    alert(error.message);
  }
}

// remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// checkout button
document.getElementById("checkoutBtn").addEventListener("click", placeOrder);

// logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    alert("Logged out");
    window.location.href = "login.html";
  };
}
