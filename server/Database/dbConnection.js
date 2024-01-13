import sqlConnection from '../Database/dbConfig.js';

try {
    await sqlConnection.connect();
    console.log('Database connected');
} catch (error) {
    console.error('Error connecting to the database:', error.message);
}

export default sqlConnection;
