# 🎮 Mario Benzeri Platform Oyunu

React Native ile yazılmış tam kapsamlı bir Mario benzeri mobil platform oyunu. iOS ve Android'de çalışır.

## 📋 Özellikler

- **3 Bölüm**: Orman, Mağara ve Kale temaları
- **3 Düşman Tipi**: Goomba 🍄, Koopa 🐢, Piranha Plant 🌱 ve Boss 👾
- **Platform Çeşitleri**: Sabit, Hareketli, Kırılgan ve ? Blokları
- **Toplanabilirler**: Coinler 🪙, Süper Mantar ve Yıldız ⭐
- **Tam Fizik Motoru**: Yerçekimi, zıplama, çarpışma tespiti
- **Kamera Sistemi**: Oyuncuyu takip eden yumuşak kamera
- **HUD**: Can, puan, coin ve bölüm göstergesi
- **Yüksek Skor**: AsyncStorage ile kaydedilir

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Expo CLI
- iOS için Xcode (macOS) veya Android için Android Studio

### Adımlar

1. **Repoyu klonlayın:**

   ```bash
   git clone https://github.com/Furkanaktaas/mario.git
   cd mario
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

3. **Uygulamayı başlatın:**

   ```bash
   npm start
   # veya
   expo start
   ```

4. **Cihazda çalıştırmak için:**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

   Alternatif olarak Expo Go uygulamasını telefonunuza indirip QR kodu okutabilirsiniz.

## 🕹️ Kontroller

```
[◀]  [▶]           [▲]
Sol  Sağ           Zıpla
```

- **Sol alt köşe**: Sol/Sağ hareket butonları
- **Sağ alt köşe**: Zıplama butonu

## 📁 Proje Yapısı

```
mario/
├── App.tsx                    # Ana uygulama ve navigasyon
├── package.json
├── tsconfig.json
├── babel.config.js
├── index.js
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Ana menü
│   │   ├── GameScreen.tsx        # Oyun ekranı
│   │   ├── GameOverScreen.tsx    # Oyun bitti
│   │   └── LevelCompleteScreen.tsx # Bölüm tamamlandı
│   ├── components/
│   │   ├── Player.tsx            # Oyuncu karakteri
│   │   ├── Enemy.tsx             # Düşman karakterleri
│   │   ├── Platform.tsx          # Platformlar
│   │   ├── Coin.tsx              # Coinler
│   │   ├── Flag.tsx              # Bitiş bayrağı
│   │   ├── HUD.tsx               # Oyun içi gösterge
│   │   └── Background.tsx        # Arka plan
│   ├── engine/
│   │   ├── GameEngine.ts         # Oyun tipleri ve başlangıç durumu
│   │   ├── Physics.ts            # Fizik motoru
│   │   ├── Camera.ts             # Kamera sistemi
│   │   └── CollisionDetection.ts # Çarpışma tespiti
│   ├── levels/
│   │   ├── Level1.ts             # Bölüm 1 - Orman
│   │   ├── Level2.ts             # Bölüm 2 - Mağara
│   │   └── Level3.ts             # Bölüm 3 - Kale
│   ├── store/
│   │   └── GameStore.ts          # Zustand ile durum yönetimi
│   ├── hooks/
│   │   └── useGameLoop.ts        # Oyun döngüsü hook'u
│   └── constants/
│       ├── GameConstants.ts      # Fizik ve boyut sabitleri
│       └── Colors.ts             # Renk sabitleri
└── assets/
```

## 🏆 Puan Sistemi

| Aksiyon | Puan |
|---|---|
| Düşman öldürme | +100 |
| Coin toplama | +10 |
| Bölüm tamamlama | +500 |
| Boss öldürme | +1000 |

## 🛠️ Teknolojiler

- **React Native** + **Expo**
- **TypeScript**
- **Zustand** (durum yönetimi)
- **React Navigation** (ekran geçişleri)
- **AsyncStorage** (yüksek skor kaydı)
