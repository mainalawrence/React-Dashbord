import sqlConnection from '../Database/dbConfig.js';

try {
    const res = sqlConnection.connect((res) => {
        console.log(`database connected `);
    })
} catch (error) {
    console.log("Error :" + error.message);
}

export default sqlConnection;