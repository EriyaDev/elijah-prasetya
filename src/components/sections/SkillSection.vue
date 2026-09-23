<template>
  <!--
    Background + border live on this one element.
    Dark version: swap bg-white -> bg-gray-950 and border-gray-200 -> border-white/10
    (plus the text colors below).
  -->
  <section
    ref="sectionRef"
    id="skills-section"
    class="w-full bg-white px-6 sm:px-10 py-20 sm:py-24 font-grotesk border-t-transparent border border-gray-200"
  >
    <!-- HEADER -->
    <div class="max-w-3xl mx-auto text-center flex flex-col items-center mb-14">
      <!-- Badge (same pattern as the portfolio section) -->
      <div
        data-anim="header"
        class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-6"
      >
        <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
        <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-900">
          Skills &amp; Experience
        </span>
      </div>

      <!-- Title -->
      <h2
        data-anim="header"
        class="text-4xl sm:text-5xl font-medium leading-tight text-gray-900 tracking-tight"
      >
        Working with Latest <br class="hidden sm:block" />
        Technologies &amp; Stack
      </h2>
    </div>

    <!--
      TECH GRID
      3 x 3 hairline grid: outer border on left/top, each cell draws right/bottom,
      so every line is exactly 1px with no doubled borders.
    -->
    <ul class="max-w-3xl mx-auto grid grid-cols-3 border-l border-t border-gray-200">
      <li
        v-for="tech in techstack"
        :key="tech.name"
        data-anim="cell"
        class="group flex flex-col items-center justify-center gap-3 sm:gap-4 aspect-square sm:aspect-[4/3] p-4 border-r border-b border-gray-200 transition-colors duration-300 hover:bg-gray-50"
      >
        <!-- Wrapper is animated by GSAP; the img handles the CSS hover lift, so they never fight over transform -->
        <span data-anim="logo" class="block">
          <img
            :src="`https://api.iconify.design/logos/${tech.icon}.svg`"
            :alt="`${tech.name} logo`"
            width="48"
            height="48"
            loading="lazy"
            class="w-9 h-9 sm:w-12 sm:h-12 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1"
          />
        </span>

        <span
          class="text-sm line-clamp-1 sm:text-base text-center text-gray-600 transition-colors duration-300 group-hover:text-gray-900"
        >
          {{ tech.name }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// DATA
// `icon` = slug from the Iconify "logos" set (https://icon-sets.iconify.design/logos/)
// Rows read as: foundations -> frontend layer -> backend & environment
const techstack = [
  { name: 'HTML', icon: 'html-5' },
  { name: 'CSS', icon: 'css-3' },
  { name: 'Tailwind CSS', icon: 'tailwindcss-icon' },
  { name: 'Alpine.js', icon: 'alpinejs-icon' },
  { name: 'Vue', icon: 'vue' },
  { name: 'Nuxt', icon: 'nuxt' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'Linux', icon: 'linux-tux' },
  { name: 'Linux Mint', icon: 'linux-mint' },
]

const sectionRef = ref(null)
let mm // gsap.matchMedia instance, kept for cleanup

onMounted(() => {
  mm = gsap.matchMedia()

  // Only animate when the user hasn't asked for reduced motion.
  // Third argument scopes every selector to THIS section, so these
  // data-anim selectors can't collide with other components.
  mm.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      const tlSkills = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%', // begins once the section is ~30% into view
          toggleActions: 'play none none reverse', // replays if you scroll back up past it
        },
      })

      // 1. Badge, then heading, rise into place
      tlSkills
        .from('[data-anim="header"]', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
        })

        // 2. Cells ripple out from the center of the grid
        .from(
          '[data-anim="cell"]',
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: { each: 0.06, grid: 'auto', from: 'center' },
          },
          '-=0.4' // overlap with the heading so it feels like one motion
        )

        // 3. Logos pop in slightly behind their cells
        .from(
          '[data-anim="logo"]',
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: { each: 0.06, grid: 'auto', from: 'center' },
          },
          '<0.1'
        )
    },
    sectionRef.value
  )
})

// Kills the ScrollTrigger and restores inline styles when the component unmounts
// (important with Inertia page visits).
onBeforeUnmount(() => mm?.revert())
</script>