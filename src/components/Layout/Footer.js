import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    © {new Date().getFullYear()}  Universidad Distrital Francisco Jos&eacute; de Caldas.
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;






