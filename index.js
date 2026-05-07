import process from "process";

const [, , comando, path, ...args] = process.argv;
const API_URL = "https://fakestoreapi.com";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("Lista:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("Producto:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function createProduct(title, price, category) {
  const product = {
    title,
    price,
    category,
  };
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("Creado:", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("Eliminado con éxito:", data);
  } catch (err) {
    console.error("Error al eliminar:", err.message);
  }
}

if (comando === "GET" && path) {
  if (path.includes("/")) {
    const [, id] = path.split("/");
    getProductById(id);
  } else {
    getProducts();
  }
} else if (comando === "POST" && path) {
  if (args.length < 3) {
    console.error(
      "Error: Tenes que pasar title, price y category (ej: POST products 'Remera' 1500 'ropa')",
    );
  } else {
    const [title, price, category] = args;
    createProduct(title, price, category);
  }
} else if (comando === "DELETE" && path) {
  if (!path.includes("/")) {
    console.error(
      "Error: Para DELETE tenes que pasar el path con ID (ej: products/1)",
    );
  } else {
    const [, id] = path.split("/");
    deleteProduct(id);
  }
} else {
  console.error(
    "Comando no reconocido. Uso: GET products | GET products/1 | POST products <title> <price> <category> | DELETE products/1",
  );
}
