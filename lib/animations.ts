/**
 * All Framer Motion variants for CAE website.
 * Single source of truth — never inline animation values.
 */
import type { Variants } from 'framer-motion'

/** Section reveal on scroll — use with useInView */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Stagger container — wraps groups of cards or stat counters */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

/** Popup form entrance */
export const popupEntry: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

/** Mobile nav drawer — slides in from left */
export const navSlide: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

/** Stat counter spring physics — use with useMotionValue + useSpring */
export const counterSpring = {
  stiffness: 100,
  damping: 30,
}

/** Course & office card hover effect */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
}

/** CTA button tap feedback */
export const buttonTap = {
  scale: 0.96,
  transition: { duration: 0.1 },
}

/** Overlay backdrop — for popups/modals */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

/** Triggers animation 150px BEFORE element enters viewport — prevents blank-then-jump */
export const viewportOnce = { once: true, amount: 0, margin: '0px 0px -150px 0px' }

/** Slide in from left — MBBS section left col, hero left col */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Slide in from right — BSCC steps, hero right col */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Scale in from slightly smaller — course cards, MBBS country cards */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Slower stagger — use for MBBS country card grids */
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

/** Alias for navSlide — used in Navbar mobile drawer */
export const navDrawer = navSlide
