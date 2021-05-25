import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import TransaccionesTable from './../Tables/transaccionesTable';
import { getTransactions } from './../../helpers/fetch';
// import { GET_BIENES } from './../../graphql/queries'

class Transacciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Transactions: [],
            Depedendencias: null,
            loading: true,
            user: getLoggedInUser(),
        };
    }

    async componentDidMount() {
        const idSede = Number(this.state.user.dependencia.sede.id)
        const { loading, error, data } = await getTransactions({idSede})
        if(loading) {
            console.log('cargando');
        }
        if(error) {
            alert('Error')
        }
        this.setState({ Transactions: data.transacciones, loading: false, })
    }

    render() {
        const { Transactions, loading, user } = this.state;
        const idRol = Number(user.auth.rol.id)

        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">TRANSACCIONES</h3>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        {loading ?
                            <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                            <TransaccionesTable idRol={idRol} Transactions={Transactions} ></TransaccionesTable>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Transacciones));