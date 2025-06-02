import random
import matplotlib.pyplot as plt

# Fungsi objektif yang akan diminimasi
def fungsi(x):
    return x**2

# Kelas Partikel
class Partikel:
    def __init__(self, x_min, x_max):
        self.position = random.uniform(x_min, x_max)  # posisi awal acak
        self.velocity = random.uniform(-1, 1)         # kecepatan awal acak
        self.pbest_position = self.position           # posisi terbaik pribadi
        self.pbest_value = fungsi(self.position)      # nilai fungsi terbaik pribadi

    def update_velocity(self, w, c1, c2, gbest_position):
        r1 = random.random()
        r2 = random.random()

        cognitive = c1 * r1 * (self.pbest_position - self.position)
        social = c2 * r2 * (gbest_position - self.position)
        self.velocity = w * self.velocity + cognitive + social

    def update_position(self, x_min, x_max):
        self.position += self.velocity
        # Batasi posisi supaya tidak keluar batas pencarian
        if self.position < x_min:
            self.position = x_min
        elif self.position > x_max:
            self.position = x_max

# Parameter PSO sesuai perintah
w = 0.5
c1 = 1.5
c2 = 1.5
num_particles = 10
max_iter = 50
x_min = -10
x_max = 10

# Cetak jumlah partikel
print(f"Jumlah partikel: {num_particles}\n")

# Inisialisasi swarm (kawanan partikel)
swarm = [Partikel(x_min, x_max) for _ in range(num_particles)]

# Inisialisasi global best (gbest)
gbest_value = float('inf')
gbest_position = None

# Untuk menyimpan nilai gbest tiap iterasi
history_gbest = []

# Proses iterasi PSO
for iterasi in range(max_iter):
    print(f"Iterasi {iterasi+1}")

    for i, partikel in enumerate(swarm, start=1):
        # Evaluasi fungsi pada posisi partikel
        fitness_cadangan = fungsi(partikel.position)

        # Update pbest pribadi jika lebih baik
        if fitness_cadangan < partikel.pbest_value:
            partikel.pbest_value = fitness_cadangan
            partikel.pbest_position = partikel.position

        # Update gbest global jika ada pbest lebih baik
        if fitness_cadangan < gbest_value:
            gbest_value = fitness_cadangan
            gbest_position = partikel.position

        # Cetak posisi dan nilai fungsi partikel saat ini
        print(f"  Partikel {i}: Posisi = {partikel.position:.5f}, f(x) = {fitness_cadangan:.5f}")

    # Update kecepatan dan posisi semua partikel
    for partikel in swarm:
        partikel.update_velocity(w, c1, c2, gbest_position)
        partikel.update_position(x_min, x_max)

    history_gbest.append(gbest_value)
    print(f"  Global Best Posisi: {gbest_position:.5f}, Nilai: {gbest_value:.5f}\n")

# Hasil akhir
print("Hasil akhir:")
print(f"Posisi x terbaik (gbest): {gbest_position}")
print(f"Nilai fungsi minimum: {gbest_value}")

# Visualisasi grafik perkembangan nilai terbaik
plt.plot(range(1, max_iter+1), history_gbest)
plt.title("Perkembangan Nilai Terbaik PSO per Iterasi")
plt.xlabel("Iterasi")
plt.ylabel("Nilai Terbaik f(x)")
plt.grid(True)
plt.show()
