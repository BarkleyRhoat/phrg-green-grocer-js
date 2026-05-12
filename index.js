let items = [
  { AVOCADO: { price: 3.0, clearance: true } },
  { KALE: { price: 3.0, clearance: false } },
  { BLACK_BEANS: { price: 2.5, clearance: false } },
  { ALMONDS: { price: 9.0, clearance: false } },
  { TEMPEH: { price: 3.0, clearance: true } },
  { CHEESE: { price: 6.5, clearance: false } },
  { BEER: { price: 13.0, clearance: false } },
  { PEANUT_BUTTER: { price: 3.0, clearance: true } },
  { BEETS: { price: 2.5, clearance: false } },
  { "SOY MILK": { price: 4.5, clearance: true } },
];

let coupons = [
  { item: "AVOCADO", num: 2, cost: 5.0 },
  { item: "BEER", num: 2, cost: 20.0 },
  { item: "CHEESE", num: 3, cost: 15.0 },
];

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
        ? parseFloat((cart[item].price * 0.8).toFixed(2))
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

