<script setup>
import { ref } from 'vue'
import TechstackBadge from '../ui/TechstackBadge.vue'

const props = defineProps({
  order: Number,
  title: String,
  desc: String,
  img: String,
  techstacks: Array,
})

const emit = defineEmits(['open'])

// The image wrapper is the shared element that flies into the popup
const mediaRef = ref(null)

function open() {
  console.log('open')
  emit('open', mediaRef.value)
}
</script>

<template>
  <div
    :class="`card-portfolio card-${props.order} w-[calc(100%-2rem)] sm:w-11/12 lg:w-5xl max-w-5xl left-1/2 -translate-x-1/2`"
  >
    <!-- Whole card is a button: clickable, keyboard-focusable, announces a dialog -->
    <button
      type="button"
      aria-haspopup="dialog"
      @click="open"
      class="block w-full text-left cursor-pointer bg-white border border-black/15 rounded-sm h-[540px] sm:h-[520px] md:h-[520px] overflow-hidden group hover:-translate-y-2 hover:shadow-md hover:shadow-black/5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <div class="flex flex-col-reverse md:flex-row justify-between h-full">
        <div class="flex flex-col justify-between h-full w-full md:w-1/2 p-5 sm:p-8">
          <!-- Top row: number + hint -->
          <div class="flex items-start justify-between mb-2 md:mb-0">
            <span class="font-mono-nav text-xs sm:text-sm text-black/60">0{{ props.order }}.</span>
            <span
              class="font-mono-nav text-xs uppercase tracking-wider text-black/40 transition-colors group-hover:text-black"
            >
              View details
            </span>
          </div>
          <!-- Bottom: title + description -->
          <div>
            <h3 class="text-xl sm:text-2xl font-medium text-black mb-2">{{ props.title }}</h3>
            <div v-if="techstacks" class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <TechstackBadge
                v-for="tech in techstacks"
                :key="tech.name"
                :name="tech.name"
                :bg-class="tech.bgClass"
                :text-class="tech.textClass"
              />
            </div>
            <p class="text-black/70 text-sm sm:text-base leading-relaxed">
              {{ props.desc }}
            </p>
          </div>
        </div>

        <!-- SHARED ELEMENT (same data-flip-id as the popup's image) -->
        <div
          ref="mediaRef"
          :data-flip-id="`portfolio-media-${props.order}`"
          class="w-full md:w-1/2 h-44 sm:h-60 md:h-full overflow-hidden shrink-0"
        >
          <img
            class="group-hover:scale-105 transition-all duration-700 ease-out w-full h-full object-cover"
            :src="props.img"
            alt=""
          />
        </div>
      </div>
    </button>
  </div>
</template>