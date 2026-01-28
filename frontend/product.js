const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productBox = document.getElementById("productDetails");

// FETCH PRODUCT
fetch(`http://localhost:5000/api/products/${id}`)
  .then(res => res.json())
  .then(p => {

    document.getElementById("productDetails").innerHTML = `
      <div class="product-page">

        <div class="product-image">
          <img src="http://localhost:5000${p.images}" alt="${p.name}">
        </div>

        <div class="product-info">
          <h2>${p.name}</h2>
          <p class="price">₹${p.price}</p>

          <button class="add-btn"
            onclick="addToCart('${p._id}', '${p.name}', ${p.price})">
            Add to Cart
          </button>
        </div>

      </div>
    `;
  });

  

// ADD TO CART
function addToCart(id, name, price) {
  if (!localStorage.getItem("token")) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ _id: id, name, price });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart 🛒");
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    alert("Logged out");
    window.location.href = "login.html";
  };
}
