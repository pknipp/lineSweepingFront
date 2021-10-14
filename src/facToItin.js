const facToItin = (n, iter) => {
  let facPerm = 1;
  for (let i = 1; i <= n; i++) facPerm *= i;
  // if (!iter) console.log(i, facPerm);
  const itin = [];
  // const integers = new Array(n).fill(0).map((blah, i) => i);

  let range = new Array(n).fill(0).map((blah, i) => i);
  let fac = facPerm;
  for(let place = n - 1; place >= 0; place --){
    let i = n - 1 - place;
    fac /= (place + 1);
    let digit = Math.floor(iter/fac);
    let index = range.splice(digit,1)[0];
    itin.push(index);
    iter -= digit * fac;
  }
  return itin;
};

// for i in range(0, 24):
  // print facToItin(4, i)
module.exports = facToItin;
