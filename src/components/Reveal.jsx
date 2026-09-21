import { motion, useReducedMotion } from 'framer-motion'

// Fade-and-rise on first scroll into view. Every section block uses this.
// `delay` is in seconds; lists pass index * 0.08 for an 80ms cascade.
export default function Reveal({ children, delay = 0, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
