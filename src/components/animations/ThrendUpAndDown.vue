<template>
  <div class="flex gap-4 items-center justify-center w-full h-full" :class="{ 'min-h-[400px]': isMaximized }">
    <button class="btn-trending-up">
      <svg xmlns="http://www.w3.org/2000/svg"
        ref="trendingUpRef"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-trending-up-icon lucide-trending-up"
      >
      <path d="m2 17 7.5 -7.5 5 5L22 7" class="stroke-green-700 trending-path" />
      <path d="M16 7h6v6" class="stroke-green-700 opacity-0  arrow-path" />
      </svg>
    </button>
    <button class="btn-trending-down">
      <svg xmlns="http://www.w3.org/2000/svg"
        ref="trendingDownRef"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-trending-down-icon lucide-trending-down"
      >
      <path d="m2 7 6.5 6.5 4 -5L22 17" class="stroke-red-500 trending-path" />
      <path d="M16 17h6v-6" class="stroke-red-500 opacity-0 arrow-path" />
      </svg>
    </button>
  </div>
</template>

<script>
  import { ref, watch } from 'vue';

  export default {
    name: 'ThrendUpAndDown',
    props: {
      isHovered: {
        type: Boolean,
        default: false
      },
      isMaximized: {
        type: Boolean,
        default: false
      },
    },
    setup(props) {
      const trendingUpRef = ref(null)
      const trendingDownRef = ref(null)

      watch(() => props.isHovered, (hovered) => {
        if (hovered) {
          trendingUpRef.value.classList.add('animate-trending-path')
          trendingDownRef.value.classList.add('animate-trending-path')
          trendingUpRef.value.classList.add('animate-gradient-position')
          trendingDownRef.value.classList.add('animate-gradient-position')
        }
      })

      return {
        trendingUpRef,
        trendingDownRef
      }
    }
  }
</script>


<style scoped>
  @property --gradient-position-dark {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 100%;
  }

  @property --gradient-position-light {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 100%;
  }

  .trending-path {
    stroke-dasharray: 29;
    stroke-dashoffset: 29;
    animation: animate-trending-path 750ms ease-in-out forwards;
    animation-play-state: paused;
  }

  @keyframes animate-trending-path {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes animate-gradient-position {
    to {
      --gradient-position-dark: 0%;
      --gradient-position-light: 0%;
    }
  }

  .btn-trending-up,
  .btn-trending-down {
    color: rgb(156 163 175);
    border: 2px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .btn-trending-up {
    background: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(45deg, rgb(23, 118, 42) var(--gradient-position-dark), rgb(40, 201, 73) var(--gradient-position-light)) border-box;
  }
  .btn-trending-down {
    background: linear-gradient(to bottom, rgb(243 244 246), rgb(243 244 246)) padding-box,
      linear-gradient(130deg, rgb(133, 41, 41) var(--gradient-position-dark), rgb(254, 0, 0) var(--gradient-position-light)) border-box;
  }

  .animate-trending-path .trending-path {
    animation-play-state: running;
  }

  .animate-trending-path .arrow-path {
    transition: opacity 750ms ease-in-out;
    opacity: 1;
  }

  .btn-trending-up:has(.animate-gradient-position),
  .btn-trending-down:has(.animate-gradient-position) {
    animation: animate-gradient-position 750ms 0.3s ease-in-out forwards;
  }
</style>