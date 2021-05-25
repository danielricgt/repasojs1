import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getUsuarioById, createDependencia, createDependenciaUser } from './../../helpers/fetch'
import { getCargos } from './../../helpers/utils'

class AddDependencia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            confirmation: false,
            values: null,
            user: props.user,
            show: false
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitId = this.submitId.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitDependencia = this.submitDependencia.bind(this)
    }

    handleSubmit(event, values) {
        this.setState({
            modal: true,
            values,
            searchUser: null,
            show: false,
        })
    }

    async submitId() {
        try {
            const result = await getUsuarioById({ id: this.state.idResponsable })
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

    handleChange = e => {
        this.setState({ idResponsable: e.target.value });
    };

    async submitDependencia() {
        const { values, idResponsable } = this.state
        try {
            const data = {
                dependencia: values.dependencia,
                fk_sede: values.sede
            }
            const result = await createDependencia(data)
            await createDependenciaUser({ fk_usuario: Number(idResponsable), fk_dependencia: result.data.insert_dependencia.returning[0].id })
            this.setState({ modal: false, idResponsable:'' })
            alert('Dependencia creada exitosamente')

        } catch (error) {
            alert('Error en el servidor')
        }
        this.form && this.form.reset();
    }


    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const { show, searchUser } = this.state
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <h5>Crear dependencia</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm='4'>
                        <AvForm className="form-horizontal" onValidSubmit={this.submitId} ref={c => (this.form = c)}>
                            <Row>
                                <Col sm='9'>
                                    <AvField label="Responsable" disabled={show} onChange={this.handleChange} value={this.state.idResponsable} placeholder="Ingrese el ID del responsable"
                                        name="responsable" type="text" grid={{ xs: 7 }} validate={{
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
                            <AvField id="selectSede" label="Sede" name="sede" type='select' value={this.props.sede} grid={{ xs: 8 }} validate={{
                                required: { value: true, errorMessage: errorMessage }
                            }} disabled={!show}>
                            <option disabled value="">Seleccione una sede</option>
                            {   this.props.sedes.length === 0 ?
                                <option></option>
                                :
                                this.props.sedes.map(({ id, sede }) =>
                                <option value={id} key={id}>{sede}</option>
                            )}
                            </AvField>
                        </Col>                            
                        <Col sm='4'>
                            <AvField label="Nombre dependencia" disabled={!show} placeholder="Ingrese la dependencia" name="dependencia" type="text" grid={{ xs: 7 }} validate={{
                                required: { value: true, errorMessage: errorMessage },
                            }} />
                        </Col>
                        <Col sm='2'>
                            <Button className="btn btn-primary" style={{ marginLeft: '8px' }} type="submit">Crear</Button>
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
                        <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitDependencia}>Confimar</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AddDependencia;