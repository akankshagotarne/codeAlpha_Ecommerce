const API_URL = "http://localhost:5000/api/products";

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Fetch products
async function loadProducts() {
  const res = await fetch(`${API_URL}/all`);
  const products = await res.json();

  productList.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} - ₹${p.price}`;
    productList.appendChild(li);
  });
}

// Add product
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });

  form.reset();
  loadProducts();
});

// Load on page start
loadProducts();
