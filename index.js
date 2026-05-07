import process from "process";

const [, , comando, recurso, ...args] = process.argv;
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
    price: Number(price),
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

if (comando === "GET" && recurso) {
  if (recurso.includes("/")) {
    const [, id] = recurso.split("/");
    getProductById(id);
  } else {
    getProducts();
  }
} else if (comando === "POST" && recurso) {
  if (args.length < 3) {
    console.error(
      "Error: Tenes que pasar title, price y category (ej: POST products 'Remera' 1500 'ropa')",
    );
  } else {
    const [title, price, category] = args;
    createProduct(title, price, category);
  }
} else if (comando === "DELETE" && recurso) {
  if (!recurso.includes("/")) {
    console.error(
      "Error: Para DELETE tenes que pasar el recurso con ID (ej: products/1)",
    );
  } else {
    const [, id] = recurso.split("/");
    deleteProduct(id);
  }
} else {
  console.error(
    "Comando no reconocido. Uso: GET products | GET products/1 | POST products <title> <price> <category> | DELETE products/1",
  );
}
