<template>
  <!--
    Same shell as SkillsSection: background + border on this one element.
    Dark version: bg-white -> bg-gray-950, border-gray-200 -> border-white/10, flip text-gray-*.
  -->
  <section
    ref="sectionRef"
    id="contact-section"
    class="w-full bg-white px-6 sm:px-10 py-20 sm:py-24 font-grotesk border-t-transparent border border-gray-200"
  >
    <!-- HEADER -->
    <div class="max-w-3xl mx-auto text-center flex flex-col items-center mb-14">
      <!-- Badge -->
      <div
        data-anim="header"
        class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-6"
      >
        <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
        <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-900">
          Contact
        </span>
      </div>

      <!-- Title -->
      <h2
        data-anim="header"
        class="text-4xl sm:text-5xl font-medium leading-tight text-gray-900 tracking-tight mb-4"
      >
        Let's Build Something <br class="hidden sm:block" />
        Together
      </h2>

      <p data-anim="header" class="max-w-md text-base sm:text-lg text-gray-600">
        Have a project in mind or need help with a web app? Send me a message and I'll get back to
        you within a day or two.
      </p>
    </div>

    <!--
      CONTACT GRID
      One hairline system like the skills grid: outer border left/top,
      every cell draws right/bottom.
    -->
    <ul class="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 border-l border-t border-gray-200">
      <!-- EMAIL: full-width primary row -->
      <li
        data-anim="cell"
        class="col-span-2 sm:col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 border-r border-b border-gray-200"
      >
        <div class="flex items-center gap-4 min-w-0">
          <img
            src="https://api.iconify.design/logos/google-gmail.svg"
            alt=""
            width="40"
            height="40"
            class="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
          />
          <div class="min-w-0 text-left">
            <!-- Availability status -->
            <p class="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span class="relative flex w-2 h-2">
                <span class="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping"></span>
                <span class="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
              </span>
              Available for freelance projects
            </p>
            <a
              :href="`mailto:${email}`"
              class="block truncate text-xl sm:text-2xl font-medium tracking-tight text-gray-900 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {{ email }}
            </a>
          </div>
        </div>

        <div class="flex gap-3 shrink-0">
          <button
            type="button"
            @click="copyEmail"
            class="flex-1 sm:flex-none border border-gray-200 px-5 py-3 text-sm text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-live="polite"
          >
            {{ copyLabel }}
          </button>
          <a
            :href="`mailto:${email}`"
            class="flex-1 sm:flex-none text-center bg-gray-900 px-5 py-3 text-sm text-white transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Send email
          </a>
        </div>
      </li>

      <!-- OTHER CHANNELS -->
      <li
        v-for="channel in channels"
        :key="channel.name"
        data-anim="cell"
        class="border-r border-b border-gray-200"
      >
        <a
          :href="channel.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col items-center justify-center gap-3 aspect-square sm:aspect-[4/3] p-4 transition-colors duration-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        >
          <!-- Wrapper animated by GSAP; img handles the CSS hover lift -->
          <span data-anim="logo" class="block">
            <img
              :src="`https://api.iconify.design/logos/${channel.icon}.svg`"
              :alt="`${channel.name} logo`"
              width="40"
              height="40"
              loading="lazy"
              class="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1"
            />
          </span>
          <span class="flex flex-col items-center text-center">
            <span class="text-sm sm:text-base text-gray-900">{{ channel.name }}</span>
            <span class="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              {{ channel.handle }}
            </span>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// DATA — replace with your real details
const email = 'elijahprasetya@gmail.com'

const channels = [
  { name: 'WhatsApp', handle: 'Chat directly', icon: 'whatsapp-icon', url: 'https://wa.me/6285155339188' },
  { name: 'LinkedIn', handle: '/in/elijah-prasetya', icon: 'linkedin-icon', url: 'https://linkedin.com/in/elijah-prasetya' },
  { name: 'GitHub', handle: '@eriyadev', icon: 'github-icon', url: 'https://github.com/EriyaDev' },
  { name: 'Instagram', handle: '@namasaya.el', icon: 'instagram-icon', url: 'https://instagram.com/namasaya.el' },
]

// COPY EMAIL
const copyLabel = ref('Copy email')
let resetTimer

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    copyLabel.value = 'Copied!'
  } catch {
    // Clipboard API needs HTTPS (or localhost); fall back gracefully
    copyLabel.value = 'Copy failed'
  }
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copyLabel.value = 'Copy email'), 2000)
}

// ANIMATION — same choreography as SkillsSection
const sectionRef = ref(null)
let mm

onMounted(() => {
  mm = gsap.matchMedia()

  mm.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      const tlContact = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // 1. Badge, heading, intro text rise in sequence
      tlContact
        .from('[data-anim="header"]', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
        })

        // 2. Email row first, then channel cells left-to-right
        //    (reading order matters more here than a center ripple)
        .from(
          '[data-anim="cell"]',
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          '-=0.4'
        )

        // 3. Channel logos pop in just behind their cells
        .from(
          '[data-anim="logo"]',
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.08,
          },
          '<0.2'
        )
    },
    sectionRef.value // scope selectors to this section only
  )
})

onBeforeUnmount(() => {
  mm?.revert()
  clearTimeout(resetTimer)
})
</script>