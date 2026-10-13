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
        />
      </div>
    </main>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import SVGCard from './components/SVGCard.vue'
import CylinderBoxAnimation from './components/animations/CylinderBoxAnimation.vue'
import ButtonLoadingAnimation from './components/animations/ButtonLoadingAnimation.vue'
import FileAnimation from './components/animations/FileAnimation.vue'
import ThrendUpAndDown from './components/animations/ThrendUpAndDown.vue'

export default {
  name: 'App',
  components: {
    SVGCard
  },
  setup() {
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
      },
      {
        id: 'thrend-up-and-down',
        title: 'Thrend Up and Down',
        description: 'Interactive thrend up and down animation',
        component: ThrendUpAndDown,
        categories: ['Icons', 'CSS Animations']
      }
    ])

    return {
      animations
    }
  }
}
</script>

