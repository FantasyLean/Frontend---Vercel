# Alpeptide — Web Sitesi

Bu klasör, tasarladığımız Alpeptide ana sayfasının **çalıştırılabilir tam proje** halidir
(React + Vite + Tailwind CSS). Aşağıdaki adımları izleyerek bilgisayarınızda çalıştırabilir
veya doğrudan bir hosting/servise yükleyebilirsiniz.

## Klasör içeriği

```
alpeptide-site/
├── index.html            → sitenin giriş HTML dosyası
├── package.json           → proje bağımlılıkları
├── vite.config.js         → derleme (build) ayarları
├── tailwind.config.js     → Tailwind CSS ayarları
├── postcss.config.js      → CSS işleme ayarları
├── src/
│   ├── main.jsx           → React başlangıç noktası
│   ├── App.jsx            → tüm site tasarımı (bileşenler burada)
│   └── index.css          → Tailwind stil dosyası
└── public/
    ├── favicon.svg         → sekme ikonu (logo amblemi)
    └── placeholder-product.svg → ürün görseli yer tutucusu
```

## 1) Bilgisayarınızda çalıştırmak için

Node.js (v18 veya üzeri) kurulu olmalı: https://nodejs.org

```bash
cd alpeptide-site
npm install
npm run dev
```

Terminalde çıkan adresi (genelde `http://localhost:5173`) tarayıcıda açarak siteyi
canlı olarak görebilir, düzenleyebilirsiniz.

## 2) Yayına almak için (build)

```bash
npm run build
```

Bu komut `dist/` adında bir klasör oluşturur. **Hosting'e yüklemeniz gereken klasör budur.**
`dist/` klasörünün içeriği tamamen statik dosyalardan oluşur (HTML, CSS, JS) — herhangi bir
sunucu tarafı çalıştırma gerektirmez.

## 3) Hosting seçenekleri

**En kolay yol — Vercel veya Netlify (ücretsiz plan yeterli):**
1. Bu klasörü bir GitHub deposuna yükleyin.
2. Vercel.com veya Netlify.com üzerinden "New Project" ile bu depoyu bağlayın.
3. Build komutu: `npm run build` — Çıktı klasörü: `dist`
4. Otomatik olarak yayınlanır ve size bir alan adı verir; kendi alan adınızı da bağlayabilirsiniz.

**Kendi hosting'iniz / cPanel gibi klasik hosting'e yüklemek isterseniz:**
1. `npm run build` komutunu çalıştırın.
2. Oluşan `dist/` klasörünün İÇİNDEKİ tüm dosyaları (index.html dahil) hosting'inizin
   `public_html` (veya `www`) klasörüne kopyalayın.
3. Başka bir işlem gerekmez, statik dosyalardır.

## Önemli notlar

- **Ürün görselleri**: Şu an ürün kartlarında gerçek fotoğraf yerine, sürekli yavaşça 360°
  dönen basit bir placeholder kutu kullanılmıştır (kod içinde `ProductCard` ve
  `QuickViewModal` bileşenlerinde). Gerçek ürün fotoğraflarınızı `public/` klasörüne
  ekleyip, ilgili `<div>` yerine `<img src="/urun-a.jpg" />` şeklinde bağlayabilirsiniz;
  döner animasyon `animate-[spin360_7s_linear_infinite]` sınıfıyla görsele de uygulanabilir.
- **Ürün Doğrulama bölümü** (eski haber bülteni alanının yerinde) örnek/sahte kodlarla
  çalışır (`482901`, `119234`, `550217`). Gerçek kullanımda bu kodların bir veritabanından
  doğrulanması gerekir.
- **Giriş/Kayıt, sepet ve yorum işlemleri şu an bir ön yüz (frontend) simülasyonudur** —
  gerçek bir kullanıcı veritabanı, ödeme altyapısı veya e-posta gönderimi bağlı değildir.
  Canlıya almadan önce bu kısımlar için bir backend (Supabase, Firebase, kendi API'niz vb.)
  entegre edilmesi gerekir.
- **Yazı tipi**: Tasarımda sistem yazı tipleri kullanılmıştır; markanıza özel bir font
  kullanmak isterseniz `src/index.css` içine Google Fonts bağlantısını ekleyebilirsiniz.
- Tüm metinler şu an yalnızca Türkçe'dir; çoklu dil (TR/EN) desteği ayrı bir geliştirme
  adımı olarak eklenmelidir.

## Sorun mu yaşıyorsunuz?

- `npm install` hata veriyorsa Node.js sürümünüzü güncelleyin (v18+).
- Build sonrası sayfa boş görünüyorsa, hosting ayarlarında yönlendirmenin (routing)
  `index.html`'e düştüğünden emin olun (tek sayfalık uygulama olduğu için).
