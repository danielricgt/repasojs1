import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { aprobacionBajaBienColumns } from './columnsData'

class AprobacionesBajaTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Bienes: [],
        }
    }

    render() {
        const { Bienes } = this.props;
        let columns = aprobacionBajaBienColumns
        let rows = [] 

        Bienes.forEach(data => {
            rows.push({
                placa: data.placa ? data.placa : '-',
                descripcion: data.descripcion ? data.descripcion : '-',
                sede: data.dependencia ? data.dependencia.sede.sede : '-',
                espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                dependencia: data.dependencia ? data.dependencia.dependencia : '-',
                observaciones: data.observaciones ? data.observaciones : 'Ninguna',
            })
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

export default AprobacionesBajaTable;