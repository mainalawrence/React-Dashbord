import db from '../Database/dbConfig.js'
import {uid} from 'uid'

const getCompanyDetails = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM company');
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const createCompany = async (req, res) => {
    const {  name,mobile,address,logo,email,bank,mobileMoney } = req.body;
    console.log(req.body);
    try {
      const result = await db.query(
        'INSERT INTO company (uid,name,mobile,address,logo,email,bank,mobileMoney ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
        [uid(32), name,mobile,address,logo,email,bank,mobileMoney ]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateCompany = async (req, res) => {
    const {  name,mobile,address,logo,email,bank,mobileMoney } = req.body;
    console.log(req.body);
    try {
      const result = await db.query(
        'UPDATE company SET name=$2,mobile=$3,address=$4,logo=$5,email=$6,bank=$7,mobileMoney=$8 WHERE uid=$1 RETURNING *',
        [uid(32), name,mobile,address,logo,email,bank,mobileMoney ]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export{
    updateCompany,
    createCompany,
    getCompanyDetails
  }