<template>
  <Teleport to="body">
    <!--
      OVERLAY = the scroll container.
      It covers the whole viewport, so the flying image is never clipped
      by any ancestor while it travels from the card into the popup.
    -->
    <div
      v-if="isVisible && project"
      ref="overlayRef"
      class="fixed inset-0 z-[100] overflow-y-auto overscroll-contain font-grotesk"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @keydown="trapFocus"
    >
      <!-- Backdrop -->
      <div
        data-anim="backdrop"
        class="fixed inset-0 bg-gray-950/70 backdrop-blur-sm"
        @click="close"
      ></div>

      <!-- Click on empty space around the panel also closes -->
      <div
        class="relative min-h-full flex items-start justify-center px-4 py-6 sm:px-6 sm:py-12"
        @click.self="close"
      >
        <!--
          PANEL
          The panel itself is never faded or moved: an opacity/transform on it would
          also affect the flying image inside. Instead the white background is a
          separate layer, and text blocks fade individually.
        -->
        <article class="relative w-full max-w-5xl">
          <div
            data-anim="panel-bg"
            class="absolute inset-0 bg-white border border-black/15 rounded-sm"
          ></div>

          <!-- Close button -->
          <button
            ref="closeBtnRef"
            type="button"
            data-anim="fade"
            @click="close"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 inline-flex items-center gap-2 bg-white/90 backdrop-blur border border-black/15 px-3 py-2 font-mono-nav text-xs uppercase tracking-wider text-gray-900 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Close
            <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M1 1l10 10M11 1 1 11" />
            </svg>
          </button>

          <!-- SHARED ELEMENT: same data-flip-id as the card's image wrapper -->
          <div
            ref="mediaRef"
            :data-flip-id="`portfolio-media-${project.order}`"
            class="relative w-full aspect-[16/10] sm:aspect-[16/8] overflow-hidden rounded-t-sm"
          >
            <img :src="project.img" alt="" class="w-full h-full object-cover" />
          </div>

          <!-- CONTENT -->
          <div class="relative p-6 sm:p-10">
            <header class="flex flex-col gap-4 mb-8">
              <span data-anim="fade" class="font-mono-nav text-xs sm:text-sm text-black/60">
                0{{ project.order }}.
              </span>
              <h2
                :id="titleId"
                data-anim="fade"
                class="text-3xl sm:text-5xl font-medium leading-tight tracking-tight text-gray-900"
              >
                {{ project.title }}
              </h2>
              <div
                v-if="project.techstacks?.length"
                data-anim="fade"
                class="flex flex-wrap items-center gap-2"
              >
                <TechstackBadge
                  v-for="tech in project.techstacks"
                  :key="tech.name"
                  :name="tech.name"
                  :bg-class="tech.bgClass"
                  :text-class="tech.textClass"
                />
              </div>
            </header>

            <!-- Meta: same hairline grid language as the skills section -->
            <dl
              v-if="meta.length"
              data-anim="fade"
              class="grid grid-cols-2 sm:grid-cols-4 border-l border-t border-gray-200 mb-10"
            >
              <div v-for="item in meta" :key="item.label" class="border-r border-b border-gray-200 p-4">
                <dt class="font-mono-nav text-xs uppercase tracking-wider text-gray-500 mb-1">
                  {{ item.label }}
                </dt>
                <dd class="text-gray-900">{{ item.value }}</dd>
              </div>
            </dl>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
              <!-- Overview -->
              <section class="md:col-span-7">
                <h3 data-anim="fade" class="flex items-center gap-2 mb-4">
                  <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
                  <span class="font-mono-nav text-xs uppercase tracking-wider text-gray-900">Overview</span>
                </h3>
                <div class="flex flex-col gap-4">
                  <p
                    v-for="(paragraph, i) in overview"
                    :key="i"
                    data-anim="fade"
                    class="text-base sm:text-lg leading-relaxed text-black/70"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </section>

              <!-- Key features -->
              <section v-if="project.features?.length" class="md:col-span-5">
                <h3 data-anim="fade" class="flex items-center gap-2 mb-4">
                  <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
                  <span class="font-mono-nav text-xs uppercase tracking-wider text-gray-900">Key features</span>
                </h3>
                <ul class="border-t border-gray-200">
                  <li
                    v-for="feature in project.features"
                    :key="feature"
                    data-anim="fade"
                    class="py-3 border-b border-gray-200 text-gray-900"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </section>
            </div>

            <!-- Gallery -->
            <div
              v-if="project.gallery?.length"
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
            >
              <div
                v-for="(image, i) in project.gallery"
                :key="i"
                data-anim="fade"
                class="aspect-[4/3] overflow-hidden rounded-sm border border-black/10"
              >
                <img :src="image" alt="" loading="lazy" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Links -->
            <div
              v-if="project.liveUrl || project.repoUrl"
              data-anim="fade"
              class="flex flex-col sm:flex-row gap-3"
            >
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-center bg-gray-900 px-5 py-3 text-sm text-white transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Visit live site
              </a>
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-center border border-gray-200 px-5 py-3 text-sm text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View source code
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import TechstackBadge from '../ui/TechstackBadge.vue'
import Lenis from 'lenis'

gsap.registerPlugin(Flip)

const props = defineProps({
  project: { type: Object, default: null },
  // The card's image wrapper (HTMLElement) the popup grows out of / returns to
  sourceEl: { type: null, default: null },
})
const emit = defineEmits(['closed'])

const isVisible = ref(false)
const overlayRef = ref(null)
const mediaRef = ref(null)
const closeBtnRef = ref(null)

let isAnimating = false
let lastFocused = null

const titleId = computed(() => `portfolio-detail-title-${props.project?.order}`)

const meta = computed(() => {
  const p = props.project
  if (!p) return []
  return [
    { label: 'Role', value: p.role },
    { label: 'Client', value: p.client },
    { label: 'Year', value: p.year },
    { label: 'Type', value: p.category },
  ].filter((item) => item.value)
})

// Falls back to the short card description if there's no long one
const overview = computed(() => props.project?.longDesc ?? [props.project?.desc])

const motionFactor = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1

/* ---------------- OPEN ---------------- */

watch(
  () => props.project,
  async (project) => {
    if (!project || !props.sourceEl || isVisible.value) return

    lastFocused = document.activeElement

    // 1. Record where the image is RIGHT NOW inside the (rotated, scaled) card
    const state = Flip.getState(props.sourceEl)

    // 2. Render the popup in its final layout
    lockScroll()
    isVisible.value = true
    await nextTick()

    playOpen(state)
  }
)

function playOpen(state) {
  const d = motionFactor()
  const q = gsap.utils.selector(overlayRef.value)
  isAnimating = true

  // Hide the original so it looks like the image physically left the card
  gsap.set(props.sourceEl, { autoAlpha: 0 })

  gsap
    .timeline({
      onComplete: () => {
        isAnimating = false
        closeBtnRef.value?.focus({ preventScroll: true })
      },
    })
    // Backdrop dims the page
    .fromTo(q('[data-anim="backdrop"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 * d, ease: 'power2.out' }, 0)

    // 3. FLIP: popup image starts at the card's position/size/rotation
    //    and animates to its natural place. Width/height are animated
    //    (not scale), so object-cover never distorts the photo.
    .add(
      Flip.from(state, {
        targets: mediaRef.value,
        duration: 0.9 * d,
        ease: 'expo.inOut',
      }),
      0
    )

    // White panel appears behind the image mid-flight
    .fromTo(q('[data-anim="panel-bg"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 * d, ease: 'power2.out' }, 0.3 * d)

    // Text content settles in once the image has nearly landed
    .fromTo(
      q('[data-anim="fade"]'),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6 * d, ease: 'power3.out', stagger: 0.05 * d },
      0.6 * d
    )
}

/* ---------------- CLOSE ---------------- */

function close() {
  if (isAnimating || !isVisible.value) return
  isAnimating = true

  const d = motionFactor()
  const q = gsap.utils.selector(overlayRef.value)

  const tl = gsap.timeline({ onComplete: finishClose })

  // Content leaves first (reverse order), so only the image is left travelling
  tl.to(q('[data-anim="fade"]'), {
    autoAlpha: 0,
    y: 10,
    duration: 0.25 * d,
    ease: 'power2.in',
    stagger: { each: 0.02 * d, from: 'end' },
  }, 0)
    .to(q('[data-anim="panel-bg"]'), { autoAlpha: 0, duration: 0.3 * d }, 0.15 * d)
    .to(q('[data-anim="backdrop"]'), { autoAlpha: 0, duration: 0.5 * d, ease: 'power2.inOut' }, 0.25 * d)

  // FLIP back: fit the popup image onto the (hidden) card image,
  // including the card's rotation and scale from the pinned timeline.
  if (props.sourceEl?.isConnected) {
    tl.add(
      Flip.fit(mediaRef.value, props.sourceEl, {
        duration: 0.8 * d,
        ease: 'expo.inOut',
      }),
      0.1 * d
    )
  }
}

function finishClose() {
  if (props.sourceEl) gsap.set(props.sourceEl, { clearProps: 'opacity,visibility' })
  isVisible.value = false
  isAnimating = false
  unlockScroll()
  lastFocused?.focus?.({ preventScroll: true })
  emit('closed')
}

/* ---------------- KEYBOARD ---------------- */

function onWindowKeydown(e) {
  if (e.key === 'Escape') close()
}

// Keep Tab inside the dialog
function trapFocus(e) {
  if (e.key !== 'Tab') return
  const focusables = overlayRef.value.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(isVisible, (visible) => {
  if (visible) window.addEventListener('keydown', onWindowKeydown)
  else window.removeEventListener('keydown', onWindowKeydown)
})

/* ---------------- SCROLL LOCK ---------------- */

function lockScroll() {
    lenis.stop();
  const root = document.documentElement
  // Compensate for the disappearing scrollbar so the page doesn't jump sideways
  const scrollbar = window.innerWidth - root.clientWidth
  root.style.overflow = 'hidden'
  root.style.paddingRight = scrollbar ? `${scrollbar}px` : ''
}

function unlockScroll() {
    lenis.start();
  const root = document.documentElement
  root.style.overflow = ''
  root.style.paddingRight = ''
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onWindowKeydown)
  unlockScroll()
})
</script>