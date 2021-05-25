import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Button, Card, CardBody } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getLoggedInUser } from './../../helpers/authUtils'
import { getCargos } from './../../helpers/utils'
import LevantamientoTable from './../Tables/levantamiento';
import { getBienes, getDependencias } from './../../helpers/fetch';
import { createProcess } from './../../helpers/httpRequest'

class Levantamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bienes: [],
            Dependencias: [],
            show: false,
            user: getLoggedInUser(),
            BienesSelected: []
        };
        this.fetchDependencias = this.fetchDependencias.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBienes = this.handleBienes.bind(this)
    }

    async componentDidMount() {
        this.fetchDependencias()
        const idSede = Number(this.state.user.dependencia.sede.id)
        try {
            const result = await getBienes({idSede, fk_usuario: Number(this.state.user.id)}, 4)
            this.setState({ Bienes: result.data.bien, loading: false })
        } catch (error) {
            console.log(error);
            alert('Error en el servidor')
        }
    }

    async fetchDependencias() {
        const result = await getDependencias()
        if (result.data) {
            this.setState({ Dependencias: result.data.dependencia })
        }
    }

    handleSubmit(event, values) {
        let { Bienes } = this.state
        
        let filteredBienes = Bienes.filter(
            item => Number(item.usuario.dependencia.id) === Number(values.dependencia)
        )

        if (filteredBienes.length === 0) {
            alert('No hay elementos asociados a esta dependencia')
            return;
        }
        else
            this.setState({ Bienes: filteredBienes, show: true })
    }

    async handleBienes(data) {
        this.setState({ BienesSelected: data })
    }

    async submitLevantamiento() {
        const { BienesSelected, user } = this.state
        let BienesId = []
        let cambios = []
        BienesSelected.map(async item => {
            BienesId.push(item.id)
            cambios.push({
                id: item.id,
                fk_usuario: user.id,
                fk_estado: 1,
                estado_bien: item.estadoBien ? item.estadoBien : 'En buen estado',
                verificacion: item.verificacion ? item.verificacion : 'Verificado'
            })
        })
        const data = {
            descripcion: "Levantamiento de bienes",
            razon: "Usuario pidio realizar un levantamiento de bienes",
            contratista: "contratista",
            bienes: BienesId,
            fk_usuario: user.id,
            cambios: {
                bienes: cambios
            },
            fk_tipo_solicitud: 2
        }
        try {
            await createProcess(data)
            alert('Levantamiento realizado correctamente')
            this.props.history.push('/')
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    render() {
        const { Bienes, show, user, Dependencias } = this.state;
        const idRol = Number(user.auth.rol.id)
        const idDependencia = Number(user.dependencia.id)
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">LEVANTAMIENTO</h3>
                            </Col>
                        </Row>
                    </div>
                    <Card>
                        <CardBody className="form-comprobante">
                            <div>
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
                                    <h5 className="page-title">Busqueda por dependencia</h5>
                                </Row>
                                <br></br>
                                <AvForm className="form" onValidSubmit={this.handleSubmit} >
                                    <FormGroup style={{ marginBottom: '15px' }}>
                                        <Row>
                                            <Col sm="6">
                                                <AvField label="Dependencia" value={idDependencia} name="dependencia" type='select' grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: 'Campo requerido' }
                                                }}>
                                                    <option disabled value="">Seleccione una dependencia</option>
                                                    {Dependencias.length === 0 ?
                                                        <option></option>
                                                        :
                                                        Dependencias.map(({ id, dependencia }) =>
                                                            <option value={id} key={id}>{dependencia}</option>
                                                        )}
                                                </AvField>
                                            </Col>
                                            <Col sm="6">
                                                <Button className="btn btn-primary" style={{ marginLeft: '8px' }} type="submit">Buscar</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </AvForm>
                            </div>
                            <hr></hr>
                            <Row>
                                {
                                    !show ? '' :
                                        <div>
                                            <LevantamientoTable idRol={idRol} Bienes={Bienes} callback={this.handleBienes}></LevantamientoTable>
                                            <Row className="form-group m-t-20">
                                                <Col md="12" className="text-right">
                                                    <Button color="primary" className="w-md waves-effect waves-light" onClick={this.submitLevantamiento.bind(this)}>Realizar Traslado</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Levantamiento));