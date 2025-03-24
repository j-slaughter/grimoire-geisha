/**
 * @module coupon.controller.js
 * @description Controller for handling coupons
 */
import Coupon from '../models/coupon.model.js';

/**
 * getAllCoupons - retrieves all the coupons from the db
 */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    return res.status(200).json({ coupons, message: 'Retrieved all coupons' });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving all coupons: ${error.message}` });
  }
};

/**
 * createCoupon - creates a coupon in the db
 */
export const createCoupon = async (req, res) => {
  try {
    const coupon = req.body;
    // Add coupon to db
    const newCoupon = await Coupon.create({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expirationDate: coupon.expirationDate,
    });
    // 201 (Created)
    return res.status(201).json({ coupon: newCoupon, message: 'Coupon created!' });
  } catch (error) {
    return res.status(500).json({ message: `Error creating coupon: ${error.message}` });
  }
};

/**
 * validateCoupon - checks for valid coupon
 */
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    // Find coupon in db
    const coupon = await Coupon.findOne({ code, isActive: true });
    // Check if coupon exists
    if (!coupon) {
      // 404 (Not Found)
      return res.status(404).json({ message: 'Coupon not found!' });
    }
    // Check if coupon is expired
    if (coupon.expirationDate < new Date()) {
      // Update active status
      coupon.isActive = false;
      await coupon.save();
      // 410 (Gone)
      return res.status(410).json({
        coupon: {
          code,
          discountPercentage: coupon.discountPercentage,
        },
        message: 'Coupon is expired!',
      });
    }
    return res.status(200).json({ coupon, message: 'Found coupon!' });
  } catch (error) {
    return res.status(500).json({ message: `Error validating coupon: ${error.message}` });
  }
};
