import db from '../Database/dbConfig.js'

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
  const { uid, name, email, phone, company, role, visible, date } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO customer (uid, name, email, phone, company, role, visible, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [uid, name, email, phone, company, role, visible, date]
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
      'UPDATE customer SET name = $1, email = $2, phone = $3, company = $4, role = $5, visible = $6, date = $7 WHERE uid = $8 RETURNING *',
      [name, email, phone, company, role, visible, date, uid]
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

export{
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
  deleteCustomer,
};
