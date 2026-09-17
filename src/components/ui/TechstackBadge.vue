<script setup>
const props = defineProps({
  name: String,
  bgClass: String,
  textClass: String,
})
</script>
<template>
  <div
    class="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 mb-2 transition-all group"
    :class="bgClass"
  >
    <span class="text-xs tracking-wider uppercase transition-all duration-300" :class="textClass">{{
      props.name
    }}</span>
  </div>
</template>
