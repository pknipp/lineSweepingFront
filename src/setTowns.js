const setTowns = n => {
    // randomly create the coordinates of a point
    let xys = [];
    let ixy = [-1, -1];
    while (xys.length < n) {
        let xy = [Math.random(), Math.random()];
        // Include a point only if it does not coincide with an existing one.
        if (xys.length) ixy = xy.map((coord, index) => xys.map(xy => xy[index]).indexOf(coord));
        if (ixy[0] === -1 || ixy[1] === -1) xys.push(xy);
    }
    return xys;
}
// console.log(setTowns(3));
module.exports = setTowns;
