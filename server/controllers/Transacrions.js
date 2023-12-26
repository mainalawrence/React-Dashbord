import db from '../Database/dbConfig.js'

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM invoice WHERE visible = 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting invoices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific invoice by uid
const getInvoice = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('SELECT * FROM invoice WHERE uid = $1 AND visible = 1', [uid]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error getting invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new invoice
const createInvoice = async (req, res) => {
  const { uid, invoice, userId, cost, products, date, visible } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO invoice (uid, invoice, userId, cost, products, date, visible) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uid, invoice, userId, cost, products, date, visible]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an invoice
const updateInvoice = async (req, res) => {
  const { uid } = req.params;
  const { invoice, userId, cost, products, date, visible } = req.body;

  try {
    const result = await db.query(
      'UPDATE invoice SET invoice = $1, userId = $2, cost = $3, products = $4, date = $5, visible = $6 WHERE uid = $7 RETURNING *',
      [invoice, userId, cost, products, date, visible, uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Soft delete an invoice by setting visible to 0
const softDeleteInvoice = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query(
      'UPDATE invoice SET visible = 0 WHERE uid = $1 RETURNING *',
      [uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error soft deleting invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hard delete an invoice
const deleteInvoice = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('DELETE FROM invoice WHERE uid = $1 RETURNING *', [uid]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.json({ message: 'Invoice deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export{
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  softDeleteInvoice,
  deleteInvoice,
};
