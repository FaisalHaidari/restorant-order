# 🍽️ Restoran Sipariş Sistemi Projesi

## Proje Tanıtımı
Bu proje, **Next.js**, **Prisma** ve **Tailwind CSS** kullanılarak geliştirilmiş modern ve duyarlı bir restoran sipariş sistemidir. Amaç, restoran menüsünün kolayca yönetilmesi, kullanıcıların çevrim içi sipariş verebilmesi ve yönetici ile kullanıcılar arasında iletişimin sağlanmasıdır.

---

## Temel Özellikler 
- **Kullanıcı kaydı ve girişi** (güvenli kimlik doğrulama)
- **Rol tabanlı erişim:** Yönetici ve normal kullanıcı
- **Mesajlaşma sistemi** (kullanıcı ve yönetici arasında)
- **Kategoriye göre menü yönetimi** (Yiyecek ve İçecek)
- **Sepet ve sipariş oluşturma** (adres detayları ile)
- **Şık ve duyarlı arayüz** (Tailwind CSS ile)
- **Kullanıcı yönetimi** (yönetici tarafından düzenleme, silme, rol değiştirme)

---

## Kullanılan Teknolojiler 
- [Next.js](https://nextjs.org/) (React framework)
- [Prisma ORM](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLite](https://www.sqlite.org/) (varsayılan veritabanı)
- [NextAuth.js](https://next-auth.js.org/) (kimlik doğrulama)

---

## Kurulum ve Çalıştırma 
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Veritabanı migrasyonunu çalıştırın:
   ```bash
   npx prisma migrate dev
   ```
3. Projeyi başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcıda açın:
   [http://localhost:3000](http://localhost:3000)

---

## Klasör Yapısı (Özet)
- `src/app/` : Proje sayfaları ve API'ler
- `src/components/` : Arayüz bileşenleri
- `prisma/` : Veritabanı şeması ve scriptler

---

## Ek Notlar 
- Yönetici paneline erişmek için yönetici hesabı ile giriş yapmalısınız.
- Menüde ürün ekleme, düzenleme ve silme sadece yöneticiye açıktır.
- Mesajlaşma sadece yönetici ve normal kullanıcılar arasında mümkündür.
- Proje tamamen mobil ve masaüstü uyumludur.

---

## Geliştirici 
Bu proje, İnternet Programcılığı II dersi için dönem sonu projesi olarak geliştirilmiştir.

---

> **Projeyi incelediğiniz için teşekkürler!** 
