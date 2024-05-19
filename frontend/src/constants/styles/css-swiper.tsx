import { css } from "styled-components";

export const CSSSwiper = css`
  /**
   * Swiper 6.5.0
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * https://swiperjs.com
   *
   * Copyright 2014-2021 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: March 5, 2021
   */
  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    /* Fix of Webkit flickering */
    z-index: 1;
  }
  .swiper-container-vertical > .swiper-wrapper {
    flex-direction: column;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-container-android .swiper-slide,
  .swiper-wrapper {
    transform: translate3d(0px, 0, 0);
  }
  .swiper-container-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
  }
  .swiper-container-pointer-events {
    touch-action: pan-y;
  }
  .swiper-container-pointer-events.swiper-container-vertical {
    touch-action: pan-x;
  }
  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
  }
  .swiper-slide-invisible-blank {
    visibility: hidden;
  }
  /* Auto Height */
  .swiper-container-autoheight,
  .swiper-container-autoheight .swiper-slide {
    height: auto;
  }
  .swiper-container-autoheight .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }
  /* Common Styles */
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 10px;
    left: 0;
    width: 100%;
  }
  /* Bullets */
  .swiper-pagination-bullets-dynamic {
    overflow: hidden;
    font-size: 0;
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    transform: scale(0.33);
    position: relative;
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
    transform: scale(1);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
    transform: scale(1);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
    transform: scale(0.66);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
    transform: scale(0.33);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
    transform: scale(0.66);
  }
  .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
    transform: scale(0.33);
  }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: #000;
    opacity: 0.2;
  }
  button.swiper-pagination-bullet {
    border: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .swiper-pagination-clickable .swiper-pagination-bullet {
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
  }
  .swiper-container-vertical > .swiper-pagination-bullets {
    right: 10px;
    top: 50%;
    transform: translate3d(0px, -50%, 0);
  }
  .swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 6px 0;
    display: block;
  }
  .swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
  }
  .swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    display: inline-block;
    transition: 200ms transform, 200ms top;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 4px;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    transition: 200ms transform, 200ms left;
  }
  .swiper-container-horizontal.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    transition: 200ms transform, 200ms right;
  }
  /* Progress */
  .swiper-pagination-progressbar {
    background: rgba(0, 0, 0, 0.25);
    position: absolute;
  }
  .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    transform-origin: left top;
  }
  .swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
    transform-origin: right top;
  }
  .swiper-container-horizontal > .swiper-pagination-progressbar,
  .swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
    width: 100%;
    height: 4px;
    left: 0;
    top: 0;
  }
  .swiper-container-vertical > .swiper-pagination-progressbar,
  .swiper-container-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
    width: 4px;
    height: 100%;
    left: 0;
    top: 0;
  }
  .swiper-pagination-white {
    --swiper-pagination-color: #ffffff;
  }
  .swiper-pagination-black {
    --swiper-pagination-color: #000000;
  }
  .swiper-pagination-lock {
    display: none;
  }
  /* Scrollbar */
  .swiper-scrollbar {
    border-radius: 10px;
    position: relative;
    -ms-touch-action: none;
    background: rgba(0, 0, 0, 0.1);
  }
  .swiper-container-horizontal > .swiper-scrollbar {
    position: absolute;
    left: 1%;
    bottom: 3px;
    z-index: 50;
    height: 5px;
    width: 98%;
  }
  .swiper-container-vertical > .swiper-scrollbar {
    position: absolute;
    right: 3px;
    top: 1%;
    z-index: 50;
    width: 5px;
    height: 98%;
  }
  .swiper-scrollbar-drag {
    height: 100%;
    width: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    left: 0;
    top: 0;
  }
  .swiper-scrollbar-cursor-drag {
    cursor: move;
  }
  .swiper-scrollbar-lock {
    display: none;
  }
  
  /* a11y */
  .swiper-container .swiper-notification {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    opacity: 0;
    z-index: -1000;
  }
`;
