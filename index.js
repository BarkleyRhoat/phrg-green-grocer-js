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
    if (cart[coupon.item] && cart[coupon.item].count >= coupoun.num) {
      const name = coupon.item;
      const couponCount = Math.floor(cart[name].count / coupon.num);
      const couponName = `${name} W/COUPON`;
      if (cart[couponKey]) {
        cart[couponKey].count += couponCount;
      } else {
        cart[couponKey] = { price: cart[name].price, clearance: cart[name].clearance, count: couponCount };
      }
      cart[name].count -= couponCount * coupon.num;
      
    }
  }
  return cart;
};

const applyClearance = (cart) => {
  // code here
};

const checkout = (cart, coupons) => {};
  
