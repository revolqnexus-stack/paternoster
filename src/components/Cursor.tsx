'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const elRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elRef.current
    const txt = textRef.current
    if (!el || !txt) return

    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionMq.matches) return

    let mouseX = -100
    let mouseY = -100

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as Element
      if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
        el.style.opacity = '0'
        return
      }

      el.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
      el.style.opacity = '0.7'
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element
      const target = t.closest('a, button, [data-cursor-text]')

      if (target) {
        const customText = target.getAttribute('data-cursor-text')

        if (customText) {
          txt.innerText = customText
          el.style.transform = `scale(2.5)`
          txt.style.opacity = '1'
          txt.style.transform = `scale(0.35)`
        } else {
          el.style.transform = `scale(1.8)`
          txt.style.opacity = '0'
        }
      }
    }

    const onLeave = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [data-cursor-text]')) {
        el.style.transform = `scale(1)`
        txt.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <div
      ref={elRef}
      id="revolq-cursor"
      aria-hidden="true"
      style={{
        opacity: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '12px',
        height: '12px',
        background: '#c9a266',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'multiply',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        transform: 'translate(-100px, -100px)',
      }}
    >
      <span
        ref={textRef}
        style={{
          color: '#000',
          fontSize: '9px',
          fontWeight: 'bold',
          opacity: 0,
          letterSpacing: '0.05em',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}
