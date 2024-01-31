import db from '../Database/dbConfig.js'
import {uid} from "uid";
import {getProductSalesStats} from "./Transactions.js";
// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product WHERE visible = 1');
    const items = result.rows;
    
    const newData = await Promise.all(items.map(async (item) => {
      const newItem = { ...item };
      newItem.stat = await getProductSalesStats(item.uid);
      return newItem;
    }));
    res.json(newData);
  } catch (error) {

    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific product by uid
const getProduct = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('SELECT * FROM product WHERE uid = $1 AND visible = 1', [uid]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, description, category, supply } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO product (uid, name, price, description, category, supply, visible) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uid(32), name, price, description, category, supply, 1]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { uid } = req.params;
  const { name, price, description, category, supply,  } = req.body;

  try {
    const result = await db.query(
      'UPDATE product SET name = $1, price = $2, description = $3, category = $4, supply = $5, visible = $6 WHERE uid = $7 RETURNING *',
      [name, price, description, category, supply, 1, uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Soft delete a product by setting visible to 0
const softDeleteProduct = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query(
      'UPDATE product SET visible = 0 WHERE uid = $1 RETURNING *',
      [uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error soft deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hard delete a product
const deleteProduct = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('DELETE FROM product WHERE uid = $1 RETURNING *', [uid]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res .status(500).json({ error: 'Internal Server Error' });
  }
};



export{
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  softDeleteProduct,
  deleteProduct,
};
