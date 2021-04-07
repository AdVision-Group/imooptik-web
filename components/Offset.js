import React from "react";

export default class Offset extends React.Component {

    state = {
        height: 0
    }
    
    componentDidMount() {
        var header = document.getElementById("header");
        const height = parseInt(header.offsetHeight);

        this.setState({ height: height });

        window.addEventListener("resize", this.updateOffset.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateOffset.bind(this));
    }

    updateOffset() {
        var header = document.getElementById("header");
        const height = parseInt(header.offsetHeight);

        this.setState({ height: height });
    }

    render() {
        return(
            <div style={{ width: "100%", height: this.state.height }} />
        )
    }
}