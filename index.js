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
  // code here
};

const applyClearance = (cart) => {
  // code here
};

const checkout = (cart, coupons) => {
  return cart.reduce((counts, item) => {
    const name = Object.keys(item)[0];
    const { price, clearance } = item[name];
    if (counts[name]) {
      counts[name].count += 1;
    } else {
      counts[name] = { price, clearance, count: 1 };
    }
    return counts;
  });
};
