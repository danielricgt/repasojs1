import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, FormGroup, Button, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import BienesTable from './../Tables/Bienes';
import { getBienes, getDependencias } from './../../helpers/fetch'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bienes: null,
            Dependencias: [],
            loading: true,
            user: getLoggedInUser(),
            updated: false,
            idDependencia: '',
        };

        this.fetchData = this.fetchData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchDependencias = this.fetchDependencias.bind(this)
    }

    componentDidMount() {
        const { user } = this.state
        const idSede = Number(user.dependencia.sede.id)
        const idRol = Number(user.auth.rol.id)
        this.fetchData(idSede, idRol, user.id)
        this.fetchDependencias()
    }

    async fetchData(idSede, idRol, id){
        try {
            let option
            let result 
            if( idRol === 1 || idRol === 2) {
                option = 1
                result = await getBienes({idSede}, option)
                this.setState({ Bienes: result.data.bien, loading: false })
            }
            // if(idRol === 3) {
            //     option = 5
            //     result = await getBienes({idSede}, option)
            //     this.setState({ Bienes: result.data.bien, loading: false })
            // }
            else {
                option = 5
                result = await getBienes({idSede, fk_usuario: id}, option)
            }
            if(result.data.bien.length === 0) {
                alert('No hay bienes asignados en la dependencia')
            }
            this.setState({ Bienes: result.data.bien, loading: false })
        } catch (error) {
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
        let filteredBienes = []

        Bienes.forEach(data => {
            console.log(data)
            if(data.usuario) {
                if(Number(data.usuario.dependencia.id) === Number(values.dependencia) ) {
                    filteredBienes.push(data)
                }
            }
        })

        if(filteredBienes.length === 0) 
            alert('No hay elementos asociados a esta dependencia')
        else
            this.setState({ Bienes: filteredBienes})
    }


    render() {
        const { Bienes, loading, user, Dependencias } = this.state;
        const idSede = Number(user.dependencia.sede.id)
        const idRol = Number(user.auth.rol.id)
        
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <Breadcrumb>
                                    <BreadcrumbItem active>Bienvenido al UD Dashboard {user.nombres}</BreadcrumbItem>
                                </Breadcrumb>
                                <h3 className="page-welcome-title">BIENVENIDO {user.nombres.toUpperCase()}</h3>
                                <h4 className="page-title">CONSULTA DE INVENTARIOS</h4>

                            </Col>
                        </Row>
                    </div>
                    { 
                        idRol === 3 ? '' :
                        idRol === 4 ? 
                        <div>
                            <Row>
                                <h5 className="page-title">Dependencia del funcionario</h5>
                            </Row> 
                            <br></br>
                            <AvForm className="form" onValidSubmit={this.handleSubmit} >
                                <FormGroup style={{ marginBottom: '15px' }}>
                                <Row>
                                    <Col sm="6">
                                        <AvField label="Dependencia" name="dependencia" type='select' disabled={true} value={user.dependencia.id} grid={{ xs: 8 }} validate={{
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
                                </Row>    
                                </FormGroup>
                            </AvForm>
                        </div>
                        :
                        <div>
                            <Row>
                                <h5 className="page-title">Busqueda por dependencia</h5>
                            </Row> 
                            <br></br>
                            <AvForm className="form" onValidSubmit={this.handleSubmit} >
                                <FormGroup style={{ marginBottom: '15px' }}>
                                <Row>
                                    <Col sm="6">
                                        <AvField label="Dependencia" name="dependencia" type='select' value={this.state.idDependencia} grid={{ xs: 8 }} validate={{
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
                                        <Button className="btn btn-primary" style={{ marginLeft: '8px' }} type="submit">Filtrar</Button>
                                    </Col>
                                </Row>    
                                </FormGroup>
                            </AvForm>
                        </div>
                    }
                    {
                        idRol === 3 ? 
                        <div className="page-title-box">
                            <Row className="align-items-center">
                                <Col sm="12">
                                <Row>
                                    <Col sm='2'>
                                        <p><span style={{ fontWeight: 'bold' }}>Dependencia: </span> {user.id}</p>
                                    </Col>
                                    <Col sm='2'>
                                        <p><span style={{ fontWeight: 'bold' }}>Identificaci&oacute;n: </span> {user.id} </p>
                                    </Col>
                                    <Col sm='2'>
                                        <p><span style={{ fontWeight: 'bold' }}>Nombre: </span>{user.nombres} {user.apellidos}</p>
                                    </Col>
                                    <Col sm='2'>
                                        <p><span style={{ fontWeight: 'bold' }}>Correo: </span> {user.email}</p>
                                    </Col>
                                    <Col sm='2'>
                                        <p><span style={{ fontWeight: 'bold' }}>Cargo: </span> {user.cargos[0].cargo}</p>
                                    </Col>
                                </Row>
                                </Col>
                                <Col sm="12">
                                    <h5 className="page-title">Bienes asignados a la Dependencia {user.dependencia.dependencia}</h5>
                                </Col>

                            </Row>
                        </div>
                        : ''
                    }
                    <Row>
                        {loading ?
                            <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                            <BienesTable idRol={idRol} Bienes={Bienes} update={async() => await this.fetchData(idSede)}></BienesTable>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Dashboard));