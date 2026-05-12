const consolidateCart = (cart) => {
  return cart.reduce((counts, item) => {
    const name = Object.keys(item)[0];
    const { price, clearance } = item[name];
    if (counts[name]) {
      counts[name].count += 1;
    } else {
      counts[name] = { price, clearance, count: 1 };
    }
    return counts;
  }, {});
};

const applyCoupons = (cart, coupons) => {
  for (const coupon of coupons) {
    if (cart[coupon.item] && cart[coupon.item].count >= coupon.num) {
      const name = coupon.item;
      const couponCount = Math.floor(cart[name].count / coupon.num);
      const couponKey = `${name} W/COUPON`;
      if (cart[couponKey]) {
        cart[couponKey].count += couponCount;
      } else {
        cart[couponKey] = { price: coupon.cost, clearance: cart[name].clearance, count: couponCount };
      }

      cart[name].count -= coupon.num * couponCount;
    }
  }
  return cart;
};
const applyClearance = (cart) => {
  const clearanceCart = {};
  for (const item in cart) {
    const cartItem = cart[item]; 
    clearanceCart[item] = {
      ...cartItem, 
      price: cartItem.clearance 
        ? parseFloat((cartItem.price * 0.8).toFixed(2)) 
        : cartItem.price,
    };
  }
  return clearanceCart;
};


const checkout = (cart, coupons) => {
  // code here
};
