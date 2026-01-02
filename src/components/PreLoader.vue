<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const spinner = document.querySelector('.spinner')
  const preloader = document.querySelector('.preloader')
  const preloader2 = document.querySelector('.preloader-2')
  const preloader3 = document.querySelector('.preloader-3')

  function firstTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(spinner, { rotation: 90 })
    return tl
  }

  function secondTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(spinner, { rotation: -90, borderRadius: '100%', x: 100 })
    return tl
  }

  function thirdTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(spinner, { rotation: 180, borderRadius: '0%', x: -100 })
    tl.to(spinner, { x: 0 })
    return tl
  }

  function preloaderTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(preloader, { y: '-100%' })
    return tl
  }
  function preloaderTwoTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(preloader2, { y: '-100%' })
    return tl
  }
  function preloaderThreeTimeline() {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.inOut' } })

    tl.to(preloader3, { y: '-100%' })
    return tl
  }

  const mainTimeline = gsap.timeline({ paused: true })

  mainTimeline
    .add(firstTimeline())
    .add(secondTimeline())
    .add(thirdTimeline())
    .add(preloaderTimeline())
    .add(preloaderTwoTimeline(), '-=0.9')
    .add(preloaderThreeTimeline(), '-=0.9')

  mainTimeline.play()
})
</script>

<template>
  <div class="preloader">
    <div class="loader-content">
      <div class="spinner"></div>
      <p class="text-text-primary-color text-xl font-geist">LOADING...</p>
    </div>
  </div>
  <div class="preloader-2"></div>
  <div class="preloader-3"></div>
</template>
