import math

def lookup(xys):
    distance = lambda x0, x1, y0, y1 : math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
    inter_town_distances = []
    for xy0 in xys:
        row = []
        for xy1 in xys:
            row.append(distance(xy0[0], xy1[0], xy0[1], xy1[1]))
        inter_town_distances.append(row)
    return inter_town_distances
