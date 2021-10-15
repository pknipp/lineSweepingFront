const lookup = require('./lookup');
// const findOne = require('./findOne');
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
    // console.log("top of tsp while loop")
    const results = findOne(n, iter + 1,
      // base2,
      distanceMin,
      // [xi, yi]) #,
      memo, xys, interTownDistances
    );
    // console.log("results = ", results)
    if (results.finished) break;
    iter = results.iter;
    let itin = results.itin;
    distanceMin = results.distanceMin;
    console.log(iter, itin.join("-"), distanceMin)
  };
  console.log("finished");
};
// console.log(tsp(11));
export default tsp;
