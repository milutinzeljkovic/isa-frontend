import React, { Component } from 'react';
import { MDBNotification } from 'mdbreact';

class FeedbackNotification extends Component {

    render() {
        return (
            <MDBNotification
                show
                fade
                iconClassName="text-primary"
                title="Notification"
                message={this.props.notificationMessage}
                text="just now"
                autohide={3000}
                style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                width: "250px",
                zIndex: 9999
                }}
            />
        );
        
    }
}

export default FeedbackNotification;