def print_heart_art(message, size=15, width=100):
    for y in range(size, -size, -1):
        line = ""
        for x in range(-width//2, width//2):
            formula = ((x * 0.04) ** 2 + (y * 0.1) ** 2 - 1) ** 3 -  (x * 0.04) ** 2 *(y * 0.1) ** 3
            if formula <= 0:
                line += message[(x - y) % len(message)]
            else:
                line += " "
        print(line)

message = "I love you! "
print_heart_art(message)