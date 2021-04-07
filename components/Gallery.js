import React from "react";

//import "../styles/gallery.css";

export default class Gallery extends React.Component {

    state = {
        gallery: [],
        currentPhoto: 0
    }

    constructor() {
        super();

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.moveIndicator = this.moveIndicator.bind(this);
    }

    componentDidMount() {
        const { gallery, currentPhoto } = this.props;
        
        this.setState({
            gallery: gallery,
            currentPhoto: currentPhoto
        }, () => this.moveIndicator());

        var list = document.getElementById("gallery-list");
        list.style.marginLeft = "-" + (currentPhoto * 80) + "vw";

        var list = document.getElementById("gallery-list");
        list.style.width = (80 * gallery.length) + "vw";
    }

    next(event) {
        event.stopPropagation();

        var newCurrent = this.state.currentPhoto + 1;
        if (newCurrent > this.state.gallery.length - 1) newCurrent = 0;

        this.setState({ currentPhoto: newCurrent }, () => this.moveIndicator());

        var list = document.getElementById("gallery-list");
        list.style.marginLeft = "-" + (newCurrent * 80) + "vw";
    }

    previous(event) {
        event.stopPropagation();

        var newCurrent = this.state.currentPhoto - 1;
        if (newCurrent < 0) newCurrent = this.state.gallery.length - 1;

        this.setState({ currentPhoto: newCurrent }, () => this.moveIndicator());

        var list = document.getElementById("gallery-list");
        list.style.marginLeft = "-" + (newCurrent * 80) + "vw";
    }

    moveIndicator() {
        const { gallery, currentPhoto } = this.state;

        const progressBar = document.getElementById("progress-bar");
        const progressIndicator = document.getElementById("progress-indicator");

        const indicatorWidth = progressBar.offsetWidth / gallery.length;

        progressIndicator.style.width = indicatorWidth + "px";

        const scrollingWidth = progressBar.offsetWidth - indicatorWidth;
        const offset = currentPhoto * indicatorWidth;

        progressIndicator.style.marginLeft = offset + "px";
    }

    render() {
        return(
            <div id="gallery-panel" onClick={() => this.props.close()}>
                <div className="arrow">
                    <ion-icon name="arrow-back-outline" onClick={(event) => this.previous(event)}></ion-icon>
                </div>

                <div className="wrapper">
                    <div className="list" id="gallery-list">
                        {this.state.gallery ? this.state.gallery.map((photo) => <img className="image" src={photo} alt="Fotka z galérie poboćky" />) : null}
                    </div>
                </div>

                <div className="arrow">
                    <ion-icon name="arrow-forward-outline" onClick={(event) => this.next(event)}></ion-icon>
                </div>

                <div className="progress" id="progress-bar">
                    <div className="indicator" id="progress-indicator" />
                </div>
            </div>
        )
    }
}