// This file tells TypeScript that importing .css files is okay.
// It's used for side-effect imports of CSS, like in react-slideshow-image.
declare module '*.css';

// Add declarations for Swiper's CSS modules
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';