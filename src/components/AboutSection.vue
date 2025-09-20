<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

onMounted(() => {
  gsap.from('.about-me-title', {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.about-me-title',
      start: 'top bottom',
      end: 'center 30%',
      scrub: 0.5,
      markers: true,
    },
    filter: 'blur(10px)',
    ease: 'linear',
  })
  let splitDesc = SplitText.create('.about-desc', {
    type: 'lines',
    mask: 'lines',
  })
  gsap.from('.about-img', {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.about-desc',
      start: 'top bottom',
      end: 'center 30%',
      markers: true,
      scrub: 0.5,
    },
    y: 50,
    ease: 'linear',
  })
  gsap.from('#desc-text-container', {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.about-desc',
      start: 'top bottom',
      end: 'center 30%',
      markers: true,
      scrub: 0.5,
    },
    y: 100,
    ease: 'linear',
  })
  gsap.from(splitDesc.lines, {
    scrollTrigger: {
      toggleActions: 'play none none none',
      trigger: '.about-desc',
      start: 'top center',
      end: 'center 30%',
      // markers: true,
      // scrub: 0.5,
    },
    opacity: 0,
    y: 50,
    // filter: 'blur(2px)',
    stagger: 0.05,
  })
})
</script>

<template>
  <div id="about" class="section-container">
    <h1 class="title text-5xl md:text-6xl lg:text-7xl about-me-title">ABOUT ME</h1>
    <div class="grid grid-cols-1 lg:grid-cols-10 mt-5">
      <div class="lg:col-span-3">
        <img
          src="https://i.pinimg.com/1200x/0c/4d/64/0c4d64a9bff90464c8407ba08145898e.jpg"
          rel="preload"
          loading="lazy"
          class="w-full h-[450px] object-cover object-top about-img"
        />
        <!-- <div class="w-full h-[450px] bg-secondary-color"></div> -->
      </div>
      <div class="lg:col-start-5 col-span-6 flex flex-col justify-between items-start mt-5 lg:mt-0">
        <div class="desc-container">
          <p class="text text-lg about-desc">
            I am Elijah Emmanuel Prasetya, a 16-year-old aspiring software engineer currently
            studying at SMK Negeri 1 Denpasar. With a strong interest in web development, I possess
            foundational skills in HTML, CSS, JavaScript, LARAVEL, AND GSAP.
          </p>
          <p class="text text-lg about-desc mt-5">
            I am passionate about crafting user-friendly and visually appealing digital experiences,
            focusing on UI/UX principles to create intuitive and engaging interfaces. Through my
            studies and personal projects, I am continuously expanding my knowledge and honing my
            technical abilities to contribute to innovative and impactful software solutions.
          </p>
        </div>

        <div id="desc-text-container" class="grid grid-cols-6 w-full">
          <div class="flex flex-col col-span-3 md:col-span-2">
            <h2 class="text text-3xl">2++</h2>
            <h2 class="text text-lg">YEARS OF EXPERIENCE</h2>
          </div>
          <div class="flex flex-col">
            <h2 class="text text-3xl">20++</h2>
            <h2 class="text text-lg">PROJECTS</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
