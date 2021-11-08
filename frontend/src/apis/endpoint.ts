import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export default axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: { Accept: 'application/json' },
});
