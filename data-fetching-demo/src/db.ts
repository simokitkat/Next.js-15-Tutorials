// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3");
const db = new Database("app.db");

const createTable = () => {
  db.exec(`
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL, 
        price INTEGER NOT NULL, 
        description TEXT
        );
    `);
};

const seedProducts = () => {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM products");
  if (stmt.get()?.count === 0) {
    addProduct("Product 1", 500, "Description 1");
    addProduct("Product 2", 700, "Description 2");
    addProduct("Product 3", 1000, "Description 3");
  }
};

createTable();
seedProducts();

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const stmt = db.prepare("SELECT * FROM products");
  return stmt.all();
}

export async function getProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  return stmt.get(id);
}

export async function addProduct(
  title: string,
  price: number,
  description: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const stmt = db.prepare(
    "INSERT INTO products (title, price, description) VALUES (?, ?, ?)"
  );
  return stmt.run(title, price, description);
}

export async function updateProduct(
  id: number,
  title: string,
  price: number,
  description: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const stmt = db.prepare(
    "UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?"
  );
  return stmt.run(title, price, description, id);
}

export async function deleteProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  return stmt.run(id);
}
