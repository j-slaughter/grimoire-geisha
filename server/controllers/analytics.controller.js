/**
 * @module analytics.controller.js
 * @description Controller for analytics dashboard
 */
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

/**
 * getAnalyticsData - retrieves aggregated users, products, sales, and
 * revenue data from database
 */
const getAnalyticsData = async () => {
  try {
    // Retrieve total number of users in db
    const totalUsers = await User.countDocuments();
    // Retrieve total number of products in db
    const totalProducts = await Product.countDocuments();
    // Calculate number of sales and total revenue
    const salesData = await Order.aggregate([
      {
        // group documents to apply aggregate functions on grouped data
        $group: {
          _id: null, // groups all documents together without specifying a field
          totalSales: { $sum: 1 }, // Adds 1 for each document, effectively counting total number of documents
          totalRevenue: { $sum: '$totalAmount' }, // Sums the totalAmount field for every document
        },
      },
    ]);
    // Extract sales data
    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };
    // Return analytics data
    return {
      users: totalUsers,
      products: totalProducts,
      totalSales,
      totalRevenue,
    };
  } catch (error) {
    console.log(`Error getting analytics data: ${error.message}`);
  }
};

/**
 * getDailySalesData - retrieves aggregated record of daily sales from
 * inputted start date to end date from database
 */
const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        // Filter documents by createdAt date
        $match: {
          createdAt: {
            $gte: startDate, // Greater than or equal to start date
            $lte: endDate, // Less than or equal to end date
          },
        },
      },
      {
        // Group documents together by date
        $group: {
          _id: {
            // Converts date object to string according to specified format
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          sales: { $sum: 1 }, // Count number of documents (sales) for each day
          revenue: { $sum: '$totalAmount' }, // Calculate sum of total revenue for the day
        },
      },
      {
        // Sort the groups of documents by date in ascending order
        $sort: { _id: 1 },
      },
    ]);

    // Generate list of days in startDate to endDate range
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Format each day to match dailySales format
      dates.push(currentDate.toISOString().split('T')[0]);
      // setDate updates Date object accordingly for numbers outside expected range (ie. Aug 32 => Sept 1)
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Populate each day with sales/revenue info
    return dates.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);
      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    console.log(`Error getting daily sales data: ${error.message}`);
  }
};

/**
 * getDashboardData - retrieves analytic and daily sales data for analytics dashboard
 */
export const getDashboardData = async (req, res) => {
  try {
    // Retrieve analytics data
    const analyticsData = await getAnalyticsData();
    // Format daily sales to show past 7 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    // Retrieve daily sales data
    const dailySalesData = await getDailySalesData(startDate, endDate);
    return res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error getting analytics dashboard data: ${error.message}` });
  }
};
