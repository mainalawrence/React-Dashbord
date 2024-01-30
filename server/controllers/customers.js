import db from '../Database/dbConfig.js'
import {uid} from 'uid'
// Get all customers
const getCustomers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM customer WHERE visible = 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific customer by uid
const getCustomer = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('SELECT * FROM customer WHERE uid = $1 AND visible = 1', [uid]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error getting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new customer
 const createCustomer = async (req, res) => {
  const { name, email, phone,phoneNumber, company, role } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      'INSERT INTO customer (uid, name, email, phone, company, role, visible) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uid(32), name, email, phoneNumber, company, role, 1]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  const { uid } = req.params;
  const { name, email, phone, company, role, visible, date } = req.body;

  try {
    const result = await db.query(
      'UPDATE customer SET name = $1, email = $2, phone = $3, company = $4, role = $5, visible = $6 WHERE uid = $7 RETURNING *',
      [name, email, phone, company, role, visible, uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Soft delete a customer by setting visible to 0
const softDeleteCustomer = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query(
      'UPDATE customer SET visible = 0 WHERE uid = $1 RETURNING *',
      [uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error soft deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hard delete a customer
 const deleteCustomer = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('DELETE FROM customer WHERE uid = $1 RETURNING *', [uid]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json({ message: 'Customer deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const totalCustomers = async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) FROM customer');

    // The count will be in result.rows[0].count
    const totalCount = result.rows[0].count;
    res.json({ totalCustomers: totalCount });
  } catch (error) {
    console.error('Error fetching total customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export{
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
  deleteCustomer,
  totalCustomers,
};
