from lookup import lookup
from find_one import find_one
from set_towns import set_towns

def tsp():
  distance_min = float("inf")
  # let the origin be the n-th town (using 0-based indexing)
  # xys = list(set_towns(n)) + [[0, 0]]
  # inter_town_distances = lookup(xys)
  iter = 0
  base2 = -1
  finished = False
  memo = []
  xi = 10
  yi = -10
  while not finished:
    results = find_one(iter, base2, distance_min, [xi, yi]) #, memo, xys, inter_town_distances)
    if results["finished"]:
      break
    iter = results["iter"]
    itin = results["itin"]
    distance_min = results["distance_min"]
    print(iter, base2, "-".join([str(n) for n in itin]), distance_min)
  print("finished")
tsp()
