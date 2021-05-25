import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Breadcrumb, Button, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import { AvForm } from 'availity-reactstrap-validation';
import { aceptRejectProcess } from './../../helpers/httpRequest';
import { getBienesNotificaciones } from '../../helpers/fetch'
import AprobacionBajaBienTable from '../Tables/aprobacionesBajaTable'

class AprobacionLevantamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bienes: [],
            loading: false,
            user: getLoggedInUser(),
        };
    }

    async componentDidMount() {
        try {
            const result = await getBienesNotificaciones({"_in":this.props.location.state.bien})
            this.setState({ Bienes: result.data.bien})
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    async submitCancelar() {
        this.setState({ loading: true })
        const data = {
            status: 3,
            idProcess: this.props.location.state.proceso.id,
            processType: 2
        }
        try {
            await aceptRejectProcess(data)
            alert('Proceso cancelado')            
            this.props.history.push('/notificaciones')
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    async submitAutorizar() {
        this.setState({ loading: true })
        const data = {
            status: 9,
            idProcess: this.props.location.state.proceso.id,
            processType: 2
        }
        try {
            await aceptRejectProcess(data)
            alert('Autorización éxitosa')            
            this.props.history.push('/notificaciones')
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    render() {
        const { Bienes, loading } = this.state;
        return (
            <React.Fragment>
                
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <Breadcrumb>
                                    {/* <BreadcrumbItem active>Bienvenido al UD Dashboard {user.nombres}</BreadcrumbItem> */}
                                </Breadcrumb>
                                <h4 className="page-title">APROBACI&Oacute;N DE LEVANTAMIENTO</h4>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody className="form-comprobante">
                                    <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                                    <Row>
                                        <Col sm="12">
                                            <h5 style={{textAlign:"center"}}>¿Est&aacute; seguro que desea autorizar este levantamiento? </h5>
                                        </Col>
                                    </Row>
                                   <br></br>
                                   {
                                        Bienes.length === 0 ? 
                                        <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                                        <AprobacionBajaBienTable Bienes={Bienes}></AprobacionBajaBienTable>
                                    }
                                   <Row>
                                        <Col sm="12" md={{ size: 6, offset: 4 }}>
                                            {   
                                                loading ? 
                                                <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button>
                                                :
                                                <Button type="button" color="danger" className="waves-effect waves-light"
                                                    onClick={() => this.submitCancelar()}>Cancelar</Button>
                                            }
                                            {' '}
                                            {
                                                loading ? 
                                                <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button>
                                                :
                                                <Button style={{marginLeft:'15px'}} type="button" color="primary" className="waves-effect waves-light"
                                                onClick={() => this.submitAutorizar()}>Autorizar</Button>
                                            }
                                        </Col>
                                    </Row>

                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(AprobacionLevantamiento));