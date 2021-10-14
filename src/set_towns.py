import random

def set_towns(n):
    # randomly create the coordinates of a point
    xs = []
    ys = []
    while len(xs) < n:
        x = random.random()
        y = random.random()
        # ix & iy need to be defined in outer scope (ie, not in "except" block)
        ix = -1
        iy = -1
        try:
            ix = xs.index(x)
        except:
            pass
        try:
            iy = ys.index(y)
        except:
            pass
        # Include a point only if it does not coincide with an existing one.
        if ix == -1 or iy == -1:
                xs.append(x)
                ys.append(y)
    return zip(xs, ys)
