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
const getLastInvoice = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('SELECT * FROM invoices ORDER BY invoice_number DESC LIMIT 1');
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
      'INSERT INTO invoice (uid, invoice, userId, cost, products, date, visible) VALUES ($1, $2, $3, $4, $5,CURRENT_TIMESTAMP, $6) RETURNING *',
      [uid(64), invoice, userId, cost, products, visible]
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

// Get monthly sales percentage change
const getMonthlySalesChange = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        EXTRACT(YEAR FROM date) AS year,
        EXTRACT(MONTH FROM date) AS month,
        (SUM(cost) - LAG(SUM(cost), 1) OVER (ORDER BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date))) / LAG(SUM(cost), 1) OVER (ORDER BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)) * 100 AS percentage_change
      FROM invoice
      GROUP BY year, month
      ORDER BY year, month;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error getting monthly sales change:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get yearly sales percentage change
const getYearlySalesChange = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        EXTRACT(YEAR FROM date) AS year,
        (SUM(cost) - LAG(SUM(cost), 1) OVER (ORDER BY EXTRACT(YEAR FROM date))) / LAG(SUM(cost), 1) OVER (ORDER BY EXTRACT(YEAR FROM date)) * 100 AS percentage_change
      FROM invoice
      GROUP BY year
      ORDER BY year;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error getting yearly sales change:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get daily sales percentage change
const getDailySalesChange = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        date::date AS day,
        (SUM(cost) - LAG(SUM(cost), 1) OVER (ORDER BY date::date)) / LAG(SUM(cost), 1) OVER (ORDER BY date::date) * 100 AS percentage_change
      FROM invoice
      GROUP BY day
      ORDER BY day;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error getting daily sales change:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getProductSalesStats = async (uid) => {
  // const { uid } = req.params; // Assuming product UID is passed as a URL parameter
  
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Query to retrieve the number of units and total price sold for the product within the current year
    const result = await db.query(
      `SELECT 
        SUM(quantity) AS totalUnitsSold,
        SUM(cost) AS totalPriceSold
      FROM invoice
      WHERE uid = $1
      AND EXTRACT(YEAR FROM date) = $2`,
      [uid, currentYear]
    );

    // If no sales data found, return 404 error
    if (!result.rows[0]) {
      console.log({ error: 'No sales data found for the product in the current year' });
    }

    // Extract the total units sold and total price sold from the query result
    const { totalUnitsSold, totalPriceSold } = result.rows[0];

    // Return the sales statistics
    return( {
      uid,
      totalUnitsSold,
      totalPriceSold
    });
  } catch (error) {
    console.error('Error retrieving product sales statistics:', error);
    
  }
};




export{
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  softDeleteInvoice,
  deleteInvoice,
  getMonthlySalesChange,
  getYearlySalesChange,
  getDailySalesChange,
  getProductSalesStats,
  getLastInvoice
};
