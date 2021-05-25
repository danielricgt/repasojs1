import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalFooter } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { getLoggedInUser } from '../../helpers/authUtils'
import { create_comprobante_bien } from './../../helpers/fetch'
import { createProcess } from './../../helpers/httpRequest'

class ComprobanteEntrada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modal: false,
            formValues: null,
            event: null,
            user: getLoggedInUser(),
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    async handleSubmitForm(event, values) {
        await this.setState({ values, event, modal: true})
    }


    async handleSubmit() {
        let { values, user } = this.state
        values.subtotal = Number(values.subtotal)
        values.numero = Number(values.numero)
        values.unidad = parseInt(values.unidad)
        values.cantidad = parseInt(values.cantidad)
        values.valor_unitario = Number(values.valor_unitario)
        values.porcentaje_iva = Number(values.porcentaje_iva)
        values.total_iva = Number(values.total_iva)
        values.total_cantidad_entrada = Number(values.total_cantidad_entrada)
        values.subtotal_grupo = Number(values.subtotal_grupo)
        values.total_entrada = Number(values.total_entrada)
        values.total_cantidad = Number(values.total_cantidad)

        try {
            this.setState({ loading: true, modal: false})
            const result = await create_comprobante_bien(values)
            const id = result.data.insert_bien.returning[0].comprobante.id
            const idBien = result.data.insert_bien.returning[0].id
            const data = {
                descripcion: "Ingreso bien Entrada",
                razon: "Usuario solicitó un ingreso de bien entrada",
                contratista: 'contratista',
                bienes: [idBien],
                fk_usuario: user.id,
                cambios: {
                    bienes: [{id:idBien, fk_estado: 1}]
                },
                fk_tipo_solicitud: 3,
            }
            await createProcess(data)
            alert(`Comprobante creado: Numero de comprobante ${id}`)
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
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const date = new Date();

        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">INGRESO DE BIEN - COMPROBANTE DE ENTRADA</h3>
                            </Col>
                        </Row>                        
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody className="form-comprobante">
                                {/* <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}> */}
                                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmitForm} ref={c => (this.form = c)}>   
                                    <Row>
                                        <Col sm='4'>
                                                <p><span style={{ fontWeight: 'bold'}}>Fecha:</span>
                                                {
                                                    ' '+date.getDate() + ' de '+ monthNames[date.getMonth()]+ ' de ' +date.getFullYear()
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>   
                                        <Col sm='6'>
                                            <AvField label="Clase entrada" placeholder="Ingrese la clase de entrada" name="clase_entrada" type="text" grid={{ xs: 8}} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="N&uacute;mero" placeholder="Ingrese el n&uacute;mero" name="numero" type="text" grid={{ xs: 8}} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col sm='6'>  
                                            <AvField label="Tipo contrato" placeholder="Ingrese el tipo de contrato" name="tipo_contrato" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Factura" placeholder="Ingrese la factura" name="factura" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Proveedor" placeholder="Ingrese el proveedor" name="proveedor" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Observaciones" placeholder="Ingrese las observaciones" name="observaciones" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <br></br>
                                    <Row>
                               
                                        <Col sm='6'>
                                            <AvField label="Grupo" placeholder="Ingrese el grupo" name="grupo" type="text" grid={{ xs: 9 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Descripci&oacute;n" placeholder="Ingrese la descripci&oacute;n" name="descripcion_comprobante" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row> 
                                        <Col sm='4'>
                                            <AvField label="Unidad" placeholder="Ingrese la unidad" name="unidad" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="Cantidad" placeholder="Ingrese la cantidad" name="cantidad" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                     
                                        <Col sm='4'>
                                            <AvField label="Valor Unitario" placeholder="Ingrese el valor unitario" name="valor_unitario" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='4'>
                                            <AvField label="Subtotal" placeholder="Ingrese el subtotal" name="subtotal" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="% IVA" placeholder="Ingrese la %IVA" name="porcentaje_iva" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9,.]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="Total IVA" placeholder="Ingrese el total IVA" name="total_iva" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9,.]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col> 
                                    
                                    </Row>
                                    <br></br>  
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Total Cantidad" value={1} disabled={true} placeholder="Ingrese el total de la cantidad" name="total_cantidad" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col> 
                                        <Col sm='6'>
                                            <AvField label="Subtotal Grupo" placeholder="Ingrese el subtotal del grupo" name="subtotal_grupo" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>   
                                    </Row>
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Total Cantidad ENTRADA" placeholder="" value={1} name="total_cantidad_entrada" type="text" grid={{ xs: 8 }} disabled={true} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Total ENTRADA" placeholder="Ingrese el total ENTRADA" name="total_entrada" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>

                                        <Row className="form-group m-t-20">
                                            <Col md="12" className="text-right">
                                                {this.state.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                    <Button color="primary" className="w-md waves-effect waves-light" type="submit">Generar comprobante</Button>}
                                            </Col>
                                        </Row>
                                    </AvForm>
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

export default withRouter(connect(null, { activateAuthLayout })(ComprobanteEntrada));

