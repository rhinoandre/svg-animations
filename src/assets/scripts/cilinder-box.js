import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export function animateCylinderBox() {
  const tl = gsap.timeline({
    paused: true,
  });

  tl.to("#box .top-box-face", {
    morphSVG: "#cilinder .body",
    duration: 1,
    ease: "power2.inOut",
  });
  tl.to("#box .side-box-face", {
    morphSVG: "#cilinder .body",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");
  tl.to("#box .front-box-face", {
    morphSVG: "#cilinder .front-circle-face",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");

  tl.to("#box .dimensions .width", {
    morphSVG: "#cilinder .diameter",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");

  tl.to("#box .dimensions .length", {
    morphSVG: "#cilinder .dimensions .length",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");

  tl.to([
    "#box .dimensions .height",
    "#box .texts .height"
  ], {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
  }, "-=1");

  tl.to("#box .texts .length", {
    morphSVG: "#cilinder .texts .length",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");
  tl.to("#box .texts .width", {
    morphSVG: "#cilinder .texts .diameter",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");

  tl.to("#box .texts .totalSum", {
    morphSVG: "#cilinder .texts .totalSum",
    duration: 1,
    ease: "power2.inOut",
  }, "-=1");

  return tl;
}
