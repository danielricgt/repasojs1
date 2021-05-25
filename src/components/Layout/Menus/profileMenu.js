
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

// users
import user from '../../../assets/user1.png';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="notification-list list-inline-item nav-pro-img" tag="li">
                    <DropdownToggle className="nav-link arrow-none nav-user waves-effect" tag="a">
                        <img src={user} alt="user" className="rounded-circle" />
                    </DropdownToggle>
                    <DropdownMenu className="profile-dropdown" right>
                        <DropdownItem ><Link to="configuracion" className="waves-effect"><i className="mdi mdi-account-circle m-r-5"></i>Configuración</Link></DropdownItem>
                        <div className="dropdown-divider"></div>
                        <DropdownItem tag="a" className="text-danger" href="/logout"><i className="mdi mdi-power text-danger"></i>Cierre de sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment >
        );
    }
}


export default withRouter(ProfileMenu);
