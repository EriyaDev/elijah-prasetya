<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

onMounted(() => {
  gsap.from('.exploration-title', {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.exploration-title',
      start: 'top bottom',
      end: 'center 30%',
      scrub: true,
      // markers: true,
    },
    filter: 'blur(10px)',
    ease: 'linear',
  })
})
</script>

<template>
  <div id="explorations" class="section-container">
    <div class="w-full flex justify-center items-center sticky top-20 pb-5">
      <h1 class="title text-5xl md:text-6xl lg:text-7xl exploration-title uppercase">
        Exploration Lab
      </h1>
    </div>
    <div class="w-full h-96 lg:h-screen bg-blue-200 sticky top-40">Card</div>
    <div class="w-full h-96 lg:h-screen bg-red-200 sticky top-40">Card</div>
    <div class="w-full h-96 lg:h-screen bg-green-200 sticky top-40">Card</div>
    <div class="w-full h-96 lg:h-screen bg-purple-200 sticky top-40">Card</div>
  </div>
</template>

<style scoped></style>
