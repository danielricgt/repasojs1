import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { bajaBienColumns } from './columnsData'

class BajaBienTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BienesSelected: [],
            modal: false,
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    handleChange(e, bien) {
        const { BienesSelected } = this.state
        let isChecked = e.target.checked;
        if (BienesSelected.length === 0) {
            BienesSelected.push(bien)
        }
        else {
            let index = BienesSelected.findIndex(item =>
                item.id === bien.id
            )
            if (isChecked) {
                if (index === -1) {
                    BienesSelected.push(bien)
                }
            }
            else {
                BienesSelected.splice(index, 1)
            }
        }
        this.setState({ BienesSelected })
        this.props.callback(BienesSelected);
    }


    render() {
        const { Bienes } = this.props;
        let columns = bajaBienColumns
        let rows = []

        Bienes.forEach(data => {
            if(data.usuario) {
                rows.push({
                    check: <Input type="checkbox" id="checkbox2" onChange={e => this.handleChange(e, data)} />,
                    placa: data.placa ? data.placa : '-',
                    descripcion: data.descripcion ? data.descripcion : '-',
                    sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                    espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                    dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                    observaciones: data.observaciones ? data.observaciones : 'Ninguna',
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

export default BajaBienTable;