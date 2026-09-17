<template>
  <section
    class="w-full xl:smin-h-screen border border-b-transparent border-gray-200 font-grotesk relative"
  >
    <!-- Top Row: date / image / description -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1.3fr]">
      <!-- Col 1: Date info -->
      <div
        class="flex flex-col items-end md:items-start justify-end p-6 md:p-8 border-b border-gray-200 border-dashed min-h-[120px] md:min-h-[280px]"
      >
        <p class="hero-label text-label text-gray-900 leading-tight">Bali, Indonesia</p>
        <p class="hero-label text-label font-semibold text-gray-900 leading-tight">Frontend Developer</p>
      </div>

      <!-- Col 2: Portrait image -->
      <div class="border-b border-gray-200 border-dashed overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/ee/ff/ed/eeffed5803e3283765c4e0332d89b9f4.jpg"
          alt="Elijah"
          class="hero-img w-full h-64 md:h-[280px] object-cover"
        />
      </div>

      <!-- Col 3: Description + CTA -->
      <div
        class="flex flex-col justify-end gap-4 p-6 md:p-8 min-h-[120px] md:min-h-[280px] border-b border-gray-200 border-dashed"
      >
        <p class="hero-desc text-body text-gray-800 leading-snug max-w-xs">
          Crafting seamless experiences where clean code meets thoughtful design.
        </p>
      </div>
    </div>

    <!-- Bottom Row: Big Wordmark -->
    <div class="grid grid-cols-1 border-b border-dashed border-gray-200">
      <div class="hidden md:block border-r border-gray-200"></div>
      <div class="px-6 md:px-8 py-6 md:py-10 overflow-hidden">
        <h1
          class="hero-title text-huge font-extrabold tracking-tight text-gray-950 leading-[1.08] whitespace-nowrap overflow-hidden inline-block pb-4 md:pb-8 -mb-4 md:-mb-8"
        >
          Elijah E.
        </h1>
      </div>
    </div>

    <div
      class="w-2 h-2 bg-primary absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 z-10"
    ></div>
    <div
      class="w-2 h-2 bg-primary absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 z-10"
    ></div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

onMounted(() => {
  const initAnimation = () => {
    const titleSplit = new SplitText('.hero-title', {
      type: 'chars, words',
      charsClass: 'inline-block pb-4 md:pb-8 -mb-4 md:-mb-8',
    })

    const descSplit = new SplitText('.hero-desc', {
      type: 'lines, words',
      linesClass: 'overflow-hidden',
    })

    const labelSplit = new SplitText('.hero-label', {
      type: 'lines, words',
      linesClass: 'overflow-hidden',
    })

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 2 },
    })

    tl.from(labelSplit.words, {
      yPercent: 100,
      stagger: 0.05,
      duration: 0.9,
    })
      .from(
        descSplit.words,
        {
          yPercent: 100,
          stagger: 0.03,
          duration: 0.9,
        },
        '<0.1',
      )
      .from(
        '.hero-img',
        {
          scale: 1.1,
          opacity: 0,
          duration: 2,
          ease: 'power3.out',
        },
        '<',
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 120,
          stagger: 0.04,
          duration: 2,
          ease: 'power4.out',
        },
        '<0.1',
      )
  }

  if (document.fonts) {
    document.fonts.ready.then(initAnimation)
  } else {
    initAnimation()
  }
})
</script>
