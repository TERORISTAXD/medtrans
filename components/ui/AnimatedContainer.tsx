"use client";

import { motion } from "framer-motion";

interface AnimatedContainerProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    type?: "fade" | "slide-up" | "slide-in" | "scale";
}

export function AnimatedContainer({
    children,
    delay = 0,
    className = "",
    type = "slide-up",
}: AnimatedContainerProps) {
    const getVariants = () => {
        switch (type) {
            case "fade":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                };
            case "slide-in":
                return {
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                };
            case "scale":
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                };
            case "slide-up":
            default:
                return {
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                };
        }
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
