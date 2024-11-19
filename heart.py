def print_heart_art(massage):
    for y in range(15, -15, -1):
        line = ""
        for x in range(-50, 50):
            formula = ((x * 0.04) ** 2 + (y * 0.1) ** 2 - 1) ** 3 -  (x * 0.04) ** 2 *(y * 0.1) ** 3
            if formula <= 0:
                line += massage[(x - y) % len(massage)]
            else:
                line += " "
        print(line)

massage = "I love you! "
print_heart_art(massage)