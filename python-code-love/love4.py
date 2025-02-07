import turtle

screen = turtle.Screen()
screen.bgcolor("black")

pen = turtle.Turtle()
pen.shape("turtle")
pen.speed(5)
pen.color("pink")

def draw_heart():
    pen.begin_fill()
    pen.left(50)
    pen.forward(133)
    pen.circle(50, 200)
    pen.right(140)
    pen.circle(50, 200)
    pen.forward(133)
    pen.end_fill()

pen.penup()
pen.goto(0, -200)
pen.pendown()

draw_heart()

pen.hideturtle()

turtle.done()