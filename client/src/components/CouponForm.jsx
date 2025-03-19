/**
 * @module CouponForm.jsx
 * @description Coupon form tab component for admin dashboard
 */

function CouponForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-emerald-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
        <div className="mt-5 text-emerald-500 text-center text-xl font-semibold animate-pulse">
          Coupon Form...
        </div>
      </div>
    </div>
  );
}

export default CouponForm;
