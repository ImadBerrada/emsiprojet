import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminAnalyticsPage = () => {
  const [metrics, setMetrics] = useState({ totalSales: 0, totalCosts: 0, totalOrders: 0 });
  const [salesOverview, setSalesOverview] = useState({ labels: [], datasets: [] });
  const [salesByCountry, setSalesByCountry] = useState({ labels: [], datasets: [] });
  const [topCategories, setTopCategories] = useState({ labels: [], datasets: [] });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/analytics';

  useEffect(() => {
    // Fetch analytics data from the backend
    const fetchAnalytics = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch all required analytics data
        const [metricsRes, salesOverviewRes, salesByCountryRes, topCategoriesRes, recentOrdersRes] = await Promise.all([
          axios.get(`${baseURL}/metrics`),
          axios.get(`${baseURL}/sales-overview`),
          axios.get(`${baseURL}/sales-by-country`),
          axios.get(`${baseURL}/top-categories`),
          axios.get(`${baseURL}/recent-orders`),
        ]);

        // Set state with fetched data
        setMetrics(metricsRes.data);
        setSalesOverview(salesOverviewRes.data);
        setSalesByCountry(salesByCountryRes.data);
        setTopCategories(topCategoriesRes.data);
        setRecentOrders(recentOrdersRes.data.orders);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to fetch analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Analytics and Reports</h1>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading State */}
        {loading && <p className="text-gray-500 text-center">Loading analytics...</p>}

        {/* Analytics Data */}
        {!loading && !error && (
          <>
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {[
                { title: 'Total Sales', value: `$${metrics.totalSales}`, trend: '+8.5%', color: 'text-green-500' },
                { title: 'Total Costs', value: `$${metrics.totalCosts}`, trend: '-3%', color: 'text-red-500' },
                { title: 'Total Orders', value: metrics.totalOrders, trend: '+10%', color: 'text-green-500' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white shadow rounded-lg">
                  <p className="text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className={`text-sm ${item.color}`}>{item.trend} last 7 days</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white shadow rounded-lg">
                <p className="text-gray-500 mb-4">Sales Overview</p>
                <Line data={salesOverview} />
              </div>
              <div className="p-4 bg-white shadow rounded-lg">
                <p className="text-gray-500 mb-4">Sales by Country</p>
                <Bar data={salesByCountry} />
              </div>
              <div className="p-4 bg-white shadow rounded-lg">
                <p className="text-gray-500 mb-4">Top Selling Categories</p>
                <Pie data={topCategories} />
              </div>
            </div>

            {/* Recent Orders */}
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-500 mb-4">Recent Orders</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-t">
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td
                        className={`${
                          order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                        } font-medium`}
                      >
                        {order.status}
                      </td>
                      <td>{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
