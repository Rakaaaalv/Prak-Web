const productList = document.getElementById("product-list");
const modal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close");
const productForm = document.getElementById("product-form");
const modalTitle = document.getElementById("modal-title");
const saveBtn = document.getElementById("save-btn");
const addProductBtn = document.getElementById("add-product-btn");

// Load products
function loadProducts() {
  fetch("http://localhost:8000/products.php")
    .then((response) => response.json())
    .then((data) => {
      productList.innerHTML = "";
      data.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.nama_produk}</td>
          <td>${product.harga_produk}</td>
          <td>${product.jumlah_produk}</td>
          <td>
            <button onclick="editProduct(${product.id}, '${product.nama_produk}', ${product.harga_produk}, ${product.jumlah_produk})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Hapus</button>
          </td>
        `;
        productList.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
}

// Add or edit product
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("product-id").value;
  const nama_produk = document.getElementById("nama_produk").value;
  const harga_produk = document.getElementById("harga_produk").value;
  const jumlah_produk = document.getElementById("jumlah_produk").value;

  if (!nama_produk || !harga_produk || !jumlah_produk) {
    alert("Semua kolom harus diisi!");
    return;
  }

  const method = id ? "PUT" : "POST";
  const url = "http://localhost:8000/products.php";
  const body = {
    id,
    nama_produk,
    harga_produk: parseInt(harga_produk),
    jumlah_produk: parseInt(jumlah_produk),
  };

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      closeModal.click();
      loadProducts();
    })
    .catch((error) => console.error("Error saving product:", error));
});

// Delete product
function deleteProduct(id) {
  fetch("http://localhost:8000/products.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(() => loadProducts())
    .catch((error) => console.error("Error deleting product:", error));
}

// Edit product
function editProduct(id, nama_produk, harga_produk, jumlah_produk) {
  modalTitle.innerText = "Edit Produk";
  document.getElementById("product-id").value = id;
  document.getElementById("nama_produk").value = nama_produk;
  document.getElementById("harga_produk").value = harga_produk;
  document.getElementById("jumlah_produk").value = jumlah_produk;
  modal.style.display = "flex";
}

// Open modal for adding new product
addProductBtn.addEventListener("click", () => {
  modalTitle.innerText = "Tambah Produk";
  document.getElementById("product-form").reset();
  document.getElementById("product-id").value = "";
  modal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => (modal.style.display = "none"));

window.onload = loadProducts;
