export interface Project {
  icon: string
  iconColor: string
  badge: string
  badgeColor: string
  title: string
  description: string
  stack: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    icon: 'fas fa-users',
    iconColor: '#ec4899',
    badge: 'Product',
    badgeColor: '#c9a96e',
    title: 'FamilyWall',
    description: 'Multi-tenant family tree SaaS — each family gets their own subdomain. Features WhatsApp OTP registration, a Claude Haiku AI bot for natural-language tree queries, Supabase RLS isolation, and optimistic-locking concurrency control.',
    stack: ['React 18', 'Supabase', 'Claude Haiku', 'WhatsApp API', 'Framer Motion', 'Vercel'],
    live: 'https://familywall.in',
  },
  {
    icon: 'fas fa-brain',
    iconColor: '#25D366',
    badge: 'Product',
    badgeColor: '#c9a96e',
    title: 'Manvi OS — WhatsApp AI Assistant',
    description: 'Event-driven AI assistant over the Meta WhatsApp Cloud API. Waterfall NLP intent routing, IST-accurate cron scheduling, atomic dispatch guards preventing duplicate sends, per-user rate limiting, and a live observability dashboard.',
    stack: ['Node.js', 'Express', 'Supabase', 'Gemini AI', 'Meta API', 'GSAP'],
    github: 'https://github.com/viswabnath/whatsapp-reminder-bot',
    live: 'https://manvi.onrender.com',
  },
  {
    icon: 'fas fa-file-invoice-dollar',
    iconColor: '#3b82f6',
    badge: 'Enterprise',
    badgeColor: '#3b82f6',
    title: 'OneMark Internal Portal',
    description: 'Full-featured HR & finance portal for an agency — payslip/invoice/quotation PDF generation, 3-role RBAC (admin / HR / employee), real-time Firestore listeners, audit log, timesheet approval, and automated birthday/anniversary alerts via Firebase Cloud Functions.',
    stack: ['React 18', 'Vite', 'Firebase', 'Firestore', 'html2pdf.js', 'Vercel'],
    live: 'https://internal.onemark.co.in',
  },
  {
    icon: 'fas fa-cube',
    iconColor: '#f97316',
    badge: 'AI Experiment',
    badgeColor: '#f97316',
    title: 'Pettlu Residence — 3D Architectural Walkthrough',
    description: 'Zero prior 3D experience → full interactive architectural walkthrough in one weekend. Used Claude Code + Blender MCP to generate Python scripts conversationally for walls, furniture placement, and materials. Exported multi-GLB scene (exterior, interior, floorplan) served via Three.js on Vercel.',
    stack: ['Blender MCP', 'Claude Code', 'Three.js', 'Python', 'GLB/glTF', 'Vercel'],
    live: 'https://pettlu-house-render.vercel.app',
  },
  {
    icon: 'fas fa-video',
    iconColor: '#a78bfa',
    badge: 'AI Experiment',
    badgeColor: '#a78bfa',
    title: 'Remotion × Claude — Programmatic Video',
    description: 'AI-native video creation pipeline: Claude Code writes the composition code, Remotion renders it to MP4 on Vercel Serverless. Built two productions — a 30s FamilyWall promo (5 animated scenes, 1080×1920) and a Hospital Health Clip. Explored "AI builds the app AND directs the film."',
    stack: ['Remotion', 'React', 'Claude Code', 'Next.js', 'Vercel Blob', 'TypeScript'],
    github: 'https://github.com/viswabnath',
  },
  {
    icon: 'fas fa-compress-arrows-alt',
    iconColor: '#c9a96e',
    badge: 'Product',
    badgeColor: '#c9a96e',
    title: 'Compreso',
    description: 'Privacy-first image compression — nothing leaves your browser until you download. Target-size input auto-adjusts quality via binary search (~7 API calls). Per-image independent quality, ZIP batch export, GSAP animations. Zero disk writes on the server.',
    stack: ['Node.js', 'Express', 'sharp', 'React 18', 'Vite', 'GSAP'],
    github: 'https://github.com/viswabnath/compreso',
    live: 'https://compreso.vercel.app',
  },
  {
    icon: 'fas fa-broom',
    iconColor: '#4ade80',
    badge: 'Native / Tool',
    badgeColor: '#4ade80',
    title: 'CompresoClean — macOS Disk Cleaner',
    description: 'Native macOS app built entirely with Claude Code — cleans system caches, npm, Homebrew, Trash, and detects creative app caches (Photoshop, After Effects, Premiere, DaVinci, Final Cut). Packaged as a distributable .app via AirDrop. Built in one session with no prior Swift/macOS AppKit experience.',
    stack: ['Swift', 'SwiftUI', 'AppKit', 'Claude Code', 'macOS'],
    github: 'https://github.com/viswabnath/CompresoClean',
  },
  {
    icon: 'fab fa-android',
    iconColor: '#4ade80',
    badge: 'Native / Tool',
    badgeColor: '#4ade80',
    title: 'AndroidTransfer',
    description: 'Premium macOS menu bar app for browsing and transferring files from connected Android devices. Dual-protocol engine: ADB shell wrapper + native MTP via a custom C-to-Swift bridge using libmtp/libusb. USB hot-plug via IOKit, background transfer queue with live progress.',
    stack: ['Swift', 'SwiftUI', 'libmtp', 'libusb', 'IOKit', 'ADB'],
    github: 'https://github.com/viswabnath/AndroidTransfer',
  },
  {
    icon: 'fas fa-ghost',
    iconColor: '#4ade80',
    badge: 'Native / Tool',
    badgeColor: '#4ade80',
    title: 'GhostGrab',
    description: 'Internal agency video processing tool — downloads, strips all EXIF/tracking metadata via FFmpeg, and re-encodes to YouTube-ready H.264. Supports YouTube playlists (up to 200/run), resumable batch jobs with checkpoint manifests, live progress with ETA, and pause/cancel.',
    stack: ['FastAPI', 'Python', 'yt-dlp', 'FFmpeg', 'React', 'TypeScript'],
    github: 'https://github.com/viswabnath/GhostGrab',
  },
  {
    icon: 'fas fa-film',
    iconColor: '#d4758c',
    badge: 'Creative',
    badgeColor: '#d4758c',
    title: 'OneMark Stories',
    description: 'Agency marketing platform for bespoke digital wedding & event experiences. Sticky horizontal showcase with MacBook+iPhone mockups, canvas particle field hero, Apple-style 4-beat scroll reveal, SSG project pages with dynamic OG image generation, and Vercel Analytics.',
    stack: ['Next.js 16', 'React 19', 'GSAP', 'Canvas API', '@vercel/og', 'Vercel'],
    live: 'https://stories.onemark.co.in',
  },
  {
    icon: 'fas fa-heart',
    iconColor: '#d4758c',
    badge: 'Creative',
    badgeColor: '#d4758c',
    title: 'Manojna — Digital Birthday Experience',
    description: 'A cinematic digital birthday celebration crafted by OneMark Stories — immersive GSAP ScrollTrigger reveals, live countdown timer, premium typography, and full mobile-first responsive design. One of 200+ bespoke event experiences shipped.',
    stack: ['GSAP', 'ScrollTrigger', 'Vanilla JS', 'CSS3', 'HTML5'],
    live: 'https://manojna.digital',
  },
]
