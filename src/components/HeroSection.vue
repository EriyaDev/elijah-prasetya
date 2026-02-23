<template>
  <section id="hero" class="">
    <div id="hero-content-container">
      <h1 class="hero-name text-clipped col-span-2 lg:col-span-6 row-start-1">ELIJAH</h1>
      <h1 class="hero-name text-clipped col-span-2 lg:col-span-9 row-start-2">EMMANUEL</h1>
      <h1 class="hero-name text-clipped col-span-2 lg:col-span-8 row-start-3">PRASETYA</h1>
      <div
        class="hero-desc-container flex items-start lg:items-end justify-start lg:col-start-9 lg:row-start-3 lg:col-span-2"
      >
        <h4 class="hero-desc">
          Web Developer <br />
          Bali, Indonesia
        </h4>
      </div>
      <a href="" class="button-primary row-start-4 lg:col-start-2 lg:col-span-2 button-cv"
        >CONTACT ME</a
      >
    </div>
    <div
      class="marquee-container absolute bottom-0 lg:-bottom-24 left-0 right-0 py-4 bg-secondary-color"
    >
      <div
        class="marquee-content bg-secondary-color flex flex-row items-center overflow-hidden whitespace-nowrap"
      >
        <h4 class="marquee-text first-text left-[0%]">
          HTML · CSS · JavaScript · Vue.js · Laravel · GSAP · Transforming ideas into interactive
          experiences.ㅤ
        </h4>
        <h4 class="marquee-text second-text left-[0%]">
          HTML · CSS · JavaScript · Vue.js · Laravel · GSAP · Transforming ideas into interactive
          experiences.ㅤ
        </h4>
        <h4 class="marquee-text second-text left-[0%]">
          HTML · CSS · JavaScript · Vue.js · Laravel · GSAP · Transforming ideas into interactive
          experiences.ㅤ
        </h4>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
// import Lenis from 'lenis'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// let direction = -1
let xPercent = 0

gsap.registerPlugin(ScrollTrigger, SplitText)

onMounted(() => {
  let splitName = SplitText.create('.hero-name', {
    type: 'words, lines',
    mask: 'lines',
  })

  let splitDesc = SplitText.create('.hero-desc', {
    type: 'lines',
    mask: 'lines',
  })

  gsap.from(splitName.lines, {
    yPercent: 100,
    clipPath: 'inset(0 0 100% 0)',
    ease: 'power4.inOut',
    duration: 2,
    stagger: 0.2,
    delay: 5.9,
  })

  gsap.from(splitDesc.lines, {
    yPercent: 100,
    clipPath: 'inset(0 0 100% 0)',
    ease: 'power4.inOut',
    duration: 1,
    stagger: 0.2,
    delay: 6.2,
  })

  gsap.from('.marquee-container', {
    yPercent: 100,
    clipPath: 'inset(0 0 100% 0)',
    ease: 'power4.inOut',
    duration: 1,
    stagger: 0.2,
    delay: 6.6,
  })

  gsap.from('.button-cv', {
    yPercent: 100,
    clipPath: 'inset(0 0 100% 0)',
    ease: 'power4.inOut',
    duration: 1,
    stagger: 0.2,
    delay: 6.3,
  })

  // if(xPercent == )
  gsap.set('.marquee-text'.current, { xPercent: xPercent })
  gsap.to('.marquee-text', {
    xPercent: -100,
    duration: 20,
    ease: 'linear',
    repeat: -1,

    onComplete: () => {
      xPercent = 0
    },
  })

  // console.log('xPercent: ' + xPercent)
})
</script>

<style scoped></style>
