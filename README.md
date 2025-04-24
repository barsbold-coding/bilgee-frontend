### 📁 `app/` — **App Router-ийн route-ууд**
Next.js 13+ дээр `app` фолдер нь route бүрийг файл, фолдероор зохион байгуулдаг. `page.tsx` файлууд нь тухайн route-ийн үндсэн компонентийг илэрхийлнэ.

#### Жишээ:
- `app/applications/page.tsx` – `/applications` route-ийн UI
- `app/internships/[id]/page.tsx` – `/internships/:id` гэсэн динамик route-ийн UI
- `app/layout.tsx` – Бүх route дээр хэрэгжих layout (жишээ нь: navbar, footer)

#### Онцлох файлууд:
- `favicon.ico` – Вэбсайтын таб-д харагдах икон
- `globals.css` – Global CSS стиль

---

### 📁 `components/` — **Дахин ашиглагддаг UI бүрдлүүд**

Энд таны React компонентууд байна. Зарим нь тусгай зориулалттай, зарим нь `shadcn/ui` дээр суурилсан.

#### Онцлогууд:
- `navbar.tsx`, `footer.tsx`, `resume-card.tsx` гэх мэт — нийтлэг layout бүрдлүүд
- `application-card.tsx`, `internship-card.tsx` — тодорхой өгөгдлийг харуулах картууд
- `resume/` — CV засахад зориулсан form бүрдлүүд
- `ui/` — `shadcn/ui`-аар хийсэн бүрдлүүд (жишээ нь `button.tsx`, `form.tsx`, `input.tsx` гэх мэт)

---

### 📁 `contexts/` — **React Context API**
- `AuthContext.tsx` – Хэрэглэгчийн нэвтрэлтийн төлвийг хадгалах ба хүргэх context.

---

### 📁 `hooks/` — **Custom Hooks**
- `dimensions.ts` – Цонхны хэмжээг авах гэх мэт дахин ашиглагдах custom logic.

---

### 📁 `lib/` — **Туслах функцүүд ба API**
- `api.ts` – API дуудлагууд
- `utils.ts` – Ерөнхий туслах функцүүд (жишээ нь: форматлах, тооцоолох г.м.)

---

### 📁 `public/` — **Статик файл**
- Зураг, шрифт, public assets энд байрлана. Next.js үүнийг `/_next/static/` дээр рендерлэнэ.

---

### 📁 `types/` — **TypeScript төрлүүд**
- `api.types.ts` – API-тай холбоотой төрлүүдийг хадгалдаг.

