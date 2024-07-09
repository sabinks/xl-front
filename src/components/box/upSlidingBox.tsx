"use client"
import { disableInstantTransitions, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const UpSlidingBox = (props: any) => {
    const [slide, setSlide] = useState(false)
    const { duration, children, distance } = props
    const [boxVar, setBoxVar] = useState({
        visible: { opacity: 1, y: 0, transition: { duration: duration ? duration : 0.3 } },
        hidden: { opacity: 0, y: distance ? distance : -30 }
    })
    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        setBoxVar((prev: any) => ({
            ...prev,
            hidden: { opacity: 1, y: 0 }
        }))
    }, [slide])

    useEffect(() => {
        if (inView) {
            control.start("visible");
            setSlide(true)
        } else {
            control.start("hidden");
        }
    }, [control, inView]);

    return (
        <motion.div
            className="box"
            ref={ref}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={boxVar}
            initial={"hidden"}
            animate={control}
        >
            {children}
        </motion.div>
    );
};

export default UpSlidingBox;

