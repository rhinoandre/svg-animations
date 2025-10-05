<template>
  <div
    class="file-container flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl p-8 md:p-6 transition-transform duration-300 hover:scale-105"
    :class="cn(
        {
          'min-h-[300px] rounded-2xl hover:scale-100': isMaximized,
          'has-been-hovered': hasBeenHovered
        }
      )">
    <svg
      class="paper-icon drop-shadow-lg text-slate-600 transition-colors duration-300"
      xmlns="http://www.w3.org/2000/svg"
      :width="svgSize.width"
      :height="svgSize.height"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      ref="svgRef"
    >
      <path
        class="main-body"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
        ref="mainBodyRef"
      />
      <path
        class="fold-corner"
        d="M14 2 l4 0 q 2 0 2 2 l0 4"
        stroke-width="0.5"
        ref="foldCornerRef"
      />
      <path
        class="show-up-line"
        d="M14 2 l6 6"
        stroke-width="0.1"
        ref="showUpLineRef"
      />

      <!-- Content lines -->
      <g class="content-lines" ref="contentLinesRef">
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="0.5" opacity="0"/>
        <line x1="8" y1="14" x2="14" y2="14" stroke="currentColor" stroke-width="0.5" opacity="0"/>
        <line x1="8" y1="16" x2="15" y2="16" stroke="currentColor" stroke-width="0.5" opacity="0"/>
        <line x1="8" y1="18" x2="13" y2="18" stroke="currentColor" stroke-width="0.5" opacity="0"/>
      </g>
    </svg>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { cn } from '../../utils/index.js'

  export default {
    name: 'FileAnimation',
    props: {
      isHovered: {
        type: Boolean,
        default: false
      },
      isTouched: {
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
      const mainBodyRef = ref(null)
      const foldCornerRef = ref(null)
      const showUpLineRef = ref(null)
      const contentLinesRef = ref(null)
      const hasBeenHovered = ref(false)

      const svgSize = computed(() => {
        if (props.isMaximized) {
          return { width: 200, height: 200 }
        }
        return { width: 120, height: 120 }
      })

      const playAnimation = () => {
        hasBeenHovered.value = true
      }

      const reverseAnimation = () => {
        setTimeout(() => {
          hasBeenHovered.value = false
        }, 1000)
      }

      // Watch for hover/touch changes
      watch([() => props.isHovered, () => props.isTouched], ([hovered, touched]) => {
        if (hovered || touched) {
          playAnimation()
        } else if (!props.autoPlay) {
          reverseAnimation()
        }
      })

      // Auto play when maximized
      watch(() => props.autoPlay, (autoPlay) => {
        if (autoPlay) {
          playAnimation()
        }
      })

      onMounted(async () => {
        await nextTick()

        if (props.autoPlay) {
          playAnimation()
        }
      })

      return {
        svgRef,
        mainBodyRef,
        foldCornerRef,
        showUpLineRef,
        contentLinesRef,
        hasBeenHovered,
        svgSize,
        cn
      }
    }
  }
</script>

<style scoped>
  .show-up-line {
    opacity: 0;
  }

  .file-container:hover .paper-icon .fold-corner {
    animation: foldFileCorner 1s forwards ease-in-out;
  }

  .file-container:hover .paper-icon .show-up-line {
    animation: showUpLine 1s forwards ease-in-out;
  }

  /* Reverse animations when not hovering (only after user has hovered) */
  .has-been-hovered.file-container:not(:hover) .paper-icon .fold-corner {
    animation: unfoldFileCorner 1s forwards ease-in-out;
  }

  .has-been-hovered.file-container:not(:hover) .paper-icon .show-up-line {
    animation: reverseShowUpLine 1s forwards ease-in-out;
  }

  .fold-corner {
    fill: transparent;
    d: path("M14 2 l4 0 q 2 0 2 2 l0 4");
  }

  .show-up-line {
    opacity: 0;
    stroke-width: 0.1;
  }

  @keyframes showUpLine {
    0% {
      opacity: 0;
      stroke-width: 0.1;
    }
    35%, 49% {
      opacity: 0.5;
      stroke-width: 0.5;
    }
    50%, 100% {
      opacity: 1;
      stroke-width: 0.5;
    }
  }

  @keyframes reverseShowUpLine {
    0%, 49% {
      stroke-width: 0.5;
      opacity: 1;
    }
    50%, 100% {
      opacity: 0;
    }
  }

  @keyframes foldFileCorner {
    0% {
      fill: transparent;
      d: path("M14 2 l4 0 q 2 0 2 2 l0 4");
    }
    49% {
      fill: transparent;
    }
    50% {
      fill: white;
    }
    100% {
      fill: white;
      d: path("M14 2 l0 4 q 0 2 2 2 l4 0");
    }
  }

  @keyframes unfoldFileCorner {
    0% {
      fill: white;
      d: path("M14 2 l0 4 q 0 2 2 2 l4 0");
    }
    49% {
      fill: white;
    }
    50% {
      fill: transparent;
    }
    100% {
      fill: transparent;
      d: path("M14 2 l4 0 q 2 0 2 2 l0 4");
    }
  }
</style>
