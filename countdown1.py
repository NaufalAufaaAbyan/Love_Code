import time

def countdown(seconds):
    for sec in range(seconds, -1, -1):
        mins, secs = divmod(sec, 60)
        timer = '{:02d}:{:02d}'.format(mins, secs)
        print(timer)
        time.sleep(1)
    print("Waktu habis!!!")

seconds = int(input("Masukan waktu hitung mundur (detik): "))
countdown(seconds)