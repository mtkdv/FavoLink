import { motion, Target, VariantLabels, Variants } from "framer-motion";

const variants: Variants = {
  offScreen: {
    opacity: 0,
    y: 100,
  },
  onScreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const MotionFeature = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="offScreen"
      whileInView="onScreen"
      variants={variants}
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
