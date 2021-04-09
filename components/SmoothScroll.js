import React from "react";
import $ from "jquery";

export default class SmoothScroll extends React.Component {

    constructor() {
        super();
    }

    static scroll(hash, yOffset=0) {
        var offset = document.getElementById("header").offsetHeight;

        if (hash === "#services" || hash === "#products") offset += 30;

        $("html, body").animate({
            scrollTop: $(hash).offset().top - offset + yOffset
        }, 800, function(){
            //window.location.hash = hash;
        });
    }
}