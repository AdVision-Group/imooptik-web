import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { animate } from "../config/Animation";

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
			animate();
		}
	}

	render() {
		return <React.Fragment />
	}
}

export default withRouter(ScrollToTop)