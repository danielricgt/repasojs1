import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalFooter } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { transaccionesColumns } from './columnsData'
import SweetAlert from 'react-bootstrap-sweetalert';

class TransaccionesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BienesData: props.Bienes,
            Bienes: [],

            confirm: false,
            modal: false,
            loading: false,

            descripcion: '',
            espacio_fisico: '',
            observaciones: '',
            idBien: '',
            idEstado: '',
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }


    openModal(data, option) {
        console.log(data);
        if(option === 1) {
            this.setState({
                tx_id: data,
                modal: true
            });
        }
        else {
            this.setState({
                link: data,
                modal: true
            });
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            link: null,
            tx_id: null
        }));
    }


    render() {
        const { Transactions  } = this.props;
        const { tx_id, link } = this.state
        let columns = transaccionesColumns
        let rows = []

        // if (idRol === 4) {
        //     columns = columns.slice(0, columns.length - 2)
        // }   

        Transactions.forEach(data => {
            rows.push({
                idBlockchain: !data.tx_id ? 'No se logró sincronizar con la blockchain' :
                    <Button type="button" color="primary" className="waves-effect waves-light" 
                        onClick={() => this.openModal(data.tx_id, 1)}>
                        Ver
                    </Button>,
                fecha: data.fecha ? data.fecha : '-',
                id: data.fk_usuario ? data.fk_usuario : '-',
                procedimiento: data.proceso.notificaciones[0].tipo_solicitud.solicitud ? data.proceso.notificaciones[0].tipo_solicitud.solicitud : '-',
                documentoIPFS:
                    <Button type="button" color="info" className="waves-effect waves-light" 
                        onClick={() => this.openModal(data.ipfs_link, 2)}>
                        LINK
                    </Button>,
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
                                    {this.state.confirm ?
                                        <SweetAlert success title="" onConfirm={this.closeAlert()} >
                                            Actualización correcta
                                    </SweetAlert> : <p></p>}
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

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <div className="modal-header">
                            {/* <h5 className="modal-title mt-0" id="confirmacion">{tx_id ? tx_id : <a href={link}>link</a> }</h5> */}
                            <h6 className="modal-title mt-0" id="confirmacion">
                            {
                                tx_id ? tx_id : 
                                link ?
                                <a href={`${link}`} target="_blank">{link} </a> : 'Link no disponible'
                            }
                            </h6>
                            <button type="button" onClick={() => this.setState({ modal: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={ () => this.setState({ modal: false})} className="waves-effect">Close</Button>
                            {/* <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.changeStateBien}>Confimar</Button> */}
                        </ModalFooter>
                    </Modal>

                </Container>
            </React.Fragment>
        );
    }
}

export default TransaccionesTable;