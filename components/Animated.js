import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function Animated(props) {
    return(
        <ScrollAnimation
            offset={props.offset}
            animateIn={props.animateIn}
            animateOut={props.animateOut}
            duration={props.duration}
            delay={props.delay}
            animateOnce={props.animateOnce}
            animateOnce={true}
        >
            {props.children}
        </ScrollAnimation>
    )
}