import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
// import NotificationMenu from './Menus/notificationMenu';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProfileMenu from './Menus/profileMenu';

import { isLarge } from '../../store/actions';
import { connect } from 'react-redux';

import logo from './../../assets/universidad-logo.png'

class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            create_menu: false,
            toggle: false,
        };
    }

    toggleFullscreen() {
        if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="topbar">
                    <div className="topbar-left">
                        <Link to="/" className="logo">
                            <span>
                                <img src={logo} alt="Universidad Distrital" height="120"  />
                               
                            </span>
                        </Link>
                    </div>

                    <nav className="navbar-custom">
                        <Row>
                        <Col sm='9'>
                        <h2 className='d-md-inline-block TopBarTitle' style={{padding: '12px 0 0 10%', textAlign: 'center', fontSize: '1.3em'}}>HERRAMIENTA DE APOYO A LA GESTI&Oacute;N DE INVENTARIOS DE LA UNIVERSIDAD DISTRITAL</h2>
                        </Col>
                        <Col sm='3'>
                        <ul className="navbar-right list-inline float-right mb-0">
                            <li className="dropdown notification-list list-inline-item d-none d-md-inline-block mr-1">
                                <Link onClick={this.toggleFullscreen} className="nav-link waves-effect" to="#" id="btn-fullscreen">
                                    <i className="mdi mdi-fullscreen noti-icon"></i>
                                </Link>
                            </li>
                            <ProfileMenu />
                        </ul>
                        </Col>
                        </Row>
                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { is_large_state } = state.Layout;
    return { is_large_state };
}


export default (connect(mapStatetoProps, { isLarge })(Topbar));