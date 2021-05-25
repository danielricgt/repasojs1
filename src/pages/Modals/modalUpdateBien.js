import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, Form, FormGroup, Label, Input, Col } from 'reactstrap';


class ModalUpdateBien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            loading: false,
            descripcion: this.props.data.descripcion ? this.props.data.descripcion : '',
            espacio_fisico: this.props.data.espacio_fisico ? this.props.data.espacio_fisico : '',
            observaciones: this.props.data.observaciones ? this.props.data.observaciones : '',
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    removeBodyCss() {
        document.body.classList.add('no_padding');
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.removeBodyCss();
    }

    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitUpdate(e) {
        e.preventDefault();
        let data = {
            descripcion: this.state.descripcion,
            espacio_fisico: this.state.espacio_fisico,
            observaciones: this.state.observaciones,
            id: this.props.data.id,
            fk_estado: this.props.data.estado.id,
        }
        this.props.callback(data);
        this.toggle()
    }

    closeButtonClickHandler = () => {
        this.props.callbackModal();
    }
    
    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <Modal isOpen={this.state.modal} toggle={this.closeButtonClickHandler} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">Actualizar bien {this.props.data.placa}</h5>
                            <button type="button" onClick={() => this.setState({ modal: false })} className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form onSubmit={this.submitUpdate}>
                                <FormGroup>
                                    <Label for="Descripci&oacute;n">Descripci&oacute;n</Label>
                                    <Input 
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        placeholder="Ingrese la descripci&oacute;n a actualizar"
                                        onChange={this.handleChange}
                                        value={this.state.descripcion}
                                        required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Espacio F&iacute;sico">Espacio F&iacute;sico</Label>
                                    <Input 
                                        type="text"
                                        name="espacio_fisico"
                                        id="espacio_fisico"
                                        placeholder="Ingrese el espacio f&iacute;sico a actualizar"
                                        onChange={this.handleChange}
                                        value={this.state.espacio_fisico}
                                        required/>
                                </FormGroup>
                              
                                <FormGroup>
                                    <Label for="Observaciones">Observaciones</Label>
                                    <Input 
                                        type="textarea"
                                        name="observaciones"
                                        id="observaciones"
                                        onChange={this.handleChange}
                                        value={this.state.observaciones}                                        
                                        required/>
                                </FormGroup>

                                <Col md="12" className="text-right">
                                    { this.state.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">Actualizar</Button>}
                                </Col>

                            </Form>
                        </ModalBody>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }
}

export default ModalUpdateBien;