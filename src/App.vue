<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExplorationSection from './components/ExplorationSection.vue'
import PreLoader from './components/PreLoader.vue'

import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const circleCursor = document.getElementById('circle-cursor')
  // const mouse = { x: 0, y: 0 }
  // const circle = { x: 0, y: 0 }

  // // console.log(circleCursor)

  // window.addEventListener('mousemove', function (e) {
  //   mouse.x = e.x
  //   mouse.y = e.y

  //   // console.log('Mouse position:', mouse.x + ',' + mouse.y, 'circle position:', circle)
  // })
  // const speed = 0.15

  // function changeCirclePosition() {
  //   circle.x += (mouse.x - circle.x) * speed
  //   circle.y += (mouse.y - circle.y) * speed

  //   circleCursor.style.transform = `translate(${circle.x}px, ${circle.y}px)`

  //   window.requestAnimationFrame(changeCirclePosition)
  // }

  // changeCirclePosition()

  window.addEventListener('mousemove', (e) => {
    gsap.to(circleCursor, {
      x: e.x - 10,
      y: e.y - 10,
      duration: 1.5,
      ease: 'power4.out',
    })
  })
})
</script>

<template>
  <PreLoader></PreLoader>
  <NavBar></NavBar>
  <HeroSection></HeroSection>
  <AboutSection></AboutSection>
  <ExplorationSection></ExplorationSection>

  <div id="circle-cursor" class="circle-cursor"></div>
  <!-- <div id="small-cursor" class="small-cursor"></div> -->
</template>

<style scoped></style>
