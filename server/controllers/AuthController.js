import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../Database/dbConfig.js'
import { uid } from 'uid';

// Secret key for JWT (should be stored securely, not hard-coded)
const JWT_SECRET_KEY = 'your_secret_key';

// Register a new user
const register = async (req, res) => {
    const { name, password, email, phone, company, role, date, visible } = req.body;


  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const result = await db.query(
      'INSERT INTO users (uid, name, password, email, phone, company, role, date, visible) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8) RETURNING *',
      [uid(16), name, hashedPassword, email, phone, company, role, visible]

    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET_KEY, {
      expiresIn: '4h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login and generate JWT token
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET_KEY, {
      expiresIn: '4h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  register,
  login,
};
