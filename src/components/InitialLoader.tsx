import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "__intro_played";

export default function InitialLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1400);
    return () => clearTimeout(t);
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[hsl(340_70%_94%)] via-[hsl(350_60%_92%)] to-[hsl(20_60%_92%)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif-display text-3xl sm:text-4xl italic text-foreground/90 tracking-wide">
              Dr. Swathika <span className="text-gradient-rose">Rajendran</span>
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{ originX: 0 }}
              className="mt-4 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.6)] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
