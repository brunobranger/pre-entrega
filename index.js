import process from "process";

const [, , comando, recurso, ...args] = process.argv;
const API_URL = "https://fakestoreapi.com";

function getProducts() {
  fetch(`${API_URL}/products`)
    .then((response) => response.json())
    .then((data) => console.log("Lista:", data))
    .catch((err) => console.error("Error:", err));
}

function getProductById(id) {
  fetch(`${API_URL}/products/${id}`)
    .then((response) => response.json())
    .then((data) => console.log("Producto:", data))
    .catch((err) => console.error("Error:", err));
}

function createProduct(title, price, category) {
  const product = {
    title,
    price: Number(price),
    category,
  };

  fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("Error:", err));
}

function deleteProduct(id) {
  fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log("Eliminado con éxito:", data))
    .catch((err) => console.error("Error al eliminar:", err));
}

if (comando === "GET" && recurso) {
  if (recurso.includes("/")) {
    const [, id] = recurso.split("/");
    getProductById(id);
  } else {
    getProducts();
  }
}

if (comando === "POST" && recurso) {
  if (args.length < 3) {
    console.error(
      "Error: Tenes que pasar title, price y category (ej: POST products 'Remera' 1500 'ropa')",
    );
  } else {
    const [title, price, category] = args;
    createProduct(title, price, category);
  }
}

if (comando === "DELETE" && recurso) {
  if (!recurso.includes("/")) {
    console.error(
      "Error: Para DELETE tenes que pasar el recurso con ID (ej: products/1)",
    );
  } else {
    const [, id] = recurso.split("/");
    deleteProduct(id);
  }
}
