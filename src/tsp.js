const lookup = require('./lookup');
const findOne = require('./findOne');
const setTowns = require('./setTowns');

const tsp = n => {
  let distanceMin = Infinity;
  // let the origin be the n-th town (using 0-based indexing)
  const xys = [...setTowns(n), [0, 0]];
  const interTownDistances = lookup(xys);
  let iter = -1;
  // const base2 = -1;
  let finished = false;
  let memo = [];
  // xi = 10
  // yi (!0
  while (!finished) {
    const results = findOne(iter + 1,
      // base2,
      distanceMin,
      // [xi, yi]) #,
      memo, xys, interTownDistances
    );
    if (results.finished) break;
    iter = results.iter;
    itin = results.itin;
    distance_min = results.distanceMin;
    console.log(iter, itin.join("-"), distance_min)
  };
  console.log("finished");
};
console.log(tsp(4));
