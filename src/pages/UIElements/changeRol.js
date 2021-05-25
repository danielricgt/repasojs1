import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { Component } from 'react';
import { Button, Col, Modal, ModalFooter, Row } from 'reactstrap';
import { changeRol, getUsuarioById, getRoles } from './../../helpers/fetch';
import { getCargos } from './../../helpers/utils'

class ChangeRol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            values: null,
            user: props.user,
            show: false,
            id: '',
            Roles: [],
            searchUser: null,
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitId = this.submitId.bind(this)
        this.submitRol = this.submitRol.bind(this)
    }

    async componentDidMount() {
        const result = await getRoles()
        this.setState({ Roles: result.data.rol })
    }

    handleSubmit(event, values) {
        this.setState({
            modal: true,
            values,
            show: true
        })
    }

    async submitRol() {
        const { values, id } = this.state;
        try {
            await changeRol({ fk_rol: Number(values.rol), fk_usuario: Number(id) })
            this.setState({ modal: false, id: '' })
            alert('Rol cambiado exitosamente')
        } catch (error) {
            alert('Error en el servidor')
        }
        this.form && this.form.reset();
    }

    async submitId(event, values) {
        try {
            this.setState({ id: values.id})
            const result = await getUsuarioById({ id: values.id })
            const usuario = result.data.usuario
            if (usuario.length === 0)
                alert('No existe este usuario')
            else
                this.setState({
                    show: true,
                    searchUser: usuario[0]
                })
        } catch (error) {
            alert('Error en el servidor')
        }
    }


    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const { show, Roles, searchUser } = this.state
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <h5>Cambiar Rol</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm='4'>
                        <AvForm className="form-horizontal" onValidSubmit={this.submitId} ref={c => (this.form = c)}>
                            <Row>
                                <Col sm='9'>
                                    <AvField id='formIdChangeRol' label="Identificación"  value={this.state.id} placeholder="Ingrese el ID del funcionario"
                                        name="id" type="text" grid={{ xs: 7 }} validate={{
                                            required: { value: true, errorMessage: errorMessage },
                                            pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                        }} />
                                </Col>
                                <Col sm='2'>
                                    <Button className="btn btn-primary" style={{ marginLeft: '8px' }} type="submit">Buscar</Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                    {
                        !show ? '' :
                        <Col sm='8'>
                            <Row>
                                <Col sm='4'>
                                    <p><span style={{ fontWeight: 'bold' }}>Funcionario:</span> {searchUser.nombres} {searchUser.apellidos} </p>
                                </Col>
                                <Col sm='4'>
                                    <p><span style={{ fontWeight: 'bold' }}>Correo:</span>{searchUser.correo} </p>
                                </Col>
                                <Col sm='4'>
                                    <p><span style={{ fontWeight: 'bold' }}>Cargo:</span>{getCargos(searchUser.cargos)}</p>
                                </Col>
                            </Row>
                        </Col>
                    }
                </Row>
                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                    <Row>
                        <Col sm='4'>
                            <AvField id="selectRol" label="Rol" name="rol" type='select' grid={{ xs: 8 }} validate={{
                                required: { value: true, errorMessage: errorMessage }
                            }} disabled={!show}>
                                <option disabled value="">Seleccione un rol</option>
                                {Roles.length === 0 ?
                                    <option></option>
                                    :
                                    Roles.map(({ id, rol }) =>
                                        <option value={id} key={id}>{rol}</option>
                                    )}
                            </AvField>
                        </Col>
                        <Col sm='2'>
                            <Button className="btn btn-primary" style={{ marginLeft: '8px' }} type="submit">Cambiar perfil</Button>
                        </Col>
                    </Row>
                </AvForm>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="confirmacion">¿Estas seguro de realizar esta acción?</h5>
                        <button type="button" onClick={() => this.setState({ modal: false })} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={() => this.setState({ modal: false })} className="waves-effect">Close</Button>
                        <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitRol}>Confimar</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ChangeRol;