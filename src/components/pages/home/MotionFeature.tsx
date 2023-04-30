import { motion, Variants } from "framer-motion";

const variants: Variants = {
  offScreen: {
    opacity: 0,
    y: 20,
  },
  onScreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      easings: "easeOut",
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
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
