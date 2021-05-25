import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, Col, Modal, ModalFooter, Row, ModalBody } from 'reactstrap';
import { updateUsuarios, updateDependencia } from './../../helpers/fetch';
import { getCargos } from './../../helpers/utils'
import userLogo from './../../assets/user1.png';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            values: null,
            user: props.user,
            sedes: props.sedes,
            dependencias: props.dependencias,
            showCargo1: false,
            showCargo2: false,
            showButton: false,
            show: false,
            cargo1: '',
            cargo2: '',
            id: '',
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitUpdate = this.submitUpdate.bind(this)
        this.ChangeSedes = this.ChangeSedes.bind(this)
    }

    async componentDidMount() {
    }

    handleSubmit(event, values) {
        this.setState({
            modal: true,
            values,
            show: true
        })
    }

    async submitUpdate(event, values) {
        const dateUpdate = {
            id: values.id,
            nombres: values.nombres,
            apellidos: values.apellidos,
            correo: values.correo,
        }
        try {
            await updateUsuarios(dateUpdate)
            await updateDependencia({ idUsuario: values.id, fk_dependencia: values.dependencia})
            this.setState({ modalUpdate: false })
            alert('Usuario actualizado correctamente')
        } catch (error) {
            alert('Error en el servidor')
        }
    }


    async ChangeSedes(event) {
        await this.setState({ sede: event.target.value });
        await this.setState({ dependencias: this.state.sedes.find(sede => sede.id === Number(this.state.sede)).dependencia })
    }


    toggleModal(update) {
        if (update) {
            this.setState(prevState => ({
                modalUpdate: !prevState.modalUpdate
            }));
        }
        else {
            this.setState(prevState => ({
                modal: !prevState.modal
            }));
        }
    }

    render() {
        const { cargo1, cargo2, user, sedes, dependencias, showButton, showCargo1, showCargo2 } = this.state
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <h5 style={{ textAlign: "center" }}>MI PERFIL</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm="2">
                        <img src={userLogo} style={{ width: "100%", height: "100%", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "15%" }} className="image" alt="Universidad Distrital" />
                    </Col>
                    <Col sm="10">
                        <Row>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>Nombre Completo: </span>{user.nombres} {user.apellidos}</p>
                            </Col>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>Correo: </span>{user.correo}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>ID: </span>{user.id}</p>
                            </Col>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>Sede: </span>{user.dependencia.sede.sede}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>Dependencia: </span>{user.dependencia.dependencia}</p>
                            </Col>
                            <Col sm="6">
                                <p><span style={{ fontWeight: 'bold' }}>Cargo: </span>{getCargos(user.cargos)}</p>
                            </Col>
                        </Row>
                        <div className="row justify-content-end">
                            <div className="col-2">
                                <Button className="btn btn-primary" onClick={() => this.setState({ modalUpdate: true })}>Editar</Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modalUpdate} toggle={() => this.toggleModal(true)} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="confirmacionUpdate">Dese actualizar los datos de {user.name} {user.apellidos}</h5>
                        <button type="button" onClick={() => this.setState({ modalUpdate: false })} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <AvForm className="form" onValidSubmit={this.submitUpdate} >
                        <ModalBody>
                            <Row>
                                <Col sm='6'>
                                    <AvField label="N° Identificación" value={user.id} disabled={true} placeholder="Ingrese su número de identificación" name="id" type="text" grid={{ xs: 8 }} validate={{
                                        required: { value: true, errorMessage: errorMessage },
                                        pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                    }} />
                                </Col>
                                <Col sm='6'>
                                    <AvField label="Correo" placeholder="Ingrese su correo" value={user.correo} name="correo" type="text" grid={{ xs: 10 }} validate={{
                                        required: { value: true, errorMessage: errorMessage }
                                    }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm='6'>
                                    <AvField label="Nombres" value={user.nombres} placeholder="Ingrese su nombres" name="nombres" type="text" grid={{ xs: 10 }} validate={{
                                        required: { value: true, errorMessage: errorMessage },
                                    }} />
                                </Col>
                                <Col sm='6'>
                                    <AvField label="Apellidos" placeholder="Ingrese sus apellidos" value={user.apellidos} name="apellidos" type="text" grid={{ xs: 10 }} validate={{
                                        required: { value: true, errorMessage: errorMessage }
                                    }} />
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col sm='6'>
                                    <AvField label="Sede" name="sede" type='select' value={user.dependencia.sede.id} grid={{ xs: 8 }} validate={{
                                        required: { value: true, errorMessage: errorMessage }
                                    }} onChange={this.ChangeSedes.bind(this)}>
                                        <option disabled value="">Seleccione una sede</option>
                                        {sedes.length === 0 ?
                                            <option></option>
                                            :
                                            sedes.map(({ id, sede }) =>
                                                <option value={id} key={id}>{sede}</option>
                                            )}
                                    </AvField>
                                </Col>
                                <Col sm='6'>
                                    <AvField label="Dependencia" name="dependencia" type='select' value={user.dependencia.id} grid={{ xs: 8 }} validate={{
                                        required: { value: true, errorMessage: errorMessage }
                                    }}>
                                        <option disabled value="">Seleccione una dependencia</option>
                                        {dependencias.length === 0 ?
                                            <option></option>
                                            :
                                            dependencias.map(({ id, dependencia }) =>
                                                <option value={id} key={id}>{dependencia}</option>
                                            )}
                                    </AvField>
                                </Col>
                            </Row>
                            <hr />
                            <h6>Cargos</h6>
                            <Row>
                                <Col>
                                    <AvField label="Cargo" value={user.nombres} placeholder="Ingrese su nombres" name="nombres" type="text" grid={{ xs: 10 }} validate={{
                                        required: { value: true, errorMessage: errorMessage },
                                    }} />
                                </Col>
                            </Row>
                            {
                                !showCargo1 ?
                                    <Row>
                                        <Col>
                                            <Button type="button" color="primary" onClick={() => this.setState({ showCargo1: true, showButton: true })} className="waves-effect">Agregar Cargo</Button>
                                        </Col>
                                    </Row>
                                    :
                                    <div>
                                        <Row>
                                            <Col>
                                                <AvField label="Cargo" value={cargo1} placeholder="Ingrese su cargo" name="cargo1" type="text" grid={{ xs: 10 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                }} />
                                            </Col>
                                        </Row>
                                        {
                                            !showButton ? '' :
                                                <Row>
                                                    <Col>
                                                        <Button type="button" color="primary" onClick={() => this.setState({ showCargo2: true, showButton: false })} className="waves-effect">Agregar Cargo</Button>
                                                    </Col>
                                                </Row>
                                        }
                                    </div>
                            }
                            {

                                !showCargo2 ? ''
                                    :
                                    <Row>
                                        <Col>
                                            <AvField label="Cargo" value={cargo2} placeholder="Ingrese su cargo" name="cargo2" type="text" grid={{ xs: 10 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                            }} />
                                        </Col>
                                    </Row>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ modalUpdate: false })} className="waves-effect">Close</Button>
                            <Button type="button" color="primary" className="waves-effect waves-light" type="submit">Confimar</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal isOpen={this.state.modal} toggle={() => this.toggleModal(false)} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="confirmacion">¿Estas seguro de realizar esta acción?</h5>
                        <button type="button" onClick={() => this.setState({ modal: false })} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={() => this.setState({ modal: false })} className="waves-effect">Close</Button>
                        <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitTraslado}>Confimar</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default EditProfile;