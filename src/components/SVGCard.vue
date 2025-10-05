<template>
  <div
    class="bg-white flex flex-col rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer select-none relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl group"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @dblclick="handleDoubleClick"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-gray-800 leading-tight">{{ animation.title }}</h3>
      <button
        class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 flex items-center justify-center flex-shrink-0 hover:scale-110"
        @click="handleMaximize"
        :title="`Maximize ${animation.title}`"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>
    </div>

    <div class="flex items-center justify-center min-h-[100px] my-4 bg-gray-50 rounded-xl p-4 relative overflow-hidden">
      <component
        :is="animation.component"
        :is-hovered="isHovered"
        :is-touched="isTouched"
        :is-maximized="false"
      />
      <!-- Hint text -->
      <div class="absolute bottom-2 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none md:opacity-100">
        Hover or tap to animate
      </div>
    </div>

    <div class="mt-4 flex-grow flex flex-col justify-end">
      <p class="text-sm text-gray-600 leading-relaxed mb-3">{{ animation.description }}</p>
      <div class="flex flex-wrap gap-2">
      <span
        class="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
        v-for="category in animation.categories"
        :key="category"
      >
          {{ category }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SVGCard',
  props: {
    animation: {
      type: Object,
      required: true
    }
  },
  emits: ['maximize'],
  setup(props, { emit }) {
    const isHovered = ref(false)
    const isTouched = ref(false)

    const handleMouseEnter = () => {
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
    }

    const handleTouchStart = () => {
      isTouched.value = true
    }

    const handleTouchEnd = () => {
      setTimeout(() => {
        isTouched.value = false
      }, 300) // Keep the animation visible for a moment
    }

    const handleMaximize = () => {
      emit('maximize', props.animation)
    }

    const handleDoubleClick = () => {
      emit('maximize', props.animation)
    }

    return {
      isHovered,
      isTouched,
      handleMouseEnter,
      handleMouseLeave,
      handleTouchStart,
      handleTouchEnd,
      handleMaximize,
      handleDoubleClick
    }
  }
}
</script>

<style scoped>
/* Mobile touch optimizations */
@media (max-width: 768px) {
  .group:hover {
    transform: none;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  .group:active {
    transform: translateY(-0.25rem);
    box-shadow: 0 25px 25px -5px rgb(0 0 0 / 0.25), 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .group:hover {
    transform: none;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  .group:active {
    transform: translateY(-0.25rem);
    box-shadow: 0 25px 25px -5px rgb(0 0 0 / 0.25), 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }
  .group:hover .absolute.top-0 {
    opacity: 0;
  }
  .group:active .absolute.top-0 {
    opacity: 1;
  }
}
</style>
