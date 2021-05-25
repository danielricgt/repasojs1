import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from './../../helpers/authUtils'

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        }
    }

    render() {
        const idRol = Number(this.state.user.auth.rol.id)

        function SidebarRol() {
            return (
                idRol === 1
                ?
                <>
                    <li>
                        <Link to="/" className="waves-effect">
                            <i className="ti-home"></i><span> Principal </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="levantamiento" className="waves-effect"><i className="ti-clipboard"></i><span>Levantamiento</span></Link>
                    </li>
                    <li id="ingresoBienMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-shift-right"></i><span>Ingreso de Bien<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            <li><Link to="comprobante-entrada">Comprobante de entrada</Link></li>
                            <li><Link to="comprobante-salida">Comprobante de salida</Link></li>
                        </ul>
                    </li>
                    <li id="TrasladoMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-split-h"></i><span>Traslado<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">                            
                            <li><Link to="traslado-individual">Traslado de bien individual</Link></li>
                        </ul>
                    </li>
                    <li id="BienesMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-shift-right-alt"></i><span>Bienes<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            {/* <li><Link to="alta-bien">Alta de bien</Link></li> */}
                            <li><Link to="baja-bien">Baja de bien</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="transacciones" className="waves-effect"><i className="ti-exchange-vertical"></i><span>Transacciones</span></Link>
                    </li>
                    <li>
                        <Link to="configuracion" className="waves-effect"><i className="ti-settings"></i><span>Configuraci&oacute;n</span></Link>
                    </li>                    
                    <li>
                        <Link to="notificaciones" className="waves-effect"><i className="ti-bell"></i><span>Notificaciones</span></Link>
                    </li>
                </>
                :
                idRol === 2
                ?
                <>
                    <li>
                        <Link to="/" className="waves-effect">
                            <i className="ti-home"></i><span> Principal </span>
                        </Link>
                    </li>
                    <li id="TrasladoMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-split-h"></i><span>Traslado<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            <li><Link to="traslado-dependencia">Traslado de dependencia</Link></li>
                            <li><Link to="traslado-individual">Traslado de bien individual</Link></li>
                        </ul>
                    </li>
                    <li id="BienesMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-shift-right-alt"></i><span>Bienes<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            {/* <li><Link to="alta-bien">Alta de bien</Link></li> */}
                            <li><Link to="baja-bien">Baja de bien</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="transacciones" className="waves-effect"><i className="ti-exchange-vertical"></i><span>Transacciones</span></Link>
                    </li>
                    <li>
                        <Link to="configuracion" className="waves-effect"><i className="ti-settings"></i><span>Configuraci&oacute;n</span></Link>
                    </li>
                    <li>
                        <Link to="notificaciones" className="waves-effect"><i className="ti-bell"></i><span>Notificaciones</span></Link>
                    </li>
                </>
                :
                idRol === 3
                ?
                <>
                    <li>
                        <Link to="/" className="waves-effect">
                            <i className="ti-home"></i><span> Principal </span>
                        </Link>
                    </li>
                    <li id="TrasladoMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-split-h"></i><span>Traslado<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            <li><Link to="traslado-dependencia">Traslado de dependencia</Link></li>
                            <li><Link to="traslado-individual">Traslado de bien individual</Link></li>
                        </ul>
                    </li>
                    <li id="BienesMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-shift-right-alt"></i><span>Bienes<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            {/* <li><Link to="alta-bien">Alta de bien</Link></li> */}
                            <li><Link to="baja-bien">Baja de bien</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="transacciones" className="waves-effect"><i className="ti-exchange-vertical"></i><span>Transacciones</span></Link>
                    </li>
                    <li>
                        <Link to="configuracion" className="waves-effect"><i className="ti-settings"></i><span>Configuraci&oacute;n</span></Link>
                    </li>
                    <li>
                        <Link to="notificaciones" className="waves-effect"><i className="ti-bell"></i><span>Notificaciones</span></Link>
                    </li>
                </>
                :
                <>
                    <li>
                        <Link to="/" className="waves-effect">
                            <i className="ti-home"></i><span> Principal </span>
                        </Link>
                    </li>
                    <li id="TrasladoMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-split-h"></i><span>Traslado<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            <li><Link to="traslado-individual">Traslado de bien individual</Link></li>
                        </ul>
                    </li>
                    <li id="BienesMenu">
                        <Link to="/#" className="waves-effect"><i className="ti-shift-right-alt"></i><span>Bienes<span className="float-right menu-arrow"><i className="mdi mdi-chevron-right"></i></span> </span></Link>
                        <ul className="submenu">
                            {/* <li><Link to="alta-bien">Alta de bien</Link></li> */}
                            <li><Link to="baja-bien">Baja de bien</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="transacciones" className="waves-effect"><i className="ti-split-h"></i><span>Transacciones</span></Link>
                    </li>
                    <li>
                        <Link to="configuracion" className="waves-effect"><i className="ti-settings"></i><span>Configuraci&oacute;n</span></Link>
                    </li>
                    <li>
                        <Link to="notificaciones" className="waves-effect"><i className="ti-bell"></i><span>Notificaciones</span></Link>
                    </li> 
                </>
            )
        }

        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu" id="menu">
                        <li className="menu-title">Menu</li>
                        <SidebarRol/>
                    </ul>
                </div>

            </React.Fragment>
        );
    }
}


export default SideNav;