import numpy as np
import matplotlib.pyplot as plt

# Konfigurasi Plot
START = 0
END = 2 * np.pi
NUM_POINTS = 1000

# Buat Array Waktu
t = np.linspace(START, END, NUM_POINTS)

# Hitung Koordinat x dan y
x = 16 * np.sin(t) ** 3
y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3*t) - np.cos(4*t)

# Buat Array Warna
colors = np.linspace(0, 1, len(x))

# Buat Figure dan Axis
fig, ax = plt.subplots(figsize=(6, 6), facecolor='black')
ax.set_facecolor('black')

# Buat Plot Scatter
scatter = ax.scatter(x, y, c=colors, cmap='Reds', s=80, alpha=0.8, linewidths=0)

# Konfigurasi Plot
ax.set_xticks([])
ax.set_yticks([])
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['bottom'].set_visible(False)
ax.spines['left'].set_visible(False)

# Tampilkan Plot
plt.show()