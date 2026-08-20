import { motion, useReducedMotion } from "framer-motion";

export default function FadeCard({
  children,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.26,
        delay: reduceMotion ? 0 : Math.min(delay, 0.2),
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
