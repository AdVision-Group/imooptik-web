import React, { useState } from "react";

//import "../styles/image.css";

export default function Image(props) {
    const containerClassName = props.containerClassName;
    const imageClassName = props.imageClassName;

    const [loaded, setLoaded] = useState(false);

    return(
        <div className={containerClassName + (loaded ? "" : " loading-image")}>
            <img
                className={imageClassName}
                style={loaded ? { width: "100%", height: "100%" } : { opacity: 0 }}
                src={props.src}
                alt="Fotka"
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}