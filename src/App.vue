<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-800 font-sans">
    <header class="text-center py-12 px-8 text-white">
      <h1 class="text-5xl font-bold mb-4 drop-shadow-lg">SVG Animation Showcase</h1>
      <p class="text-xl font-light opacity-90">Interactive SVG animations with professional design</p>
    </header>

    <main class="px-8 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <SVGCard
          v-for="animation in animations"
          :key="animation.id"
          :animation="animation"
          @maximize="handleMaximize"
        />
      </div>
    </main>

    <!-- Modal for expanded view -->
    <div
      v-if="maximizedAnimation"
      class="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-8"
      @click="handleCloseModal"
    >
      <div class="bg-white rounded-3xl p-8 max-w-[90vw] max-h-[90vh] relative shadow-2xl flex flex-col items-center" @click.stop>
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 flex items-center justify-center"
          @click="handleCloseModal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="flex-1 flex items-center justify-center my-4">
          <component
            :is="maximizedAnimation.component"
            :is-maximized="true"
            :auto-play="true"
          />
        </div>
        <div class="text-center mt-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">{{ maximizedAnimation.title }}</h3>
          <p class="text-gray-600 leading-relaxed max-w-lg">{{ maximizedAnimation.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef, ref } from 'vue'
import SVGCard from './components/SVGCard.vue'
import CylinderBoxAnimation from './components/animations/CylinderBoxAnimation.vue'
import ButtonLoadingAnimation from './components/animations/ButtonLoadingAnimation.vue'
import FileAnimation from './components/animations/FileAnimation.vue'

export default {
  name: 'App',
  components: {
    SVGCard
  },
  setup() {
    const maximizedAnimation = ref(null)

    const animations = shallowRef([
      {
        id: 'cylinder-box',
        title: 'Box to Cylinder Transformation',
        description: 'A smooth morphing animation that transforms a 3D box into a cylinder with dimension labels',
        component: CylinderBoxAnimation,
        categories: ['Morphing', 'GSAP']
      },
      {
        id: 'button-loading',
        title: 'Button Loading Animation',
        description: 'Elegant loading animation with bouncing circles and success checkmark',
        component: ButtonLoadingAnimation,
        categories: ['UI Elements', 'CSS Animations']
      },
      {
        id: 'file-animation',
        title: 'File Icon Animation',
        description: 'Interactive file icon with folding corner animation effects',
        component: FileAnimation,
        categories: ['Icons', 'CSS Animations']
      }
    ])

    const handleMaximize = (animation) => {
      console.log('👀 App.vue -> handleMaximize', { animation: animation.title });
      maximizedAnimation.value = animation
      document.body.style.overflow = 'hidden'
    }

    const handleCloseModal = () => {
      console.log('👀 App.vue -> handleCloseModal', { closing: true });
      maximizedAnimation.value = null
      document.body.style.overflow = 'auto'
    }

    return {
      animations,
      maximizedAnimation,
      handleMaximize,
      handleCloseModal
    }
  }
}
</script>

