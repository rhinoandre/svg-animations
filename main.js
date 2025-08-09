import './style.css'
import FileIcon from './src/assets/file.svg?raw'

const svgFiles = [
  FileIcon,
];

const container = document.querySelector('.container');
for (const svg of svgFiles) {
  if (container) {
    container.innerHTML = svg;

  // Add event listeners to the loaded SVG
  const svgElement = container.querySelector('svg');
  if (svgElement) {
    svgElement.addEventListener('mouseenter', function () {
      this.classList.add('has-been-hovered');
    });
    }
  }
}
