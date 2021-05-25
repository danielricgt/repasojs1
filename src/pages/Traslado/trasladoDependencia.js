import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, FormGroup, Modal, ModalFooter } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { 
    getBienesDependencia, getUserEncargadoDependencia, getDependencias, 
    trasladoDependencia, trasladoBienes  } from './../../helpers/fetch'
import { getLoggedInUser } from './../../helpers/authUtils'
import { getCargos } from './../../helpers/utils'
import TrasladoDependenciaTable from '../Tables/trasladoDependenciaTable';
import { createProcess } from './../../helpers/httpRequest'


class TrasladoDependencia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            show: false,
            user: getLoggedInUser(),
            searchUser: null,
            Bienes: [],
            showSelect: false,
        };

        this.submitId = this.submitId.bind(this)
        this.submitTraslado = this.submitTraslado.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    async componentDidMount() {
        const result = await getDependencias()
        if (result.data) {
            this.setState({ Dependencias: result.data.dependencia })
        }
    }

    async submitId(event, values) {
        const { user } = this.state
        if (Number(user.id) === Number(values.id)) {
            alert('El usuario que entrega no puede ser el mismo que recibe')
            return;
        }
        const result = await getUserEncargadoDependencia({ idUsuario: values.id })
        if (result.data.encargado_dependencia.length === 0)
            alert('Este usuario no es un encargado de dependencia o no existe usuario')
        else {
            const usuario = result.data.encargado_dependencia[0].usuario
            const idSede = Number(user.dependencia.sede.id)
            const idDependencia = Number(user.dependencia.id)
            const idRol = Number(user.auth.rol.id)
            const res = await getBienesDependencia({ idSede, idDependencia }, idRol)
            this.setState({
                searchUser: {
                    funcionario: `${usuario.nombres} ${usuario.apellidos}`,
                    correo: usuario.correo,
                    cargo: usuario.cargos[0].cargo,
                    id: values.id,
                },
                Bienes: res.data.bien,
                show: true,
                showSelect: true,
            })
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    async handleSubmitForm() {
        await this.setState({ modal: true})
    }

    async submitTraslado() {
        const { searchUser, Bienes, user} = this.state;
        try {
            await trasladoDependencia({fk_dependencia: Number(user.dependencia.id), fk_usuario: searchUser.id})
            await trasladoBienes({fk_usuario: searchUser.id}, Bienes)
            await this.setState({ modal: false })
            let BienesId = []
            let cambios = []
            Bienes.map( async item => {
                BienesId.push(item.id)
                cambios.push({ id: item.id, fk_usuario: user.id, fk_estado: 1, fk_dependencia: user.dependencia.id})
            })
            const data = {
                descripcion: "Traslado de dependencia",
                razon: "Usuario pidio realizar un traslado de dependencia",
                contratista: "contratista",
                bienes: BienesId,
                fk_usuario: user.id,
                cambios: {
                    bienes: cambios
                },
                fk_tipo_solicitud: 6
            }
            await createProcess(data)
            alert('Bienes trasladados correctamentes')
            this.props.history.push('/');
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    render() {
        const errorMessage = 'Campo requerido'
        const { user, show, searchUser, Bienes, showSelect } = this.state;
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">TRASLADO DE DEPENDENCIA</h4>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm='4' className="subtitulo-form">
                                            <h5>Qui&eacute;n Entrega </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Identificaci&oacute;n: </span> {user.id}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Funcionario: </span> {user.nombres} {user.apellidos}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Correo: </span> {user.correo}</p>
                                        </Col>
                                        <Col sm='3'>
                                            <p><span style={{ fontWeight: 'bold' }}>Cargo: </span> {getCargos(user.cargos)}</p>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm='6' className="subtitulo-form">
                                            <h5>Quien Recibe</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='6'>
                                            <AvForm className="form-horizontal" inline onValidSubmit={this.submitId}>
                                                <FormGroup>
                                                    <AvField name="id" value={this.state.id} disabled={show} type="text" placeholder="Ingrese la Identificaci&oacute;n" label="Identificaci&oacute;n" validate={{
                                                        required: { value: true, errorMessage: errorMessage },
                                                        pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                    }} />

                                                    <Button color="primary" className="w-md waves-effect waves-light" type="submit" grid={{ xs: 8 }}>Buscar</Button>
                                                </FormGroup>
                                            </AvForm>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    {   !showSelect ? '' :
                                        <Row>
                                            <Col sm='12'>
                                                <Row>
                                                    <Col sm='4'>
                                                        <p><span style={{ fontWeight: 'bold' }}>Funcionario:</span> {searchUser.funcionario}</p>
                                                    </Col>
                                                    <Col sm='4'>
                                                        <p><span style={{ fontWeight: 'bold' }}>Correo:</span> {searchUser.correo}</p>
                                                    </Col>
                                                    <Col sm='4'>
                                                        <p><span style={{ fontWeight: 'bold' }}>Cargo:</span> {searchUser.cargo}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    {
                                        !show ? '' :
                                        <div>
                                            <hr></hr>
                                            <Row>
                                                <Col sm='6' className="subtitulo-form">
                                                    <h5>Dependencia</h5>
                                                    <p>{user.dependencia.dependencia}</p>
                                                </Col>
                                            </Row>
                                        </div>
                                    }
                                    <hr></hr>
                                    {
                                        !show ? '' :
                                            Bienes.length === 0 ? alert('No hay bienes en esta busqueda') :
                                                <TrasladoDependenciaTable Bienes={Bienes} />        
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
                            <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitTraslado}>Confimar</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(TrasladoDependencia));