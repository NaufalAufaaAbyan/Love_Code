import pygame
import math

pygame.init()

width, height = 600, 400
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("heart with Stitching")

WHITE = (255, 255, 255)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)

def draw_heart(surface, x, y, size):
    points = []
    for t in range(0, 180, 1):
        angel = math.radians(t)
        x_offset = size * (16 * math.sin(angel) ** 3)
        y_offset = size * (13 * math.cos(angel) - 5 * math.cos(2 * angel) - 2 * math.cos(3 * angel) - math.cos(4 * angel))
        points.append((x + x_offset, y - y_offset))

    reflect_points = [(x - (point[0] - x), point[1]) for point in points]

    full_points = points + reflect_points[::-1]

    pygame.draw.polygon(surface, RED, full_points)

    for i in range(len(points)):
        if i % 6 == 0:
            pygame.draw.line(surface, YELLOW, points[i], points[(i + 1) % len(points)], 2)

running = True
clock = pygame.time.Clock()

while running:
    screen.fill(WHITE)

    draw_heart(screen, width // 2, height // 2, 10)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    pygame.display.flip()

    clock.tick(60)

pygame.quit()