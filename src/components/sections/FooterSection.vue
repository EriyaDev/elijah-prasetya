<template>
  <!--
    Dark footer to contrast with the white sections above.
    Everything color-related lives in Tailwind classes here:
    bg-gray-950 / text-gray-* / border-white/10.
  -->
  <footer
    ref="footerRef"
    id="site-footer"
    class="relative w-full overflow-hidden bg-gray-950 text-gray-100 font-grotesk"
  >
    <!-- TOP CONTENT -->
    <div class="px-6 sm:px-10 pt-16 sm:pt-20">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <!-- Col 1: statement + contact -->
        <div data-anim="col" class="md:col-span-5 flex flex-col gap-10">
          <p class="max-w-sm text-xl sm:text-2xl font-medium leading-snug tracking-tight text-white">
            Full-stack developer building web apps with Laravel and Vue, from admin panels to
            landing pages.
          </p>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
              <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-400">Contact</span>
            </div>
            <a
              :href="`mailto:${email}`"
              class="w-fit text-base text-gray-200 hover:text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {{ email }}
            </a>
          </div>
        </div>

        <!-- Col 2: navigation -->
        <nav data-anim="col" class="md:col-span-4 flex flex-col gap-4" aria-label="Footer">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
            <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-400">Navigation</span>
          </div>
          <ul class="flex flex-col">
            <li v-for="link in navLinks" :key="link.label">
              <a
                :href="link.href"
                class="inline-block text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-white transition-colors hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Col 3: socials -->
        <div data-anim="col" class="md:col-span-3 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
            <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-400">Connect</span>
          </div>
          <ul class="flex flex-col gap-1">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 text-xl text-gray-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {{ social.label }}
                <!-- external-link icon -->
                <svg
                  class="w-3.5 h-3.5 text-gray-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- BOTTOM BAR -->
      <div
        data-anim="col"
        class="mt-20 sm:mt-28 py-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center font-mono-nav text-xs tracking-wider uppercase text-gray-400"
      >
        <p>&copy; {{ year }} {{ name }}</p>
        <button
          type="button"
          @click="scrollToTop"
          class="w-fit sm:justify-self-center uppercase hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Back to top
        </button>
        <p class="sm:justify-self-end tabular-nums" aria-live="off">
          {{ clock }} {{ timezoneLabel }}
        </p>
      </div>
    </div>

    <!--
      GIANT STACKED NAME
      Three rows of the same word. Each row is a clipped window (overflow-hidden)
      showing only the top part of the letters; the last row shows almost all of it.
      Font size is computed in JS so the word always spans the full width.
    -->
    <div
      ref="nameWrapRef"
      class="px-2 sm:px-3 select-none"
      aria-hidden="true"
    >
      <div
        v-for="(row, i) in nameRows"
        :key="i"
        class="overflow-hidden"
        :style="{ height: `${row.height}em` }"
      >
        <span
          data-anim="name-row"
          class="block whitespace-nowrap uppercase font-bold tracking-tighter leading-[0.8] text-[14.6rem] pb-10"
          :class="row.colorClass"
        >
          {{ name }}
        </span>
      </div>
    </div>
    <!-- Screen readers get the name once, not three times -->
    <span class="sr-only">{{ name }}</span>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// DATA — edit freely
const name = 'Elijah Emmanuel'
const email = 'elijahprasetya@gmail.com'
const year = new Date().getFullYear()

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Skills', href: '#skills-section' },
  { label: 'Portfolio', href: '#portfolio-section' },
  { label: 'Contact', href: '#contact-section' },
]

const socials = [
  { label: 'GitHub', url: 'https://github.com/EriyaDev' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/elijah-prasetya' },
  { label: 'Instagram', url: 'https://instagram.com/namasaya.el' },
  { label: 'WhatsApp', url: 'https://wa.me/6285155339188' },
]

// Giant name rows: height = how much of the letters each row reveals (in em).
// Tweak these if your font's cap height clips differently.
const nameRows = [
  { height: 0.38, colorClass: 'text-white/15' },
  { height: 0.5, colorClass: 'text-white/40' },
  { height: 1.9, colorClass: 'text-gray-100' },
]

// LIVE CLOCK — set to your own timezone
const timezone = 'Asia/Jakarta'
const timezoneLabel = 'WIB'
const clock = ref('')
const clockFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: timezone,
})
let clockTimer
const tick = () => (clock.value = clockFormat.format(new Date()).replace(',', ''))

// BACK TO TOP
function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// FIT NAME TO FULL WIDTH
const footerRef = ref(null)
const nameWrapRef = ref(null)
let resizeObserver

function fitName() {
  const wrap = nameWrapRef.value
  if (!wrap) return
  const probe = wrap.querySelector('[data-anim="name-row"]')
  const styles = getComputedStyle(wrap)
  const available = wrap.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)

  // Measure at a known size, then scale linearly to the available width
  wrap.style.fontSize = '100px'
  const measured = probe.scrollWidth
  wrap.style.fontSize = `${(100 * available) / measured}px`

  ScrollTrigger.refresh() // footer height changed, recalc trigger positions
}

// ANIMATION
let mm

onMounted(async () => {
  tick()
  clockTimer = setInterval(tick, 1000)

  // Wait for web fonts so the width measurement is correct
  await document.fonts.ready
  await nextTick()
  fitName()
  resizeObserver = new ResizeObserver(() => fitName())
  resizeObserver.observe(footerRef.value)

  mm = gsap.matchMedia()
  mm.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      // 1. Columns fade up when the footer enters
      gsap.from('[data-anim="col"]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // 2. The name rises out of its clipped rows, tied to scroll.
      //    Back rows move first so the stack "builds" toward the viewer.
      gsap.from('[data-anim="name-row"]', {
        yPercent: 100,
        ease: 'none', // scrub animations use linear time; scroll supplies the feel
        stagger: 0.15,
        scrollTrigger: {
          trigger: nameWrapRef.value,
          start: 'top bottom', // name enters the viewport
          end: 'bottom bottom', // page bottom reached
          scrub: 1,
        },
      })
    },
    footerRef.value
  )
})

onBeforeUnmount(() => {
  clearInterval(clockTimer)
  resizeObserver?.disconnect()
  mm?.revert()
})
</script>