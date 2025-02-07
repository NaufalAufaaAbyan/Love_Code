import turtle
import time

screen = turtle.Screen()
screen.setup(800, 800)
screen.bgcolor("pink")

t = turtle.Turtle()
t.hideturtle()
t.speed(3)

def draw_heart(x, y, size, color, thickness):
    t.penup()
    t.goto(x, y)
    t.color(color)
    t.pensize(thickness)
    t.pendown()
    t.begin_fill()
    t.fillcolor(color)
    t.left(140)
    t.forward(size)

    for _ in range(200):
        t.right(1)
        t.forward(size * 0.009)

    t.left(120)

    for _ in range(200):
        t.right(1)
        t.forward(size * 0.009)

    t.forward(size)
    t.end_fill()
    t.setheading(0)

def main():
    draw_heart(0, 0, 100, "red", 2)
    draw_heart(-150, -100, 100, "blue", 2)
    draw_heart(150, -100, 100, "green", 2)
    turtle.done()

if __name__ == "__main__":
    main()
