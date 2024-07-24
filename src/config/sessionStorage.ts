import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);
require("dotenv").config()

const options = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 45066
};

export const sessionStore = new MySQLStore(options);

sessionStore.onReady().then(() => {
	console.log('MySQLStore ready');
          
}).catch((error:any) => {
	console.error(error);
});