<template>
  <section
    id="portfolio-section"
    class="w-full min-h-screen bg-white px-6 sm:px-10 py-14 font-grotesk border-t-transparent border border-gray-200"
  >
    <!-- HEADER -->
    <div class="max-w-3xl mx-auto text-center flex flex-col items-center mb-16">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-6">
        <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
        <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-900">Portfolio</span>
      </div>

      <!-- Title -->
      <h2 class="text-4xl sm:text-5xl font-medium leading-tight text-gray-900 tracking-tight mb-4">
        Things I've Built
      </h2>
    </div>

    <div id="portfolio-container" class="relative w-full h-[540px] sm:h-[520px] overflow-hidden">
      <PortfolioCard2
        v-for="portfolio in portfolios"
        :key="portfolio.order"
        :order="portfolio.order"
        :title="portfolio.title"
        :desc="portfolio.desc"
        :img="portfolio.img"
        :techstacks="portfolio.techstacks"
        @open="(el) => openDetail(portfolio, el)"
      />
    </div>

    <!-- DETAIL POPUP (teleported to <body>) -->
    <PortfolioDetailModal
      :project="activeProject"
      :source-el="activeSourceEl"
      @closed="closeDetail"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import PortfolioCard from '../cards/PortfolioCard.vue'
import PortfolioDetailModal from '../modals/PortfolioDetailModal.vue'
import PortfolioCard2 from '../cards/PortfolioCard2.vue'

// DETAIL POPUP STATE
const activeProject = ref(null)
const activeSourceEl = ref(null)

function openDetail(project, sourceEl) {
  activeSourceEl.value = sourceEl
  activeProject.value = project
}

function closeDetail() {
  activeProject.value = null
  activeSourceEl.value = null
}

// DATA
// New optional fields for the popup: role, client, year, category,
// longDesc (array of paragraphs), features, gallery, liveUrl, repoUrl.
// Anything left out is simply not rendered. Replace the placeholder text.
const portfolios = [
  {
    order: 1,
    title: 'Event Management & QR Attendance System',
    desc: 'A streamlined event platform featuring automated QR-based registration and real-time attendance tracking.',
    img: 'https://images.unsplash.com/photo-1781038507661-06501ddcdc90?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techstacks: [
      { name: 'Laravel', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-red-700' },
      { name: 'Blade', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-red-700' },
      { name: 'TailwindCSS', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-blue-700' },
    ],
    role: 'Full-stack developer',
    client: 'Client name',
    year: '2025',
    category: 'Web app',
    longDesc: [
      'Describe the problem the organizer had before this system, for example manual sign-in sheets and slow check-in queues.',
      'Then explain what you built and the result: registration generates a unique QR code, and staff scan it at the door to record attendance instantly.',
    ],
    features: [
      'Online registration with automatic QR code',
      'QR scan check-in for event staff',
      'Real-time attendance dashboard',
      'Attendance export for reports',
    ],
    gallery: [],
    liveUrl: '',
    repoUrl: '',
  },
  {
    order: 2,
    title: 'Carwash Operation & Task Assignment System',
    desc: 'An operational management platform designed to streamline order tracking and worker task assignments.',
    img: 'https://images.unsplash.com/photo-1633014041037-f5446fb4ce99?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techstacks: [
      { name: 'Laravel', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-red-700' },
      { name: 'Blade', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-red-700' },
      { name: 'TailwindCSS', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-blue-700' },
    ],
    role: 'Full-stack developer',
    client: 'Client name',
    year: '2025',
    category: 'Web app',
    longDesc: [
      'Describe how orders and worker assignments were handled before, and what slowed the team down.',
      'Then explain how the system tracks each order from arrival to completion and assigns tasks to workers.',
    ],
    features: [
      'Order tracking from queue to done',
      'Task assignment per worker',
      'Daily operational overview',
    ],
    gallery: [],
    liveUrl: '',
    repoUrl: '',
  },
  {
    order: 3,
    title: 'Batu Apple Tourism Landing Page',
    desc: 'An immersive landing page for Batu Apple Tourism to boost visitor engagement and highlight agrotourism experiences.',
    img: 'https://images.unsplash.com/photo-1697163131522-e16ef55aa9bf?w=1200&auto=format&fit=crop&q=70&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBmYXJtfGVufDB8fDB8fHww',
    techstacks: [
      { name: 'Laravel', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-red-700' },
      { name: 'Filament', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-yellow-700' },
      { name: 'TailwindCSS', bgClass: 'hover:bg-gray-50', textClass: 'group-hover:text-blue-700' },
    ],
    role: 'Full-stack developer',
    client: 'Batu Apple Tourism',
    year: '2025',
    category: 'Landing page',
    longDesc: [
      'Describe the goal of the landing page and who it was for.',
      'Then explain the experience you designed and how content is managed through the Filament admin panel.',
    ],
    features: [
      'Immersive agrotourism showcase',
      'Content managed via Filament admin',
      'Responsive, animation-rich layout',
    ],
    gallery: [],
    liveUrl: '',
    repoUrl: '',
  },
]

onMounted(() => {
  const tlPorto = gsap.timeline({
    scrollTrigger: {
      trigger: '#portfolio-section',
      start: 'top top',
      end: '+=2500px',
      pin: true,
      scrub: 1,
    },
  })

  tlPorto
    .to('.card-1', { y: 0, rotate: '2deg', opacity: 1 })
    .to('.card-2', { y: 0, rotate: '-3deg' })
    .to('.card-1', { scale: 0.9 }, '<')
    .to('.card-3', { y: 0, rotate: '4deg' })
    .to('.card-2', { scale: 0.9 }, '<')
    .to('.card-4', { y: 0, rotate: '-2deg' })
    .to('.card-3', { scale: 0.9 }, '<')
    .to('.card-5', { y: 0, rotate: '1deg' })
    .to('.card-4', { scale: 0.9 }, '<')
})
</script>

<style scoped>
.card-portfolio {
  position: absolute;
  transform: translateY(150%);
}
</style>