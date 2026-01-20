import dotenv from 'dotenv';
dotenv.config();

import database from './database/database';
import server from './server';

database.init();
server.start();