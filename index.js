function cb(count, item) {
  const name = Object.keys(item)[0];
  const { price, clearance } = item[name];
  if (count[name]) {
    count[name].count += 1;
  } else {
    count[name] = { price, clearance, count: 1 };
  }
  return count;
}
const consolidateCart = (shoppingCart) => {
  return shoppingCart.reduce(cb, {});
};

// look over this more
const applyCoupons = (cart, coupons) => {
  for (const coupon of coupons) {
    if (cart[coupon.item] && cart[coupon.item].count >= coupon.num) {
      const name = coupon.item;
      const couponCount = Math.floor(cart[name].count / coupon.num);
      const couponKey = `${name} W/COUPON`;
      if (cart[couponKey]) {
        cart[couponKey].count += couponCount;
      } else {
        cart[couponKey] = {
          price: coupon.cost,
          clearance: cart[name].clearance,
          count: couponCount,
        };
      }

      cart[name].count -= coupon.num * couponCount;
    }
  }
  return cart;
};

const applyClearance = (cart) => {
  for (const item in cart) {
    cart[item] = {
      ...cart[item],
      price: cart[item].clearance
        ? Number((cart[item].price * 0.8).toFixed(2))
        : cart[item].price,
    };
  }
  return cart;
};

function checkout(cart, coupons) {
  let consolidatedCart = consolidateCart(cart);
  let cartWithCoupons = applyCoupons(consolidatedCart, coupons);
  let cartWithClearance = applyClearance(cartWithCoupons);
  let total = 0;
  for (let item in cartWithClearance) {
    total += cartWithClearance[item].price * cartWithCoupons[item].count;
  }

  if (total > 100) {
    total = total - total * 0.1;
  }
  return total;
}
