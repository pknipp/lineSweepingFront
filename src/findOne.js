const facToItin = require('./facToItin');

const findOne = (iter, distanceMin, memo, xys, interTownDistances) => {
  // Below are descriptions of the lines.  All positions are expressed in half-feet, relative to an origin at the middle of the baseline.  All lines point in positive direction (either x or y).
  //   0: left-outside alley
  //   1: left-inside alley
  //   2: back of service line
  //   3: bisector of service boxes
  //   4: baseline
  //   5: right-inside alley
  //   6: right-outside alley

  const dx1 = 27;
  const dx2 = 36;
  const dy1 = 36;
  const dy2 = 78;

  const xy = [[[-dx2,  0],[-dx2,dy2]],
        [[-dx1,  0],[-dx1,dy2]],
        [[-dx1,dy1],[ dx1,dy1]],
        [[   0,dy1],[   0,dy2]],
        [[-dx2,  0],[ dx2,  0]],
        [[ dx1,  0],[ dx1,dy2]],
        [[ dx2,  0],[ dx2,dy2]]];

  const n = xy.length;
  // base2_max = 2 ** n;
  let facPerm = 1;
  for (let i = 1; i <= n; i++) facPerm *= i;
  // base2 = base2 + 1
  // if base2 == base2_max) {
    // base2 = 0
    // iter += 1
  // loop over all permutations (ie, all possible itineraries)
  while (iter < facPerm) {
    // while base2 < base2_max

// for ntot in range(0,2**(len(xy)-1)):
//   i = [0]
//   n = ntot
//   length = 0
//   d = []
//   for iline in range(1,len(xy)):
//    i.append(int(n % 2))
//    n -= i[iline]
//    n /= 2
//    xi = lines[iline-1][1-i[iline-1]][0]
//    yi = lines[iline-1][1-i[iline-1]][1]
//    xf = lines[iline][i[iline]][0]
//    yf = lines[iline][i[iline]][1]
//    d.append(math.sqrt((xi - xf)**2 + (yi - yf)**2))
//    length += d[iline-1]
//   if length<lenmin:
//    lenmin=length
//    for iline in range(len(xy)):
//     imin[iline] = i[iline]
//     nmin[iline] = lines[iline]
//    print(length,d)



    // salesperson starts at origin, which n-th point (0-based indexing) is defined to be.
    let indexLast = n;
    let distanceTot = 0;
    // let dIter = Math.round(facPerm/1000)
    const itin = facToItin(n, iter);
    // flag used to determine whether or not memo can be used
    let areSame = true;
    for (let i = 0; i < itin.length; i++) {
      const index = itin[i];
      areSame = areSame && memo && memo[i] && memo[i][0] === index;
        // ... if existing element in memo cannot be used, then reassign it
      if (!areSame) memo[i] = [index, distanceTot + interTownDistances[indexLast][index]];
      distanceTot = memo[i][1];
      indexLast = index;
    };
    // salesperson ends at the origin, which is n-th point.
    distanceTot += interTownDistances[indexLast][n];
    itin.unshift(n);
    itin.push(n);
    if (distanceTot < distanceMin) {
      distanceMin = distanceTot;
      return {iter, itin, distanceMin, finished: false};
    };
    iter++;
    // Break in order to display the next 0.1% of progress.
    // Before both loops, dIter was defined to be Math.round(facPerm/1000)
    // if (!(iterPerm % dIter)) {
      // setNextIterPermI(iterPerm + 1);
      // break;
    // }
    // The loop is done.
    // if (iterPerm === facPerm - 1) {
      // setDone(true);
      // setNextIterPermI(iterPerm);
    // }
  };
  return {finished: true};
};

module.exports = findOne;
