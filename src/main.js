import './assets/main.css'
// lenis.js (atau di main.js)
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const lenis = new Lenis({
  smooth: true,
  autoRaf: true,
})

// supaya ScrollTrigger ikut update waktu lenis scroll
lenis.on('scroll', () => ScrollTrigger.update())

// jalanin lenis di GSAP ticker
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000)
// })

// optional: matiin lag smoothing GSAP
gsap.ticker.lagSmoothing(0)

document.addEventListener('DOMContentLoaded', () => {
  // Klik link
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      gsap.to(window, {
        duration: 1,
        scrollTo: link.getAttribute('href'),
        ease: 'power2.out',
      })
    })
  })

  // Kalau langsung buka URL dengan hash
  if (window.location.hash) {
    gsap.to(window, {
      duration: 1,
      scrollTo: window.location.hash,
      ease: 'power2.out',
    })
  }
})

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
