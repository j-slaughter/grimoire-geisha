/**
 * getCart - retrieve all products in checkout cart
 */
export const getCart = async (req, res) => {
  try {
    // get cart products
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving cart items: ${error.message}` });
  }
};

/**
 * addToCart - add item to cart
 */
export const addToCart = async (req, res) => {
  try {
    // Retrieve user info from previous verifyAccess middleware
    const user = req.user;
    const { productId } = req.body;
    // Check if item already exists in user's cart
    // Use .id instead of ._id to invoke mongoose getter method that returns string version of _id
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // Increment quantity
      existingItem.quantity += 1;
    } else {
      // Add item to user's cart
      user.cartItems.push(productId);
    }
    // Save changes to the db
    await user.save();
    return res.status(200).json({ message: 'Item successfully added to cart!' });
  } catch (error) {
    return res.status(500).json({ message: `Error adding item to cart: ${error.message}` });
  }
};

/**
 * updateQuantityInCart - update the quantity of a cart item
 */
export const updateQuantityInCart = async (req, res) => {
  try {
    // update quantity
  } catch (error) {
    return res.status(500).json({ message: `Error updating cart item quantity: ${error.message}` });
  }
};

/**
 * deleteFromCart - delete item from cart
 */
export const deleteFromCart = async (req, res) => {
  try {
    // delete from cart
  } catch (error) {
    return res.status(500).json({ message: `Error deleting item from cart: ${error.message}` });
  }
};
