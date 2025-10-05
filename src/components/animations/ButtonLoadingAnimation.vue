<template>
  <div class="flex items-center justify-center md:p-6 w-full h-full rounded-xl p-8 transition-transform duration-300 hover:scale-105"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="cn(
      { 'rounded-2xl hover:scale-100': isMaximized }
    )"
  >
  <button class="w-full h-full border border-gray-300 bg-gray-100 rounded-xl">
    <svg
        ref="svgRef"
        :class="cn(
          'content-loader mx-auto',
          { 'stopLoading': successAnimation }
        )"
        xmlns="http://www.w3.org/2000/svg"
        :width="svgSize.width"
        :height="svgSize.height"
        viewBox="0 0 72 24"
        fill="none"
      >
        <circle class="circle animate-color-change" cx="12" cy="12" r="5" />
        <circle
          class="circle animate-color-change"
          cx="60"
          cy="12"
          r="5"
          :style="{ '--delay': '500ms' }"
        />
        <circle
          class="circle animate-color-change"
          cx="36"
          cy="12"
          r="5"
          :style="{ '--delay': '250ms' }"
        />

        <path
          class="check"
          d="M31.39757817531307,10.1363885509839L35.45989427549195,16.292118246869414L40.67991037567085,3.7734881932021462A9.514824,9.514824,0,1,1,36.392319320214675,2.529083542039356"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { cn } from '../../utils/index.js'

  export default {
    name: 'ButtonLoadingAnimation',
    props: {
      isHovered: {
        type: Boolean,
        default: false
      },
      isMaximized: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const svgRef = ref(null)
      const successAnimation = ref(false)

      const svgSize = computed(() => {
        if (props.isMaximized) {
          return { width: 400, height: 133 }
        }
        return { width: 200, height: 67 }
      })

      const handleMouseEnter = () => {
        successAnimation.value = true
      }

      const handleMouseLeave = () => {
        successAnimation.value = false
      }

      // Watch for hover/touch changes
      watch([() => props.isHovered, () => props.isTouched], ([hovered, touched]) => {
        if (hovered || touched) {
          successAnimation.value = true
        } else if (!props.autoPlay) {
          successAnimation.value = false
        }
      })

      // Auto play when maximized
      watch(() => props.isMaximized, (maximized) => {
        if (maximized) {
          successAnimation.value = true
        }
      })

      return {
        svgRef,
        svgSize,
        successAnimation,
        handleMouseEnter,
        handleMouseLeave,
        cn
      }
    }
  }
</script>

<style scoped>
  .content-loader:not(.stopLoading) .animate-color-change {
    animation: color-change 1.5s var(--delay, 0s) infinite linear;
    fill: white;
  }
  @keyframes color-change {
    70% {
      fill: blue;
    }
  }
  .circle {
    transition:
      transform 0.5s ease-in-out,
      fill 0.5s ease-in-out,
      scale 0.13s ease-in-out;
    transform: translateX(0);
    transform-origin: center;
  }
  .stopLoading .circle:nth-of-type(1) {
    transform: translateX(24px);
    fill: white;
    stroke-width: 0;
  }
  .stopLoading .circle:nth-of-type(2) {
    transform: translateX(-24px);
    fill: white;
    stroke-width: 0;
  }
  .stopLoading .circle:nth-of-type(3) {
    fill: green;
    scale: 2.4  ;
    transition-delay: 280ms;
    transition-timing-function: ease-out;
  }

  .check {
    stroke-dasharray: 77;
    stroke-dashoffset: 77;
  }

  .stopLoading .check {
    animation: check-mark .5s .3s forwards ease-in-out;
  }

  @keyframes check-mark {
    0% {
      stroke-dashoffset: 77;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
</style>
