import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { trasladoColumns } from './columnsData'
import { update_bien } from '../../helpers/fetch'

class TrasladoDependenciaTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BienesSelected: [],

            confirm: false,
            modal: false,
            loading: false,

            descripcion: '',
            espacio_fisico: '',
            observaciones: '',
            idBien: '',
            idEstado: '',

            selectedBienes: [],
            allCheck: false,
        }
        this.changeStateBien = this.changeStateBien.bind(this)
        this.openModal = this.openModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.handleSelectAll = this.handleSelectAll.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    changeStateBien = async (data, idRol, bien) => {
        if (idRol === 1) data.fk_estado = 7
        data.descripcion = bien.descripcion
        data.espacio_fisico = bien.espacio_fisico
        data.observaciones = bien.observaciones
        try {
            await update_bien(data)
            this.updateTable(data)
            alert('Actualización exitosa')
        } catch {
            alert('Error en el servidor')
        }
    }

    openModal(data) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            data
        }));
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
        let columns = trasladoColumns
        let rows = []

        Bienes.forEach(data => {
            if (data.usuario) {
                if(this.props.check) {
                    rows.push({
                        check: <Input type="checkbox" id="checkbox2" onChange={e => this.handleChange(e, data)} />,
                        placa: data.placa ? data.placa : '-',
                        descripcion: data.descripcion ? data.descripcion : '-',
                        sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                        espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                        dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                        observaciones: data.observaciones ? data.observaciones : 'Ninguna',
                        id: data.usuario.id,
                    })
                }
                else {
                    rows.push({
                        placa: data.placa ? data.placa : '-',
                        descripcion: data.descripcion ? data.descripcion : '-',
                        sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                        espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                        dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                        observaciones: data.observaciones ? data.observaciones : 'Ninguna',
                        id: data.usuario.id,
                    })
                }
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

export default TrasladoDependenciaTable;