<template>
  <!-- Wrapper keeps the card's grid slot while the card itself is lifted out to grow -->
  <div class="relative" :style="placeholderStyle">
    <div
      v-if="isExpanded"
      ref="backdropRef"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      @click="handleMinimize"
    ></div>

    <div
      ref="cardRef"
      class="bg-white flex flex-col rounded-2xl p-6 shadow-lg select-none overflow-hidden group"
      :class="isExpanded
        ? 'fixed inset-4 md:inset-12 m-auto max-w-5xl z-50 shadow-2xl cursor-default'
        : 'relative h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @dblclick="handleDoubleClick"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-800 leading-tight">{{ animation.title }}</h3>
        <button
          class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 flex items-center justify-center shrink-0 hover:scale-110"
          @click="isMaximized ? handleMinimize() : handleMaximize()"
          :title="`${isMaximized ? 'Minimize' : 'Maximize'} ${animation.title}`"
        >
          <svg v-if="isMaximized" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>

      <div
        class="animation-stage flex items-center justify-center min-h-25 my-4 bg-gray-50 rounded-xl p-4 relative overflow-hidden"
        :class="{ 'flex-1': isExpanded }"
      >
        <component
          :is="animation.component"
          :is-hovered="isHovered"
          :is-touched="isTouched"
          :is-maximized="isMaximized"
          :auto-play="isMaximized"
        />
        <!-- Hint text -->
        <div class="absolute bottom-2 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none md:opacity-100">
          {{ isExpanded ? 'Press Esc to minimize' : 'Hover or tap to animate' }}
        </div>
      </div>

      <div class="mt-4 flex flex-col justify-end" :class="{ 'grow': !isExpanded }">
        <p class="text-sm text-gray-600 leading-relaxed mb-3">{{ animation.description }}</p>
        <div class="flex flex-wrap gap-2">
        <span
          class="inline-block bg-linear-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium"
          v-for="category in animation.categories"
          :key="category"
        >
            {{ category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const DURATION = 0.5
const EASE = 'power3.inOut'

const toBox = (rect) => ({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })

export default {
  name: 'SVGCard',
  props: {
    animation: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isHovered = ref(false)
    const isTouched = ref(false)

    const cardRef = ref(null)
    const backdropRef = ref(null)

    // idle -> opening -> open -> closing -> idle
    const phase = ref('idle')
    const placeholderHeight = ref(0)

    // Card is lifted out of the grid (fixed) for the whole open/close cycle
    const isExpanded = computed(() => phase.value !== 'idle')
    // Content is in its maximized layout while growing and while open
    const isMaximized = computed(() => phase.value === 'opening' || phase.value === 'open')

    const placeholderStyle = computed(() =>
      isExpanded.value ? { height: `${placeholderHeight.value}px` } : null
    )

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

    const handleKeydown = (event) => {
      if (event.key === 'Escape') handleMinimize()
    }

    // FLIP: measure where the card is, let it jump to its maximized layout,
    // then animate from the old box to the new one.
    const handleMaximize = async () => {
      if (phase.value !== 'idle') return

      const card = cardRef.value
      const first = card.getBoundingClientRect()
      placeholderHeight.value = card.offsetHeight

      phase.value = 'opening'
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
      await nextTick()

      const last = card.getBoundingClientRect()

      gsap.fromTo(backdropRef.value, { opacity: 0 }, { opacity: 1, duration: DURATION, ease: 'power2.out' })
      gsap.fromTo(
        card,
        { ...toBox(first), margin: 0 },
        {
          ...toBox(last),
          duration: DURATION,
          ease: EASE,
          onComplete: () => {
            gsap.set(card, { clearProps: 'top,left,width,height,margin' })
            phase.value = 'open'
          }
        }
      )
    }

    const handleMinimize = () => {
      if (phase.value !== 'open') return

      const card = cardRef.value
      const from = card.getBoundingClientRect()
      const target = card.parentElement.getBoundingClientRect()

      phase.value = 'closing'
      window.removeEventListener('keydown', handleKeydown)

      gsap.to(backdropRef.value, { opacity: 0, duration: DURATION, ease: 'power2.in' })
      gsap.fromTo(
        card,
        { ...toBox(from), margin: 0 },
        {
          ...toBox(target),
          duration: DURATION,
          ease: EASE,
          onComplete: () => {
            gsap.set(card, { clearProps: 'top,left,width,height,margin' })
            document.body.style.overflow = ''
            phase.value = 'idle'
          }
        }
      )
    }

    const handleDoubleClick = () => {
      if (phase.value === 'idle') handleMaximize()
    }

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown)
      if (isExpanded.value) document.body.style.overflow = ''
    })

    return {
      isHovered,
      isTouched,
      cardRef,
      backdropRef,
      isExpanded,
      isMaximized,
      placeholderStyle,
      handleMouseEnter,
      handleMouseLeave,
      handleTouchStart,
      handleTouchEnd,
      handleMaximize,
      handleMinimize,
      handleDoubleClick
    }
  }
}
</script>

<style scoped>
/* Let the animations' SVGs resize smoothly alongside the card */
.animation-stage :deep(svg) {
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1), height 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}

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
