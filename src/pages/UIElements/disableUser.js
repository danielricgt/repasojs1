import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { disableUser } from './../../helpers/fetch'

class DisableUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            confirmation: false,
            values: null,
            user: props.user,
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitDisableUser = this.submitDisableUser.bind(this)
    }

    handleSubmit(event, values) {
        this.setState({
            modal: true,
            values,
        })
    }
    
    async submitDisableUser() {
        const { values } = this.state;
        if (Number(this.props.user.id) === Number(values.id)) {
            alert('El usuario logueado no se puede deshabilitar')
            return;
        }
        try {
            await disableUser({id: values.id})
            this.setState({ modal: false})
            alert('Usuario deshabilitado exitosamente')
        } catch (error) {
            console.log(error);
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
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <h5>Deshabilitar a un funcionario</h5>
                    </Col>
                </Row>
                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                    <Row>
                        <Col sm='4'>
                            <AvField label="Identificaci&oacute;n del funcionario" placeholder="Ingrese la identificación" name="id" type="text" grid={{ xs: 7 }} validate={{
                                required: { value: true, errorMessage: errorMessage },
                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                            }} />
                        </Col>
                        <Col sm='2'>
                            <Button className="btn btn-danger" style={{ marginLeft: '8px' }} type="submit">Deshabilitar</Button>
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
                        <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitDisableUser}>Confimar</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DisableUser;