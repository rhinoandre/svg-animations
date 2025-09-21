# SVG Animation Showcase

A professional Vue.js application showcasing interactive SVG animations with modern UI/UX design.

## Features

- **Interactive SVG Animations**: Each SVG animation is contained in its own Vue component
- **Card-based Layout**: Clean, modern card design with hover and touch interactions
- **Modal View**: Click the maximize button or double-click cards to view animations in full size
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Touch Support**: Native touch interactions for mobile devices
- **Professional Design**: Modern gradient backgrounds, smooth animations, and clean typography

## SVG Animations Included

1. **Box to Cylinder Transformation**: A morphing animation that transforms a 3D box into a cylinder with dimension labels
2. **Button Loading Animation**: Elegant loading animation with bouncing circles and success checkmark
3. **File Icon Animation**: Interactive file icon with folding corner animation effects

## Technology Stack

- **Vue 3**: Modern JavaScript framework with Composition API
- **Tailwind CSS v4**: Latest version of the utility-first CSS framework
- **GSAP**: Professional animation library for smooth SVG animations
- **Vite**: Fast build tool and development server with Tailwind integration
- **Modern CSS**: Utility-first approach with Tailwind's responsive design system

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.vue                 # Main application component
├── components/
│   ├── SVGCard.vue        # Card component with interaction logic
│   └── animations/        # Individual SVG animation components
│       ├── CylinderBoxAnimation.vue
│       ├── ButtonLoadingAnimation.vue
│       └── FileAnimation.vue
└── assets/               # Static SVG files
    ├── cilinder-box.svg
    ├── button-loading.svg
    └── file.svg
```

## How It Works

### Card Interactions

- **Hover/Touch**: Triggers the SVG animation to play
- **Maximize Button**: Expands the card to modal view
- **Double Click**: Alternative way to maximize the card
- **Modal Close**: Click outside the modal to return to card view

### Animation Components

Each animation component follows the same pattern:
- Accepts props for interaction states (`isHovered`, `isTouched`, `isMaximized`, `autoPlay`)
- Uses GSAP for smooth, professional animations
- Responsive sizing based on context (card vs modal)
- Proper cleanup and performance optimization

### Responsive Design

- Grid layout automatically adjusts based on screen size
- Touch-optimized interactions for mobile devices
- Accessible focus states and keyboard navigation
- Reduced motion support for accessibility

## Customization

### Adding New Animations

1. Create a new Vue component in `src/components/animations/`
2. Follow the existing component pattern with props for interaction states
3. Add the component to the animations array in `App.vue`
4. Include appropriate SVG content and GSAP animations

### Styling

The application uses Tailwind CSS v4 for styling with:
- Utility-first CSS approach for rapid development
- Consistent spacing and typography through Tailwind's design tokens
- Modern gradient backgrounds using Tailwind's gradient utilities
- Smooth transitions and hover effects with Tailwind's transition classes
- Mobile-first responsive design with Tailwind's responsive modifiers
- Custom CSS only where needed for specialized animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## License

MIT License - feel free to use this project as a starting point for your own SVG animation showcases.
