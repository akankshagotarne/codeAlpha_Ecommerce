fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
      container.innerHTML += `
        <div class="product-card">
          <img src="http://localhost:5000${p.images}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <p class="rating">⭐⭐⭐⭐☆ (4.2)</p>
          <p class="price">
    ₹${p.price}
    <span class="old-price">₹${p.price + 2000}</span>
  </p>
          <a href="product.html?id=${p._id}">
            <button>View</button>
          </a>
        </div>
      `;
      
    });

  })
  .catch(err => console.log(err));

const productDiv = document.createElement("div");
productDiv.classList.add("product-card");





// Logout
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
};

// ===== SEARCH FUNCTION =====

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  
  const searchValue = searchInput.value.toLowerCase();

  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {

    const name = product
      .querySelector("h3")
      .innerText
      .toLowerCase();

    if (name.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }

  });
});
