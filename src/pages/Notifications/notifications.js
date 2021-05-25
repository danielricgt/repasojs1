import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotificaciones, getNotificacionesOrigen, getNotificacionesAprobador } from './../../helpers/fetch'
import { getLoggedInUser } from './../../helpers/authUtils'
import NotificacionesTable from './../Tables/notificacionesTable'

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Notificaciones: [],
            user: getLoggedInUser(),
        };
        this.fetchNotificaciones = this.fetchNotificaciones.bind(this)
    }

    async componentDidMount() {
       await this.fetchNotificaciones()
    }

    async fetchNotificaciones() {
        const { user } = this.state
        try {
            let result
            if(Number(user.auth.rol.id) === 4) {
                result = await getNotificacionesOrigen({fk_usuario: user.id})
            }
            if(Number(user.auth.rol.id) === 2) {
                result = await getNotificacionesAprobador({fk_usuario: user.id})
            }
            else {
                result = await getNotificaciones({fk_usuario: user.id})
            }
            const data = result.data.notificaciones
            if(data.length === 0) {
                alert('No tiene notificaciones en este momento')
                this.props.history.push('/')
            }
            this.setState({ Notificaciones: data, loading: false})
        } catch (error) {
            console.log(error);
            alert('Error en el servidor')
        }
    }

    render() {
        const { loading, Notificaciones, user} = this.state
        const idRol = Number(user.auth.rol.id)
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">NOTIFICACIONES</h3>                                
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        { loading ?
                            <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                            <NotificacionesTable Notificaciones={Notificaciones} props={this.props} idRol={idRol}></NotificacionesTable>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Notifications));