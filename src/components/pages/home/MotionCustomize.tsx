import { motion, Target, VariantLabels, Variants } from "framer-motion";

const variants: Variants = {
  offScreenLeft: {
    opacity: 0,
    x: -20,
  },
  offScreenRight: {
    opacity: 0,
    x: 20,
  },
  onScreen: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const MotionCustomize = ({
  initial,
  className,
  children,
}: {
  initial: boolean | Target | VariantLabels;
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView="onScreen"
      variants={variants}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
