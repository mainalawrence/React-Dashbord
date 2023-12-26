import db from '../Database/dbConfig.js'

// Get all users
const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE visible = 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific user by uid
const getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('SELECT * FROM users WHERE uid = $1 AND visible = 1', [uid]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { uid, name, password, email, phone, company, role, date, visible } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (uid, name, password, email, phone, company, role, date, visible) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [uid, name, password, email, phone, company, role, date, visible]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { name, password, email, phone, company, role, date, visible } = req.body;

  try {
    const result = await db.query(
      'UPDATE users SET name = $1, password = $2, email = $3, phone = $4, company = $5, role = $6, date = $7, visible = $8 WHERE uid = $9 RETURNING *',
      [name, password, email, phone, company, role, date, visible, uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Soft delete a user by setting visible to 0
const softDeleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query(
      'UPDATE users SET visible = 0 WHERE uid = $1 RETURNING *',
      [uid]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error soft deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Hard delete a user
const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await db.query('DELETE FROM users WHERE uid = $1 RETURNING *', [uid]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Change a user's role
const changeUsersRole = async (req, res) => {
    const { uid } = req.params;
    const { newRole } = req.body;
  
    try {
      const result = await db.query(
        'UPDATE users SET role = $1 WHERE uid = $2 RETURNING *',
        [newRole, uid]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error changing user role:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const saveAvatarFile = (file, uid) => {
    const avatarDir = path.join(__dirname, '../avatars');
  
    // Create 'avatars' directory if it doesn't exist
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir);
    }
  
    const extension = path.extname(file.originalname);
    const avatarFilename = `${uid}_avatar${extension}`;
    const avatarPath = path.join(avatarDir, avatarFilename);
  
    // Save the avatar file
    fs.writeFileSync(avatarPath, file.buffer);
  
    return avatarFilename;
  };
  
  // Function to delete avatar file
  const deleteAvatarFile = (avatarFilename) => {
    const avatarPath = path.join(__dirname, '../avatars', avatarFilename);
  
    // Delete the avatar file
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }
  };
  
  // ... Other functions ...
  
  // Create a new user with avatar
  const createUserWithAvatar = async (req, res) => {
    const { uid, name, password, email, phone, company, role, date, visible } = req.body;
    const avatarFile = req.file;
  
    try {
      // Save the avatar file and get the filename
      const avatarFilename = avatarFile ? saveAvatarFile(avatarFile, uid) : null;
  
      const result = await db.query(
        'INSERT INTO users (uid, name, password, email, phone, company, role, date, visible, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [uid, name, password, email, phone, company, role, date, visible, avatarFilename]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating user with avatar:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  // Update a user's avatar
const updateAvatar = async (req, res) => {
    const { uid } = req.params;
    const newAvatarFile = req.file;
  
    try {
      const result = await db.query('SELECT avatar FROM users WHERE uid = $1', [uid]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const currentAvatarFilename = result.rows[0].avatar;
  
      // Delete the current avatar file if it exists
      if (currentAvatarFilename) {
        deleteAvatarFile(currentAvatarFilename);
      }
  
      // Save the new avatar file and get the filename
      const newAvatarFilename = newAvatarFile ? saveAvatarFile(newAvatarFile, uid) : null;
  
      // Update the user's avatar in the database
      const updateResult = await db.query(
        'UPDATE users SET avatar = $1 WHERE uid = $2 RETURNING *',
        [newAvatarFilename, uid]
      );
  
      res.json(updateResult.rows[0]);
    } catch (error) {
      console.error('Error updating user avatar:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a user's avatar
  const deleteAvatar = async (req, res) => {
    const { uid } = req.params;
  
    try {
      const result = await db.query('SELECT avatar FROM users WHERE uid = $1', [uid]);
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const avatarFilename = result.rows[0].avatar;
  
      // Delete the current avatar file if it exists
      if (avatarFilename) {
        deleteAvatarFile(avatarFilename);
  
        // Update the user's avatar in the database
        const updateResult = await db.query(
          'UPDATE users SET avatar = NULL WHERE uid = $1 RETURNING *',
          [uid]
        );
  
        res.json(updateResult.rows[0]);
      } else {
        res.status(404).json({ error: 'User does not have an avatar' });
      }
    } catch (error) {
      console.error('Error deleting user avatar:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

export{
  getUsers,
  getUser,
  createUser,
  updateUser,
  softDeleteUser,
  deleteUser,
  changeUsersRole,
  createUserWithAvatar,
  updateAvatar,
  deleteAvatar,
};
