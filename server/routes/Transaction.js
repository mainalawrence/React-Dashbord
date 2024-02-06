import express from 'express';
const router = express.Router();
import {
getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  softDeleteInvoice,
  deleteInvoice,
  getProductSalesStats,
  getLastInvoice
}
from '../controllers/Transactions.js';

// Routes for invoices
router.get('/', getInvoices);
router.get('/last', getLastInvoice);
router.get('/:uid', getInvoice);
router.post('/', createInvoice);
router.put('/:uid', updateInvoice);
router.patch('/:uid', softDeleteInvoice);
router.delete('/del/:uid', deleteInvoice);
router.get('/stats/:uid',getProductSalesStats);

export default router;
