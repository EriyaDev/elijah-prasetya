<script setup>
import AboutSection from '@/components/sections/AboutSection.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import PortfolioSection from '@/components/sections/PortfolioSection.vue'
import SkillSection from '@/components/sections/SkillSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import FooterSection from '@/components/sections/FooterSection.vue';
import PortfolioDetailModal from '@/components/modals/PortfolioDetailModal.vue';
import PortfolioSection2 from '@/components/sections/PortfolioSection2.vue';
</script>

<template>
  <!-- <div class="max-w-[1440px] mx-auto overflow-x-hidden 2xl:overflow-x-visible bg-background"> -->
  <HeroSection />
  <AboutSection />
  <PortfolioSection />
  <SkillSection/>
  <ContactSection/>
  <PortfolioDetailModal/>
  <!-- </div> -->
</template>
