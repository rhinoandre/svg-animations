import './style.css'
import FileIcon from './src/assets/file.svg?raw'
import ButtonLoading from './src/assets/button-loading.svg?raw'

const svgFiles = [
  FileIcon,
  ButtonLoading,
];

const container = document.querySelector('.container');
for (const svg of svgFiles) {
  if (container) {
    container.innerHTML += svg;

  // Add event listeners to the loaded SVG
  const svgElement = container.querySelector('svg');
  if (svgElement) {
    svgElement.addEventListener('mouseenter', function () {
      this.classList.add('has-been-hovered');
    });
    }
  }
}


function toggle() {
  const contentLoader = document.querySelector('.content-loader');
  contentLoader.classList.toggle('stop');
}

// Add event listener to the toggle button
const toggleBtn = document.querySelector('#toggle-btn');
if (toggleBtn) {
  toggleBtn.addEventListener('click', toggle);
}

const pathElement = document.querySelector('.check');
if (pathElement) {
  console.log(pathElement.getTotalLength());
}