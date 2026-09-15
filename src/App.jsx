import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  ShieldCheck,
  FlaskConical,
  Truck,
  Award,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Hash,
  Building2,
  MapPin,
  Tag,
  Linkedin,
  Instagram,
  Twitter,
  Beaker,
  TestTube,
  Package,
  Pill,
  Syringe,
  LayoutGrid,
  Minus,
  Plus,
  Menu,
  X,
  Quote,
  HeadphonesIcon,
  FileCheck,
  FileText,
  Heart,
  Flame,
  Droplet,
  Dumbbell,
  Brain,
  Activity,
  Bone,
  Eye,
  EyeOff,
  Trash2,
  Pencil,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  LogIn,
  UserPlus,
  Lock,
  CreditCard,
  Settings,
  LogOut,
  Bitcoin,
  ShieldAlert,
  Bell,
  Home,
  Briefcase,
  Users,
  Bold,
  Italic,
  Paperclip,
  Image as ImageIcon,
  ShoppingBag,
  Info,
  HelpCircle,
  User,
  Filter,
  ChevronUp,
  ChevronDown,
  History,
  Download,
  Monitor,
  Key,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react";

/* ---------- data ---------- */

const ANNOUNCEMENTS = [
  "🚚 500 TL üzeri siparişlerde kargo ücretsiz",
  "💳 USDT ile ödemede %2 ek indirim",
  "🧪 Her parti bağımsız laboratuvarda HPLC ile test edilir",
];

const NAV_LINKS = [
  { label: "Ana Sayfa", icon: Home },
  { label: "Hakkımızda", icon: Info },
  { label: "SSS", icon: HelpCircle },
  { label: "Blog", icon: FileText },
  { label: "KVKK", icon: FileCheck },
  { label: "Mağaza", icon: ShoppingBag },
];

const CERTIFICATIONS = [
  { icon: ShieldCheck, label: "ISO 9001 Uyumlu" },
  { icon: FlaskConical, label: "GLP Standartlarında Test" },
  { icon: Award, label: "HPLC Doğrulamalı Analiz" },
  { icon: Truck, label: "Sigortalı & İzlenebilir Kargo" },
  { icon: FileCheck, label: "Parti Bazlı Raporlama" },
  { icon: HeadphonesIcon, label: "7/24 Kurumsal Destek" },
];

const STATS = [
  { target: 15, suffix: "+", label: "Yıllık Sektör Deneyimi" },
  { target: 12400, suffix: "+", label: "Tamamlanan Analiz" },
  { target: 3200, suffix: "+", label: "Kurumsal Müşteri" },
  { target: 40, suffix: "+", label: "Ülkeye Sevkiyat" },
];

const USPS = [
  { icon: FlaskConical, title: "Doğrulanmış Kalite", desc: "Her parti, sevkiyat öncesi bağımsız laboratuvarda HPLC ile test edilir." },
  { icon: Truck, title: "İzlenebilir Kargo", desc: "Sipariş anından teslimata kadar sıcaklık ve konum takibi yapılır." },
  { icon: HeadphonesIcon, title: "Uzman Destek", desc: "Teknik ekibimiz ürün seçimi ve uygulama konusunda yanınızda." },
  { icon: FileCheck, title: "Şeffaf Raporlama", desc: "Analiz sertifikalarına sipariş öncesinde tam erişim sağlanır." },
];

const CATEGORIES = [
  { icon: TestTube, name: "Peptidler", count: "48 ürün" },
  { icon: Beaker, name: "Reaktifler ve Kimyasallar", count: "76 ürün" },
  { icon: FlaskConical, name: "Laboratuvar Ekipmanları", count: "32 ürün" },
  { icon: Package, name: "Sarf Malzemeleri", count: "59 ürün" },
];

const PRODUCTS = [
  { id: "A", name: "Ürün A", batch: "Parti No. LB-2291", rating: 4.6, reviews: 124, price: "2.450,00 TL", stock: "in", category: "Peptidler", color: "#F5841F", desc: "Yüksek saflıkta, HPLC ile doğrulanmış laboratuvar örneği." },
  { id: "B", name: "Ürün B", batch: "Parti No. LB-2287", rating: 4.5, reviews: 98, price: "1.890,00 TL", stock: "in", category: "Reaktifler ve Kimyasallar", color: "#3B82F6", desc: "Rutin analizler için stabil, uzun raf ömürlü formülasyon." },
  { id: "C", name: "Ürün C", batch: "Parti No. LB-2264", rating: 4.7, reviews: 76, price: "3.250,00 TL", stock: "out", category: "Laboratuvar Ekipmanları", color: "#10B981", desc: "Araştırma laboratuvarları için referans kalite standardı." },
  { id: "D", name: "Ürün D", batch: "Parti No. LB-2251", rating: 4.5, reviews: 62, price: "1.750,00 TL", stock: "in", category: "Sarf Malzemeleri", color: "#8B5CF6", desc: "Sık kullanılan analizler için ekonomik paket seçeneği." },
  { id: "E", name: "Ürün E", batch: "Parti No. LB-2240", rating: 4.4, reviews: 41, price: "2.990,00 TL", stock: "in", category: "Peptidler", color: "#F43F5E", desc: "Kurumsal müşteriler için toplu paketleme seçeneğiyle sunulur." },
];

const SHOP_COLORS = ["#F5841F", "#3B82F6", "#10B981", "#8B5CF6", "#F43F5E", "#F59E0B", "#06B6D4", "#EC4899"];

const BLOG_TOPICS = [
  { title: "HPLC Analizi Nedir ve Neden Önemlidir?", excerpt: "Yüksek performanslı sıvı kromatografisinin araştırma kimyasallarının saflığını doğrulamadaki rolünü inceliyoruz.", date: "12 Ocak 2026", tag: "Analiz" },
  { title: "Peptid Saklama Koşulları: Bilmeniz Gerekenler", excerpt: "Sıcaklık, ışık ve nem gibi faktörlerin peptid stabilitesi üzerindeki etkilerini ele alıyoruz.", date: "18 Ocak 2026", tag: "Rehber" },
  { title: "Parti Bazlı Raporlama Nasıl Çalışır?", excerpt: "Her sevkiyatın kendine özgü analiz raporuyla nasıl izlenebilir hale geldiğini anlatıyoruz.", date: "25 Ocak 2026", tag: "Şeffaflık" },
  { title: "Laboratuvar Ekipmanı Seçerken Dikkat Edilmesi Gerekenler", excerpt: "Doğru ekipman seçiminin araştırma sonuçlarınızı nasıl etkilediğini açıklıyoruz.", date: "2 Şubat 2026", tag: "Ekipman" },
  { title: "Araştırma Kimyasallarında Kalite Kontrol Süreçleri", excerpt: "Bağımsız laboratuvar testlerinin tedarik zincirindeki kritik rolüne göz atıyoruz.", date: "9 Şubat 2026", tag: "Kalite" },
  { title: "GLP Standartları: Temel Bilgiler", excerpt: "İyi Laboratuvar Uygulamaları'nın araştırma güvenilirliğine katkısını inceliyoruz.", date: "16 Şubat 2026", tag: "Standartlar" },
  { title: "Reaktif Seçiminde Sık Yapılan Hatalar", excerpt: "Deneyimli araştırmacıların bile düşebileceği yaygın tuzakları derledik.", date: "23 Şubat 2026", tag: "Rehber" },
  { title: "Soğuk Zincir Kargo: Neden Bu Kadar Önemli?", excerpt: "Hassas numunelerin sevkiyat sırasında nasıl korunduğunu anlatıyoruz.", date: "2 Mart 2026", tag: "Lojistik" },
  { title: "Sarf Malzemelerinde Verimli Stok Yönetimi", excerpt: "Laboratuvarınızda israfı azaltacak basit stok takibi yöntemleri.", date: "9 Mart 2026", tag: "Verimlilik" },
  { title: "Analiz Raporunuzu Nasıl Okumalısınız?", excerpt: "HPLC raporundaki temel değerlerin ne anlama geldiğini adım adım açıklıyoruz.", date: "16 Mart 2026", tag: "Analiz" },
  { title: "Kurumsal Alımlarda Fiyatlandırma Nasıl Belirlenir?", excerpt: "Miktar bazlı fiyatlandırmanın arkasındaki mantığı ve avantajlarını paylaşıyoruz.", date: "23 Mart 2026", tag: "Kurumsal" },
  { title: "2026'da Araştırma Kimyasalları Sektöründeki Gelişmeler", excerpt: "Sektörü şekillendiren yeni düzenlemeler ve teknolojik değişimlere bakış.", date: "30 Mart 2026", tag: "Sektör" },
];
const BLOG_POSTS = Array.from({ length: 36 }, (_, i) => {
  const base = BLOG_TOPICS[i % BLOG_TOPICS.length];
  return {
    ...base,
    id: i,
    intro: "Bu bölüm konunun genel çerçevesini çiziyor ve okuyucuyu ana temayla tanıştırıyor. İçerik yer tutucu niteliğindedir ve ileride gerçek metinle değiştirilecektir.",
    development: "Burada konunun gelişimi ele alınıyor — süreç, yöntem ve dikkat edilmesi gereken noktalar bu bölümde detaylandırılır. İçerik yer tutucu niteliğindedir.",
    conclusion: "Sonuç olarak, bu başlık altında öğrenilenler kısaca özetlenir ve okuyucuya pratik bir çıkarım sunulur. İçerik yer tutucu niteliğindedir.",
  };
});
const PRODUCT_FORMS = ["Tablet", "Enjeksiyon", "Koruyucular"];
const FORM_FILTERS = [
  { name: "Tümünü Gör", icon: LayoutGrid },
  { name: "Tablet", icon: Pill },
  { name: "Enjeksiyon", icon: Syringe },
  { name: "Koruyucular", icon: ShieldCheck },
];
const PURPOSE_FILTERS = [
  { name: "Tümü", icon: LayoutGrid },
  { name: "Yağ Yakıcı", icon: Flame },
  { name: "Cilt Sağlığı", icon: Droplet },
  { name: "Kas Kütlesi Ekleme", icon: Dumbbell },
  { name: "Odak Ürünleri", icon: Brain },
  { name: "Cinsel Sağlık", icon: Heart },
  { name: "İç Organ Sağlığı", icon: Activity },
  { name: "Eklem ve Doku", icon: Bone },
];

const SHOP_PRODUCTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, i) => ({
  id: `Z${letter}`,
  name: `Ürün ${letter}`,
  batch: `Parti No. LB-${3000 + i}`,
  rating: Math.round((4 + ((i % 5) * 0.15)) * 10) / 10,
  reviews: 20 + ((i * 13) % 180),
  price: `${(500 + ((i * 137) % 4000)).toLocaleString("tr-TR")},00 TL`,
  stock: i % 7 === 6 ? "out" : "in",
  category: CATEGORIES[i % CATEGORIES.length].name,
  form: PRODUCT_FORMS[i % PRODUCT_FORMS.length],
  purpose: PURPOSE_FILTERS[1 + (i % (PURPOSE_FILTERS.length - 1))].name,
  color: SHOP_COLORS[i % SHOP_COLORS.length],
  desc: "Laboratuvar kullanımı için hazırlanmış, kalite kontrolünden geçmiş örnek üründür.",
}));

const TESTIMONIALS = [
  { name: "Elif Karaca", role: "Ar-Ge Sorumlusu, BioNova Lab", quote: "Parti bazlı analiz raporlarına sipariş öncesinde ulaşabilmek tedarik sürecimizi hızlandırdı." },
  { name: "Mert Yıldız", role: "Kalite Güvence Müdürü, Sentek", quote: "HPLC doğrulamalı ürünler ve izlenebilir kargo, denetim süreçlerimizde büyük kolaylık sağlıyor." },
  { name: "Aslı Demirtaş", role: "Laboratuvar Direktörü, VitaBiotek", quote: "Kurumsal destek ekibi teknik sorularımıza her zaman hızlı dönüş yapıyor." },
];

const SORT_FILTERS = [
  { key: "popular", label: "Popüler" },
  { key: "price-asc", label: "Fiyata Göre Artan" },
  { key: "price-desc", label: "Fiyata Göre Azalan" },
  { key: "rating", label: "Yüksek Değerlendirme" },
];

const CATEGORY_FILTERS = ["Tümü", ...CATEGORIES.map((c) => c.name)];

const PRICE_RANGES = [
  { key: "all", label: "Tüm Fiyatlar", test: () => true },
  { key: "low", label: "0–2.000 TL", test: (p) => p < 2000 },
  { key: "mid", label: "2.000–3.000 TL", test: (p) => p >= 2000 && p <= 3000 },
  { key: "high", label: "3.000 TL ve üzeri", test: (p) => p > 3000 },
];

const QUICK_REPLIES = ["Sipariş Takibi", "Ürün Önerisi", "Teknik Destek", "Analiz Raporu"];

const HIRO_REPLIES = {
  "Sipariş Takibi": "Sipariş numaranızı paylaşırsanız kargo durumunu hemen kontrol edebilirim.",
  "Ürün Önerisi": "Hangi analiz türü için ürün arıyorsunuz? Peptid, reaktif veya ekipman kategorilerinden seçebiliriz.",
  "Teknik Destek": "Teknik ekibimize yönlendiriyorum, ortalama yanıt süresi 10 dakikadır.",
  "Analiz Raporu": "Parti numaranızı yazarsanız ilgili analiz sertifikasını buraya ekleyebilirim.",
};

const PAYMENT_METHODS = [
  { icon: Bitcoin, label: "USDT / BTC / ETH (Kripto)" },
];

const BATCH_REPORTS = [
  { batch: "LB-2291", purity: "99,4%", moisture: "0,8%", endotoxin: "Limit Altında" },
  { batch: "LB-2287", purity: "99,1%", moisture: "1,0%", endotoxin: "Limit Altında" },
  { batch: "LB-2264", purity: "98,9%", moisture: "1,2%", endotoxin: "Limit Altında" },
  { batch: "LB-2251", purity: "99,6%", moisture: "0,6%", endotoxin: "Limit Altında" },
];

const ORDER_STEPS = [
  { icon: Package, label: "Sipariş Alındı", desc: "Siparişiniz sistemimize ulaştı" },
  { icon: Bitcoin, label: "Ödeme Onaylandı", desc: "Ödemeniz başarıyla doğrulandı" },
  { icon: FlaskConical, label: "Hazırlanıyor", desc: "Ürünleriniz özenle hazırlanıyor" },
  { icon: Truck, label: "Kargoda", desc: "Paketiniz kargo firmasına teslim edildi" },
  { icon: CheckCircle2, label: "Teslim Edildi", desc: "Siparişiniz adresinize ulaştı" },
];

const VOLUME_TIERS = [
  { range: "1 – 4 adet", discount: "Liste Fiyatı", note: "Standart fiyatlandırma" },
  { range: "5 – 9 adet", discount: "%5 İndirim", note: "Küçük ölçekli laboratuvar siparişleri" },
  { range: "10 – 24 adet", discount: "%10 İndirim", note: "Orta ölçekli kurumsal siparişler" },
  { range: "25+ adet", discount: "%15 İndirim + Özel Teklif", note: "Büyük hacimli anlaşmalar için satış ekibiyle görüşün" },
];

const parsePrice = (price) => parseFloat(price.replace(/\./g, "").replace(",", ".").replace(" TL", ""));

/* ---------- hooks ---------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/* ---------- brand mark & mascot ---------- */

function BrandMark({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 24 C6 17 9 12 9 8 C9 5.5 11 4 13 5.5 C14.5 6.6 14 9 12.5 11 C10.8 13.3 10 16.5 10.5 19" stroke="#F5841F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="10" r="3.4" fill="#F5841F" />
      <path d="M10.5 19 C13 22 17 23 22 21" stroke="#F5841F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const HIRO_BODY_PATH = "M54.5 20.9 L15.9 110.8 Q12 120 22 120 L98 120 Q108 120 104.1 110.8 L65.5 20.9 Q60 8 54.5 20.9 Z";

function HiroFace() {
  return (
    <>
      <circle cx="45" cy="86" r="10" fill="#fff" />
      <circle cx="76" cy="86" r="10" fill="#fff" />
      <circle cx="47.5" cy="88" r="4.4" fill="#2B1400" />
      <circle cx="73.5" cy="88" r="4.4" fill="#2B1400" />
      <circle cx="34" cy="96" r="6" fill="#E4572E" opacity="0.4" />
      <circle cx="87" cy="96" r="6" fill="#E4572E" opacity="0.4" />
      <path d="M40 74 Q45 70 51 73" stroke="#2B1400" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M70 73 Q76 70 81 74" stroke="#2B1400" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M49 104 Q60 113 72 104" stroke="#2B1400" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

function Hiro({ className = "" }) {
  return (
    <svg viewBox="0 0 120 132" className={className} aria-hidden="true">
      <path d={HIRO_BODY_PATH} fill="#F5841F" />
      <HiroFace />
    </svg>
  );
}

function HiroInspector({ className = "" }) {
  return (
    <svg viewBox="-18 -10 156 152" className={className} aria-hidden="true">
      <path d={HIRO_BODY_PATH} fill="#F5841F" />

      {/* left eye: winking (closed) */}
      <path d="M36 86 Q45 92 54 86" stroke="#2B1400" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* right eye: open, looking through the magnifier */}
      <circle cx="76" cy="86" r="10" fill="#fff" />
      <circle cx="77" cy="87" r="4.4" fill="#2B1400" />

      <circle cx="34" cy="96" r="6" fill="#E4572E" opacity="0.4" />
      <circle cx="87" cy="96" r="6" fill="#E4572E" opacity="0.4" />
      <path d="M38 74 Q45 71 51 74" stroke="#2B1400" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M83 72 L69 75" stroke="#2B1400" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M51 106 Q60 103 70 106" stroke="#2B1400" strokeWidth="2.8" fill="none" strokeLinecap="round" />

      {/* magnifier, held still, directly over the open eye — no movement */}
      <rect x="94" y="102" width="7" height="20" rx="3" fill="#475569" transform="rotate(28 97 112)" />
      <circle cx="76" cy="86" r="17" fill="#38BDF8" fillOpacity="0.14" stroke="#475569" strokeWidth="3.5" />
    </svg>
  );
}

function useSwipe(onPrev, onNext) {
  const drag = useRef({ startX: 0, active: false });
  function start(clientX) { drag.current = { startX: clientX, active: true }; }
  function end(clientX) {
    if (!drag.current.active) return;
    const delta = clientX - drag.current.startX;
    if (Math.abs(delta) > 40) (delta < 0 ? onNext() : onPrev());
    drag.current.active = false;
  }
  return {
    onMouseDown: (e) => start(e.clientX),
    onMouseUp: (e) => end(e.clientX),
    onMouseLeave: () => { drag.current.active = false; },
    onTouchStart: (e) => start(e.touches[0].clientX),
    onTouchEnd: (e) => end(e.changedTouches[0].clientX),
  };
}

function ProductVial({ color = "#F5841F" }) {
  return (
    <svg viewBox="0 0 40 70" className="h-16 w-9 [backface-visibility:visible]">
      <rect x="10" y="4" width="20" height="10" rx="3" fill="#CBD5E1" />
      <rect x="6" y="14" width="28" height="52" rx="6" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="6" y="34" width="28" height="14" fill={color} opacity="0.85" />
      <rect x="10" y="38" width="20" height="2" fill="#ffffff" opacity="0.6" />
      <rect x="9" y="18" width="4" height="44" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

/* ---------- small building blocks ---------- */

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm sm:h-20 sm:w-20">
        <Icon size={30} strokeWidth={1.8} className="text-slate-700" />
        <Sparkles size={13} className="absolute -right-1 -top-1 text-amber-400" />
      </span>
      <p className="text-xs font-semibold leading-tight text-slate-700 sm:text-sm">{label}</p>
    </div>
  );
}

function TrustRow({ items }) {
  return (
    <div className="mb-12 grid grid-cols-3 items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center sm:gap-6 sm:p-7">
      {items.map((it) => (
        <TrustBadge key={it.label} icon={it.icon} label={it.label} />
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

function Stat({ stat, active }) {
  const value = useCountUp(stat.target, active);
  return (
    <div className="min-w-0 text-center sm:text-left">
      <p className="whitespace-nowrap text-base font-bold tabular-nums text-slate-900 sm:text-2xl">
        {value.toLocaleString("tr-TR")}{stat.suffix}
      </p>
      <p className="mt-0.5 text-[10px] leading-tight text-slate-500 sm:text-xs">{stat.label}</p>
    </div>
  );
}

function AddBurst({ show }) {
  if (!show) return null;
  const dots = Array.from({ length: 7 });
  return (
    <span className="pointer-events-none absolute inset-0 overflow-visible">
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const tx = Math.cos(angle) * 34;
        const ty = Math.sin(angle) * 34;
        return <span key={i} className="burst-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-orange-400" style={{ "--tx": `${tx}px`, "--ty": `${ty}px` }} />;
      })}
    </span>
  );
}

/* ---------- order tracking timeline (trust & transparency) ---------- */

function OrderTimeline() {
  const [ref, inView] = useInView(0.3);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % ORDER_STEPS.length), 1700);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
      <Reveal><h2 className="mb-1 text-lg font-bold text-slate-900">Siparişiniz Nasıl İlerler?</h2></Reveal>
      <Reveal delay={60}><p className="mb-12 text-sm text-slate-500">Her siparişi bu adımlarla gerçek zamanlı olarak takip edebilirsiniz.</p></Reveal>

      <div className="relative">
        <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-200 sm:top-6" />
        <div
          className="absolute left-6 top-5 h-0.5 bg-orange-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:top-6"
          style={{ width: `calc((100% - 3rem) * ${active / (ORDER_STEPS.length - 1)})` }}
        />

        <div className="relative flex justify-between">
          {ORDER_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center px-1 text-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 sm:h-12 sm:w-12 ${
                  i <= active ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30" : "border-slate-200 bg-white text-slate-300"
                } ${i === active ? "animate-[pop_0.4s_ease-out]" : ""}`}
              >
                <step.icon size={16} className="sm:hidden" />
                <step.icon size={18} className="hidden sm:block" />
              </div>
              <p className={`mt-2 max-w-[4.5rem] text-[10px] font-semibold leading-tight transition-colors duration-300 sm:max-w-[7rem] sm:text-xs ${i <= active ? "text-slate-900" : "text-slate-400"}`}>{step.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-5 h-8 text-center">
          {ORDER_STEPS.map((step, i) => (
            <p
              key={step.label}
              className={`absolute inset-x-0 text-[11px] font-normal text-slate-400 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              {step.desc}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- product card ---------- */

function ProductCard({ product, delay, onAdd, onQuickView, isLoggedIn, onRequireAuth, liked, onToggleLike }) {
  const [qty, setQty] = useState(1);
  const [bursting, setBursting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [notifySent, setNotifySent] = useState(false);
  const [showNotifyPopup, setShowNotifyPopup] = useState(false);
  const outOfStock = product.stock === "out";

  const handleClick = () => {
    if (outOfStock || adding) return;
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      onAdd(product, qty);
      setBursting(true);
      setJustAdded(true);
      setTimeout(() => setBursting(false), 650);
      setTimeout(() => setJustAdded(false), 1100);
    }, 450);
  };

  function handleNotifyClick() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    setShowNotifyPopup(true);
    setTimeout(() => {
      setShowNotifyPopup(false);
      setNotifySent(true);
    }, 1800);
  }

  return (
    <Reveal delay={delay} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-900/10">
      <div
        className="relative mb-3 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-orange-50/60"
        style={{ perspective: "500px" }}
      >
        <span className={`absolute right-2.5 top-2.5 z-10 rounded-md px-2 py-0.5 text-[11px] font-medium ${outOfStock ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-700"}`}>
          {outOfStock ? "Stokta Yok" : "Stokta"}
        </span>
        <button onClick={() => onToggleLike(product.id)} aria-label="Favorilere ekle" className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/90 p-1.5 shadow-sm transition-transform duration-200 hover:scale-110 active:scale-90">
          <Heart size={13} className={liked ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
        </button>
        <div className="flex flex-col items-center">
          <div className="animate-[spin360_7s_linear_infinite] [transform-style:preserve-3d]"><ProductVial color={product.color} /></div>
          <div className="mt-1.5 h-1.5 w-9 rounded-full bg-slate-900/10 blur-[2px]" />
        </div>
        <button onClick={() => onQuickView(product.id)} className="absolute inset-0 flex items-center justify-center gap-1.5 bg-slate-900/0 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:bg-slate-900/40 group-hover:opacity-100">
          <Eye size={14} />
          Gözat
        </button>
        {justAdded && <span className="fly-up pointer-events-none absolute right-3 top-3 text-xs font-bold text-orange-600">+1</span>}
      </div>

      <p className="text-sm font-semibold text-slate-900">{product.name}</p>
      <p className="mb-2 text-xs text-slate-400">{product.batch}</p>

      <div className="mb-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
        ))}
        <span className="ml-1 text-[11px] text-slate-400">({product.reviews})</span>
      </div>

      <p className="mb-3 text-base font-semibold text-slate-900">{product.price}</p>

      <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
        {outOfStock ? (
          notifySent ? (
            <div className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} /> Bildirim Aktif
            </div>
          ) : (
            <div className="relative w-full">
              {showNotifyPopup && (
                <div className="pop-in absolute bottom-full left-0 right-0 z-20 mb-2 rounded-lg bg-slate-900 px-3 py-2.5 text-center text-xs font-semibold leading-snug text-white shadow-xl">
                  Stoğa gelince haber verilecektir ✓
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                </div>
              )}
              <button
                onClick={handleNotifyClick}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-orange-400 bg-orange-50 py-2.5 text-xs font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95"
              >
                <Bell size={14} /> Stoğa Gelince Haber Ver
              </button>
            </div>
          )
        ) : (
          <>
            <div className="flex items-center justify-center rounded-lg border border-slate-200 sm:justify-start">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-slate-500 transition hover:text-orange-600 active:scale-90" aria-label="Azalt">
                <Minus size={14} />
              </button>
              <span className="w-7 text-center text-sm font-medium tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2 text-slate-500 transition hover:text-orange-600 active:scale-90" aria-label="Arttır">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleClick}
              disabled={adding}
              className={`relative w-full flex-1 overflow-visible rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : adding
                  ? "cursor-wait bg-orange-400 text-white"
                  : "bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:brightness-105"
              }`}
            >
              <AddBurst show={bursting} />
              {adding ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Ekleniyor...
                </span>
              ) : justAdded ? (
                "Eklendi ✓"
              ) : (
                "Sepete Ekle"
              )}
            </button>
          </>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- auth modal ---------- */

const REGISTERED_EMAILS = ["test@alpeptide.com", "demo@alpeptide.com"];
const FAKE_ACCOUNTS = [
  { username: "testuser", email: "test@alpeptide.com", password: "Guvenli!9" },
  { username: "demo", email: "demo@alpeptide.com", password: "Demo!2024" },
];
const REGISTERED_USERNAMES = ["testuser", "demo"];

function hasSequentialDigits(str) {
  const digits = (str.match(/\d+/g) || []).join("");
  for (let i = 0; i + 2 < digits.length; i++) {
    const a = +digits[i], b = +digits[i + 1], c = +digits[i + 2];
    if ((b - a === 1 && c - b === 1) || (a - b === 1 && b - c === 1)) return true;
  }
  return false;
}

function isPasswordRelatedToIdentity(pw, name, username) {
  const pwLower = pw.trim().toLowerCase();
  if (!pwLower) return false;
  const parts = [username, ...(name || "").split(" ")].filter((p) => p && p.trim().length >= 3);
  return parts.some((part) => {
    const p = part.trim().toLowerCase();
    return pwLower.includes(p) || p.includes(pwLower);
  });
}

function getPasswordChecks(pw, name, username) {
  return {
    length: pw.length >= 8,
    letter: /[a-zA-Z]/.test(pw),
    punctuation: /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/.test(pw),
    noSequential: pw.length === 0 || !hasSequentialDigits(pw),
    noIdentity: !isPasswordRelatedToIdentity(pw, name, username),
  };
}

function getUsernameChecks(username) {
  return {
    noSpace: username.length === 0 || !/\s/.test(username),
    noTurkish: !/[çÇğĞıİöÖşŞüÜ]/.test(username),
  };
}

function isValidDisplayName(name) {
  // must contain at least two real letters — blocks "_", "-", "...", etc.
  const letters = name.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü]/g, "");
  return letters.length >= 2;
}

function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// brute-force escalation ladder — shared by the login/register email-code step
const BAN_LADDER_MS = [5 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 6 * 60 * 60 * 1000];

const ADDRESS_TYPES = [
  { key: "Ev", icon: Home },
  { key: "İş Yeri", icon: Briefcase },
  { key: "Arkadaş", icon: Users },
  { key: "Eş", icon: Heart },
];

const ORDER_STATUS_FLOW = [
  { key: "pending", label: "Siparişiniz bekleme aşamasındadır", icon: Clock },
  { key: "payment-review", label: "Siparişiniz ödeme onaylama aşamasındadır", icon: Bitcoin },
  { key: "payment-confirmed", label: "Siparişiniz ödemesi onaylanmıştır", icon: CheckCircle2 },
  { key: "preparing", label: "Siparişiniz hazırlanıyor", icon: Package },
  { key: "shipped", label: "Siparişiniz kargolanmıştır", icon: Truck },
];
const ORDER_STATUS_DELIVERED = { key: "delivered", label: "Teslim edildi", icon: CheckCircle2 };

const FAKE_ORDERS = [
  { id: "ALP-5521", date: "2026-09-10T14:20:00", status: "preparing", total: "3.140,00 TL", items: "Ürün B x1, Ürün D x2", address: "Deniz Aksoy, Merkez Mah. Atatürk Cad. No:14/3, Kadıköy, İstanbul", coupon: "ALP10" },
  { id: "ALP-5518", date: "2026-09-08T09:05:00", status: "shipped", total: "1.890,00 TL", items: "Ürün A x1", tracking: "PTT2026884213", address: "Deniz Aksoy, Merkez Mah. Atatürk Cad. No:14/3, Kadıköy, İstanbul", coupon: null },
  { id: "ALP-5490", date: "2026-08-22T11:40:00", status: "delivered", total: "2.450,00 TL", items: "Ürün C x1", address: "Deniz Aksoy, Bağdat Cad. No:210, Maltepe, İstanbul", coupon: "HIRO20" },
  { id: "ALP-5471", date: "2026-08-05T16:15:00", status: "delivered", total: "990,00 TL", items: "Ürün E x1", address: "Deniz Aksoy, Merkez Mah. Atatürk Cad. No:14/3, Kadıköy, İstanbul", coupon: null },
  { id: "ALP-5460", date: "2026-07-28T10:00:00", status: "delivered", total: "4.200,00 TL", items: "Ürün A x1, Ürün B x1", address: "Deniz Aksoy, Merkez Mah. Atatürk Cad. No:14/3, Kadıköy, İstanbul", coupon: "USDT5" },
];

const ASK_TOPICS = [
  { key: "Ürün Seçimi ve Kullanımı", icon: Package },
  { key: "Ürün Problemleri", icon: AlertCircle },
  { key: "Kargo Sorunları", icon: Truck },
  { key: "Teknik Destek", icon: HeadphonesIcon },
  { key: "Diğer", icon: HelpCircle },
];
const PAYMENT_TOPICS = [
  { key: "Ödemeyi Tamamladım", icon: CheckCircle2 },
  { key: "Ödeme Aşamasında Sorun Yaşadım", icon: AlertCircle },
  { key: "Kripto Adresini Bulamıyorum", icon: Bitcoin },
  { key: "Diğer", icon: HelpCircle },
];

const FAKE_TICKETS = {
  ask: [
    { id: "T-1042", subject: "Kargo Sorunları", date: "2026-09-05T10:20:00", status: "answered", messages: [
      { from: "user", text: "Kargom 5 gündür yolda görünüyor, kontrol edebilir misiniz?" },
      { from: "support", text: "Merhaba, kargonuz gümrükte kısa bir süre bekledi, yarın elinize ulaşması bekleniyor." },
    ] },
  ],
  payment: [
    { id: "T-1038", subject: "Ödemeyi Tamamladım", date: "2026-08-30T15:40:00", status: "closed", messages: [
      { from: "user", text: "ALP-5490 numaralı siparişim için ödemeyi gönderdim, işlem hash'i: 0x9f...23a" },
      { from: "support", text: "Ödemeniz onaylandı, siparişiniz hazırlanmaya başladı." },
    ] },
  ],
};

const TICKET_STATUS_INFO = {
  open: { label: "Açık", className: "bg-amber-100 text-amber-700" },
  answered: { label: "Yanıtlandı", className: "bg-sky-100 text-sky-700" },
  closed: { label: "Çözüldü", className: "bg-emerald-100 text-emerald-700" },
};

const FAKE_LOGIN_HISTORY = [
  { device: "Chrome — Windows", location: "İstanbul, TR", date: "2026-09-14T09:12:00", current: true },
  { device: "Safari — iPhone", location: "İstanbul, TR", date: "2026-09-10T21:03:00", current: false },
  { device: "Chrome — Windows", location: "İstanbul, TR", date: "2026-09-05T14:47:00", current: false },
];

function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore — storage unavailable */
  }
}

function genBackupCodes() {
  return Array.from({ length: 8 }, () => genCode());
}

function downloadInvoice(order) {
  const lines = [
    "ALPEPTIDE — SİPARİŞ FATURASI",
    "----------------------------------------",
    `Sipariş No: ${order.id}`,
    `Tarih: ${new Date(order.date).toLocaleString("tr-TR")}`,
    `Ürünler: ${order.items}`,
    order.coupon ? `Kupon: ${order.coupon}` : null,
    `Ödenen Tutar: ${order.total}`,
    `Teslimat Adresi: ${order.address}`,
    order.tracking ? `Kargo Takip No: ${order.tracking}` : null,
    "----------------------------------------",
    "Bu belge beta/test modunda otomatik oluşturulmuştur.",
  ].filter(Boolean);
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${order.id}-fatura.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const FAKE_NOTIFICATIONS = [
  { id: 1, icon: Package, text: "Ürün B stoğa girdi.", time: "2 saat önce", type: "product", productId: "B" },
  { id: 2, icon: Ticket, text: "T-1042 numaralı ticket'ınıza yanıt geldi.", time: "1 gün önce", type: "ticket", ticketMode: "ask", ticketId: "T-1042" },
  { id: 3, icon: Truck, text: "ALP-5518 numaralı siparişiniz kargoya verildi.", time: "3 gün önce", type: "order", orderId: "ALP-5518" },
];

function formatBanRemaining(ms) {
  const totalMin = Math.ceil(ms / 60000);
  if (totalMin >= 60) {
    const h = Math.floor(totalMin / 60), m = totalMin % 60;
    return m > 0 ? `${h} saat ${m} dakika` : `${h} saat`;
  }
  return `${totalMin} dakika`;
}

function maskName(name) {
  return name
    .split(" ")
    .map((part) => {
      const clean = part.replace(".", "");
      if (clean.length <= 1) return part;
      return clean[0] + "*".repeat(clean.length - 1) + (part.endsWith(".") ? "." : "");
    })
    .join(" ");
}

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ============ GERÇEK BACKEND BAĞLANTISI ============
const API_URL = import.meta.env.VITE_API_URL || "";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

const TOKEN_KEY = "alp_token";
function saveToken(token) { try { localStorage.setItem(TOKEN_KEY, token); } catch {} }
function loadToken() { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } }
function clearToken() { try { localStorage.removeItem(TOKEN_KEY); } catch {} }

/** Backend'e gerçek bir istek gönderir. Hata durumunda backend'in döndürdüğü mesajı fırlatır. */
async function apiRequest(path, body, { method = "POST", token } = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: method === "GET" ? undefined : JSON.stringify(body || {}),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data.error || "Bir hata oluştu.");
    err.data = data;
    err.status = res.status;
    throw err;
  }
  return data;
}

/**
 * Gerçek Google reCAPTCHA v2 (onay kutusu) widget'ı. Backend her giriş/kayıt
 * denemesinde bunu zorunlu tutuyor — bu yüzden sahte bir onay kutusu yerine
 * gerçek Google widget'ını yüklüyoruz.
 */
function RecaptchaWidget({ onVerify, resetKey }) {
  const containerRef = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return; // site key henüz girilmediyse widget'ı render etmeyi deneme

    function render() {
      if (!containerRef.current || !window.grecaptcha?.render) return;
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => onVerify(token),
        "expired-callback": () => onVerify(""),
      });
    }

    if (window.grecaptcha?.render) {
      render();
    } else {
      const existing = document.getElementById("recaptcha-script");
      if (!existing) {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
      const interval = setInterval(() => {
        if (window.grecaptcha?.render) {
          clearInterval(interval);
          render();
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  // Formun kendisi sıfırlanınca (örn. hatalı deneme sonrası) widget'ı da sıfırla
  useEffect(() => {
    if (widgetId.current != null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widgetId.current);
    }
  }, [resetKey]);

  if (!RECAPTCHA_SITE_KEY) {
    return (
      <p className="rounded-md border border-dashed border-amber-300 bg-amber-50 p-2 text-[11px] text-amber-700">
        reCAPTCHA site anahtarı henüz tanımlanmadı (VITE_RECAPTCHA_SITE_KEY).
      </p>
    );
  }
  return <div ref={containerRef} />;
}

function AuthModal({ open, onClose, tab, setTab, reason, onSuccess, onGoKvkk, onGoAbout }) {
  const [showPw, setShowPw] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  // login
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginRecaptchaToken, setLoginRecaptchaToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginStep, setLoginStep] = useState("form"); // "form" | "verify"
  const [loginLoading, setLoginLoading] = useState(false);

  // giriş sırasında sunucudan gelen bilgiler
  const [authUserId, setAuthUserId] = useState(null);
  const [secondFactorType, setSecondFactorType] = useState("email"); // "email" | "totp" | "register_verify"

  // login brute-force (wrong password): 5 attempts → 12h ban
  const [loginPwBanUntil, setLoginPwBanUntil] = useState(0);

  // forgot password (email or username)
  const [resetId, setResetId] = useState("");
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [resetCaptchaLoading, setResetCaptchaLoading] = useState(false);
  const [resetResult, setResetResult] = useState(null); // null | "sent" | "not_found"

  // register form
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");
  const [regRecaptchaToken, setRegRecaptchaToken] = useState("");
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [aboutChecked, setAboutChecked] = useState(false);
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const pwChecks = getPasswordChecks(regPw, regName, regUsername);
  const usernameChecks = getUsernameChecks(regUsername);

  // register → email verification step
  const [registerStep, setRegisterStep] = useState("form"); // "form" | "verify"
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const CODE_TIME_LIMIT = 300; // 5 minutes
  const [timeLeft, setTimeLeft] = useState(CODE_TIME_LIMIT);

  // giriş/kayıt kodu doğrulama sırasında sunucudan gelen ban durumu
  const [codeBanUntil, setCodeBanUntil] = useState(0);
  const [requiresRecovery, setRequiresRecovery] = useState(false);

  const inVerifyStep = (tab === "register" && registerStep === "verify") || (tab === "login" && loginStep === "verify");

  useEffect(() => {
    if (!inVerifyStep || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [inVerifyStep, timeLeft > 0]);

  // keep ban countdowns ticking
  useEffect(() => {
    if (loginPwBanUntil <= Date.now() && codeBanUntil <= Date.now()) return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [loginPwBanUntil, codeBanUntil]);

  useEffect(() => {
    if (!open || tab !== "register") setRegisterStep("form");
    if (!open || tab !== "login") setLoginStep("form");
  }, [open, tab]);

  /** Sunucudan dönen bir ban/kurtarma hatasını yerel state'e uygular. */
  function applyServerBan(errData) {
    if (errData?.requiresRecovery) setRequiresRecovery(true);
    else if (errData?.bannedUntil) setCodeBanUntil(new Date(errData.bannedUntil).getTime());
  }

  function handleResetCaptcha() {
    if (resetCaptcha) return;
    setResetCaptchaLoading(true);
    setTimeout(() => {
      setResetCaptchaLoading(false);
      setResetCaptcha(true);
    }, 700);
  }

  function handleResetSubmit() {
    if (!resetId.trim() || !resetCaptcha) return;
    const id = resetId.trim().toLowerCase();
    const known = REGISTERED_EMAILS.includes(id) || REGISTERED_USERNAMES.includes(id);
    setResetResult(known ? "sent" : "not_found");
  }

  function resetCodeUi() {
    setCodeInput("");
    setCodeError("");
    setTimeLeft(CODE_TIME_LIMIT);
  }

  async function handleLoginSubmit() {
    setLoginError("");
    if (Date.now() < loginPwBanUntil) return;
    if (!loginRecaptchaToken) { setLoginError("Lütfen robot olmadığınızı doğrulayın."); return; }
    if (!loginId.trim() || !loginPw) { setLoginError("Lütfen tüm alanları doldurun."); return; }

    setLoginLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        identifier: loginId.trim(),
        password: loginPw,
        recaptchaToken: loginRecaptchaToken,
      });
      setAuthUserId(data.userId);
      setSecondFactorType(data.secondFactor); // "email" | "totp" | "register_verify"
      resetCodeUi();
      setLoginStep("verify");
    } catch (err) {
      if (err.status === 429 && err.data?.bannedUntil) {
        setLoginPwBanUntil(new Date(err.data.bannedUntil).getTime());
        setLoginError("Çok fazla hatalı giriş denemesi. Hesabınız geçici olarak kısıtlandı.");
      } else if (err.data?.remaining != null) {
        setLoginError(`Kullanıcı adı/e-posta veya şifre hatalı. Kalan deneme hakkınız: ${err.data.remaining}.`);
      } else {
        setLoginError(err.message || "Giriş başarısız oldu.");
      }
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegisterSubmit() {
    setRegError("");
    if (requiresRecovery || Date.now() < codeBanUntil) { setRegisterStep("verify"); return; }
    if (!regName.trim() || !regUsername.trim() || !regEmail.trim() || !regPw) { setRegError("Lütfen tüm alanları doldurun."); return; }
    if (!kvkkChecked || !aboutChecked) { setRegError("Devam etmek için KVKK metnini ve Hakkımızda kısmını onaylamanız gerekir."); return; }
    if (!regRecaptchaToken) { setRegError("Lütfen robot olmadığınızı doğrulayın."); return; }
    const uChecks = getUsernameChecks(regUsername);
    if (!uChecks.noSpace) { setRegError("Kullanıcı adı birleşik olmalıdır, boşluk içeremez."); return; }
    if (!uChecks.noTurkish) { setRegError("Kullanıcı adı Türkçe karakter (ç, ğ, ı, ö, ş, ü) içeremez."); return; }
    const checks = getPasswordChecks(regPw, regName, regUsername);
    if (!checks.length) { setRegError("Şifreniz en az 8 karakter olmalıdır."); return; }
    if (!checks.letter) { setRegError("Şifreniz en az 1 harf içermelidir."); return; }
    if (!checks.punctuation) { setRegError("Şifreniz en az 1 noktalama işareti içermelidir (örn. ! . _ -)."); return; }
    if (!checks.noSequential) { setRegError("Şifrenizde ardışık sayılar (örn. 123, 456) kullanılamaz."); return; }
    if (!checks.noIdentity) { setRegError("Şifreniz; kullanıcı adınız veya adınızla bağlantılı olamaz."); return; }

    setRegLoading(true);
    try {
      const data = await apiRequest("/auth/register", {
        fullName: regName.trim(),
        username: regUsername.trim(),
        email: regEmail.trim(),
        password: regPw,
        recaptchaToken: regRecaptchaToken,
        kvkkAccepted: kvkkChecked,
        aboutAccepted: aboutChecked,
      });
      setAuthUserId(data.userId);
      resetCodeUi();
      setRegisterStep("verify");
    } catch (err) {
      setRegError(err.message || "Kayıt başarısız oldu.");
    } finally {
      setRegLoading(false);
    }
  }

  /** Kayıt e-posta doğrulama adımı (tab === "register") */
  async function handleVerifySubmit() {
    setVerifyLoading(true);
    try {
      const data = await apiRequest("/auth/register/verify", { userId: authUserId, code: codeInput.trim() });
      saveToken(data.token);
      onSuccess(data.user);
    } catch (err) {
      if (err.data?.error === "requires_recovery") { setRequiresRecovery(true); return; }
      applyServerBan(err.data);
      setCodeError("Kod yanlış.");
    } finally {
      setVerifyLoading(false);
    }
  }

  /** Giriş ikinci adımı (tab === "login") — e-posta kodu, TOTP veya (doğrulanmamış hesap için) kayıt kodu olabilir */
  async function handleLoginVerifySubmit() {
    setVerifyLoading(true);
    try {
      const path = secondFactorType === "totp" ? "/auth/login/verify-totp"
        : secondFactorType === "register_verify" ? "/auth/register/verify"
        : "/auth/login/verify";
      const payload = secondFactorType === "totp"
        ? { userId: authUserId, token: codeInput.trim() }
        : { userId: authUserId, code: codeInput.trim() };
      const data = await apiRequest(path, payload);
      saveToken(data.token);
      onSuccess(data.user);
    } catch (err) {
      if (err.data?.error === "requires_recovery") { setRequiresRecovery(true); return; }
      applyServerBan(err.data);
      setCodeError(secondFactorType === "totp" ? "Kod yanlış." : "Kod yanlış.");
    } finally {
      setVerifyLoading(false);
    }
  }

  async function handleResendCode() {
    try {
      const path = tab === "register" || secondFactorType === "register_verify" ? "/auth/register/resend" : "/auth/login/resend";
      await apiRequest(path, { userId: authUserId });
      resetCodeUi();
    } catch (err) {
      setCodeError(err.message || "Kod tekrar gönderilemedi.");
    }
  }

  if (!open) return null;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  if (tab === "forgot") {
    return (
      <div className="overlay-in fixed inset-0 z-[70] grid place-items-center p-3 sm:p-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="modal-in relative max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:p-6">
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600" aria-label="Kapat"><X size={18} /></button>
          <div className="mx-auto mb-3 flex justify-center"><Hiro className="h-11 w-11" /></div>

          <button onClick={() => { setTab("login"); setResetResult(null); }} className="mb-3 flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-orange-600">
            <ChevronLeft size={14} /> Girişe dön
          </button>
          <h2 className="mb-1 text-lg font-bold text-slate-900">Şifremi Unuttum</h2>
          <p className="mb-4 text-sm text-slate-500">Kullanıcı adınızı veya e-posta adresinizi girin, sıfırlama bağlantısını gönderelim.</p>

          {resetResult === "sent" ? (
            <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>Hesabınıza kayıtlı e-posta adresine bir şifre sıfırlama bağlantısı gönderilmiştir.</p>
            </div>
          ) : resetResult === "not_found" ? (
            <div className="flex items-start gap-2.5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>Bu kullanıcı adı veya e-posta adresi sistemimize kayıtlı değildir.</p>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <label className="mb-1 block text-xs font-medium text-slate-500">Kullanıcı Adınız veya ornek@mail.com</label>
                <div className="relative">
                  <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={resetId} onChange={(e) => setResetId(e.target.value)} className="w-full rounded-md border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-orange-500" placeholder="Kullanıcı Adınız veya E-Posta Adresiniz" />
                </div>
              </div>

              <div className="mb-4 flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <button
                  onClick={handleResetCaptcha}
                  aria-label="Robot değilim"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${resetCaptcha ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-white hover:border-orange-400"}`}
                >
                  {resetCaptchaLoading ? (
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-orange-500" />
                  ) : resetCaptcha ? (
                    <CheckCircle2 size={14} className="text-white" />
                  ) : null}
                </button>
                <span className="text-left text-xs font-medium text-slate-600">Ben bir robot değilim</span>
                <ShieldCheck size={16} className="ml-auto text-slate-300" />
              </div>

              <button
                onClick={handleResetSubmit}
                disabled={!resetId.trim() || !resetCaptcha}
                className="w-full rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
              >
                Şifre Sıfırlama İsteği Gönder
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (inVerifyStep) {
    const isBanned = Date.now() < codeBanUntil;
    return (
      <div className="overlay-in fixed inset-0 z-[70] grid place-items-center p-3 sm:p-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="modal-in relative max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:p-6">
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600" aria-label="Kapat"><X size={18} /></button>
          <div className="mx-auto mb-3 flex justify-center"><Hiro className="h-11 w-11" /></div>

          {requiresRecovery ? (
            <>
              <h2 className="mb-2 text-center text-lg font-bold text-red-600">Hesap Güvenliği Nedeniyle Kilitlendi</h2>
              <p className="mb-4 text-center text-sm text-slate-600">
                Çok sayıda hatalı doğrulama denemesi tespit edildi. Devam edebilmek için hesap kurtarma (şifre sıfırlama) işlemini tamamlamanız gerekmektedir.
              </p>
              <button
                onClick={() => { setRequiresRecovery(false); setCodeFailCount(0); setTab("forgot"); }}
                className="w-full rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                Hesabımı Kurtar
              </button>
            </>
          ) : isBanned ? (
            <>
              <h2 className="mb-2 text-center text-lg font-bold text-red-600">Geçici Olarak Kısıtlandı</h2>
              <p className="mb-2 text-center text-sm text-slate-600">Çok fazla hatalı/zaman aşımına uğramış doğrulama denemesi nedeniyle bu işlem geçici olarak kısıtlandı.</p>
              <p className="text-center text-sm font-semibold text-slate-800">Kalan süre: {formatBanRemaining(codeBanUntil - nowTick)}</p>
            </>
          ) : (
            <>
              <h2 className="mb-1 text-center text-lg font-bold text-slate-900">
                {secondFactorType === "totp" ? "Authenticator Kodu" : tab === "login" ? "Girişi Doğrulayın" : "E-postanızı Doğrulayın"}
              </h2>
              <p className="mb-5 text-center text-sm text-slate-500">
                {secondFactorType === "totp" ? (
                  "Google Authenticator uygulamanızdaki 6 haneli kodu giriniz."
                ) : (
                  <>
                    <strong>{tab === "login" ? loginId : regEmail}</strong> ile ilişkili e-posta adresinize doğrulama kodu gönderildi. Lütfen kontrol ediniz.
                  </>
                )}
              </p>

              <div className="mb-2">
                <label className="mb-1 block text-xs font-medium text-slate-500">Doğrulama Kodu</label>
                <input
                  value={codeInput}
                  onChange={(e) => { setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6)); setCodeError(""); }}
                  maxLength={6}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-center text-lg tracking-widest outline-none focus:border-orange-500"
                  placeholder="••••••"
                />
              </div>
              {codeError && <p className="mb-2 text-xs font-medium text-red-600">{codeError}</p>}

              {secondFactorType !== "totp" && (
                <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock size={13} />
                  {timeLeft > 0 ? <span>Kalan süre: {minutes}:{seconds}</span> : <span className="text-red-600">Kodun süresi doldu</span>}
                </div>
              )}

              <button
                onClick={tab === "login" ? handleLoginVerifySubmit : handleVerifySubmit}
                disabled={codeInput.length !== 6 || verifyLoading || (secondFactorType !== "totp" && timeLeft === 0)}
                className="w-full rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
              >
                {verifyLoading ? "Doğrulanıyor..." : tab === "login" ? "Doğrula ve Giriş Yap" : "Doğrula ve Hesabı Oluştur"}
              </button>

              {secondFactorType !== "totp" && timeLeft === 0 && (
                <button onClick={handleResendCode} className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-orange-600 hover:underline">
                  <RefreshCw size={13} /> Kodu Yeniden Gönder
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-in fixed inset-0 z-[70] grid place-items-center p-3 sm:p-4" style={{ backgroundColor: "#0f172a" }}>
      <div className="modal-in relative max-h-[88vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-3.5 shadow-2xl sm:max-h-[90vh] sm:p-6">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600" aria-label="Kapat"><X size={18} /></button>
        <div className={`mx-auto flex justify-center ${tab === "register" ? "mb-1.5" : "mb-2"}`}><Hiro className={tab === "register" ? "h-8 w-8" : "h-11 w-11"} /></div>

        {reason === "notify" && (
          <div className="mb-3 rounded-lg bg-orange-50 px-3 py-2 text-center text-xs font-medium text-orange-700">
            Stok bildirimleri yalnızca üyelerimize özeldir. Devam etmek için giriş yapın veya kayıt olun.
          </div>
        )}
        {reason === "review" && (
          <div className="mb-3 rounded-lg bg-orange-50 px-3 py-2 text-center text-xs font-medium text-orange-700">
            Yorum yazabilmek için giriş yapmanız ve hesabınızın onaylanmış olması gerekir.
          </div>
        )}

        <div className="mb-3 flex rounded-full bg-slate-100 p-1">
          <button onClick={() => setTab("login")} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all duration-200 ${tab === "login" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}>Giriş Yap</button>
          <button onClick={() => setTab("register")} className={`flex-1 rounded-full py-2 text-sm font-semibold transition-all duration-200 ${tab === "register" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}`}>Kayıt Ol</button>
        </div>

        {tab === "register" && (
          <>
            <div className="mb-2">
              <label className="mb-1 block text-xs font-medium text-slate-500">Ad Soyad</label>
              <input value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500" placeholder="Adınız Soyadınız" />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-xs font-medium text-slate-500">Kullanıcı Adı</label>
              <div className="relative">
                <User size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={regUsername} onChange={(e) => setRegUsername(e.target.value)} className="w-full rounded-md border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-orange-500" placeholder="Kullanıcı Adınız" />
              </div>
              <p className={`mt-0.5 text-[10px] ${regUsername && (!usernameChecks.noSpace || !usernameChecks.noTurkish) ? "text-red-600" : "text-slate-400"}`}>
                Birleşik olmalı, boşluk veya Türkçe karakter (ç, ğ, ı, ö, ş, ü) içermemelidir.
              </p>
            </div>
          </>
        )}

        <div className="mb-2.5">
          <label className="mb-1 block text-xs font-medium text-slate-500">{tab === "register" ? "E-posta Adresi" : "Kullanıcı Adınız veya ornek@mail.com"}</label>
          <div className="relative">
            <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={tab === "register" ? regEmail : loginId}
              onChange={(e) => (tab === "register" ? setRegEmail(e.target.value) : setLoginId(e.target.value))}
              className="w-full rounded-md border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-orange-500"
              placeholder={tab === "register" ? "ornek@mail.com" : "Kullanıcı Adınız veya E-Posta Adresiniz"}
            />
          </div>
        </div>
        <div className="mb-1.5">
          <label className="mb-1 block text-xs font-medium text-slate-500">Şifre</label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showPw ? "text" : "password"} value={tab === "register" ? regPw : loginPw} onChange={(e) => (tab === "register" ? setRegPw(e.target.value) : setLoginPw(e.target.value))} className="w-full rounded-md border border-slate-200 py-2.5 pl-9 pr-9 text-sm outline-none focus:border-orange-500" placeholder="*********" />
            <button onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Şifreyi göster/gizle" type="button">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {tab === "register" && (
          <ul className="mb-1.5 mt-1 space-y-0.5 text-[10px]">
            {[
              [pwChecks.length, "En az 8 karakter"],
              [pwChecks.letter, "En az 1 harf"],
              [pwChecks.punctuation, "En az 1 noktalama işareti (! . _ - vb.)"],
              [pwChecks.noSequential, "Ardışık sayı içermemeli (123, 456 vb.)"],
              [pwChecks.noIdentity, "Kullanıcı adı veya adınızla bağlantılı olmamalı"],
            ].map(([ok, label], i) => (
              <li key={i} className={`flex items-center gap-1.5 ${ok ? "text-emerald-600" : "text-slate-400"}`}>
                {ok ? <CheckCircle2 size={12} /> : <span className="ml-0.5 h-1 w-1 rounded-full bg-slate-300" />}
                {label}
              </li>
            ))}
          </ul>
        )}

        {tab === "login" && (
          <div className="mb-3 mt-2.5 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-3.5 w-3.5 accent-orange-500" />
              <CheckCircle2 size={13} className="text-slate-300" />
              Kullanıcı bilgilerimi hatırla
            </label>
            <button onClick={() => setTab("forgot")} className="text-xs font-medium text-orange-600 hover:underline">Şifremi Unuttum</button>
          </div>
        )}

        {tab === "login" && Date.now() < loginPwBanUntil && (
          <div className="mb-3 flex items-start gap-2 rounded-md bg-red-50 p-2.5 text-xs text-red-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>Hesabınız çok fazla hatalı giriş denemesi nedeniyle kısıtlandı. Kalan süre: {formatBanRemaining(loginPwBanUntil - nowTick)}</span>
          </div>
        )}
        {tab === "login" && loginError && Date.now() >= loginPwBanUntil && (
          <div className="mb-3 flex items-start gap-2 rounded-md bg-red-50 p-2.5 text-xs text-red-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" /> <span>{loginError}</span>
          </div>
        )}

        {tab === "register" && (
          <div className="mb-2 mt-2 space-y-1.5">
            <label className="flex items-start gap-2 text-xs leading-snug text-slate-600">
              <input type="checkbox" checked={kvkkChecked} onChange={(e) => setKvkkChecked(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-orange-500" />
              <span className="flex items-start gap-1">
                <FileCheck size={13} className="mt-0.5 shrink-0 text-slate-300" />
                <span><a href="/kvkk" onClick={(e) => { e.preventDefault(); onGoKvkk(); }} className="font-semibold text-orange-600 hover:underline">KVKK metnini</a> okudum ve anladığımı onaylıyorum.</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs leading-snug text-slate-600">
              <input type="checkbox" checked={aboutChecked} onChange={(e) => setAboutChecked(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-orange-500" />
              <span className="flex items-start gap-1">
                <Info size={13} className="mt-0.5 shrink-0 text-slate-300" />
                <span><a href="/hakkimizda" onClick={(e) => { e.preventDefault(); onGoAbout(); }} className="font-semibold text-orange-600 hover:underline">Hakkımızda</a> kısmını okudum ve onaylıyorum.</span>
              </span>
            </label>
          </div>
        )}

<div className="mb-2.5 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2">
          <RecaptchaWidget
            key={tab}
            resetKey={tab}
            onVerify={(token) => (tab === "register" ? setRegRecaptchaToken(token) : setLoginRecaptchaToken(token))}
          />
        </div>

        {tab === "register" && regError && (
          <div className="mb-3 flex items-start gap-2 rounded-md bg-red-50 p-2.5 text-xs text-red-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" /> <span>{regError}</span>
          </div>
        )}

        <button
          onClick={tab === "register" ? handleRegisterSubmit : handleLoginSubmit}
          disabled={tab === "register" ? (regLoading || !regRecaptchaToken) : (loginLoading || !loginRecaptchaToken || Date.now() < loginPwBanUntil)}
          className="mt-1 w-full rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
        >
          {tab === "register" ? (regLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur") : (loginLoading ? "Giriş yapılıyor..." : "Giriş Yap")}
        </button>
        <p className="mt-4 text-center text-xs text-slate-500">
          {tab === "login" ? (<>Hesabın yok mu? <button onClick={() => setTab("register")} className="font-semibold text-orange-600 hover:underline">Kayıt Ol</button></>) : (<>Zaten hesabın var mı? <button onClick={() => setTab("login")} className="font-semibold text-orange-600 hover:underline">Giriş Yap</button></>)}
        </p>
      </div>
    </div>
  );
}

/* ---------- age gate ---------- */

function WelcomeRedirect({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1400;
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(id);
        setTimeout(onDone, 200);
      }
    }, 30);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 p-6">
      <div className="w-full max-w-xs text-center">
        <div className="mx-auto mb-4 flex justify-center"><Hiro className="h-14 w-14" /></div>
        <p className="mb-1 text-lg font-bold text-white">Hoş geldiniz!</p>
        <p className="mb-4 text-sm text-slate-300">Yönlendiriliyorsunuz...</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-orange-500 transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1.5 text-xs font-medium text-slate-400">%{progress}</p>
      </div>
    </div>
  );
}

function AgeGate({ onConfirm }) {
  const [blocked, setBlocked] = useState(false);
  if (blocked) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-6 text-center">
        <div>
          <ShieldAlert className="mx-auto mb-4 text-orange-500" size={40} />
          <p className="text-lg font-semibold text-white">Bu içeriğe erişim için 18 yaşından büyük olmanız gerekir.</p>
          <p className="mt-2 text-sm text-slate-400">Üzgünüz, siteye erişiminiz kısıtlandı.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6">
      <div className="pop-in w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
        <HiroInspector className="mx-auto mb-4 h-28 w-28" />
        <p className="text-base font-bold text-slate-900">Yaş Doğrulama</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Alpeptide'in sunduğu içerik ve ürünlere erişebilmek için 18 yaşından büyük olduğunuzu onaylamanız gerekir.</p>
        <div className="mt-6 flex flex-col gap-2.5">
          <button onClick={onConfirm} className="w-full rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95">18 yaşından büyüğüm</button>
          <button onClick={() => setBlocked(true)} className="w-full rounded-md border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">18 yaşından küçüğüm</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- corporate / B2B ---------- */

function CorporateSection() {
  return (
    <section id="kurumsal-alim" className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
      <Reveal><h2 className="mb-1 text-lg font-bold text-slate-900">Kurumsal Alım & Toplu Sipariş</h2></Reveal>
      <Reveal delay={40}><p className="mb-8 max-w-2xl text-sm text-slate-500">Laboratuvarlar ve kurumsal müşteriler için miktar bazlı fiyatlandırma sunuyoruz.</p></Reveal>

      <Reveal className="rounded-xl border border-slate-200 p-6">
        <p className="mb-4 text-sm font-semibold text-slate-900">Miktar Bazlı Fiyatlandırma</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VOLUME_TIERS.map((t) => (
            <div key={t.range} className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 transition-colors hover:border-orange-200">
              <p className="text-sm font-medium text-slate-800">{t.range}</p>
              <p className="mt-1 text-xs text-slate-400">{t.note}</p>
              <span className="mt-3 inline-block whitespace-nowrap rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">{t.discount}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">Fiyatlar örnek amaçlıdır; kesin teklif için satış ekibimizle görüşün.</p>
      </Reveal>
    </section>
  );
}

/* ---------- product verification (replaces newsletter) ---------- */

const VERIFY_COUNTS = { "482901": 3, "119234": 7, "550217": 1 };


const FAKE_REVIEWS = [
  { name: "Caner Y.", rating: 5, text: "Analiz raporuyla birlikte geldi, saflık oranı belirtildiği gibiydi." },
  { name: "Selin K.", rating: 4, text: "Kargo hızlıydı, paketleme özenliydi." },
  { name: "Burak T.", rating: 5, text: "Fiyat/performans olarak beklentimi karşıladı, tekrar sipariş vereceğim." },
];

function VerifySection() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null); // null | "valid" | "invalid"
  const [count, setCount] = useState(null);
  const [counts, setCounts] = useState(VERIFY_COUNTS);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  function formatCode(raw) {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    return digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3)}` : digits;
  }

  function handleCaptcha() {
    if (captchaChecked) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 700);
  }

  function handleVerify() {
    const digitsOnly = code.replace(/\D/g, "");
    if (digitsOnly.length !== 6 || !captchaChecked) return;
    const isValid = Boolean(counts[digitsOnly]);
    setResult(isValid ? "valid" : "invalid");
    setCounts((c) => {
      const next = { ...c, [digitsOnly]: (c[digitsOnly] || 0) + 1 };
      setCount(next[digitsOnly]);
      return next;
    });
  }

  return (
    <section className="bg-white">
      <Reveal className="mx-auto max-w-2xl px-4 sm:px-6 py-14 text-center">
        <p className="text-base font-bold text-slate-900">Ürün Doğrulama</p>
        <p className="mt-1 text-sm text-slate-500">Şişe üzerindeki seri kodu girerek ürününüzün orijinalliğini kontrol edin.</p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <select
            value={productId}
            onChange={(e) => { setProductId(e.target.value); setResult(null); }}
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500 sm:w-40"
          >
            {PRODUCTS.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
          </select>
          <input
            value={code}
            onChange={(e) => { setCode(formatCode(e.target.value)); setResult(null); }}
            placeholder="111-111"
            maxLength={7}
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-center text-sm tracking-wider outline-none focus:border-orange-500 sm:w-32"
          />
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-xs items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <button
            onClick={handleCaptcha}
            aria-label="Robot değilim"
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
              captchaChecked ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-white hover:border-orange-400"
            }`}
          >
            {captchaLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-orange-500" />
            ) : captchaChecked ? (
              <CheckCircle2 size={14} className="text-white" />
            ) : null}
          </button>
          <span className="text-left text-xs font-medium text-slate-600">Ben bir robot değilim</span>
          <ShieldCheck size={16} className="ml-auto text-slate-300" />
        </div>

        <button
          onClick={handleVerify}
          disabled={code.replace(/\D/g, "").length !== 6 || !captchaChecked}
          className="mt-4 w-full max-w-xs rounded-md bg-gradient-to-b from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          Doğrula
        </button>

        {result && (
          <div className={`pop-in mt-5 inline-flex flex-col items-center gap-1 rounded-lg px-5 py-3 text-sm font-medium ${result === "valid" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
            <span className="flex items-center gap-1.5">
              {result === "valid" ? <CheckCircle2 size={15} /> : <X size={15} />}
              {result === "valid" ? "Kod Doğrulandı ✓" : "Kod Geçersiz ✗"}
            </span>
            {result === "valid" && <span className="text-xs font-normal text-emerald-600">Bu kod şimdiye kadar {count} kez sorgulandı.</span>}
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* ---------- about page ---------- */

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Hakkımızda</h1></Reveal>
        <Reveal delay={40}><p className="mx-auto mb-6 max-w-2xl text-center text-[15px] text-slate-500">Alpeptide'in hikayesi, misyonu ve neden bu fiyatlarla çalıştığımız hakkında.</p></Reveal>

        <Reveal delay={60} className="mx-auto max-w-2xl">
          <TrustRow items={[
            { icon: EyeOff, label: "Gizlilik" },
            { icon: ShieldCheck, label: "Güvenlik" },
            { icon: Award, label: "Kalite" },
          ]} />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-10">
          <Reveal>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Biz Kimiz?</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">
              Alpeptide, laboratuvarlar ve araştırma amaçlı çalışan kişiler için kurulmuş bağımsız bir tedarik platformudur. Sunduğumuz her partiyi, sevkiyat öncesinde bağımsız laboratuvarlarda HPLC ile test ediyoruz.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Ne Yapmaya Çalışıyoruz?</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">
              Amacımız, araştırma kimyasallarına erişimi şeffaf, izlenebilir ve güvenilir hale getirmek. Her siparişte analiz raporlarına sipariş öncesinde açıkça ulaşabilmenizi sağlıyoruz.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Fiyatlarımız Neden Bu Kadar Uygun?</h2>
            <p className="text-[15px] leading-relaxed text-slate-500">
              Aracı sayısını azaltıp doğrudan tedarik modeliyle çalışarak maliyetleri düşük tutuyoruz — kaliteden ödün vermeden bu avantajı doğrudan sizinle paylaşıyoruz.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "Siparişim ne kadar sürede kargoya verilir?", a: "Siparişleriniz ödeme onayının ardından ortalama 1-2 iş günü içinde kargoya teslim edilir." },
  { q: "Analiz raporlarına nasıl ulaşabilirim?", a: "Her ürünün parti numarasına ait HPLC analiz raporuna sipariş öncesinde ürün sayfasından ulaşabilirsiniz." },
  { q: "Hangi ödeme yöntemlerini kullanabilirim?", a: "Sitemizde yalnızca kripto para (USDT, BTC, ETH) ile ödeme kabul edilmektedir." },
  { q: "Ürünüm elime geçmeden önce iptal edebilir miyim?", a: "Kargoya verilmeden önceki siparişler hesabım bölümünden iptal edilebilir." },
  { q: "Toplu/kurumsal alım için indirim var mı?", a: "Evet, miktar bazlı fiyatlandırma tablomuza ana sayfadaki kurumsal alım bölümünden ulaşabilirsiniz." },
];

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Sık Sorulan Sorular</h1></Reveal>
        <Reveal delay={40}><p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-slate-500">Merak ettiklerinizin çoğu burada — bulamazsanız Hiro ile sohbet edebilirsiniz.</p></Reveal>

        <Reveal delay={60}>
          <TrustRow items={[
            { icon: Ticket, label: "Destek Bileti" },
            { icon: Bell, label: "Ödeme Bildirimi" },
            { icon: HeadphonesIcon, label: "Canlı Destek" },
          ]} />
        </Reveal>

        <div className="space-y-5">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 70} className={`overflow-hidden rounded-xl border transition-colors duration-300 ${open ? "border-orange-300 bg-orange-50/40" : "border-slate-200"}`}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open ? "rotate-180 border-orange-500 bg-orange-500 text-white" : "border-slate-300 text-slate-500"}`}>
                    {open ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                <div className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-relaxed text-slate-500">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const BLOG_PAGE_SIZE = 6;

function BlogPage({ onOpenPost }) {
  const [pageNum, setPageNum] = useState(1);
  const totalPages = Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE);
  const start = (pageNum - 1) * BLOG_PAGE_SIZE;
  const posts = BLOG_POSTS.slice(start, start + BLOG_PAGE_SIZE);

  function goToPage(n) {
    const clamped = Math.max(1, Math.min(totalPages, n));
    setPageNum(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Blog</h1></Reveal>
        <Reveal delay={40}><p className="mx-auto mb-10 max-w-2xl text-center text-[15px] text-slate-500">Araştırma kimyasalları, laboratuvar uygulamaları ve kalite süreçleri üzerine yazılar.</p></Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 60}>
              <button onClick={() => onOpenPost(post.id)} className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 text-left transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                  <FileText className="text-orange-300" size={36} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 font-medium text-orange-600">{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="mb-1.5 text-base font-bold leading-snug text-slate-900">{post.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(pageNum - 1)}
              disabled={pageNum === 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
              aria-label="Önceki sayfa"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goToPage(n)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${n === pageNum ? "bg-orange-500 text-white" : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => goToPage(pageNum + 1)}
              disabled={pageNum === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
              aria-label="Sonraki sayfa"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function BlogPostPage({ post, onBack, isLoggedIn, onRequireAuth }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!post) return null;

  function handleSubmit() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    if (!comment.trim() || rating === 0) return;
    setSubmitted(true);
    setComment("");
    setRating(0);
  }

  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <Reveal>
          <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-orange-600">
            <ChevronLeft size={16} /> Blog'a dön
          </button>
        </Reveal>

        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-orange-50 px-2 py-0.5 font-medium text-orange-600">{post.tag}</span>
            <span>{post.date}</span>
          </div>
          <h1 className="mb-6 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">{post.title}</h1>
        </Reveal>

        <Reveal delay={40} className="mb-6 flex h-56 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 sm:h-72">
          <FileText className="text-orange-300" size={48} />
        </Reveal>

        <Reveal delay={80}><p className="mb-8 text-[15px] leading-relaxed text-slate-600">{post.intro}</p></Reveal>

        <Reveal delay={120} className="mb-8 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 sm:h-64">
          <FileText className="text-orange-300" size={40} />
        </Reveal>

        <Reveal delay={160}>
          <p className="mb-2 text-[15px] leading-relaxed text-slate-600">{post.development}</p>
          <p className="mb-10 text-[15px] leading-relaxed text-slate-600">{post.conclusion}</p>
        </Reveal>

        <Reveal delay={200} className="border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Yorum Yap ve Değerlendir</h2>

          {!isLoggedIn ? (
            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Yorum yapabilmek ve değerlendirme bırakabilmek için onaylı üye olmanız gerekir.</p>
              <button onClick={onRequireAuth} className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600">Giriş Yap / Üye Ol</button>
            </div>
          ) : submitted ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">Yorumunuz için teşekkürler! Değerlendirmeniz kaydedildi.</p>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} aria-label={`${n} yıldız`}>
                    <Star size={20} className={n <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bu yazı hakkında düşüncelerinizi paylaşın..."
                rows={3}
                className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none transition-colors focus:border-orange-500"
              />
              <button onClick={handleSubmit} className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600">Gönder</button>
            </div>
          )}
        </Reveal>
      </section>
    </div>
  );
}

function ShopPage({ onAdd, onQuickView, isLoggedIn, onRequireAuth, favorites, onToggleLike }) {
  const [activeForm, setActiveForm] = useState("Tümünü Gör");
  const [activePurpose, setActivePurpose] = useState("Tümü");
  const [activeSort, setActiveSort] = useState("popular");
  const [activePriceRange, setActivePriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const SHOP_PAGE_SIZE = 12;

  const filtered = (() => {
    const range = PRICE_RANGES.find((r) => r.key === activePriceRange);
    let arr = SHOP_PRODUCTS.filter((p) =>
      (activeForm === "Tümünü Gör" || p.form === activeForm) &&
      (activePurpose === "Tümü" || p.purpose === activePurpose) &&
      range.test(parsePrice(p.price))
    );
    if (activeSort === "price-asc") arr = [...arr].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (activeSort === "price-desc") arr = [...arr].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (activeSort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    else arr = [...arr].sort((a, b) => b.reviews - a.reviews);
    return arr;
  })();

  const totalPages = Math.max(1, Math.ceil(filtered.length / SHOP_PAGE_SIZE));
  const safePageNum = Math.min(pageNum, totalPages);
  const pageStart = (safePageNum - 1) * SHOP_PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + SHOP_PAGE_SIZE);

  function goToPage(n) {
    setPageNum(Math.max(1, Math.min(totalPages, n)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateFilter(setter, value) {
    setter(value);
    setPageNum(1);
  }

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Mağaza</h1></Reveal>
        <Reveal delay={40}><p className="mx-auto mb-8 max-w-2xl text-center text-[15px] text-slate-500">Tüm ürünlerimizi buradan filtreleyerek inceleyebilirsiniz.</p></Reveal>

        <div className="mb-8 grid grid-cols-4 gap-2 sm:gap-4">
          {FORM_FILTERS.map(({ icon: Icon, name }, i) => {
            const selected = activeForm === name;
            return (
              <Reveal key={name} delay={i * 70}>
                <button
                  onClick={() => updateFilter(setActiveForm, name)}
                  aria-pressed={selected}
                  className={`group flex w-full flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 sm:items-start sm:gap-3 sm:p-5 sm:text-left ${
                    selected
                      ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-900/10"
                      : "border-slate-200 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-900/5"
                  }`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-10 sm:w-10 ${selected ? "bg-orange-500" : "bg-orange-50"}`}>
                    <Icon size={16} className={selected ? "text-white" : "text-orange-500"} />
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-slate-900 sm:text-sm">{name}</span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">{filtered.length} ürün</p>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${showFilters ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-700 hover:border-slate-400"}`}
          >
            <Filter size={13} /> Filtrele ve Sırala
            {(activePriceRange !== "all" || activePurpose !== "Tümü" || activeSort !== "popular") && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
          </button>
        </Reveal>

        <div className={`overflow-hidden transition-all duration-300 ${showFilters ? "mb-6 max-h-[22rem]" : "max-h-0"}`}>
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <span className="mr-1 text-xs font-medium text-slate-400">Sırala:</span>
            {SORT_FILTERS.map((f) => (
              <button key={f.key} onClick={() => updateFilter(setActiveSort, f.key)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${activeSort === f.key ? "border-orange-500 bg-orange-500 text-white" : "border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"}`}>{f.label}</button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="mr-1 flex items-center gap-1 text-xs font-medium text-slate-400">Kategori:</span>
            {PURPOSE_FILTERS.map(({ icon: Icon, name }) => (
              <button key={name} onClick={() => updateFilter(setActivePurpose, name)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${activePurpose === name ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                <Icon size={12} /> {name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="mr-1 text-xs font-medium text-slate-400">Fiyat:</span>
            {PRICE_RANGES.map((r) => (
              <button key={r.key} onClick={() => updateFilter(setActivePriceRange, r.key)} className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${activePriceRange === r.key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r.label}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-14 text-center">
            <Package className="mx-auto mb-3 text-slate-300" size={32} />
            <p className="text-sm font-medium text-slate-500">Bu filtrelere uygun ürün bulunamadı.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {pageItems.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={Math.min(i, 8) * 60} onAdd={onAdd} onQuickView={onQuickView} isLoggedIn={isLoggedIn} onRequireAuth={onRequireAuth} liked={favorites.includes(product.id)} onToggleLike={onToggleLike} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button onClick={() => goToPage(safePageNum - 1)} disabled={safePageNum === 1} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600" aria-label="Önceki sayfa">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => goToPage(n)} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${n === safePageNum ? "bg-orange-500 text-white" : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"}`}>{n}</button>
                ))}
                <button onClick={() => goToPage(safePageNum + 1)} disabled={safePageNum === totalPages} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600" aria-label="Sonraki sayfa">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function ConfirmCodeCard({ pendingAction, code, input, setInput, error, timeLeft, onSubmit, isBanned, banRemaining, requiresRecovery, onRecover, onCancel }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-5">
      {requiresRecovery ? (
        <>
          <p className="mb-3 text-sm font-semibold text-red-600">Çok fazla hatalı deneme — hesap kurtarma gerekli.</p>
          <button onClick={onRecover} className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600">Hesabımı Kurtar</button>
        </>
      ) : isBanned ? (
        <p className="text-sm font-semibold text-red-600">Bu işlem geçici olarak kısıtlandı. Kalan süre: {banRemaining}</p>
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold text-slate-800">{pendingAction.label}</p>
          <p className="mb-3 rounded-md bg-white p-2 text-center text-[11px] text-slate-400">Beta / test modu — kodunuz: <strong className="text-slate-600">{code}</strong></p>
          <div className="mb-2 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} className="w-32 rounded-md border border-slate-200 px-3 py-2 text-center text-base tracking-widest outline-none focus:border-orange-500" placeholder="••••••" />
            <button onClick={onSubmit} disabled={input.length !== 6 || timeLeft === 0} className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40">Doğrula</button>
            <button onClick={onCancel} className="text-xs font-medium text-slate-400 hover:text-slate-600">Vazgeç</button>
          </div>
          {error && <p className="mb-1 text-xs font-medium text-red-600">{error}</p>}
          <p className="flex items-center gap-1 text-xs text-slate-500"><Clock size={12} /> {timeLeft > 0 ? `Kalan süre: ${minutes}:${seconds}` : "Kodun süresi doldu"}</p>
        </>
      )}
    </div>
  );
}

function AccordionItem({ icon: Icon, title, subtitle, open, onToggle, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50">
        <span className="flex items-center gap-3">
          <span className="icon-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500"><Icon size={17} /></span>
          <span>
            <span className="block text-sm font-semibold text-slate-800">{title}</span>
            {subtitle && <span className="block text-xs text-slate-500">{subtitle}</span>}
          </span>
        </span>
        {open ? <ChevronUp size={16} className="shrink-0 text-slate-400" /> : <ChevronDown size={16} className="shrink-0 text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[36rem]" : "max-h-0"}`}>
        <div className="border-t border-slate-100 p-5">{children}</div>
      </div>
    </div>
  );
}

function UserPanelPage({ section, setSection, pushToast, favorites, recentlyViewed, onToggleLike, onQuickView, extraOrders, orderHistoryCleared, setOrderHistoryCleared, deletedTicketIds, setDeletedTicketIds, panelTarget, clearPanelTarget }) {
  // consume the deep-link target exactly once — children read it for their initial state,
  // then we clear it so switching tabs away and back doesn't reopen the same item again.
  useEffect(() => {
    if (panelTarget) clearPanelTarget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = [
    { key: "settings", label: "Hesap Ayarları", icon: Settings },
    { key: "addresses", label: "Adreslerim", icon: MapPin },
    { key: "favorites", label: "Favorilerim", icon: Heart },
    { key: "orders", label: "Siparişlerim", icon: Package },
    { key: "ticket", label: "Ticket Sistemi", icon: Ticket },
  ];
  const active = sections.find((s) => s.key === section) || sections[0];
  const [openAccordion, setOpenAccordion] = useState(null);
  const [gaBackupCodes, setGaBackupCodes] = useState(null);

  // --- identity state (fake/demo) ---
  const [userName, setUserName] = useState("Deniz Aksoy");
  const [lastNameChangeAt, setLastNameChangeAt] = useState(null);
  const [userEmail, setUserEmail] = useState("deniz@test.com");
  const [userPassword, setUserPassword] = useState("Guvenli!9");
  const [gaEnabled, setGaEnabled] = useState(false);

  // --- shared confirmation-code system (name/email/password/2FA/deletions all go through this) ---
  const [pendingAction, setPendingAction] = useState(null); // { type, label, apply }
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [confirmTimeLeft, setConfirmTimeLeft] = useState(300);
  const [confirmFailCount, setConfirmFailCount] = useState(0);
  const [confirmBanUntil, setConfirmBanUntil] = useState(0);
  const [confirmRecovery, setConfirmRecovery] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  useEffect(() => {
    if (!pendingAction || confirmTimeLeft <= 0) return;
    const id = setInterval(() => setConfirmTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [pendingAction, confirmTimeLeft > 0]);

  useEffect(() => {
    if (pendingAction && confirmTimeLeft === 0) strikeConfirm();
  }, [pendingAction, confirmTimeLeft]);

  useEffect(() => {
    if (confirmBanUntil <= Date.now()) return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [confirmBanUntil]);

  function strikeConfirm() {
    const next = confirmFailCount + 1;
    setConfirmFailCount(next);
    if (next >= 5) setConfirmRecovery(true);
    else setConfirmBanUntil(Date.now() + BAN_LADDER_MS[next - 1]);
  }

  function requestConfirm(type, label, applyFn) {
    if (confirmRecovery || Date.now() < confirmBanUntil) {
      pushToast("Bu işlem geçici olarak kısıtlandı.");
      return;
    }
    setPendingAction({ type, label, apply: applyFn });
    setConfirmCode(genCode());
    setConfirmInput("");
    setConfirmError("");
    setConfirmTimeLeft(300);
  }

  function submitConfirm() {
    if (confirmInput.trim() === confirmCode) {
      pendingAction.apply();
      setPendingAction(null);
      setConfirmFailCount(0);
      pushToast("İşlem onaylandı.");
      return;
    }
    setConfirmError("Kod yanlış.");
    strikeConfirm();
  }

  // --- name change form ---
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const nameEligible = !lastNameChangeAt || Date.now() - lastNameChangeAt > 30 * 24 * 60 * 60 * 1000;
  const nameDaysLeft = nameEligible ? 0 : Math.ceil((30 * 24 * 60 * 60 * 1000 - (Date.now() - lastNameChangeAt)) / (24 * 60 * 60 * 1000));

  // --- email change form ---
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  // --- password change form ---
  const [oldPwInput, setOldPwInput] = useState("");
  const [newPwInput, setNewPwInput] = useState("");
  const [newPw2Input, setNewPw2Input] = useState("");
  const [pwFormError, setPwFormError] = useState("");
  const newPwChecks = getPasswordChecks(newPwInput, userName, "");

  // --- addresses ---
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState(null);

  function openAddAddress() {
    setAddressForm({ editingId: null, type: "Ev", name: "", phone: "", country: "", city: "", district: "", postalCode: "", line1: "", line2: "" });
  }
  function saveAddress() {
    if (!addressForm.name.trim() || !addressForm.line1.trim()) return;
    if (addressForm.editingId) {
      setAddresses((list) => list.map((a) => (a.id === addressForm.editingId ? { ...addressForm, id: a.id } : a)));
    } else {
      setAddresses((list) => [...list, { ...addressForm, id: Date.now() }]);
    }
    setAddressForm(null);
    pushToast("Adres kaydedildi.");
  }
  function deleteAddress(id) {
    setAddresses((list) => list.filter((a) => a.id !== id));
  }

  const isBanned = Date.now() < confirmBanUntil;
  const actionsBlocked = !!pendingAction || isBanned || confirmRecovery;

  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-3xl font-bold text-slate-900">Kullanıcı Paneli</h1></Reveal>
        <Reveal delay={40}><p className="mb-8 text-[15px] text-slate-500">Hesabınızla ilgili işlemleri buradan yönetebilirsiniz.</p></Reveal>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex shrink-0 flex-row gap-1.5 sm:w-56 sm:flex-col">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => { setSection(s.key); setPendingAction(null); }}
                className={`flex flex-1 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors sm:flex-none ${active.key === s.key ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <s.icon size={16} /> <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-3">
            {(pendingAction || confirmRecovery || isBanned) && (
              <ConfirmCodeCard
                pendingAction={pendingAction || { label: "" }}
                code={confirmCode}
                input={confirmInput}
                setInput={setConfirmInput}
                error={confirmError}
                timeLeft={confirmTimeLeft}
                onSubmit={submitConfirm}
                isBanned={isBanned}
                banRemaining={formatBanRemaining(confirmBanUntil - nowTick)}
                requiresRecovery={confirmRecovery}
                onRecover={() => { setConfirmRecovery(false); setConfirmFailCount(0); setPendingAction(null); pushToast("Hesap kurtarma işlemi için Şifremi Unuttum akışını kullanın."); }}
                onCancel={() => setPendingAction(null)}
              />
            )}

          {active.key === "settings" && (
            <div className="space-y-3">
              <AccordionItem icon={User} title="Ad Soyad" subtitle={userName} open={openAccordion === "name"} onToggle={() => setOpenAccordion((v) => (v === "name" ? null : "name"))}>
                <p className="mb-3 text-xs text-slate-500">Ayda 1 defaya mahsus değiştirilebilir.</p>
                {nameEligible ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <User size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={nameInput} onChange={(e) => { setNameInput(e.target.value); setNameError(""); }} placeholder="Yeni ad soyad" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" />
                    </div>
                    <button
                      onClick={() => {
                        setNameError("");
                        if (!isValidDisplayName(nameInput)) { setNameError("Lütfen geçerli bir ad soyad giriniz."); return; }
                        requestConfirm("name", `"${nameInput.trim()}" olarak isim değişikliğini onaylayın.`, () => { setUserName(nameInput.trim()); setLastNameChangeAt(Date.now()); setNameInput(""); });
                      }}
                      disabled={actionsBlocked}
                      className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Değiştir
                    </button>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-slate-400">Tekrar değiştirebilmeniz için {nameDaysLeft} gün beklemeniz gerekiyor.</p>
                )}
                {nameError && <p className="mt-2 text-xs font-medium text-red-600">{nameError}</p>}
              </AccordionItem>

              <AccordionItem icon={Mail} title="E-posta Adresi" subtitle={userEmail} open={openAccordion === "email"} onToggle={() => setOpenAccordion((v) => (v === "email" ? null : "email"))}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={emailInput} onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }} placeholder="Yeni e-posta adresi" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" />
                  </div>
                  <button
                    onClick={() => {
                      setEmailError("");
                      if (!isValidEmailFormat(emailInput)) { setEmailError("Lütfen geçerli bir e-posta adresi giriniz (örn. ornek@mail.com)."); return; }
                      requestConfirm("email", `Onay bildirimi hem ${userEmail} hem de ${emailInput.trim()} adresine gönderildi.`, () => { setUserEmail(emailInput.trim()); setEmailInput(""); });
                    }}
                    disabled={actionsBlocked}
                    className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Değiştir
                  </button>
                </div>
                {emailError && <p className="mt-2 text-xs font-medium text-red-600">{emailError}</p>}
              </AccordionItem>

              <AccordionItem icon={Lock} title="Şifre" subtitle="••••••••" open={openAccordion === "password"} onToggle={() => setOpenAccordion((v) => (v === "password" ? null : "password"))}>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={oldPwInput} onChange={(e) => setOldPwInput(e.target.value)} placeholder="Mevcut şifreniz" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" />
                  </div>
                  <div className="relative">
                    <Lock size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={newPwInput} onChange={(e) => setNewPwInput(e.target.value)} placeholder="Yeni şifre" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" />
                  </div>
                  <div className="relative">
                    <Lock size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={newPw2Input} onChange={(e) => setNewPw2Input(e.target.value)} placeholder="Yeni şifreyi tekrar yazın" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" />
                  </div>
                  {pwFormError && <p className="text-xs font-medium text-red-600">{pwFormError}</p>}
                  <button
                    onClick={() => {
                      setPwFormError("");
                      if (!oldPwInput) { setPwFormError("Lütfen mevcut şifrenizi giriniz."); return; }
                      if (!newPwInput || !newPw2Input) { setPwFormError("Lütfen yeni şifrenizi ve tekrarını giriniz."); return; }
                      if (oldPwInput !== userPassword) { setPwFormError("Mevcut şifreniz yanlış."); return; }
                      if (newPwInput !== newPw2Input) { setPwFormError("Yeni şifreler eşleşmiyor."); return; }
                      if (!newPwChecks.length || !newPwChecks.letter || !newPwChecks.punctuation || !newPwChecks.noSequential) { setPwFormError("Yeni şifre gerekli kuralları karşılamıyor (min. 8 karakter, 1 harf, 1 noktalama, ardışık sayı yok)."); return; }
                      requestConfirm("password", `Şifre değişikliği için ${userEmail} adresine onay bildirimi gönderildi.`, () => { setUserPassword(newPwInput); setOldPwInput(""); setNewPwInput(""); setNewPw2Input(""); });
                    }}
                    disabled={actionsBlocked}
                    className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Şifreyi Değiştir
                  </button>
                </div>
              </AccordionItem>

              <AccordionItem icon={ShieldCheck} title="Google Authenticator" subtitle={gaEnabled ? "Etkin" : "Devre dışı"} open={openAccordion === "2fa"} onToggle={() => setOpenAccordion((v) => (v === "2fa" ? null : "2fa"))}>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <CheckCircle2 size={14} /> E-posta adresiniz doğrulanmıştır
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-slate-500">{gaEnabled ? "İki adımlı doğrulama etkin." : "Hesabınız e-posta ile onaylandığı için Google Authenticator ile iki adımlı doğrulama ekleyebilirsiniz."}</p>
                  <button
                    onClick={() => requestConfirm("2fa", gaEnabled ? `Google Authenticator'ı devre dışı bırakmak için ${userEmail} adresine onay bildirimi gönderildi.` : `Google Authenticator'ı etkinleştirmek için ${userEmail} adresine onay bildirimi gönderildi.`, () => { setGaEnabled((v) => !v); setGaBackupCodes((v) => (gaEnabled ? null : genBackupCodes())); })}
                    disabled={actionsBlocked}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${gaEnabled ? "bg-emerald-100 text-emerald-700" : "bg-orange-500 text-white hover:bg-orange-600"}`}
                  >
                    {gaEnabled ? "Etkin ✓" : "Etkinleştir"}
                  </button>
                </div>
                {gaEnabled && (
                  <>
                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[9px] text-slate-300">QR Kod</div>
                      <p>Google Authenticator uygulamanızla bu QR kodu okutarak kurulumu tamamlayın. (Beta modu — örnek görünümdür.)</p>
                    </div>
                    <div className="mt-3 rounded-lg border border-dashed border-slate-200 p-3">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600"><Key size={13} /> Yedek Kurtarma Kodları</p>
                      <p className="mb-2 text-xs text-slate-400">Telefonunuzu kaybederseniz hesabınıza girmek için bu kodlardan birini kullanabilirsiniz. Güvenli bir yerde saklayın.</p>
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-xs text-slate-700 sm:grid-cols-4">
                        {(gaBackupCodes || []).map((code, i) => <span key={i} className="rounded bg-slate-100 px-2 py-1 text-center">{code}</span>)}
                      </div>
                      <button onClick={() => setGaBackupCodes(genBackupCodes())} className="mt-2 flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline"><RefreshCw size={12} /> Kodları Yeniden Oluştur</button>
                    </div>
                  </>
                )}
              </AccordionItem>

              <AccordionItem icon={History} title="Son Girişler" subtitle={`${FAKE_LOGIN_HISTORY.length} oturum`} open={openAccordion === "sessions"} onToggle={() => setOpenAccordion((v) => (v === "sessions" ? null : "sessions"))}>
                <div className="space-y-2">
                  {FAKE_LOGIN_HISTORY.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3 text-sm">
                      <Monitor size={15} className="mt-0.5 shrink-0 text-slate-400" />
                      <div className="flex-1">
                        <p className="flex items-center gap-2 font-medium text-slate-700">{s.device}{s.current && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Bu oturum</span>}</p>
                        <p className="text-xs text-slate-400">{s.location} — {new Date(s.date).toLocaleString("tr-TR")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </div>
          )}

          {active.key === "addresses" && (
            <div className="flex-1 rounded-xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800"><MapPin size={16} className="text-slate-400" /> Adreslerim</p>
                <button onClick={openAddAddress} className="flex items-center gap-1 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"><Plus size={13} /> Adres Ekle</button>
              </div>

              {addresses.length === 0 && !addressForm && <p className="text-sm text-slate-400">Henüz kayıtlı adresiniz yok.</p>}

              <div className="space-y-2.5">
                {addresses.map((a) => {
                  const TypeIcon = ADDRESS_TYPES.find((t) => t.key === a.type)?.icon || Home;
                  return (
                    <div key={a.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="flex gap-2.5">
                        <span className="icon-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-orange-500"><TypeIcon size={15} /></span>
                        <div className="text-sm">
                          <p className="font-semibold text-slate-800">{a.type} — {a.name}</p>
                          <p className="flex items-center gap-1 text-slate-500"><Phone size={11} />{a.phone}</p>
                          <p className="text-slate-500">{a.line1}{a.line2 ? `, ${a.line2}` : ""}</p>
                          <p className="text-slate-500">{a.district && `${a.district}, `}{a.city} / {a.country} {a.postalCode}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button onClick={() => setAddressForm({ ...a, editingId: a.id })} className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-orange-600" aria-label="Düzenle"><Pencil size={14} /></button>
                        <button onClick={() => deleteAddress(a.id)} className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-rose-500" aria-label="Sil"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {addressForm && (
                <div className="mt-4 space-y-2.5 rounded-lg border border-orange-200 bg-orange-50/40 p-4">
                  <div className="grid grid-cols-4 gap-1.5">
                    {ADDRESS_TYPES.map((t) => (
                      <button key={t.key} onClick={() => setAddressForm((f) => ({ ...f, type: t.key }))} className={`icon-pop flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition-colors sm:flex-row sm:justify-center sm:gap-1.5 sm:text-xs ${addressForm.type === t.key ? "bg-slate-900 text-white" : "bg-white text-slate-600"}`}>
                        <t.icon size={13} /> {t.key}
                      </button>
                    ))}
                  </div>
                  <div className="relative"><User size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.name} onChange={(e) => setAddressForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ad Soyad" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  <div className="relative"><Phone size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.phone} onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))} placeholder="Telefon Numarası" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="relative"><Globe size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.country} onChange={(e) => setAddressForm((f) => ({ ...f, country: e.target.value }))} placeholder="Ülke" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                    <div className="relative"><Building2 size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.city} onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))} placeholder="Şehir" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="relative"><MapPin size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.district} onChange={(e) => setAddressForm((f) => ({ ...f, district: e.target.value }))} placeholder="Mahalle" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                    <div className="relative"><Hash size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.postalCode} onChange={(e) => setAddressForm((f) => ({ ...f, postalCode: e.target.value }))} placeholder="Posta Kodu" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  </div>
                  <div className="relative"><MapPin size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.line1} onChange={(e) => setAddressForm((f) => ({ ...f, line1: e.target.value }))} placeholder="Adres Satırı 1" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  <div className="relative"><MapPin size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={addressForm.line2} onChange={(e) => setAddressForm((f) => ({ ...f, line2: e.target.value }))} placeholder="Adres Satırı 2" className="w-full rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500" /></div>
                  <div className="flex gap-2">
                    <button onClick={saveAddress} className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600">Kaydet</button>
                    <button onClick={() => setAddressForm(null)} className="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">Vazgeç</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {active.key === "favorites" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><Heart size={16} className="fill-rose-500 text-rose-500" /> Favorilerim</p>
                {favorites.length === 0 ? (
                  <p className="text-sm text-slate-400">Henüz favori ürününüz yok.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {favorites.map((id) => {
                      const p = [...PRODUCTS, ...SHOP_PRODUCTS].find((x) => x.id === id);
                      if (!p) return null;
                      return (
                        <div key={id} className="relative rounded-lg border border-slate-200 p-3">
                          <button onClick={() => onToggleLike(id)} className="absolute right-2 top-2 text-rose-400 hover:text-rose-600" aria-label="Favoriden çıkar"><Heart size={14} className="fill-rose-500" /></button>
                          <button onClick={() => onQuickView(id)} className="text-left">
                            <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-400">{p.price}</p>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><History size={16} className="text-slate-400" /> Son Görüntülenen Ürünler</p>
                {recentlyViewed.length === 0 ? (
                  <p className="text-sm text-slate-400">Henüz görüntülenen ürününüz yok.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {recentlyViewed.map((id) => {
                      const p = [...PRODUCTS, ...SHOP_PRODUCTS].find((x) => x.id === id);
                      if (!p) return null;
                      return (
                        <button key={id} onClick={() => onQuickView(id)} className="rounded-lg border border-slate-200 p-3 text-left">
                          <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.price}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {active.key === "orders" && <OrdersPanel requestConfirm={requestConfirm} actionsBlocked={actionsBlocked} pushToast={pushToast} extraOrders={extraOrders} historyCleared={orderHistoryCleared} setHistoryCleared={setOrderHistoryCleared} target={panelTarget} />}
          {active.key === "ticket" && <TicketPanel pushToast={pushToast} requestConfirm={requestConfirm} actionsBlocked={actionsBlocked} deletedIds={deletedTicketIds} setDeletedIds={setDeletedTicketIds} target={panelTarget} extraOrders={extraOrders} />}
          </div>
        </div>
      </section>
    </div>
  );
}

function OrdersPanel({ requestConfirm, actionsBlocked, pushToast, extraOrders, historyCleared, setHistoryCleared, target }) {
  const allOrders = [...extraOrders, ...FAKE_ORDERS];
  const [openId, setOpenId] = useState(target?.orderId || null);
  const activeOrders = allOrders.filter((o) => o.status !== "delivered");
  const pastOrders = historyCleared ? [] : [...allOrders.filter((o) => o.status === "delivered")].sort((a, b) => new Date(b.date) - new Date(a.date));

  function OrderCard({ order, isPast }) {
    const statusInfo = ORDER_STATUS_FLOW.find((s) => s.key === order.status) || ORDER_STATUS_DELIVERED;
    const Icon = statusInfo.icon;
    const open = openId === order.id;
    return (
      <div className={`overflow-hidden rounded-xl border transition-colors ${isPast ? "border-slate-100 bg-slate-50/60" : "border-slate-200"}`}>
        <button onClick={() => setOpenId((v) => (v === order.id ? null : order.id))} className={`w-full p-4 text-left transition-opacity ${isPast ? "opacity-70 hover:opacity-100" : "hover:bg-slate-50"}`}>
          <div className="mb-2 flex items-center justify-between">
            <p className={`text-sm font-semibold ${isPast ? "text-slate-500" : "text-slate-800"}`}>{order.id}</p>
            <span className="flex items-center gap-2">
              <p className="text-xs text-slate-400">{new Date(order.date).toLocaleString("tr-TR")}</p>
              {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </span>
          </div>
          <p className={`mb-2 text-sm ${isPast ? "text-slate-400" : "text-slate-500"}`}>{order.items} — <strong className={isPast ? "text-slate-500" : "text-slate-700"}>{order.total}</strong></p>
          <div className={`flex items-center gap-1.5 text-xs font-medium ${isPast ? "text-slate-400" : "text-orange-600"}`}>
            {!isPast && <span className="relative flex h-2 w-2"><span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>}
            <Icon size={13} /> {statusInfo.label}
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-64" : "max-h-0"}`}>
          <div className="space-y-2.5 border-t border-slate-100 bg-white p-4 text-sm">
            <div className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" /><div><p className="text-xs text-slate-400">Teslimat Adresi</p><p className="text-slate-700">{order.address}</p></div></div>
            {order.coupon && (
              <div className="flex items-start gap-2.5"><Tag size={14} className="mt-0.5 shrink-0 text-slate-400" /><div><p className="text-xs text-slate-400">Kupon Kodu</p><p className="font-semibold text-emerald-600">{order.coupon}</p></div></div>
            )}
            <div className="flex items-start gap-2.5"><Bitcoin size={14} className="mt-0.5 shrink-0 text-slate-400" /><div><p className="text-xs text-slate-400">Ödenen Tutar</p><p className="font-semibold text-slate-800">{order.total}</p></div></div>
            {order.tracking && (
              <div className="flex items-start gap-2.5"><Truck size={14} className="mt-0.5 shrink-0 text-slate-400" /><div><p className="text-xs text-slate-400">Kargo Takip No</p><p className="text-slate-700">{order.tracking}</p></div></div>
            )}
            <button onClick={() => downloadInvoice(order)} className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"><Download size={12} /> Fatura İndir</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3">
      {activeOrders.length > 0 && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Aktif Siparişler</p>
          {activeOrders.map((o) => <OrderCard key={o.id} order={o} isPast={false} />)}
        </>
      )}
      {pastOrders.length > 0 && (
        <>
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Geçmiş Siparişler</p>
            <button
              onClick={() => requestConfirm("clear-orders", `Geçmiş sipariş kaydınızı temizlemek için onay bildirimi gönderildi.`, () => { setHistoryCleared(true); pushToast("Geçmiş sipariş kaydınız temizlendi."); })}
              disabled={actionsBlocked}
              className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={12} /> Geçmişi Temizle
            </button>
          </div>
          {pastOrders.map((o) => <OrderCard key={o.id} order={o} isPast={true} />)}
        </>
      )}
    </div>
  );
}

function TicketPanel({ pushToast, requestConfirm, actionsBlocked, deletedIds, setDeletedIds, target, extraOrders }) {
  const [mode, setMode] = useState(target?.ticketMode || "ask"); // "ask" | "payment"
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [sent, setSent] = useState(false);
  const [activeThread, setActiveThread] = useState(() => {
    if (!target?.ticketId) return null;
    return FAKE_TICKETS[target.ticketMode || "ask"].find((t) => t.id === target.ticketId) || null;
  });
  const [threadReply, setThreadReply] = useState("");

  const topics = mode === "ask" ? ASK_TOPICS : PAYMENT_TOPICS;
  const history = FAKE_TICKETS[mode].filter((t) => !deletedIds.includes(t.id));

  function resetForm() {
    setSubject(""); setMessage(""); setFileName(""); setOrderId("");
  }

  function handleSend() {
    if (!subject) return;
    if (!message.trim()) return;
    if (mode === "payment" && !orderId) return;
    setSent(true);
    resetForm();
    pushToast("Talebiniz iletildi.");
    setTimeout(() => setSent(false), 2500);
  }

  function handleReply() {
    if (!threadReply.trim() || !activeThread) return;
    activeThread.messages.push({ from: "user", text: threadReply.trim() });
    setThreadReply("");
    pushToast("Mesajınız gönderildi.");
  }

  function handleResolve() {
    activeThread.status = "closed";
    pushToast("Ticket çözüldü olarak işaretlendi.");
  }

  function handleDelete() {
    requestConfirm("delete-ticket", `${activeThread.id} numaralı ticket'ı silmek için onay bildirimi gönderildi.`, () => {
      setDeletedIds((ids) => [...ids, activeThread.id]);
      pushToast("Ticket silindi.");
      setActiveThread(null);
    });
  }

  if (activeThread) {
    const st = TICKET_STATUS_INFO[activeThread.status] || TICKET_STATUS_INFO.open;
    return (
      <div className="flex-1 space-y-3">
        <button onClick={() => setActiveThread(null)} className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-orange-600"><ChevronLeft size={14} /> Ticketlara dön</button>
        <div className="rounded-xl border border-slate-200 p-5">
          <div className="mb-1 flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800">{activeThread.id} — {activeThread.subject}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.className}`}>{st.label}</span>
          </div>
          <p className="mb-4 text-xs text-slate-400">{new Date(activeThread.date).toLocaleString("tr-TR")}</p>
          <div className="mb-4 space-y-2.5">
            {activeThread.messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-lg p-3 text-sm ${m.from === "user" ? "ml-auto bg-orange-50 text-slate-700" : "bg-slate-100 text-slate-700"}`}>
                <p className="mb-0.5 text-[10px] font-semibold uppercase text-slate-400">{m.from === "user" ? "Siz" : "Destek Ekibi"}</p>
                {m.text}
              </div>
            ))}
          </div>
          <div className="mb-3 flex gap-2">
            <input value={threadReply} onChange={(e) => setThreadReply(e.target.value)} placeholder="Mesajınızı yazın..." className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />
            <button onClick={handleReply} className="rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600">Gönder</button>
          </div>
          <div className="flex gap-3 border-t border-slate-100 pt-3">
            {activeThread.status !== "closed" && (
              <button onClick={handleResolve} className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:underline"><CheckCircle2 size={12} /> Çözüldü Olarak İşaretle</button>
            )}
            <button onClick={handleDelete} disabled={actionsBlocked} className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:underline disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={12} /> Ticket'ı Sil</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="mb-4 flex gap-2">
        <button onClick={() => { setMode("ask"); resetForm(); }} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${mode === "ask" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}>❓ Soru Sor</button>
        <button onClick={() => { setMode("payment"); resetForm(); }} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${mode === "payment" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}>💳 Ödeme Bildir</button>
      </div>

      {sent && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">Talebiniz başarıyla gönderildi.</p>}

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 space-y-2.5 rounded-xl border border-slate-200 p-5 lg:order-1">
          {mode === "payment" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Siparişiniz</label>
              <div className="relative">
                <Package size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full appearance-none rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500">
                  <option value="">Sipariş seçin</option>
                  {[...extraOrders, ...FAKE_ORDERS].filter((o) => o.status !== "delivered").map((o) => (
                    <option key={o.id} value={o.id}>{o.id} — {o.total}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Konu</label>
            <div className="relative">
              {(() => { const T = topics.find((t) => t.key === subject)?.icon || HelpCircle; return <T size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />; })()}
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full appearance-none rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-orange-500">
                <option value="">Konu seçin</option>
                {topics.map((t) => (
                  <option key={t.key} value={t.key}>{t.key}</option>
                ))}
              </select>
            </div>
          </div>

          {mode === "ask" && (
            <div className="flex gap-1 border-b border-slate-100 pb-2">
              <button type="button" onClick={() => setMessage((m) => `${m}**kalın**`)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Kalın"><Bold size={14} /></button>
              <button type="button" onClick={() => setMessage((m) => `${m}*italik*`)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100" aria-label="İtalik"><Italic size={14} /></button>
              <label className="flex cursor-pointer items-center gap-1 rounded p-1.5 text-slate-500 hover:bg-slate-100">
                <Paperclip size={14} />
                <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
              </label>
              <label className="flex cursor-pointer items-center gap-1 rounded p-1.5 text-slate-500 hover:bg-slate-100">
                <ImageIcon size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
              </label>
              {fileName && <span className="ml-1 self-center text-xs text-slate-400">{fileName}</span>}
            </div>
          )}

          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={mode === "ask" ? "Mesajınız" : "Ödeme bildiriminizle ilgili not (işlem no, ödeme kanıtı vb.)"} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />

          {mode === "payment" && (
            <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Paperclip size={13} /> Ödeme kanıtı ekle
              <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
              {fileName && <span className="text-slate-400">{fileName}</span>}
            </label>
          )}

          <button onClick={handleSend} disabled={!subject || !message.trim() || (mode === "payment" && !orderId)} className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40">
            {mode === "ask" ? "Gönder" : "Ödeme Bildirimini Gönder"}
          </button>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-slate-200 p-4 lg:order-2 lg:w-64">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Geçmiş Ticketlar</p>
          {history.length === 0 ? (
            <p className="text-xs text-slate-400">Henüz ticket'ınız yok.</p>
          ) : (
            <div className="space-y-1.5">
              {history.map((t) => {
                const st = TICKET_STATUS_INFO[t.status] || TICKET_STATUS_INFO.open;
                return (
                  <button key={t.id} onClick={() => setActiveThread(t)} className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700"><Ticket size={13} className="shrink-0 text-slate-400" /> <span className="truncate">{t.subject}</span></span>
                    <span className="flex items-center gap-2 text-xs text-slate-400">{new Date(t.date).toLocaleDateString("tr-TR")}<span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${st.className}`}>{st.label}</span></span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CryptoPaymentPage({ onGoTicket }) {
  const wallets = [
    { name: "USDT (TRC20)", address: "TQn9Y2khEsLMG7BW8p7v3B9x5cJ4LRJvA9" },
    { name: "Bitcoin (BTC)", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
    { name: "Ethereum (ETH)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976" },
  ];
  const [copiedIdx, setCopiedIdx] = useState(null);

  function copyAddress(addr, i) {
    navigator.clipboard?.writeText(addr).catch(() => {});
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  }

  return (
    <div>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Kripto Ödeme</h1></Reveal>
        <Reveal delay={40}><p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-slate-500">Sitemizde yalnızca kripto para ile ödeme kabul edilmektedir. Aşağıdaki cüzdan adreslerinden birine ödemenizi yapabilirsiniz.</p></Reveal>

        <div className="space-y-3">
          {wallets.map((w, i) => (
            <Reveal key={w.name} delay={i * 60} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500"><Bitcoin size={18} /></span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{w.name}</p>
                  <p className="break-all text-xs text-slate-500">{w.address}</p>
                </div>
              </div>
              <button onClick={() => copyAddress(w.address, i)} className="shrink-0 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                {copiedIdx === i ? "Kopyalandı ✓" : "Kopyala"}
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-8 rounded-xl border border-dashed border-orange-300 bg-orange-50/40 p-5 text-center">
          <p className="mb-3 text-sm text-slate-600">Ödemenizi yaptıktan sonra işlem kanıtınızı Ticket Sistemi üzerinden "Ödeme Bildir" seçeneğiyle bize iletmeniz gerekmektedir.</p>
          <button onClick={onGoTicket} className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Ödeme Bildirimine Git</button>
        </Reveal>
      </section>
    </div>
  );
}

function KvkkPage() {
  const sections = [
    { title: "1. Veri Sorumlusu", body: "Alpeptide olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi işlemekteyiz." },
    { title: "2. İşlenen Veriler", body: "Ad-soyad, iletişim bilgileri, sipariş ve ödeme geçmişi gibi hizmetin sunulması için gerekli olan veriler işlenmektedir." },
    { title: "3. İşleme Amaçları", body: "Verileriniz; sipariş süreçlerinin yürütülmesi, müşteri destek hizmetlerinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir." },
    { title: "4. Haklarınız", body: "KVKK'nın 11. maddesi uyarınca verilerinize erişme, düzeltilmesini veya silinmesini talep etme gibi haklara sahipsiniz." },
    { title: "5. İletişim", body: "Haklarınızı kullanmak için destek@alpeptide.com adresinden bizimle iletişime geçebilirsiniz." },
  ];
  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <Reveal><h1 className="mb-2 text-3xl font-bold text-slate-900">KVKK Aydınlatma Metni</h1></Reveal>
        <Reveal delay={40}><p className="mb-10 text-[15px] text-slate-500">Bu metin bir yer tutucudur — hukuki danışmanınızla birlikte gözden geçirip özelleştirebilirsiniz.</p></Reveal>

        <Reveal delay={70}>
          <TrustRow items={[
            { icon: Lock, label: "256-bit SSL" },
            { icon: EyeOff, label: "Gizlilik Politikası" },
            { icon: ShieldCheck, label: "Çift Kimlik Doğrulama" },
          ]} />
        </Reveal>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <h2 className="mb-1.5 text-base font-bold text-slate-900">{s.title}</h2>
              <p className="text-sm leading-relaxed text-slate-500">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- cart modal ---------- */

const COUPONS = { ALP10: 0.1, HIRO20: 0.2, USDT5: 0.05 };

function CartModal({ open, onClose, items, onRemove, subtotal, onCheckout }) {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null); // { code, rate } | null
  const [couponError, setCouponError] = useState("");

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    const rate = COUPONS[code];
    if (rate) {
      setApplied({ code, rate });
      setCouponError("");
    } else {
      setApplied(null);
      setCouponError("Geçersiz kupon kodu.");
    }
  }

  function removeCoupon() {
    setApplied(null);
    setCoupon("");
    setCouponError("");
  }

  const discount = applied ? subtotal * applied.rate : 0;
  const total = subtotal - discount;

  if (!open) return null;
  return (
    <div className="overlay-in fixed inset-0 z-[65] grid place-items-center p-4" style={{ backgroundColor: "#0f172a" }}>
      <div className="modal-in relative flex max-h-[85vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-slate-400 hover:text-slate-600" aria-label="Kapat"><X size={18} /></button>
        <div className="min-h-0 flex-1 overflow-y-auto p-6 pb-0">
          <p className="mb-4 text-base font-semibold text-slate-900">Sepetim ({items.reduce((s, i) => s + i.qty, 0)})</p>

          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">Sepetiniz boş.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-2.5">
                  <div className="h-14 w-10 shrink-0 rounded-sm border border-slate-200 bg-orange-50/60" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                    <p className="truncate text-xs text-slate-400">{item.qty} adet · {item.price}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500" aria-label="Kaldır">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-100 px-6 pb-6 pt-4">
          {/* coupon code */}
          {applied ? (
            <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
              <span className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={14} className="shrink-0" />
                <span className="truncate">{applied.code} uygulandı (%{Math.round(applied.rate * 100)})</span>
              </span>
              <button onClick={removeCoupon} className="shrink-0 text-xs font-medium text-emerald-700 underline hover:text-emerald-900">Kaldır</button>
            </div>
          ) : (
            <div className="mb-3">
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  placeholder="Kupon kodu"
                  className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2.5 text-sm uppercase outline-none transition focus:border-orange-500"
                />
                <button
                  onClick={applyCoupon}
                  className="shrink-0 rounded-md border border-orange-400 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white active:scale-95"
                >
                  Uygula
                </button>
              </div>
              {couponError && <p className="mt-1.5 text-xs font-medium text-rose-500">{couponError}</p>}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Ara Toplam</span>
            <span className="font-medium text-slate-700">{subtotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
          </div>
          {applied && (
            <div className="mt-1.5 flex items-center justify-between text-sm">
              <span className="text-emerald-600">İndirim</span>
              <span className="font-medium text-emerald-600">-{discount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-sm">
            <span className="font-medium text-slate-700">Toplam</span>
            <span className="text-base font-semibold text-slate-900">{total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL</span>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button onClick={() => onCheckout({ items, total, coupon: applied?.code || null })} disabled={items.length === 0} className="w-full flex-1 rounded-md bg-gradient-to-b from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
              Sepeti Tamamla
            </button>
            <button onClick={onClose} className="w-full flex-1 rounded-md border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 active:scale-95">
              Alışverişe Devam Et
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-[10px] leading-tight text-slate-400">
            <span className="flex items-center gap-1 whitespace-nowrap"><Lock size={11} /> 256-bit SSL</span>
            <span className="flex items-center gap-1 whitespace-nowrap"><ShieldCheck size={11} /> Güvenli Ödeme</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_METHODS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1 whitespace-nowrap rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] text-slate-500">
                <Icon size={11} className="text-orange-500" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- quick view with reviews ---------- */

function QuickViewModal({ product, onClose, onAdd, isLoggedIn, onRequireAuth }) {
  const [reviewNotice, setReviewNotice] = useState(false);
  const [modalAdding, setModalAdding] = useState(false);
  const [notifySent, setNotifySent] = useState(false);
  const [showNotifyPopup, setShowNotifyPopup] = useState(false);

  useEffect(() => {
    // this modal instance is reused across opens (it returns null instead of
    // unmounting), so its state must be reset whenever the shown product changes
    setReviewNotice(false);
    setModalAdding(false);
    setNotifySent(false);
    setShowNotifyPopup(false);
  }, [product?.id]);

  if (!product) return null;
  const outOfStock = product.stock === "out";

  function handleWriteReview() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    setReviewNotice(true);
  }

  function handleModalAdd() {
    if (outOfStock || modalAdding) return;
    setModalAdding(true);
    setTimeout(() => {
      setModalAdding(false);
      onAdd(product, 1);
      onClose();
    }, 450);
  }

  function handleModalNotify() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    setShowNotifyPopup(true);
    setTimeout(() => {
      setShowNotifyPopup(false);
      setNotifySent(true);
    }, 1800);
  }

  return (
    <div className="overlay-in fixed inset-0 z-50 grid place-items-center p-4" style={{ backgroundColor: "#0f172a" }}>
      <div className="modal-in relative flex max-h-[82vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:flex-row sm:gap-6 sm:p-6">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-slate-400 hover:text-slate-600" aria-label="Kapat"><X size={18} /></button>

        <div className="sm:w-1/2">
          <div className="flex gap-5">
            <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-orange-50/60" style={{ perspective: "500px" }}>
              <div className="animate-[spin360_7s_linear_infinite] [transform-style:preserve-3d]"><ProductVial color={product.color} /></div>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">{product.name}</p>
              <p className="text-xs text-slate-400">{product.batch}</p>
              <div className="mt-1.5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />))}
                <span className="ml-1 text-[11px] text-slate-400">({product.reviews})</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-slate-900">{product.price}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.desc}</p>

          {isLoggedIn ? (
            <div className="mt-4 space-y-3 rounded-lg bg-slate-50 p-3.5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">İçerik</p>
                <p className="text-sm text-slate-600">Aktif madde %99,2 saflıkta, bağımsız laboratuvar analiziyle doğrulanmıştır.</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Kullanım Şekli</p>
                <p className="text-sm text-slate-600">Yalnızca araştırma amaçlıdır; laboratuvar protokolüne uygun şekilde, uzman gözetiminde kullanılmalıdır.</p>
              </div>
            </div>
          ) : (
            <button onClick={onRequireAuth} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:border-orange-300 hover:text-orange-600">
              <Lock size={12} /> İçerik ve kullanım bilgisi için giriş yapın
            </button>
          )}
          <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Lock size={11} /> Güvenli ödeme</span>
            <span className="flex items-center gap-1"><ShieldCheck size={11} /> KVKK korumalı</span>
          </div>
          {outOfStock ? (
            notifySent ? (
              <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={15} /> Bildirim Aktif
              </div>
            ) : (
              <div className="relative mt-4 w-full">
                {showNotifyPopup && (
                  <div className="pop-in absolute bottom-full left-0 right-0 z-20 mb-2 rounded-lg bg-slate-900 px-3 py-2.5 text-center text-xs font-semibold leading-snug text-white shadow-xl">
                    Stoğa gelince haber verilecektir ✓
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </div>
                )}
                <button
                  onClick={handleModalNotify}
                  className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-orange-500 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-95"
                >
                  <Bell size={14} /> Stoğa Gelince Haber Ver
                </button>
              </div>
            )
          ) : (
            <button
              onClick={handleModalAdd}
              disabled={modalAdding}
              className={`mt-4 w-full rounded-md py-2.5 text-sm font-semibold transition-all duration-200 ${modalAdding ? "cursor-wait bg-orange-400 text-white" : "bg-gradient-to-b from-orange-500 to-orange-600 text-white hover:shadow-md"}`}
            >
              {modalAdding ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Ekleniyor...
                </span>
              ) : "Sepete Ekle"}
            </button>
          )}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5 sm:mt-0 sm:w-1/2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Müşteri Yorumları</p>
            <button onClick={handleWriteReview} className="text-xs font-medium text-orange-600 hover:underline">Yorum Yap</button>
          </div>

          {reviewNotice && (
            <div className="pop-in mb-3 rounded-lg bg-orange-50 px-3 py-2.5 text-xs font-medium text-orange-700">
              Yalnızca onaylanmış müşteriler yorum yapabilir. Yorum bırakmak için üye olup hesabınızın onaylanması gerekmektedir.
            </div>
          )}

          <div className="space-y-3">
            {FAKE_REVIEWS.map((r) => (
              <div key={r.name} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800">{maskName(r.name)}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={10} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />))}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  function prevTestimonial() { setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }
  function nextTestimonial() { setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length); }
  const testimonialSwipe = useSwipe(prevTestimonial, nextTestimonial);
  const [statsRef, statsInView] = useInView(0.1);

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const suggestions = query ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  const [cartItems, setCartItems] = useState([{ ...PRODUCTS[0], qty: 1 }, { ...PRODUCTS[3], qty: 1 }]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  const [toasts, setToasts] = useState([]);
  function pushToast(text) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2000);
  }

  const [activeSort, setActiveSort] = useState("popular");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activePriceRange, setActivePriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const productsRef = useRef(null);
  const batchPanelRef = useRef(null);

  const [page, setPage] = useState("home"); // "home" | "about"
  const [pendingScroll, setPendingScroll] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  function openBlogPost(id) {
    setSelectedBlogId(id);
    setPage("blogPost");
  }

  useEffect(() => {
    if (page !== "home" || !pendingScroll) return;
    const id = setTimeout(() => {
      if (pendingScroll === "products") productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScroll(null);
    }, 60);
    return () => clearTimeout(id);
  }, [page, pendingScroll]);

  // Always land at the very top of the new page — runs after the page's
  // content has actually rendered, so it can't be short-circuited by the
  // previous page's (different) scroll height.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function scrollToProducts() {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function scrollToBatchPanel() {
    batchPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function goHome() {
    setPage("home");
  }
  function goAbout() {
    setPage("about");
  }
  function goFaq() {
    setPage("faq");
  }
  function goKvkk() {
    setPage("kvkk");
  }
  function goBlog() {
    setPage("blog");
  }
  function goPanel(section = "settings", target = null) {
    setPanelSection(section);
    setPanelTarget(target);
    setPage("panel");
  }
  function goStore() {
    setPage("shop");
  }

  function selectCategory(name) {
    setActiveCategory((current) => (current === name ? "Tümü" : name));
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filteredProducts = (() => {
    const range = PRICE_RANGES.find((r) => r.key === activePriceRange);
    let arr = PRODUCTS.filter((p) => (activeCategory === "Tümü" || p.category === activeCategory) && range.test(parsePrice(p.price)));
    if (activeSort === "price-asc") arr = [...arr].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (activeSort === "price-desc") arr = [...arr].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (activeSort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    else arr = [...arr].sort((a, b) => b.reviews - a.reviews);
    return arr;
  })();

  const [quickViewId, setQuickViewId] = useState(null);
  const quickViewProduct = [...PRODUCTS, ...SHOP_PRODUCTS].find((p) => p.id === quickViewId);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  function toggleFavorite(id) {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null); // null | "success" | "error"
  function handleNewsletterSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    setNewsletterStatus(valid ? "success" : "error");
  }

  useEffect(() => {
    if (!quickViewId) return;
    setRecentlyViewed((prev) => [quickViewId, ...prev.filter((id) => id !== quickViewId)].slice(0, 4));
  }, [quickViewId]);

  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [authReason, setAuthReason] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Sayfa yenilendiğinde, daha önce kaydedilmiş bir oturum varsa geri yükle.
  useEffect(() => {
    const token = loadToken();
    if (!token) return;
    apiRequest("/auth/me", null, { method: "GET", token })
      .then((user) => { setIsLoggedIn(true); setCurrentUser(user); })
      .catch(() => clearToken()); // token geçersiz/süresi dolmuş — sessizce temizle
  }, []);
  const [welcomeRedirecting, setWelcomeRedirecting] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [panelSection, setPanelSection] = useState("settings");
  const [deletedTicketIds, setDeletedTicketIds] = useState(() => loadLS("alp_deleted_tickets", []));
  const [orderHistoryCleared, setOrderHistoryCleared] = useState(() => loadLS("alp_orders_cleared", false));
  const [extraOrders, setExtraOrders] = useState(() => loadLS("alp_extra_orders", []));
  const [panelTarget, setPanelTarget] = useState(null); // { ticketId, ticketMode } | { orderId } | null

  useEffect(() => saveLS("alp_deleted_tickets", deletedTicketIds), [deletedTicketIds]);
  useEffect(() => saveLS("alp_orders_cleared", orderHistoryCleared), [orderHistoryCleared]);
  useEffect(() => saveLS("alp_extra_orders", extraOrders), [extraOrders]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatTyping, setChatTyping] = useState(false);
  const [chatUnread, setChatUnread] = useState(true);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowTop(window.scrollY > 500);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAnnounceIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  function handleHeroMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  }

  const [batchIndex, setBatchIndex] = useState(0);
  function prevBatch() { setBatchIndex((i) => (i - 1 + BATCH_REPORTS.length) % BATCH_REPORTS.length); }
  function nextBatch() { setBatchIndex((i) => (i + 1) % BATCH_REPORTS.length); }
  const batchSwipe = useSwipe(prevBatch, nextBatch);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  function handleAdd(product, qty) {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) return items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...items, { ...product, qty }];
    });
    pushToast(`${product.name} sepete eklendi`);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  }

  function removeFromCart(id) {
    setCartItems((items) => items.filter((i) => i.id !== id));
  }

  function handleCheckout({ items, total, coupon }) {
    if (items.length > 0) {
      const newOrder = {
        id: `ALP-${Math.floor(6000 + Math.random() * 900)}`,
        date: new Date().toISOString(),
        status: "pending",
        total: `${total.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`,
        items: items.map((i) => `${i.name} x${i.qty}`).join(", "),
        address: "Sipariş sonrası adres seçilecek",
        coupon,
      };
      setExtraOrders((list) => [...list, newOrder]);
      setCartItems([]);
    }
    setCartOpen(false);
    setPage("crypto-payment");
  }

  function openChat() {
    setChatOpen(true);
    setChatUnread(false);
    if (chatMessages.length === 0) {
      setChatTyping(true);
      setTimeout(() => {
        setChatTyping(false);
        setChatMessages([{ from: "hiro", text: "Merhaba! Ben Hiro 👋 Size nasıl yardımcı olabilirim?" }]);
      }, 900);
    }
  }

  function sendQuickReply(label) {
    setChatMessages((m) => [...m, { from: "user", text: label }]);
    setChatTyping(true);
    setTimeout(() => {
      setChatTyping(false);
      setChatMessages((m) => [...m, { from: "hiro", text: HIRO_REPLIES[label] }]);
    }, 850);
  }

  function sendChatInput() {
    if (!chatInput.trim()) return;
    setChatMessages((m) => [...m, { from: "user", text: chatInput }]);
    setChatInput("");
    setChatTyping(true);
    setTimeout(() => {
      setChatTyping(false);
      setChatMessages((m) => [...m, { from: "hiro", text: "Talebinizi ilgili uzmanımıza ilettim, en kısa sürede dönüş yapılacaktır." }]);
    }, 900);
  }

  function toggleCart() {
    setCartOpen((v) => !v);
    setMenuOpen(false);
  }
  function toggleMenu() {
    setMenuOpen((v) => !v);
    setCartOpen(false);
  }

  function openAuth(tab, reason = null) {
    setMenuOpen(false);
    setCartOpen(false);
    setAuthTab(tab);
    setAuthReason(reason);
    setAuthOpen(true);
  }

  function requireAuthForNotify() {
    openAuth("login", "notify");
  }

  function handleAuthSuccess(user) {
    setIsLoggedIn(true);
    setCurrentUser(user || null);
    setAuthOpen(false);
    setWelcomeRedirecting(true);
  }

  if (!ageVerified) return <AgeGate onConfirm={() => setAgeVerified(true)} />;
  if (welcomeRedirecting) return <WelcomeRedirect onDone={() => setWelcomeRedirecting(false)} />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-16 font-sans text-slate-900 lg:pb-0">
      <div className="fixed left-0 top-0 z-[80] h-0.5 bg-orange-500 transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />
      <style>{`
        html, body { overflow-x: hidden; max-width: 100%; }
        * { min-width: 0; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 42s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes heroFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-fade { animation: heroFade 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        .animate-floaty { animation: floaty 3s ease-in-out infinite; }
        @keyframes blobMove { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-18px) scale(1.08); } }
        .animate-blob { animation: blobMove 10s ease-in-out infinite; }
        .animate-blob-delay { animation: blobMove 12s ease-in-out infinite; animation-delay: 1.5s; }
        @keyframes slideIn { from { opacity: 0; transform: translate(18px, -10px) scale(0.96); } to { opacity: 1; transform: translate(0,0) scale(1); } }
        .toast-in { animation: slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.92) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .pop-in { animation: popIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes dotPulse { 0%,80%,100% { opacity: 0.25; transform: scale(0.85); } 40% { opacity: 1; transform: scale(1); } }
        .dot-pulse span { animation: dotPulse 1.1s infinite; }
        .dot-pulse span:nth-child(2) { animation-delay: 0.15s; }
        .dot-pulse span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes burst { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
        .burst-dot { animation: burst 0.6s ease-out forwards; }
        @keyframes ctaGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.35); } 50% { box-shadow: 0 0 0 8px rgba(249,115,22,0); } }
        .cta-glow { animation: ctaGlow 2.2s ease-out infinite; }
        @keyframes flyUp { 0% { opacity: 0; transform: translateY(0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-22px); } }
        .fly-up { animation: flyUp 1.1s ease-out forwards; }
        @keyframes cartBounce { 0% { transform: scale(1) rotate(0); } 35% { transform: scale(1.18) rotate(-4deg); } 65% { transform: scale(0.97) rotate(2deg); } 100% { transform: scale(1) rotate(0); } }
        .cart-bounce { animation: cartBounce 0.45s cubic-bezier(0.34,1.2,0.64,1); }
        @keyframes spin360 { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes pop { 0% { transform: scale(0.7); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }

        @keyframes modalIn { from { opacity: 0; transform: scale(0.94) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-in { animation: modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .overlay-in { animation: overlayIn 0.25s ease-out both; }
        @keyframes announceFade { from { opacity: 0; } to { opacity: 1; } }
        .icon-pop { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .icon-pop:hover { transform: scale(1.12) rotate(-4deg); }
        .announce-fade { animation: announceFade 0.4s ease-out both; }
        button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid #f97316;
          outline-offset: 2px;
          border-radius: 6px;
        }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {toasts.length > 0 && (
        <div className="fixed inset-x-4 top-4 z-[95] flex flex-col gap-2 sm:inset-x-auto sm:right-5 sm:w-auto">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="toast-in flex items-center gap-2 rounded-lg border border-orange-100 px-4 py-3 text-sm font-semibold text-slate-800 shadow-2xl"
              style={{ backgroundColor: "#ffffff" }}
            >
              <CheckCircle2 size={16} className="shrink-0 text-orange-500" />
              {t.text}
            </div>
          ))}
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} tab={authTab} setTab={setAuthTab} reason={authReason} onSuccess={handleAuthSuccess} onGoKvkk={() => { setAuthOpen(false); goKvkk(); }} onGoAbout={() => { setAuthOpen(false); goAbout(); }} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={removeFromCart} subtotal={cartSubtotal} onCheckout={handleCheckout} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewId(null)} onAdd={handleAdd} isLoggedIn={isLoggedIn} onRequireAuth={() => openAuth("login", "review")} />

      {/* Announcement strip + Header — one sticky unit so the banner never scrolls away */}
      <div className="sticky top-0 z-40">
        <div className="border-b border-orange-100 bg-orange-50">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 py-2">
            <div className="relative h-4 w-full max-w-md text-center text-xs font-medium text-orange-700">
              <span key={announceIndex} className="announce-fade absolute inset-0">{ANNOUNCEMENTS[announceIndex]}</span>
            </div>
          </div>
        </div>

        <header className={`border-b border-slate-200 bg-white transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}>
        <div className={`mx-auto grid max-w-7xl grid-cols-3 items-center px-4 sm:px-6 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
          <div className="relative flex items-center gap-3 justify-self-start">
            <button onClick={toggleMenu} className="-m-2 p-2 text-slate-600 lg:hidden" aria-label="Menü">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
            <button
              onClick={() => {
                if (!isLoggedIn) { openAuth("login"); return; }
                if (accountMenuOpen) { setAccountMenuOpen(false); goPanel("settings"); }
                else setAccountMenuOpen(true);
              }}
              className="-m-2 p-2 text-slate-600 transition-colors hover:text-orange-600"
              aria-label="Hesabım"
            >
              <User size={20} />
            </button>

            {isLoggedIn && accountMenuOpen && (
              <div className="pop-in absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">
                <button onClick={() => { setAccountMenuOpen(false); goPanel("settings"); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"><Settings size={16} /> Hesap Ayarları</button>
                <button onClick={() => { setAccountMenuOpen(false); goPanel("addresses"); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"><MapPin size={16} /> Adreslerim</button>
                <button onClick={() => { setAccountMenuOpen(false); goPanel("orders"); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"><Package size={16} /> Siparişlerim</button>
                <button onClick={() => { setAccountMenuOpen(false); goPanel("ticket"); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"><Ticket size={16} /> Ticket Sistemi</button>
                <div className="my-1 h-px bg-slate-100" />
                <button
                  onClick={async () => {
                    setAccountMenuOpen(false);
                    const token = loadToken();
                    if (token) {
                      try { await apiRequest("/account/logout", null, { token }); } catch {}
                    }
                    clearToken();
                    setIsLoggedIn(false);
                    setCurrentUser(null);
                    goHome();
                    pushToast("Güvenli çıkış yapıldı.");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Güvenli Çıkış
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 justify-self-center">
            <BrandMark className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight text-slate-900">alpeptide</span>
          </div>

          <div className="flex items-center gap-6 justify-self-end">
            {isLoggedIn && (
              <div className="relative">
                <button onClick={() => setNotifOpen((v) => !v)} aria-label="Bildirimler" className="relative -m-2 flex items-center p-2 text-slate-600 transition-colors hover:text-orange-600">
                  <Bell size={20} />
                  {FAKE_NOTIFICATIONS.length > 0 && (
                    <span className="pointer-events-none absolute -right-1 -top-1 rounded-full border-2 border-white bg-orange-500 text-center font-bold leading-[18px] text-white shadow-sm" style={{ width: 18, height: 18, fontSize: 10 }}>
                      {FAKE_NOTIFICATIONS.length}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="pop-in absolute right-0 top-full z-30 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">
                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Bildirimler</p>
                    {FAKE_NOTIFICATIONS.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setNotifOpen(false);
                          if (n.type === "product") setQuickViewId(n.productId);
                          else if (n.type === "ticket") goPanel("ticket", { ticketMode: n.ticketMode, ticketId: n.ticketId });
                          else if (n.type === "order") goPanel("orders", { orderId: n.orderId });
                        }}
                        className="flex w-full items-start gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                      >
                        <n.icon size={15} className="mt-0.5 shrink-0 text-orange-500" />
                        <div>
                          <p className="text-slate-700">{n.text}</p>
                          <p className="text-xs text-slate-400">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button onClick={toggleCart} aria-label="Sepet" className={`relative -m-2 flex items-center p-2 text-slate-600 transition-colors hover:text-orange-600 ${cartBounce ? "cart-bounce" : ""}`}>
              <ShoppingCart size={20} />
              <span
                className="pointer-events-none absolute -right-1.5 -top-1.5 rounded-full border-2 border-white bg-orange-500 text-center font-bold leading-[18px] text-white shadow-sm"
                style={{ width: 18, height: 18, fontSize: 10 }}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <div className="hidden border-t border-slate-100 md:block">
          <div className="relative mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
            <div className="flex items-center">
              <Search size={16} className="pointer-events-none absolute left-7 text-slate-400 sm:left-9" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 150)} placeholder="Ürün, kategori veya parti numarası ara" className="w-full rounded-md border border-slate-200 bg-slate-50 py-2.5 pl-12 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-orange-500 focus:bg-white sm:pl-14" />
            </div>
            {searchOpen && suggestions.length > 0 && (
              <div className="pop-in absolute left-4 right-4 top-full z-20 mt-1.5 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg sm:left-6 sm:right-6">
                {suggestions.map((p) => (
                  <button key={p.id} onMouseDown={() => { setQuery(p.name); setSearchOpen(false); setQuickViewId(p.id); }} className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-orange-50">
                    <span className="font-medium text-slate-800">{p.name}</span>
                    <span className="text-xs text-slate-400">{p.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className="mx-auto hidden max-w-7xl items-center gap-7 px-4 sm:px-6 pb-3 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = (link.label === "Ana Sayfa" && page === "home") || (link.label === "Mağaza" && page === "shop") || (link.label === "Hakkımızda" && page === "about") || (link.label === "SSS" && page === "faq") || (link.label === "Blog" && (page === "blog" || page === "blogPost")) || (link.label === "KVKK" && page === "kvkk");
            return (
              <button
                key={link.label}
                onClick={() => (link.label === "Ana Sayfa" ? goHome() : link.label === "Mağaza" ? goStore() : link.label === "Hakkımızda" ? goAbout() : link.label === "SSS" ? goFaq() : link.label === "Blog" ? goBlog() : link.label === "KVKK" ? goKvkk() : undefined)}
                className={`group relative flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? "text-orange-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <link.icon size={15} />
                {link.label}
                <span className={`absolute -bottom-3 left-0 h-0.5 w-full origin-left bg-orange-500 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </button>
            );
          })}
        </nav>

        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"}`}>
          <nav className="flex flex-col gap-1 px-4 sm:px-6 py-3">
            {NAV_LINKS.map((link) => {
              const isActive = (link.label === "Ana Sayfa" && page === "home") || (link.label === "Mağaza" && page === "shop") || (link.label === "Hakkımızda" && page === "about") || (link.label === "SSS" && page === "faq") || (link.label === "Blog" && (page === "blog" || page === "blogPost")) || (link.label === "KVKK" && page === "kvkk");
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setMenuOpen(false);
                    if (link.label === "Ana Sayfa") goHome();
                    else if (link.label === "Mağaza") goStore();
                    else if (link.label === "Blog") goBlog();
                    else if (link.label === "Hakkımızda") goAbout();
                  else if (link.label === "SSS") goFaq();
                  else if (link.label === "KVKK") goKvkk();
                  }}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium ${isActive ? "bg-orange-50 text-orange-600" : "text-slate-600"}`}
                >
                  <link.icon size={16} />
                  {link.label}
                </button>
              );
            })}
            <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">
              <button onClick={() => openAuth("login")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 py-2 text-sm font-medium text-slate-700"><LogIn size={15} />Giriş Yap</button>
              <button onClick={() => openAuth("register")} className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-orange-500 py-2 text-sm font-semibold text-white"><UserPlus size={15} />Kayıt Ol</button>
            </div>
          </nav>
        </div>
      </header>
      </div>

      {/* Certification marquee */}
      <div className="overflow-hidden border-b border-slate-100 bg-orange-50/50 py-3.5">
        <div className="flex w-max animate-marquee gap-12">
          {[...CERTIFICATIONS, ...CERTIFICATIONS].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-[13px] font-bold text-slate-700"><Icon size={15} className="text-orange-500" />{label}</div>
          ))}
        </div>
      </div>

      {page === "home" && (
      <>
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 py-14" onMouseMove={handleHeroMouseMove}>
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${parallax.x * 20}px, ${parallax.y * 20}px)` }}
        >
          <div className="animate-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="animate-blob-delay absolute -right-16 top-10 h-64 w-64 rounded-full bg-orange-100/60 blur-3xl" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="hero-fade" style={{ animationDelay: "0.05s" }}>
            <div className="mb-4 flex items-center gap-3">
              <Hiro className="h-14 w-14 animate-floaty" />
              <div className="rounded-xl bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700">Merhaba, ben Hiro! Laboratuvar tedariğinde yanınızdayım 👋</div>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-[2.75rem]">Kurumsal laboratuvarlar için <span className="text-orange-500">doğrulanmış</span> tedarik</h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-500">Alpeptide, her partiyi HPLC ile test eden, izlenebilir sevkiyat ve kurumsal destekle çalışan bir laboratuvar tedarik platformudur. Analiz raporlarına sipariş öncesinde ulaşın.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={scrollToProducts} className="cta-glow group flex items-center gap-2 rounded-lg bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-lg active:scale-95">
                Ürünleri İncele<ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button onClick={scrollToBatchPanel} className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:text-orange-600 hover:shadow-md active:scale-95">Analiz Sertifikasını Gör</button>
            </div>
            <div ref={statsRef} className="mt-9 grid grid-cols-4 gap-2 border-t border-slate-100 pt-6 sm:gap-5">{STATS.map((s) => <Stat key={s.label} stat={s} active={statsInView} />)}</div>
          </div>

          <div ref={batchPanelRef} className="hero-fade relative" style={{ animationDelay: "0.2s" }}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-xs font-medium text-slate-500">Parti Analiz Sonuçları · Canlı</p>
            </div>

            <div
              className="cursor-grab select-none overflow-hidden rounded-xl border border-slate-200 bg-orange-50/40 active:cursor-grabbing"
              {...batchSwipe}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${batchIndex * 100}%)` }}
              >
                {BATCH_REPORTS.map((b) => (
                  <div key={b.batch} className="w-full shrink-0 p-6">
                    <p className="text-sm font-semibold text-slate-900">Parti No. {b.batch}</p>
                    <div className="mt-5 space-y-3">
                      {[
                        { label: "Saflık (HPLC)", value: b.purity },
                        { label: "Nem Oranı", value: b.moisture },
                        { label: "Endotoksin Seviyesi", value: b.endotoxin },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-sm">
                          <span className="text-slate-500">{row.label}</span>
                          <span className="font-medium text-slate-900">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-5 w-full rounded-lg border border-orange-500 py-2.5 text-sm font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-500 hover:text-white active:scale-[0.98]">
                      Tam Raporu İndir (PDF)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              <button onClick={prevBatch} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-600 active:scale-90" aria-label="Önceki">
                <ChevronLeft size={14} />
              </button>
              <div className="flex gap-1.5">
                {BATCH_REPORTS.map((b, i) => (
                  <button
                    key={b.batch}
                    onClick={() => setBatchIndex(i)}
                    aria-label={`Parti ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === batchIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-300"}`}
                  />
                ))}
              </div>
              <button onClick={nextBatch} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-600 active:scale-90" aria-label="Sonraki">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Order tracking timeline — trust & transparency */}
      <OrderTimeline />

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
        <Reveal><h2 className="mb-5 text-lg font-bold text-slate-900">Neden Alpeptide</h2></Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USPS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90} className="rounded-xl border border-slate-200 p-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-900/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50"><Icon size={18} className="text-orange-500" /></span>
              <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
        <Reveal><h2 className="mb-5 text-lg font-bold text-slate-900">Kategoriler</h2></Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map(({ icon: Icon, name, count }, i) => {
            const selected = activeCategory === name;
            return (
              <Reveal key={name} delay={i * 80}>
                <button
                  onClick={() => selectCategory(name)}
                  aria-pressed={selected}
                  className={`group flex w-full flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 ${
                    selected
                      ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-900/10"
                      : "border-slate-200 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-900/5"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${selected ? "bg-orange-500" : "bg-orange-50"}`}>
                    <Icon size={18} className={selected ? "text-white" : "text-orange-500"} />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{name}</span>
                  <span className="text-xs text-slate-400">{count}</span>
                  {selected && <span className="text-[11px] font-semibold text-orange-600">Seçildi ✓</span>}
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Featured products — discoverability & navigation */}
      <section ref={productsRef} className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <Reveal className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">Öne Çıkan Ürünler</h2>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${showFilters ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-700 hover:border-slate-400"}`}
          >
            <Filter size={13} /> Filtrele ve Sırala
            {(activeCategory !== "Tümü" || activePriceRange !== "all" || activeSort !== "popular") && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
          </button>
        </Reveal>

        <div className={`overflow-hidden transition-all duration-300 ${showFilters ? "mb-6 max-h-64" : "max-h-0"}`}>
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <span className="mr-1 text-xs font-medium text-slate-400">Sırala:</span>
            {SORT_FILTERS.map((f) => (
              <button key={f.key} onClick={() => setActiveSort(f.key)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${activeSort === f.key ? "border-orange-500 bg-orange-500 text-white" : "border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"}`}>{f.label}</button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="mr-1 flex items-center gap-1 text-xs font-medium text-slate-400">Kategori:</span>
            {CATEGORY_FILTERS.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${activeCategory === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>
            ))}
            <span className="mx-1.5 h-4 w-px bg-slate-200" />
            <span className="mr-1 text-xs font-medium text-slate-400">Fiyat:</span>
            {PRICE_RANGES.map((r) => (
              <button key={r.key} onClick={() => setActivePriceRange(r.key)} className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${activePriceRange === r.key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{r.label}</button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-14 text-center">
            <Package className="mx-auto mb-3 text-slate-300" size={32} />
            <p className="text-sm font-medium text-slate-500">Bu filtrelere uygun ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 60} onAdd={handleAdd} onQuickView={setQuickViewId} isLoggedIn={isLoggedIn} onRequireAuth={requireAuthForNotify} liked={favorites.includes(product.id)} onToggleLike={toggleFavorite} />
            ))}
            <Reveal delay={240} className="col-span-2 sm:col-span-3 lg:col-span-1">
              <button
                onClick={goStore}
                className="flex h-full w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/40 px-4 py-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-50 lg:h-full lg:flex-col lg:gap-3 lg:py-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"><ArrowRight size={16} /></span>
                <span className="text-left lg:text-center">
                  <span className="block text-sm font-semibold text-slate-900">Devamını Gör</span>
                  <span className="block text-xs text-slate-500">Tüm ürünleri keşfedin</span>
                </span>
              </button>
            </Reveal>
          </div>
        )}
      </section>

      {/* Recently viewed — discoverability */}
      {recentlyViewed.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <Reveal><h2 className="mb-5 text-lg font-bold text-slate-900">Son Görüntülenenler</h2></Reveal>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((id) => {
              const p = PRODUCTS.find((x) => x.id === id);
              if (!p) return null;
              return (
                <button key={id} onClick={() => setQuickViewId(id)} className="flex w-40 shrink-0 flex-col rounded-lg border border-slate-200 p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">
                  <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-orange-50/60"><div className="h-12 w-8 rounded-sm border border-slate-200 bg-white" /></div>
                  <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.price}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <Reveal><h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900"><Heart size={16} className="fill-rose-500 text-rose-500" /> Favorilerim</h2></Reveal>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {favorites.map((id) => {
              const p = PRODUCTS.find((x) => x.id === id);
              if (!p) return null;
              return (
                <button key={id} onClick={() => setQuickViewId(id)} className="flex w-40 shrink-0 flex-col rounded-lg border border-slate-200 p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">
                  <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-orange-50/60"><div className="h-12 w-8 rounded-sm border border-slate-200 bg-white" /></div>
                  <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.price}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Corporate / B2B — final stage */}
      <CorporateSection />

      {/* Testimonials */}
      <section className="border-y border-slate-100 bg-orange-50/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 text-center">
          <Reveal><Quote className="mx-auto mb-4 text-orange-500" size={28} /></Reveal>
          <div className="relative h-32 cursor-grab select-none active:cursor-grabbing sm:h-24" {...testimonialSwipe}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${i === testimonialIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                <p className="text-base font-medium leading-relaxed text-slate-700">“{t.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button onClick={prevTestimonial} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-600 active:scale-90" aria-label="Önceki yorum">
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-2">{TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => setTestimonialIndex(i)} aria-label={`Yorum ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-300"}`} />))}</div>
            <button onClick={nextTestimonial} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-400 hover:text-orange-600 active:scale-90" aria-label="Sonraki yorum">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Product verification — replaces newsletter signup */}
      <VerifySection />
      </>
      )}

      {page === "shop" && <ShopPage onAdd={handleAdd} onQuickView={setQuickViewId} isLoggedIn={isLoggedIn} onRequireAuth={requireAuthForNotify} favorites={favorites} onToggleLike={toggleFavorite} />}
      {page === "about" && <AboutPage />}
      {page === "faq" && <FaqPage />}
      {page === "blog" && <BlogPage onOpenPost={openBlogPost} />}
      {page === "blogPost" && <BlogPostPage post={BLOG_POSTS.find((p) => p.id === selectedBlogId)} onBack={goBlog} isLoggedIn={isLoggedIn} onRequireAuth={() => openAuth("login", "review")} />}
      {page === "kvkk" && <KvkkPage />}
      {page === "panel" && (
        <UserPanelPage
          section={panelSection}
          setSection={setPanelSection}
          pushToast={pushToast}
          favorites={favorites}
          recentlyViewed={recentlyViewed}
          onToggleLike={toggleFavorite}
          onQuickView={setQuickViewId}
          extraOrders={extraOrders}
          orderHistoryCleared={orderHistoryCleared}
          setOrderHistoryCleared={setOrderHistoryCleared}
          deletedTicketIds={deletedTicketIds}
          setDeletedTicketIds={setDeletedTicketIds}
          panelTarget={panelTarget}
          clearPanelTarget={() => setPanelTarget(null)}
        />
      )}
      {page === "crypto-payment" && <CryptoPaymentPage onGoTicket={() => { if (!isLoggedIn) { openAuth("login"); return; } goPanel("ticket"); }} />}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="border-b border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
            <p className="text-base font-bold text-white">Bültenimize Katılın</p>
            <p className="max-w-md text-sm text-slate-400">Yeni ürün, stok ve analiz raporu bildirimlerini e-posta ile almak için abone olun.</p>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                value={newsletterEmail}
                onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus(null); }}
                placeholder="E-posta adresiniz"
                className="w-full rounded-md border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="whitespace-nowrap rounded-md bg-gradient-to-b from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              >
                Abone Ol
              </button>
            </div>
            {newsletterStatus === "success" && <p className="text-xs font-medium text-emerald-400">Abone olundu, teşekkürler! ✓</p>}
            {newsletterStatus === "error" && <p className="text-xs font-medium text-rose-400">Maalesef, geçersiz e-posta adresi. Abonelik başarısız.</p>}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-1.5 text-white"><BrandMark className="h-6 w-6" /><span className="text-lg font-bold">alpeptide</span></div>
            <p className="mt-3 text-sm text-slate-400">Laboratuvarlar için doğrulanmış tedarik ve analiz raporlama platformu.</p>
            <div className="mt-4 flex gap-3">{[Linkedin, Instagram, Twitter].map((Icon, i) => (<button key={i} type="button" aria-label="Sosyal medya" className="transition-colors hover:text-orange-400"><Icon size={16} /></button>))}</div>
          </div>
          <div><p className="mb-3 text-sm font-semibold text-white">Ürünler</p><ul className="space-y-2 text-sm text-slate-400"><li>Peptidler</li><li>Reaktifler ve Kimyasallar</li><li>Laboratuvar Ekipmanları</li><li>Sarf Malzemeleri</li></ul></div>
          <div><p className="mb-3 text-sm font-semibold text-white">Kurumsal</p><ul className="space-y-2 text-sm text-slate-400"><li><button type="button" onClick={goAbout} className="transition-colors hover:text-orange-400">Hakkımızda</button></li><li><button type="button" onClick={goBlog} className="transition-colors hover:text-orange-400">Blog</button></li><li>Kalite Politikası</li><li>Gizlilik Sözleşmesi</li><li><button type="button" onClick={goKvkk} className="transition-colors hover:text-orange-400">KVKK</button></li></ul></div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">İletişim</p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Phone size={14} /> +90 212 555 01 01</li>
              <li className="flex items-center gap-2"><Mail size={14} /> destek@alpeptide.com</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> İstanbul, Türkiye</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENT_METHODS.map(({ icon: Icon, label }) => (<span key={label} className="flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-[11px] text-slate-300"><Icon size={12} className="text-orange-400" />{label}</span>))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 px-4 sm:px-6 py-4 text-center text-xs text-slate-500">© 2026 Alpeptide. Tüm hakları saklıdır.</div>
      </footer>

      {/* Hiro chat assistant */}
      <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3 lg:bottom-6">
        {chatOpen && (
          <div className="pop-in flex w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 text-white">
              <Hiro className="h-9 w-9" />
              <div className="flex-1"><p className="text-sm font-semibold">Hiro</p><p className="flex items-center gap-1 text-[11px] text-orange-100"><Sparkles size={11} /> Alpeptide asistanı</p></div>
              <button onClick={() => setChatOpen(false)} className="text-orange-100 hover:text-white" aria-label="Kapat"><X size={16} /></button>
            </div>
            <div className="flex max-h-72 flex-col gap-2.5 overflow-y-auto px-4 py-4">
              {chatMessages.map((m, i) => (<div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.from === "hiro" ? "self-start bg-slate-100 text-slate-700" : "self-end bg-orange-500 text-white"}`}>{m.text}</div>))}
              {chatTyping && (<div className="dot-pulse flex w-fit gap-1 self-start rounded-xl bg-slate-100 px-3 py-2.5"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /></div>)}
            </div>
            {chatMessages.length > 0 && !chatTyping && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {QUICK_REPLIES.map((q) => (<button key={q} onClick={() => sendQuickReply(q)} className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition hover:border-orange-400 hover:text-orange-600">{q}</button>))}
              </div>
            )}
            <div className="flex items-center gap-2 border-t border-slate-100 p-3">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatInput()} placeholder="Mesajınızı yazın..." className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />
              <button onClick={sendChatInput} className="rounded-md bg-orange-500 p-2 text-white transition hover:bg-orange-600" aria-label="Gönder"><Send size={15} /></button>
            </div>
          </div>
        )}
        <button onClick={() => (chatOpen ? setChatOpen(false) : openChat())} className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-lg transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95" aria-label="Sohbeti aç/kapat">
          {chatUnread && (<span className="absolute -right-1 -top-1 flex h-3.5 w-3.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" /><span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-rose-500" /></span>)}
          {chatOpen ? <X size={22} /> : <Hiro className="h-9 w-9" />}
        </button>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:text-orange-600 lg:bottom-6"
          aria-label="Yukarı çık"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Mobile bottom nav — discoverability & navigation */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white py-2 lg:hidden">
        <button onClick={goHome} className={`flex flex-col items-center gap-0.5 transition ${page === "home" ? "text-orange-600" : "text-slate-500 hover:text-orange-600"}`}><Home size={19} /><span className="text-[10px] font-medium">Ana Sayfa</span></button>
        <button onClick={goStore} className="flex flex-col items-center gap-0.5 text-slate-500 transition hover:text-orange-600"><ShoppingBag size={19} /><span className="text-[10px] font-medium">Mağaza</span></button>
        <button onClick={toggleCart} className="relative flex flex-col items-center gap-0.5 text-slate-500 transition hover:text-orange-600">
          <ShoppingCart size={19} />
          {cartCount > 0 && (
            <span
              className="pointer-events-none absolute -right-1.5 -top-1.5 rounded-full border-2 border-white bg-orange-500 text-center font-bold leading-[16px] text-white shadow-sm"
              style={{ width: 16, height: 16, fontSize: 9 }}
            >
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Sepet</span>
        </button>
        <button onClick={() => (isLoggedIn ? goPanel("settings") : openAuth("login"))} className={`flex flex-col items-center gap-0.5 transition hover:text-orange-600 ${page === "panel" ? "text-orange-600" : "text-slate-500"}`}><User size={19} /><span className="text-[10px] font-medium">Hesabım</span></button>
      </div>
    </div>
  );
}
