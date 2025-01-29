const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Route to get metrics for the dashboard
router.get('/metrics', analyticsController.getMetrics);

// Route to get sales overview (Line Chart)
router.get('/sales-overview', analyticsController.getSalesOverview);

// Route to get sales by country (Bar Chart)
router.get('/sales-by-country', analyticsController.getSalesByCountry);

// Route to get top categories (Pie Chart)
router.get('/top-categories', analyticsController.getTopCategories);

// Route to get recent orders
router.get('/recent-orders', analyticsController.getRecentOrders);

module.exports = router;
