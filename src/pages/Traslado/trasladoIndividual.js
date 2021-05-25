import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, FormGroup, Modal, ModalFooter } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getLoggedInUser } from './../../helpers/authUtils'
import { getBienesDependencia, getUsuarioById, getDependenciaEncargado,
    trasladoBienes, trasladoDependencia, getAprobador  } from './../../helpers/fetch'
import { getCargos } from './../../helpers/utils'
import TrasladoDependenciaTable from '../Tables/trasladoDependenciaTable';
import { createProcess } from './../../helpers/httpRequest'

class TrasladoIndividual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: getLoggedInUser(),
            show: false,
            Bienes: [],
            userEntrega: null,
            userRecibe: null,
            showRecibe: false,
            Dependencias: [],
            idDependencia: '',
            showBienes: false,
            modal: false,
            BienesSelected: [],
            userEncargado: null,
            userAutoriza: []
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitIdRecibe = this.submitIdRecibe.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.getBienesCheck = this.getBienesCheck.bind(this)
    }

    async componentDidMount() {
        const { user } = this.state;
        try {
            const result = await getDependenciaEncargado({idDependencia: user.dependencia.id}) 
            let userAutoriza
            if(result.data.encargado_dependencia.length === 0) {
                userAutoriza = user
            }
            else {
                userAutoriza = result.data.encargado_dependencia[0].usuario
            }
            this.setState({ 
                userEncargado: result.data.encargado_dependencia[0],
                userAutoriza,
                loading: false
            })
            
        } catch (error) {
            console.log(error);
            alert('Error en el servidor')
        }
    }

    async submitIdRecibe(event, values) {
        const { user } = this.state
        if (Number(user.id) === Number(values.id)) {
            alert('El usuario que recibe no puede ser el mismo que entrega')
            return;
        }
        const result = await getUsuarioById({ id: values.id })
        if (result.data.usuario.length === 0)
            alert('Usuario no existe')
        else {
            const usuario = result.data.usuario[0]
            const idSede = Number(user.dependencia.sede.id)
            const idDependencia = Number(user.dependencia.id)
            const idRol = Number(user.auth.rol.id)
            let res
            if(idRol === 4) {
                res = await getBienesDependencia({ idSede, idDependencia, fk_usuario: user.id }, idRol)
            }
            else {
                res = await getBienesDependencia({ idSede, idDependencia }, idRol)
            }
            this.setState({
                userRecibe: usuario,
                show: true,
                Bienes: res.data.bien,
                idDestino: values.id,
                idDependenciaDestino: usuario.dependencia.id,
            })
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    async getBienesCheck(data) {
        this.setState({ BienesSelected: data})
    }

    async handleSubmitForm() {
        const { BienesSelected} = this.state;
        if(BienesSelected.length === 0) {
            alert('No se ha escogido ningún bien')
            return;
        }
        await this.setState({ modal: true})
    }

    async handleSubmit() {
        const { userRecibe, BienesSelected, user, idDestino, idDependenciaDestino } = this.state;
        try {
            await trasladoDependencia({fk_dependencia: Number(user.dependencia.id), fk_usuario: userRecibe.id})
            await trasladoBienes({fk_usuario: userRecibe.id}, BienesSelected)
            await this.setState({ modal: false })
            let BienesId = []
            let cambios = []
            BienesSelected.map( async item => {
                BienesId.push(item.id)
                cambios.push({ id: item.id, fk_usuario: idDestino, fk_estado: 1, fk_dependencia: idDependenciaDestino})
            })
            const data = {
                descripcion: "Traslado de bienes individuales",
                razon: "Usuario solicito realizar un traslado de bienes individuales",
                contratista: "contratista",
                bienes: BienesId,
                fk_usuario: Number(user.id),
                fk_usuario_aprobador: Number(user.id),
                cambios: {
                    bienes: cambios
                },
                fk_usuario_destino: Number(idDestino),
                fk_tipo_solicitud: 5,
            }
            await createProcess(data)
            alert('Bienes trasladados correctamentes')
            this.props.history.push('/');
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    render() {
        const { user, show, Bienes, userRecibe, userAutoriza } = this.state
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">TRASLADO DE BIEN INDIVIDUAL</h4>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm='6' className="subtitulo-form">
                                            <h5>Dependencia</h5>
                                            <p>{user.dependencia.dependencia}</p>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm='4' className="subtitulo-form">
                                            <h5>Quien Autoriza </h5>
                                        </Col>
                                    </Row>
                                    {
                                        userAutoriza.length === 0 ? '' :
                                        <Row>
                                            <Col sm='3'>
                                                <p><span style={{ fontWeight: 'bold' }}>Identificaci&oacute;n:</span> {userAutoriza.id}</p>
                                            </Col>
                                            <Col sm='3'>
                                                <p><span style={{ fontWeight: 'bold' }}>Funcionario:</span> {userAutoriza.nombres} {userAutoriza.apellidos}</p>
                                            </Col>
                                            <Col sm='3'>
                                                <p><span style={{ fontWeight: 'bold' }}>Correo:</span> {userAutoriza.correo}</p>
                                            </Col>
                                            <Col sm='3'>
                                                <p><span style={{ fontWeight: 'bold' }}>Cargo:</span> {getCargos(userAutoriza.cargos)}</p>
                                            </Col>
                                        </Row>
                                    }
                                    <hr></hr>
                                    <Row>
                                        <Col sm='4' className="subtitulo-form">
                                            <h5>Quien Entrega </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Identificaci&oacute;n:</span> {user.id}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Funcionario:</span> {user.nombres} {user.apellidos}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Correo:</span> {user.correo}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Cargo:</span> {getCargos(user.cargos)}</p>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm='6'>
                                            <h5>Quien Recibe </h5>
                                            <AvForm className="form-horizontal" inline onValidSubmit={this.submitIdRecibe}>
                                                <FormGroup>
                                                    <AvField name="id" disabled={show} type="text" placeholder="Ingrese la Identificaci&oacute;n" label="Identificaci&oacute;n" validate={{
                                                        required: { value: true, errorMessage: errorMessage },
                                                        pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                        }} />
                                                    <Button color="primary" className="w-md waves-effect waves-light" type="submit" grid={{ xs: 8 }}>Buscar</Button>
                                                </FormGroup>
                                            </AvForm>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    {
                                        !show ? '' :
                                        <Row>
                                            <Col sm='4'>
                                                <p><span style={{ fontWeight: 'bold' }}>Funcionario:</span> {userRecibe.nombres} {user.apellidos}</p>
                                            </Col>
                                            <Col sm='4'>
                                                <p><span style={{ fontWeight: 'bold' }}>Correo:</span> {userRecibe.correo}</p>
                                            </Col>
                                            <Col sm='4'>
                                                    <p><span style={{ fontWeight: 'bold' }}>Cargo:</span> {getCargos(userRecibe.cargos)}</p>
                                            </Col>
                                        </Row> 
                                    }
                                    <hr></hr>
                                    {
                                        !show ? '' :
                                            Bienes.length === 0 ? alert('No hay bienes en esta busqueda') :
                                                <TrasladoDependenciaTable Bienes={Bienes} callback={this.getBienesCheck} check={true}/>
                                    }
                                    {
                                        !show ? '' :
                                            Bienes.length === 0 ? '' :
                                                <Row className="form-group m-t-20">
                                                    <Col md="12" className="text-right">
                                                        {this.state.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                            <Button color="primary" className="w-md waves-effect waves-light" onClick={this.handleSubmitForm}>Realizar Traslado</Button>}
                                                    </Col>
                                                </Row>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="confirmacion">¿Estas seguro de realizar esta acción?</h5>
                            <button type="button" onClick={() => this.setState({ modal: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={ () => this.setState({ modal: false})} className="waves-effect">Close</Button>
                            <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.handleSubmit}>Confimar</Button>
                        </ModalFooter>
                    </Modal>

                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(TrasladoIndividual));

