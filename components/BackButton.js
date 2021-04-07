import React from "react";
import { withRouter } from "react-router-dom";

class BackButton extends React.Component {
    componentDidMount() {
        this.backListener = this.props.history.listen(location => {
            if (this.props.history.action === "POP") {
                
            }
        });
    }

    componentWillUnmount() {
        this.backListener();
    }

    render() {
        return null;
    }
}

export default withRouter(BackButton);