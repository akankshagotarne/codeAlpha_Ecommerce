// protect page
if (!localStorage.getItem("token")) {
  alert("Please login first");
  window.location.href = "login.html";
}

fetch("http://localhost:5000/api/orders/my-orders", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
})
  .then(res => res.json())
  .then(orders => {
    const container = document.getElementById("orders");

    if (!orders || orders.length === 0) {
      container.innerHTML = `<p class="empty">No orders found</p>`;
      return;
    }

    orders.forEach(order => {
      let productsHTML = "";

      order.products.forEach(item => {
        productsHTML += `
          <div class="product-item">
            <span>${item.productId.name}</span>
            <span>₹${item.productId.price} × ${item.quantity}</span>
          </div>
        `;
      });

      container.innerHTML += `
        <div class="order-card">
          <div class="order-header">
            <span>Order Date: ${new Date(order.createdAt).toLocaleDateString()}</span>
            <span>Status: ${order.status || "Placed"}</span>
          </div>

          <div class="order-products">
            ${productsHTML}
          </div>

          <div class="total">
            Total: ₹${order.totalAmount}
          </div>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("orders").innerHTML =
      "<p class='empty'>Failed to load orders</p>";
  });
