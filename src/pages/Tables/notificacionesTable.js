import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { notificacionesColumns } from './columnsData'

class NotificacionesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }

        this.submitAprobar = this.submitAprobar.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    // 1 baja de bien
    // 2 levantemiento
    // 3 Ingreso de bien Entrada
    // 4 Ingreso de bien Salida
    // 5 Traslado de bienes individual
    // 6 Traslado de bienes dependencia
    submitAprobar(tipoSolicitud, bien, proceso) {
        const { props } = this.props
        switch (tipoSolicitud) {
            case 1:
                props.history.push('/aprobacion-baja-bien', { bien, proceso })
                break;
            
            case 2:
                props.history.push('/aprobacion-levantamiento', { bien, proceso })
                break;
            
            case 3:
                props.history.push('/aprobacion-ingreso-entrada', { bien, proceso })
                break;    
            
            case 4:
                props.history.push('/aprobacion-ingreso-salida', { bien, proceso })
                break;
            
            case 5:
                props.history.push('/aprobacion-traslado-individual', { bien, proceso })
                break;
            
            case 6:
                props.history.push('/aprobacion-traslado-dependencia', { bien, proceso })
                break;   

            default:
                break;
        }
    }

    render() {
        const { Notificaciones, idRol } = this.props;
        let columns = notificacionesColumns
        let rows = []

        Notificaciones.forEach( data => {
            if(idRol === 4 || idRol === 1) {
                rows.push({
                    idProceso: data.proceso.id ? data.proceso.id : '',
                    user_start: data.usuario_origen.nombres+' '+data.usuario_origen.apellidos,
                    user_end: data.usuario_destino.nombres+' '+data.usuario_destino.apellidos,
                    solicitud: data.tipo_solicitud.solicitud,
                    // action: 
                    //     <Button type="button" color="primary" className="waves-effect waves-light" 
                    //         onClick={() => this.submitAprobar(data.tipo_solicitud.id, data.proceso.bienes, data.proceso)}>
                    //         Aprobar
                    //     </Button>  
                })
            }
            else {
                rows.push({
                    idProceso: data.proceso.id ? data.proceso.id : '',
                    user_start: data.usuario_origen.nombres+' '+data.usuario_origen.apellidos,
                    user_end: data.usuario_destino.nombres+' '+data.usuario_destino.apellidos,
                    solicitud: data.tipo_solicitud.solicitud,
                    action: 
                        <Button type="button" color="primary" className="waves-effect waves-light" 
                            onClick={() => this.submitAprobar(data.tipo_solicitud.id, data.proceso.bienes, data.proceso)}>
                            Aprobar
                        </Button>  
                })
            }
        });

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
                                        searching={true}
                                        fullPagination={true}
                                        infoLabel={['', '-', 'de', '']}
                                        data={data}
                                        searchTop
                                        searchBottom={false}
                                        noRecordsFoundLabel={'No se encontraron resultados'}
                                        paginationLabel={['Resutlados', 'Por', 'pagina']}
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

export default NotificacionesTable;