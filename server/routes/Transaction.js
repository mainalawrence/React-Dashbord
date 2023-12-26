import express from 'express';
const router = express.Router();
import {
getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  softDeleteInvoice,
  deleteInvoice,
}
from '../controllers/Transacrions.js';

// Routes for invoices
router.get('/', getInvoices);
router.get('/:uid', getInvoice);
router.post('/', createInvoice);
router.put('/:uid', updateInvoice);
router.patch('/:uid', softDeleteInvoice);
router.delete('/del/:uid', deleteInvoice);

export default router;
