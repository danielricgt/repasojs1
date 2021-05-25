import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Spinner, Modal, ModalFooter } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBienes, updateBienState } from '../../helpers/fetch'
import { createProcess } from './../../helpers/httpRequest'
import { getLoggedInUser } from '../../helpers/authUtils'
import BajaBienTable from '../Tables/bajaBienTable';


class BajaBien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: getLoggedInUser(),
            Bienes: []
        };

        this.submitBajaBien = this.submitBajaBien.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.getBienesCheck = this.getBienesCheck.bind(this)
    }

    async componentDidMount() {
        const { user } = this.state
        try {
            const idRol = Number(user.auth.rol.id)
            const idSede = Number(this.state.user.dependencia.sede.id)
            let res 
            if(idRol === 4) 
                res = await getBienes({idSede, fk_usuario: user.id }, 7)
            else 
                res = await getBienes({idSede }, 2)
            
            const result = res
            if(result.data.bien.length === 0) {
                alert('No hay bienes para realizar un alta de bien')
                this.props.history.push('/')
            }
            else
                this.setState({ Bienes: result.data.bien, loading: true})
        } catch (error) {
            alert('Error en el servidor')
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
        await this.setState({ modal: true})
    }

    async submitBajaBien() {
        const { BienesSelected, user } = this.state;
        try {
            const BienesId = []
            const cambios = []
            BienesSelected.map( async item => {
                BienesId.push(item.id)
                cambios.push({ id: item.id, fk_estado: 2})
                await updateBienState({ id: item.id})
            })
            const data = {
                descripcion: "Dar de baja",
                razon: "Usuario pidio realizar la baja del bien",
                contratista: "contratista",
                bienes: BienesId,
                fk_usuario: user.id,
                cambios: {
                    bienes: cambios
                },
                fk_tipo_solicitud: 1
            }
            await createProcess(data)
            this.setState({ modal: false })
            alert('Proceso de baja de bien creado correcto')
            this.props.history.push('/');
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    render() {
        const { user, loading, Bienes } = this.state;
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">BAJA DE BIEN</h4>
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
                                            <p><span style={{ fontWeight: 'bold' }}>Cargo: </span> {user.cargos[0].cargo}</p>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    {   !loading ?
                                        <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                                        <BajaBienTable Bienes={Bienes} callback={this.getBienesCheck}></BajaBienTable>
                                    } 
                                    {
                                        !loading ? '' :
                                            Bienes.length === 0 ? '' :
                                                <Row className="form-group m-t-20">
                                                    <Col md="12" className="text-right">
                                                        { !loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                            <Button color="primary" className="w-md waves-effect waves-light" onClick={this.handleSubmitForm}>Dar baja de bien</Button>}
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
                            <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.submitBajaBien}>Confimar</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(BajaBien));