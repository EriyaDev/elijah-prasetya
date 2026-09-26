<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import FooterSection from './components/sections/FooterSection.vue'
import logoEriya from './assets/logo-eriya.png'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()

const isMenuOpen = ref(false)
const overlayRef = ref(null)
const iconRef = ref(null)

const navLinks = [
  { name: 'WHAT I DO', hash: '#about', number: '01' },
  { name: 'PROJECTS', hash: '#portfolio-section', number: '02' },
  { name: 'SKILLS', hash: '#skills', number: '03' },
  { name: 'CONTACT', hash: '#contact-section', number: '04' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value

  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()
    // Rotasi icon 45 derajat
    tl.to(iconRef.value, { rotate: 90, duration: 0.35, ease: 'power3.out' }, 0)
    // Animasi pembesaran container seukuran full layar
    tl.fromTo(
      overlayRef.value,
      { clipPath: 'circle(0% at calc(100% - 3rem) 3rem)', opacity: 0, visibility: 'visible' },
      { clipPath: 'circle(150% at calc(100% - 3rem) 3rem)', opacity: 1, duration: 0.5, ease: 'power3.out' },
      0,
    )
    // Vertical list items stagger animate
    tl.fromTo(
      '.mobile-nav-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.25',
    )
  } else {
    document.body.style.overflow = ''

    const tl = gsap.timeline()
    tl.to(iconRef.value, { rotate: 0, duration: 0.35, ease: 'power2.out' }, 0)
    tl.to(
      overlayRef.value,
      {
        clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          if (overlayRef.value) overlayRef.value.style.visibility = 'hidden'
        },
      },
      0,
    )
  }
}

const handleNavClick = async (hash) => {
  if (isMenuOpen.value) {
    toggleMenu()
  }

  if (route.path === '/') {
    const target = document.querySelector(hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    await router.push({ path: '/', hash })
  }
}

const getLinkHref = (hash) => {
  return route.path === '/' ? hash : `/${hash}`
}
</script>

<template>
  <div class="max-w-[1440px] mx-auto overflow-x-hidden 2xl:overflow-x-visible bg-background min-h-screen">
    <!-- Fixed Top Navbar -->
    <div class="fixed top-4 left-4 right-4 z-50 sm:top-5 sm:left-5 sm:right-5">
      <nav class="navbar-gradient rounded-full sm:rounded-2xl overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
          <div class="flex items-center justify-between h-16 sm:h-[70px]">
            <!-- Logo -->
            <RouterLink
              to="/"
              class="flex items-center gap-2 shrink-0 px-4 py-2 bg-background border border-gray-200 hover:brightness-95 transition-all rounded-lg"
            >
              <img class="h-8 rounded-sm" :src="logoEriya" alt="Eriya" />
              <p class="text-lg font-grotesk font-bold text-gray-900">EriyaDev</p>
            </RouterLink>

            <!-- Desktop Nav -->
            <div
              class="hidden lg:flex items-center gap-1 bg-background rounded-md border border-gray-200 px-1.5 py-1.5"
            >
              <a
                v-for="link in navLinks"
                :key="link.name"
                :href="getLinkHref(link.hash)"
                @click.prevent="handleNavClick(link.hash)"
                class="text-[#2b2b2b] text-xs font-grotesk tracking-wider-plus uppercase px-4 py-2 rounded-sm hover:bg-gray-100 transition-colors"
              >
                {{ link.name }}
              </a>
            </div>

            <!-- Mobile Menu Button -->
            <button
              id="menu-btn"
              @click="toggleMenu"
              class="lg:hidden text-black p-2 flex items-center justify-center gap-2 shrink-0 px-3.5 py-2.5 bg-background border border-gray-200 hover:brightness-95 transition-all rounded-xl cursor-pointer z-50 relative"
              aria-label="Toggle menu"
            >
              <svg
                ref="iconRef"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                class="transition-transform transform origin-center ease-out"
              >
                <!-- Hamburger Icon saat closed, Icon X (Close) saat open -->
                <path
                  v-if="!isMenuOpen"
                  d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"
                />
                <path
                  v-else
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Fullscreen Expanding Mobile Menu Overlay -->
    <div
      ref="overlayRef"
      class="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 invisible lg:hidden font-grotesk"
    >

      <!-- Vertical List Links -->
      <div class="my-auto flex flex-col gap-6 max-w-md w-full mx-auto px-2">
        <span class="text-xs font-mono-nav text-gray-400 uppercase tracking-widest mb-2">Navigation</span>
        
        <div v-for="link in navLinks" :key="link.name" class="mobile-nav-item border-b border-gray-100 pb-4">
          <a
            :href="getLinkHref(link.hash)"
            @click.prevent="handleNavClick(link.hash)"
            class="group flex items-center justify-between text-2xl sm:text-3xl font-medium text-gray-900 hover:text-primary transition-colors"
          >
            <span class="flex items-center gap-4">
              <span class="text-xs font-mono-nav text-gray-400 group-hover:text-primary transition-colors">{{ link.number }}.</span>
              <span>{{ link.name }}</span>
            </span>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Footer action inside mobile overlay -->
      <div class="mobile-nav-item pt-4 border-t border-gray-100 flex flex-col gap-3">
        <a
          :href="getLinkHref('#contact-section')"
          @click.prevent="handleNavClick('#contact-section')"
          class="w-full flex items-center justify-center bg-gray-900 hover:bg-black text-white text-sm font-semibold uppercase tracking-wider-plus px-6 py-4 rounded-xl transition-all shadow-sm"
        >
          Work With Me
        </a>
        <p class="text-center text-xs text-gray-400 font-mono-nav mt-1">© 2026 Elijah Emmanuel. All rights reserved.</p>
      </div>
    </div>

    <!-- Main View -->
    <RouterView />
  </div>

  <FooterSection />
</template>

<style scoped></style>
