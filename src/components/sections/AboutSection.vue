<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top top',
      end: '+=2500px',
      pin: true,
      scrub: 1,
    },
  })

  tl.to('#about-progress-bar', { ease: 'power2.out', width: '33%' })
    .to('.about-text-1', { opacity: 1, duration: 0.75 })
    .to('.about-text-1', {
      opacity: 0,
      y: -10,
      duration: 0.75,
    })
    .to('#about-counter', { ease: 'power2.out', text: '02' })
    .to('#about-progress-bar', { ease: 'power2.out', width: '66%' })
    .fromTo(
      '.about-text-2',
      { opacity: 0, duration: 0.75, y: 10 },
      { opacity: 1, duration: 0.75, y: 0 },
    )
    .to('.about-text-2', {
      opacity: 0,
      y: -10,
      duration: 0.75,
    })
    .to('#about-counter', { ease: 'power2.out', text: '03' })
    .to('#about-progress-bar', { ease: 'power2.out', width: '100%' })
    .fromTo('.about-text-3', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.75 })
})
</script>

<template>
  <section
    id="about"
    class="w-full min-h-screen bg-white px-6 sm:px-10 pt-10 pb-24 font-grotesk border border-gray-200"
  >
    <!-- Badge -->
    <div class="flex justify-center sm:justify-start mb-6">
      <div class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2">
        <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
        <span class="font-mono-nav text-xs tracking-wider uppercase text-gray-900">What I Do</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative">
      <div id="about-progress-bar" class="w-0 h-px bg-gray-900 mb-16 absolute left-0 top-0"></div>
      <div class="w-full h-px bg-gray-200 mb-4 md:mb-16"></div>
    </div>

    <!-- Content row -->
    <div class="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-40">
      <!-- Counter -->
      <div class="shrink-0">
        <div class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2">
          <span id="about-counter" class="font-mono-nav text-sm text-gray-900">01</span>
          <span class="font-mono-nav text-sm text-gray-400">/</span>
          <span class="font-mono-nav text-sm text-gray-400">03</span>
        </div>
      </div>

      <!-- Heading text -->
      <div class="max-w-4xl lg:w-4xl relative">
        <div class="about-text about-text-1">
          <p
            class="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] text-gray-900 tracking-tight"
          >
            I translate designs into clean, responsive, and pixel-perfect web interfaces — crafting
            smooth user experiences that don't just function, but feel completely effortless to use.
          </p>
          <img
            class="w-full h-52 md:h-64 object-cover mt-6 rounded-sm"
            src="https://images.unsplash.com/photo-1579267217516-b73084bd79a6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="about-text about-text-2">
          <p
            class="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] text-gray-900 tracking-tight"
          >
            I bring digital spaces to life by adding subtle, intentional motion design and
            micro-interactions that elevate the user experience and leave a lasting impression.
          </p>
          <img
            class="w-full h-52 md:h-80 object-cover mt-6 rounded-sm"
            src="https://images.unsplash.com/photo-1496166319048-6293b12c6cc1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="about-text about-text-3">
          <p
            class="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] text-gray-900 tracking-tight"
          >
            I design and build robust, scalable backend systems that run effortlessly behind the
            scenes — leveraging Laravel, Vue, and a clean tech stack to ensure everything operates
            seamlessly.
          </p>
          <img
            class="w-full h-52 md:h-64 object-cover mt-6 rounded-sm"
            src="https://images.unsplash.com/photo-1552083940-86877723de7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-text {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.card-portfolio {
  position: absolute;
  transform: translateY(150%);
}
</style>
