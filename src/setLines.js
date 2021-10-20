const setLines = origin => {
/* Below are descriptions of the lines.  All positions are expressed in half-feet, relative to an origin at the middle of the baseline.  All lines point in positive direction (either x or y).
0: left-outside alley
1: left-inside alley
2: back of service line
3: bisector of service boxes
4: baseline
5: right-inside alley
6: right-outside alley
*/
    const [dx1, dx2, dy1, dy2] = [27, 36, 36, 78];
    const lines = [
        // [[ 0, 1], [1, 1]],
        // [[ 0, 0], [1, -1]],
        // [[-1,-1], [ 1,-1]],
        // [[ 1,-1], [ 1, 1]]
        [[-dx2,   0], [-dx2, dy2]],
        [[-dx1,   0], [-dx1, dy2]],
        [[-dx1, dy1], [ dx1, dy1]],
        [[   0, dy1], [   0, dy2]],
        [[-dx2,   0], [ dx2,   0]],
        [[ dx1,   0], [ dx1, dy2]],
        [[ dx2,   0], [ dx2, dy2]]
    ];
    const d = (xy0, xy1) => Math.sqrt((xy1[0] - xy0[0]) ** 2 + (xy1[1] - xy0[1]) ** 2);
    const distances = [];
    lines.forEach(l0 => {
        let row = [];
        lines.forEach(l1 => {
            row.push([[d(l0[0], l1[0]), d(l0[0], l1[1])], [d(l0[1], l1[0]), d(l0[1], l1[1])]]);
        });
        row.push([[d(l0[0], origin)], [d(l0[1], origin)]]);
        distances.push(row);
    })
    return {lines, distances};
};

export default setLines;
