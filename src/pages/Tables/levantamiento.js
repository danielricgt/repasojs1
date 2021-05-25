import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody} from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { levantamientoColumns } from './columnsData'
// import { update_bien } from './../../helpers/fetch'
import { AvForm, AvField } from 'availity-reactstrap-validation';

class LevantamientoTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BienesData: props.Bienes,
            Bienes: [],

            confirm: false,
            modal: false,
            loading: false,

            estadoBien: '',
            contratista: '',
            verificacion: '',
            observaciones: '',

        }
        this.openModal = this.openModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    handleChange (e, bien) {
        const { Bienes } = this.props;
        const index = Bienes.findIndex(item => item.id === bien.id)
        const name = e.target.name
        Bienes[index][`${name}`] = e.target.value
        this.props.callback(Bienes);
    }

    openModal(data) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            data
        }));
    }


    render() {
        const { Bienes } = this.props;
        const errorMessage = 'Campo requerido'
        
        let columns = levantamientoColumns
        let rows = []

        const estadoOptions = [
            {
                id: 1,
                estado: 'En buen estado'
            },
            {
                id: 2,
                estado: 'Deteriorado'
            },
            {
                id: 3,
                estado: 'Obsoleto',
            },
            {
                id: 4,
                estado: 'Perdido'
            }
        ]

        const verificacionOptions = [
            {
                id: 1,
                verificacion: 'Verificado'
            },
            {
                id: 2,
                verificacion: 'Con Observaciones'
            },
            {
                id: 3,
                verificacion: 'Rechazado',
            }
        ]

        Bienes.forEach(data => {
            if(data.usuario) {
                rows.push({
                    placa: data.placa ? data.placa : '-',
                    sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                    espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                    dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                    marca_serie: data.marca_serie,
                    descripcion: data.descripcion,
                    estado: 
                    <AvForm className="form" >
                        <AvField name="estadoBien" id={'estadoBien'+data.id} type='select' onChange={e => this.handleChange(e, data)} 
                        value={this.state.estadoBien}
                        validate={{
                            required: { value: true, errorMessage: 'Campo requerido' }
                        }}>
                            <option disabled value="">Seleccione un estado</option>
                            {
                                estadoOptions.map(({ id, estado }) =>
                                <option value={estado} key={id}>{estado}</option>
                            )}
                        </AvField>
                    </AvForm>,
                    contratista: 
                    <AvForm className="form">
                        <AvField id={'contratista'+data.id} placeholder="Ingrese el contratista" name="contratista" 
                        type="text" onChange={e => this.handleChange(e, data)} value={this.state.contratista} validate={{
                            required: { value: true, errorMessage: errorMessage }
                        }} />
                    </AvForm>,
                    verificacion: 
                    <AvForm className="form" >
                        <AvField name="verificacion" id={'verificacion'+data.id} type='select' 
                        value={this.state.verificacion} onChange={e => this.handleChange(e, data)}
                        validate={{
                            required: { value: true, errorMessage: 'Campo requerido' }
                        }}>
                            <option disabled value="">Seleccione una opci&oacute;n</option>
                            {
                                verificacionOptions.map(({ id, verificacion }) =>
                                <option value={verificacion} key={id}>{verificacion}</option>
                            )}
                        </AvField>
                    </AvForm>,
                    observaciones: 
                    <AvForm className="form">
                        <AvField id={'observaciones'+data.id} placeholder="Ingreselas observaciones" name="observaciones" 
                        type="text" value={this.state.observaciones} onChange={e => this.handleChange(e, data)} validate={{
                            required: { value: true, errorMessage: errorMessage }
                        }} />
                    </AvForm>,
                })
            }
        })

        const data = {
            columns,
            rows,
        }

        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <MDBDataTableV5
                                        responsive
                                        bordered
                                        searching={false}
                                        fullPagination={true}
                                        infoLabel={['', '-', 'de', '']}
                                        data={data}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </Container>
            </React.Fragment>
        );
    }
}

export default LevantamientoTable;