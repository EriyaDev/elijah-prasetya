<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

import Explore1Gif from '../assets/videos/explore-1.gif?url'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

onMounted(() => {
  gsap.from('.exploration-title', {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.exploration-title',
      start: 'top bottom',
      end: 'center 30%',
      scrub: true,
      // markers: false,
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
    <a
      href="https://anisensei-ten.vercel.app"
      class="aspect-video explore-card rounded-2xl h-auto lg:h-[400px] mx-auto bg-blue-200 sticky top-40 group flex justify-center items-end"
    >
      <img
        :src="Explore1Gif"
        alt="exploration-1"
        class="w-[90%] object-cover rounded-t-sm"
        loading="lazy"
      />
      <div
        class="inset-0 absolute bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-all rounded-2xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <h2 class="text-white text-3xl font-medium font-geist bg-none">AniSensei - Search Anime</h2>
      </div>
    </a>
    <a
      href="https://anisensei-ten.vercel.app"
      class="aspect-video explore-card rounded-2xl h-auto lg:h-[400px] mx-auto bg-blue-200 sticky top-40 group flex justify-center items-end"
    >
      <img
        :src="Explore1Gif"
        alt="exploration-1"
        class="w-[90%] object-cover rounded-t-sm"
        loading="lazy"
      />
      <div
        class="inset-0 absolute bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-all rounded-2xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <h2 class="text-white text-3xl font-medium font-geist bg-none">AniSensei - Search Anime</h2>
      </div>
    </a>
    <a
      href="https://anisensei-ten.vercel.app"
      class="aspect-video explore-card rounded-2xl h-auto lg:h-[400px] mx-auto bg-blue-200 sticky top-40 group flex justify-center items-end"
    >
      <img
        :src="Explore1Gif"
        alt="exploration-1"
        class="w-[90%] object-cover rounded-t-sm"
        loading="lazy"
      />
      <div
        class="inset-0 absolute bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-all rounded-2xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <h2 class="text-white text-3xl font-medium font-geist bg-none">AniSensei - Search Anime</h2>
      </div>
    </a>
    <a
      href="https://anisensei-ten.vercel.app"
      class="aspect-video explore-card rounded-2xl h-auto lg:h-[400px] mx-auto bg-blue-200 sticky top-40 group flex justify-center items-end"
    >
      <img
        :src="Explore1Gif"
        alt="exploration-1"
        class="w-[90%] object-cover rounded-t-sm"
        loading="lazy"
      />
      <div
        class="inset-0 absolute bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-all rounded-2xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <h2 class="text-white text-3xl font-medium font-geist bg-none">AniSensei - Search Anime</h2>
      </div>
    </a>
    <!-- <div class="aspect-video explore-card rounded-2xl h-[400px] mx-auto bg-red-200 sticky top-40">
      Card
    </div>
    <div class="aspect-video explore-card rounded-2xl h-[400px] mx-auto bg-green-200 sticky top-40">
      Card
    </div>
    <div
      class="aspect-video explore-card rounded-2xl h-[400px] mx-auto bg-purple-200 sticky top-40"
    >
      Card
    </div> -->
  </div>
</template>

<style scoped></style>
