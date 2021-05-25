import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getUserPwd, updatePwd } from './../../helpers/fetch'
import md5 from 'md5';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            confirmation: false,
            values: null,
            user: props.user,
        };
        this.submitChangePwd = this.submitChangePwd.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, values){
        this.setState({
            modal: true,
            values,
        })
    }
    

    async submitChangePwd() {
        const { user, values } = this.state
        try {
            const res = await getUserPwd({ id: user.id})
            const currentPassword = md5(values.currentPassword)
            if(res.data.usuario_auth[0].password !== currentPassword)
                alert('La contraseña actual es invalida')
            else {
                await updatePwd({ id: user.id, password: md5(values.password) })
                this.setState({ modal: false })
                alert('Contraseña cambiada exitosamente')
            }
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
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <h5>Cambiar contraseña</h5>
                    </Col>
                </Row>
                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                    <Row>
                        <Col sm="10">
                            <Row>
                                <Col sm='4'>
                                    <AvField label="Contraseña Actual" placeholder="Ingrese la contraseña actual" name="currentPassword" type="password" grid={{ xs: 7 }} validate={{
                                        required: { value: true, errorMessage: errorMessage },
                                        minLength: { value: 6, errorMessage: 'Minimo 6 digitos' },
                                    }} />
                                </Col>
                                <Col sm='4'>
                                    <AvField label="Contraseña Nueva" placeholder="Ingrese su nueva contraseña" name="password" type="password" grid={{ xs: 7 }} validate={{
                                        required: { value: true, errorMessage: errorMessage },
                                        minLength: { value: 6, errorMessage: 'Minimo 6 digitos' },
                                    }} />
                                </Col>
                                <Col sm='4'>
                                    <AvField label="Confirme Contraseña" placeholder="Ingrese su contraseña" name="confirmationPassword" type="password" grid={{ xs: 8 }} validate={{
                                        match: {
                                            errorMessage: 'Contraseñas no coinciden',
                                            value: 'password',
                                        },
                                        required: {
                                            errorMessage: errorMessage,
                                            value: true,
                                        },
                                        minLength: { value: 6, errorMessage: 'Minimo 6 digitos' },
                                    }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm='2'>
                            <Button className="btn btn-danger" style={{ marginLeft: '8px' }}>Cambiar</Button>
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
                        <Button type="button" color="secondary" onClick={ () => this.setState({ modal: false})} className="waves-effect">Close</Button>
                        <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitChangePwd}>Confimar</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ChangePassword;