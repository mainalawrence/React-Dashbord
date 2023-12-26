// databaseManagement.js

import cron from 'node-cron';
import { exec } from 'child_process';
import databaseConfig from '../Database/dbConfig.js';

export const dbBackup=()=>{
// Schedule the backup task to run every day at midnight (0:00)
cron.schedule('0 0 * * *', () => {
    backupDatabase();
  });
// cron.schedule('50 * * * * *', () => {
//     console.log('Running the task every second!');
//     backupDatabase();
//   });
}

async function backupDatabase() {
  const backupFileName = `backup_${new Date().toISOString()}.sql`;

  // Use pg_dump to create a backup of the database
  const backupCommand = `pg_dump -h ${databaseConfig.host} -U ${databaseConfig.user} -d ${databaseConfig.database} -F c -b -v -f ${backupFileName}`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during database backup: ${error.message}`);
      return;
    }

    console.log(`Database backup successful. Filename: ${backupFileName}`);
  });
}


