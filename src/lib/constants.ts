import type { Project, Experience, SkillCategory, SoftSkill, SocialLink, SectionConfig, NavItem } from '@/types';

export const SECTIONS: SectionConfig[] = [
  { id: 'home', label: { en: 'Home', fa: 'خانه', ar: 'الرئيسية' } },
  { id: 'about', label: { en: 'About', fa: 'درباره من', ar: 'عنّي' } },
  { id: 'skills', label: { en: 'Skills', fa: 'مهارت‌ها', ar: 'المهارات' } },
  { id: 'projects', label: { en: 'Projects', fa: 'پروژه‌ها', ar: 'المشاريع' } },
  { id: 'experience', label: { en: 'Experience', fa: 'تجربیات', ar: 'الخبرات' } },
  { id: 'contact', label: { en: 'Contact', fa: 'تماس', ar: 'التواصل' } },
];

export const NAV_ITEMS: NavItem[] = SECTIONS;

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'email', platform: 'email', url: 'mailto:manishekofteh@gmail.com', label: 'manishekofteh@gmail.com' },
  { id: 'github', platform: 'github', url: 'https://github.com/manishek14', label: 'manishek14' },
  { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/mani-shekofteh', label: 'Mani Shekofteh' },
  { id: 'telegram', platform: 'telegram', url: 'https://t.me/dufdoat', label: '@dufdoat' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    name: { en: 'Backend', fa: 'بک‌اند', ar: 'الخلفية' },
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'NestJS', level: 82 },
      { name: 'Express', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'REST API', level: 92 },
      { name: 'JWT / Auth', level: 85 },
      { name: 'WebSockets', level: 72 },
    ],
  },
  {
    id: 'frontend',
    name: { en: 'Frontend', fa: 'فرانت‌اند', ar: 'الواجهة' },
    icon: 'Monitor',
    skills: [
      { name: 'React', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'HTML & CSS', level: 92 },
      { name: 'JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 72 },
      { name: 'Redux', level: 78 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Three.js', level: 65 },
    ],
  },
  {
    id: 'databases',
    name: { en: 'Databases', fa: 'پایگاه داده', ar: 'قواعد البيانات' },
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 78 },
      { name: 'SQL Server', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'SQLite', level: 70 },
    ],
  },
  {
    id: 'architecture',
    name: { en: 'Architecture', fa: 'معماری', ar: 'التصميم' },
    icon: 'Layers',
    skills: [
      { name: 'Clean Architecture', level: 80 },
      { name: 'REST API Design', level: 90 },
      { name: 'System Design', level: 72 },
      { name: 'RBAC', level: 82 },
      { name: 'PBAC', level: 78 },
      { name: 'Caching Strategies', level: 80 },
      { name: 'API Documentation', level: 88 },
    ],
  },
  {
    id: 'cloud_devops',
    name: { en: 'Cloud & DevOps', fa: 'ابر و دواپس', ar: 'السحابة والعمليات' },
    icon: 'Cloud',
    skills: [
      { name: 'Docker', level: 72 },
      { name: 'Linux', level: 75 },
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 88 },
      { name: 'CI/CD', level: 68 },
      { name: 'Deployment', level: 70 },
    ],
  },
  {
    id: 'developer_tools',
    name: { en: 'Developer Tools', fa: 'ابزار توسعه', ar: 'أدوات التطوير' },
    icon: 'Wrench',
    skills: [
      { name: 'VS Code', level: 92 },
      { name: 'Postman', level: 88 },
      { name: 'Swagger', level: 85 },
      { name: 'Unit Testing', level: 75 },
    ],
  },
];

export const SOFT_SKILLS: SoftSkill[] = [
  { id: 'communication', name: { en: 'Communication', fa: 'ارتباطات', ar: 'التواصل' }, icon: 'MessageSquare', level: 88, description: { en: 'Clear documentation, articulate code reviews, and effective cross-team coordination.', fa: 'مستندسازی واضح و هماهنگی مؤثر بین تیمی.', ar: 'توثيق واضح وتنسيق فعال.' } },
  { id: 'ownership', name: { en: 'Ownership', fa: 'مالکیت', ar: 'المسؤولية' }, icon: 'Shield', level: 92, description: { en: 'Taking full responsibility for features from design through deployment.', fa: 'مسئولیت کامل از طراحی تا استقرار.', ar: 'تحمل المسؤولية الكاملة.' } },
  { id: 'leadership', name: { en: 'Leadership', fa: 'رهبری', ar: 'القيادة' }, icon: 'Compass', level: 80, description: { en: 'Guiding team decisions and driving projects to completion.', fa: 'هدایت تصمیمات تیم و پیشبرد پروژه‌ها.', ar: 'توجيه قرارات الفريق.' } },
  { id: 'critical_thinking', name: { en: 'Critical Thinking', fa: 'تفکر انتقادی', ar: 'التفكير النقدي' }, icon: 'Lightbulb', level: 85, description: { en: 'Evaluating trade-offs and choosing the right tool for the job.', fa: 'ارزیابی معاوضه‌ها و انتخاب ابزار مناسب.', ar: 'تقييم المفاضلات.' } },
  { id: 'problem_solving', name: { en: 'Problem Solving', fa: 'حل مسئله', ar: 'حل المشكلات' }, icon: 'Puzzle', level: 90, description: { en: 'Breaking down complex systems into manageable, testable components.', fa: 'تجزیه سیستم‌های پیچیده به قطعات قابل مدیریت.', ar: 'تفكيك الأنظمة المعقدة.' } },
  { id: 'adaptability', name: { en: 'Adaptability', fa: 'سازگاری', ar: 'التكيف' }, icon: 'RefreshCw', level: 87, description: { en: 'Quickly learning new technologies and adapting to change.', fa: 'یادگیری سریع فناوری‌های جدید.', ar: 'تعلم التقنيات الجديدة بسرعة.' } },
  { id: 'collaboration', name: { en: 'Collaboration', fa: 'همکاری', ar: 'التعاون' }, icon: 'Users', level: 86, description: { en: 'Working effectively with frontend, designers, and product managers.', fa: 'کار مؤثر با تیم‌های مختلف.', ar: 'العمل الفعال مع الفرق المختلفة.' } },
  { id: 'learning', name: { en: 'Learning Ability', fa: 'یادگیری', ar: 'التعلم' }, icon: 'BookOpen', level: 94, description: { en: 'Continuously deepening knowledge through documentation and open source.', fa: 'تعمیق مداوم دانش از طریق مستندات.', ar: 'تعميق المعرفة باستمرار.' } },
];

export const PROJECTS: Project[] = [
  {
    id: 'ridex',
    name: 'RideX',
    description: {
      en: 'A full-stack ride-hailing platform with AI at its core — serving passengers, drivers, businesses, and admins through dedicated panels. Features intelligent route optimization, dynamic pricing, and real-time tracking.',
      fa: 'پلتفرم هوشمند حمل‌ونقل با هوش مصنوعی در هسته — برای مسافران، رانندگان، کسب‌وکارها و مدیران.',
      ar: 'منصة نقل ذكية بالذكاء الاصطناعي — للركاب والسائقين والشركات والمديرين.',
    },
    architecture: {
      en: 'Next.js frontend with modular panel architecture, Node.js/Express API layer, MongoDB for data persistence, Redis for caching and real-time state, integrated AI services for route optimization and matching.',
      fa: 'فرانت‌اند Next.js با معماری ماژولار، لایه API با Node.js/Express، MongoDB، Redis، سرویس‌های هوش مصنوعی.',
      ar: 'واجهة Next.js، طبقة API بـ Node.js/Express، MongoDB، Redis.',
    },
    techStack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Redis', 'TypeScript', 'WebSocket', 'AI/ML'],
    features: ['Multi-panel architecture', 'AI route optimization', 'Real-time tracking', 'Dynamic pricing', 'Wallet system', 'Live dashboard'],
    category: 'frontend',
    liveUrl: 'https://ridex-n09e74hz8-ridex1.vercel.app',
    github: 'https://github.com/manishek14/ridex',
    image: '/ridex.webp',
    coverGradient: 'from-indigo-600 via-purple-600 to-blue-600',
  },
  {
    id: 'nexra',
    name: 'Nexra',
    description: {
      en: 'A multi-service super-app backend platform built as NestJS microservices. Exposes a single HTTP/WebSocket API gateway that fans out to five specialized services: ride-hailing with real fare estimation via Neshan Maps, food delivery, payment orchestration (Zibal + Mellat gateways), wallet with pessimistic locking, and BNPL installments.',
      fa: 'بک‌اند اپلیکیشن سوپر‌اپ با معماری میکروسرویس NestJS 11 که شش سرویس مستقل را پوشش می‌دهد: درخواست تاکسی با تخمین قیمت واقعی از نقشه نشان، سفارش غذا، پرداخت آنلاین (زیبال و ملت)، کیف پول با قفل‌گذاری ناامیدانه و سیستم اقساط BNPL، همه از طریق یک API Gateway واحد HTTP/WebSocket.',
      ar: 'خلفية منصة سوبر آب كخدمات مصغرة NestJS. بوابة HTTP/WebSocket موحدة تتصل بخمسة خدمات متخصصة: النقل، توصيل الطعام، المدفوعات، المحفظة، والأقساط.',
    },
    architecture: {
      en: 'Six NestJS microservices communicating over TCP transport: api-gateway (HTTP + WebSocket), core-services (auth, users, wallet, SMS/OTP), taxi-services (rides, fare estimation with Neshan API, driver allocation via Redis Geo), food-services (restaurants, orders), payment-services (Zibal REST + Mellat SOAP), installment-services (BNPL). Each service owns its own PostgreSQL database. Redis for Pub/Sub, geo queries, and caching.',
      fa: 'شش میکروسرویس NestJS با ارتباط TCP: api-gateway (HTTP + WebSocket)، core-services (احراز هویت، کاربران، کیف پول، پیامک/OTP)، taxi-services (سواری، تخمین قیمت با API نشان، تخصیص راننده با Redis Geo)، food-services (رستوران‌ها، سفارشات)، payment-services (زیبال REST + ملت SOAP)، installment-services (BNPL). هر سرویس دیتابیس PostgreSQL مستقل خودش را دارد. Redis برای Pub/Sub، جستجوی جغرافیایی و کشینگ.',
      ar: 'ست خدمات مصغرة NestJS تتواصل عبر TCP: بوابة API، خدمات أساسية، خدمات النقل، خدمات الطعام، خدمات الدفع، خدمات الأقساط. كل خدمة لديها قاعدة PostgreSQL خاصة. Redis للنشر/الاشتراك والبحث الجغرافي.',
    },
    techStack: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'Socket.IO', 'Bull', 'Docker', 'TypeScript', 'Neshan Maps'],
    features: ['Ride-hailing with real fare estimation (Neshan API)', 'Driver allocation via Redis Geo + First-Accept pattern', 'Food delivery with restaurant and order management', 'Dual payment gateway (Zibal REST + Mellat SOAP)', 'Wallet with pessimistic locking and charge via gateway', 'BNPL installments with approval workflow', 'OTP login via SMS (sms.ir)', 'WebSocket realtime driver ride-offer push', 'Microservices with independent databases', 'Hexagonal architecture for newer modules'],
    category: 'backend',
    github: 'https://github.com/manishek14/Nexra',
    image: '/nexra.webp',
    coverGradient: 'from-cyan-600 via-blue-600 to-indigo-600',
  },
  {
    id: 'shopynest',
    name: 'ShopyNest',
    description: {
      en: 'A full-featured e-commerce backend built with NestJS 11 and TypeORM, featuring JWT authentication with complete RBAC (60+ permissions), tree-structured product categories, shopping cart, order processing with Zibal payment gateway, support tickets, SMS queue with Bull, and IP-based rate limiting.',
      fa: 'بک‌اند فروشگاه اینترنتی کامل با NestJS 11 و TypeORM، شامل احراز هویت JWT با RBAC کامل (۶۰+ دسترسی)، دسته‌بندی درختی محصولات، سبد خرید، پردازش سفارش با درگاه پرداخت زیبال، تیکت پشتیبانی، صف پیامک با Bull و محدودیت نرخ درخواست مبتنی بر IP.',
      ar: 'خلفية متكاملة للتجارة الإلكترونية مع NestJS 11 و TypeORM، تتضمن مصادقة JWT مع RBAC كامل، تصنيفات شجرية، سلة تسوق، طلبات مع بوابة دفع Zibal، تذاكر دعم، وقيود معدل الطلب.',
    },
    architecture: {
      en: 'NestJS 11 with modular architecture, TypeORM 0.3, PostgreSQL for relational data, Bull queue (Redis-backed) for SMS processing, Argon2 password hashing, class-validator for DTO validation, and Swagger for API documentation.',
      fa: 'NestJS 11 با معماری ماژولار، TypeORM 0.3، PostgreSQL، صف Bull مبتنی بر Redis برای پردازش پیامک، Argon2 برای هش رمز عبور، class-validator برای اعتبارسنجی DTO و Swagger برای مستندات API.',
      ar: 'NestJS 11، TypeORM 0.3، PostgreSQL، صف Bull مع Redis، Argon2، class-validator، و Swagger.',
    },
    techStack: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'Bull', 'JWT', 'Argon2', 'Swagger', 'TypeScript'],
    features: ['JWT auth with full RBAC (60+ permissions)', 'Tree-structured product categories (3 levels)', 'Shopping cart with auto price calculation', 'Order processing with Zibal payment gateway', 'Support ticket system with threaded replies', 'SMS queue with Bull and retry/backoff', 'IP-based rate limiting and request tracking', 'Scheduled tasks with cron', 'Unified response envelope pattern'],
    category: 'backend',
    github: 'https://github.com/manishek14/shopynest',
    image: '/shopynest.webp',
    coverGradient: 'from-emerald-600 via-green-600 to-teal-600',
  },
  {
    id: 'axishr',
    name: 'AxisHR',
    description: {
      en: 'A comprehensive Human Resources management system built as a backend-only service. Handles employee lifecycle management, leave requests, attendance tracking, payroll calculations, and organizational structure — designed for enterprise-scale deployment.',
      fa: 'سیستم جامع مدیریت منابع انسانی. مدیریت چرخه حیات کارمندان، درخواست مرخصی، ثبت حضور و غیاب، محاسبه حقوق و ساختار سازمانی — طراحی شده برای مقیاس سازمانی.',
      ar: 'نظام شامل لإدارة الموارد البشرية. إدارة دورة حياة الموظفين، طلبات الإجازات، تتبع الحضور، حساب الرواتب.',
    },
    architecture: {
      en: 'Node.js with Express and TypeScript, MongoDB for flexible document-based data models, JWT authentication with role-based permissions, RESTful API following clean architecture principles with service/repository layers.',
      fa: 'Node.js با Express و TypeScript، MongoDB برای مدل‌های داده انعطاف‌پذیر، احراز هویت JWT با دسترسی مبتنی بر نقش، API RESTful با معماری تمیز.',
      ar: 'Node.js مع Express و TypeScript، MongoDB، مصادقة JWT، RESTful API.',
    },
    techStack: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'JWT', 'Swagger'],
    features: ['Employee lifecycle management', 'Leave request workflow', 'Attendance tracking system', 'Payroll calculation engine', 'Organizational structure management', 'Role-based access control'],
    category: 'backend',
    github: 'https://github.com/manishek14/AxisHR',
    image: '/axishr.webp',
    coverGradient: 'from-amber-600 via-orange-600 to-red-600',
  },
  {
    id: 'pixora',
    name: 'Pixora',
    description: {
      en: 'A bilingual (Persian/English) Instagram-like social platform backend built with NestJS, GraphQL (Apollo Server), and TypeORM. Covers six development phases: core social features, stories with 24h auto-expire, discovery with reels, direct messaging, safety tools (block/mute), and realtime capabilities with Socket.IO and Web Push.',
      fa: 'پلتفرم اجتماعی دوزبانه (فارسی/انگلیسی) با NestJS، GraphQL و TypeORM که در شش فاز توسعه یافته: پست و فید شخصی، استوری ۲۴ ساعته، ریلز و اکسپلور، پیام‌رسانی مستقیم، ابزارهای ایمنی (بلاک/میوت) و قابلیت‌های بلادرنگ شامل Socket.IO و Web Push.',
      ar: 'خلفية منصة اجتماعية ثنائية اللغة شبيهة بـ Instagram مع NestJS و GraphQL و TypeORM. تغطي ست مراحل تطوير: الميزات الاجتماعية الأساسية، القصص، الاكتشاف، الرسائل المباشرة، أدوات السلامة، والاتصال الفوري.',
    },
    architecture: {
      en: 'NestJS 11 with Apollo Server 5 and GraphQL 16, TypeORM 0.3 with PostgreSQL (production) or SQLite (development), Socket.IO for realtime messaging and presence tracking, Web Push (VAPID/RFC 8030) for push notifications, Multer for file uploads.',
      fa: 'NestJS 11 با Apollo Server 5 و GraphQL 16، TypeORM 0.3 با PostgreSQL (تولید) یا SQLite (توسعه)، Socket.IO برای پیام‌رسانی بلادرنگ و ردیابی حضور، Web Push (VAPID) برای نوتیفیکیشن پوش، Multer برای آپلود فایل.',
      ar: 'NestJS 11 مع Apollo Server 5 و GraphQL 16، TypeORM 0.3 مع PostgreSQL أو SQLite، Socket.IO، Web Push (VAPID)، Multer.',
    },
    techStack: ['NestJS', 'GraphQL', 'Apollo Server', 'TypeORM', 'PostgreSQL', 'Socket.IO', 'Web Push', 'TypeScript', 'Jest'],
    features: ['Posts with multi-image/video, hashtags, and mentions', 'Threaded comments with edit/delete', 'Stories with 24h auto-expire and highlights', 'Reels with dedicated tab and algorithm', 'Direct messages with realtime Socket.IO', 'Web Push notifications (VAPID)', 'Block, mute, and follow suggestions', 'Collections for organizing bookmarks', 'Unified search across all content types', 'Online presence tracking with grace period'],
    category: 'backend',
    github: 'https://github.com/manishek14/pixora',
    image: '/pixora.webp',
    coverGradient: 'from-fuchsia-600 via-purple-600 to-indigo-600',
  },
  {
    id: 'vendora',
    name: 'Vendora',
    description: {
      en: 'A production-ready multi-vendor e-commerce backend built with NestJS. Designed for platforms requiring vendor support, complex product attributes, and flexible payment flows — inspired by systems like Digikala.',
      fa: 'بک‌اند چند فروشگاهی آماده تولید با NestJS. طراحی شده برای پلتفرم‌هایی با پشتیبانی فروشنده، ویژگی‌های پیچیده محصول و جریان‌های انعطاف‌پذیر پرداخت.',
      ar: 'خلفية متعددة البائعين جاهزة للإنتاج مع NestJS.',
    },
    architecture: {
      en: 'NestJS with modular architecture, TypeORM, PostgreSQL for relational data, Redis for caching, JWT authentication with RBAC.',
      fa: 'NestJS با معماری ماژولار، TypeORM، PostgreSQL، Redis، JWT با RBAC.',
      ar: 'NestJS، TypeORM، PostgreSQL، Redis، JWT مع RBAC.',
    },
    techStack: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'JWT', 'TypeScript', 'Swagger', 'Docker'],
    features: ['Multi-vendor management', 'Complex product attributes', 'Flexible payments', 'RBAC', 'Redis caching', 'Modular structure'],
    category: 'backend',
    github: 'https://github.com/manishek14/Vendora',
    image: '/vendora.webp',
    coverGradient: 'from-purple-600 via-pink-600 to-rose-600',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'moaserhome',
    company: 'MoaserHome',
    companyLocal: 'MoaserHome',
    role: { en: 'Full Stack Developer', fa: 'توسعه‌دهنده فول‌استک', ar: 'مطور Full Stack' },
    period: 'Aug 2025 — Mar 2026',
    location: 'Mashhad, Iran',
    description: {
      en: 'Developed a comprehensive platform with NestJS backend and React-based WordPress plugin frontend. Focused on performance optimization and caching strategies.',
      fa: 'توسعه پلتفرم جامع با بک‌اند NestJS و فرانت‌اند پلاگین React برای وردپرس.',
      ar: 'تطوير منصة شاملة مع NestJS و React.',
    },
    achievements: {
      en: ['Reduced product page load time by 35% through query optimization and lazy loading', 'Implemented Redis caching, reducing API response time from 600ms to 120ms', 'Built user and product management APIs with NestJS, TypeORM, and PostgreSQL'],
      fa: ['کاهش ۳۵٪ زمان بارگذاری صفحه محصول', 'پیاده‌سازی سیستم کش Redis، کاهش زمان پاسخ API از ۶۰۰ms به ۱۲۰ms', 'ساخت API مدیریت کاربر و محصول با NestJS'],
      ar: ['تقليل وقت تحميل الصفحة بنسبة ٣٥٪', 'تنفيذ Redis، تقليل وقت الاستجابة من ٦٠٠ms إلى ١٢٠ms', 'بناء API إدارة المستخدمين والمنتجات'],
    },
    techStack: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'React', 'WordPress'],
  },
  {
    id: 'rojansoft',
    company: 'RojanSoft',
    companyLocal: 'RojanSoft',
    role: { en: 'Backend Developer', fa: 'توسعه‌دهنده بک‌اند', ar: 'مطور خلفية' },
    period: 'Jun 2024 — Feb 2025',
    location: 'Mashhad, Iran',
    description: {
      en: 'Designed and implemented RESTful APIs using Node.js, Express, and MongoDB for a software company.',
      fa: 'طراحی و پیاده‌سازی APIهای RESTful با Node.js، Express و MongoDB.',
      ar: 'تصميم وتنفيذ واجهات API RESTful.',
    },
    achievements: {
      en: ['Built JWT authentication API handling 500 concurrent requests per second', 'Fully documented API with Swagger, reducing cross-team coordination time', 'Designed scalable RESTful API architecture'],
      fa: ['ساخت API احراز هویت JWT با ظرفیت ۵۰۰ درخواست همزمان', 'مستندسازی کامل API با Swagger', 'طراحی معماری API مقیاس‌پذیر'],
      ar: ['بناء API مصادقة JWT يتعامل مع ٥٠٠ طلب متزامن', 'توثيق API كامل مع Swagger', 'تصميم معمارية API قابلة للتوسع'],
    },
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
  },
  {
    id: 'carncar',
    company: 'CarnCar',
    companyLocal: 'CarnCar',
    role: { en: 'Frontend Developer', fa: 'توسعه‌دهنده فرانت‌اند', ar: 'مطور واجهة' },
    period: 'Jun 2023 — Sep 2023',
    location: 'Mashhad, Iran',
    description: {
      en: 'Developed reusable React components and an internal admin panel for a car rental platform.',
      fa: 'توسعه کامپوننت‌های React و پنل ادمین داخلی.',
      ar: 'تطوير مكونات React ولوحة إدارة.',
    },
    achievements: {
      en: ['Built reusable React components without additional state management libraries', 'Created admin panel enabling support team to update content independently'],
      fa: ['ساخت کامپوننت‌های قابل استفاده مجدد React', 'ایجاد پنل ادمین برای تیم پشتیبانی'],
      ar: ['بناء مكونات React قابلة لإعادة الاستخدام', 'إنشاء لوحة إدارة للدعم الفني'],
    },
    techStack: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'razavi',
    company: 'Sanat Chob Astan Ghods Razavi',
    companyLocal: 'صنایع چوب‌های آستان قدس رضوی',
    role: { en: 'IT Skills & DevOps', fa: 'مهارت‌های IT و دواپس', ar: 'مهارات تقنية المعلومات والعمليات' },
    period: 'Jun 2022 — Oct 2022',
    location: 'Mashhad, Iran',
    description: {
      en: 'Developed and maintained internal web systems using HTML, CSS, and JavaScript for a large wood manufacturing company. Managed IT infrastructure, handled data entry system optimization, and provided technical support across hardware and software departments. First professional development role.',
      fa: 'توسعه و نگهداری سیستم‌های وب داخلی با HTML، CSS و جاوااسکریپت برای یک شرکت بزرگ تولید چوب. مدیریت زیرساخت IT، بهینه‌سازی سیستم ورود اطلاعات و پشتیبانی فنی.',
      ar: 'تطوير وصيانة أنظمة الويب الداخلية. إدارة البنية التحتية لتقنية المعلومات.',
    },
    achievements: {
      en: ['Designed 3 data entry forms, reducing employee registration time by 40%', 'Fixed 20+ system bugs across hardware and software sections', 'Managed IT infrastructure and provided cross-department technical support', 'Optimized internal web systems improving data retrieval speed by 40%'],
      fa: ['طراحی ۳ فرم ورود اطلاعات، کاهش ۴۰٪ زمان ثبت‌نام', 'رفع بیش از ۲۰ باگ سیستمی', 'مدیریت زیرساخت IT و پشتیبانی فنی بین‌بخشی', 'بهینه‌سازی سیستم‌های وب داخلی و افزایش ۴۰٪ سرعت بازیابی داده'],
      ar: ['تصميم ٣ نماذج، تقليل وقت التسجيل بنسبة ٤٠٪', 'إصلاح أكثر من ٢٠ خطأ', 'إدارة البنية التحتية', 'تحسين سرعة استرجاع البيانات بنسبة ٤٠٪'],
    },
    techStack: ['HTML', 'CSS', 'JavaScript', 'IT Support', 'Network Administration'],
  },
];