import { useEffect, useRef } from 'react'

/**
 * useReveal — attaches an IntersectionObserver to an element and toggles the
 * `in-view` class when it enters the viewport. Pair with the `.reveal` /
 * `.reveal-stagger` CSS primitives (see index.css) for GPU-only fade-up
 * entrances at 60fps.
 *
 * Why a hook (and not a global vanilla scan): sections in this app mount /
 * unmount on every nav change, so the reveal must follow the React lifecycle.
 * The hook re-observes on each mount (giving a fresh entrance per tab switch)
 * and disconnects on unmount — no leaked observers, StrictMode-safe.
 *
 * Note: IntersectionObserver with the default (viewport) root still respects
 * the clipping of inner `overflow:auto` scroll containers, so it works for the
 * per-section scroll panels used here.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.12]  fraction visible before revealing
 * @param {string} [options.rootMargin='0px 0px -8% 0px']  trigger slightly early
 * @param {boolean} [options.once=true]  reveal a single time (no re-hide)
 * @returns {React.RefObject} ref to attach to the target element
 */
export default function useReveal(options = {}) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = options

  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // No motion wanted, or no IO support → just show it.
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('in-view')
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
