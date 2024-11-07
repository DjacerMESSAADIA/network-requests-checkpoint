import express from 'express';
import weatherController from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', weatherController.renderHomePage);
router.get('/weather/:city', weatherController.getWeather);

export default router; 