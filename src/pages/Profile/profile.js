import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import { getSedesDependencias } from './../../helpers/fetch'
import ChangePassword from './../UIElements/changePwd'
import DisableUser from './../UIElements/disableUser'
import AddSede from './../UIElements/addSede'
import AddDependencia from './../UIElements/addDependencia'
import ChangeRol from './../UIElements/changeRol'
import EditProfile from './../UIElements/editPerfil'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser(),
            modalUpdate: false,
            show: false, 
            sedes: [],
            dependencias: []
        };
        this.fetchSedes = this.fetchSedes.bind(this)
    }

    async componentDidMount() {
        this.props.activateAuthLayout();
        const { user } = this.state;
        const length = Number(user.cargos.length)
        await this.fetchSedes(user.dependencia.sede.id);
        if (length === 2)
            await this.setState({ cargo1: user.cargos[1].cargo, showCargo1: true })
        if (length === 3)
            await this.setState({
                cargo1: user.cargos[1].cargo, showCargo1: true,
                cargo2: user.cargos[2].cargo, showCargo2: true
            })
    }

    async fetchSedes(idDependencia) {
        const res = await getSedesDependencias()
        this.setState({ sedes: res.data.sede })
        this.setState({ dependencias: res.data.sede.find(sede => sede.id === Number(idDependencia)).dependencia })
    }

    render() {
        const { user, sedes, dependencias } = this.state
        const idRol = Number(this.state.user.auth.rol.id)
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">CONFIGURACI&Oacute;N ALMACENISTA</h4>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xl="12" md="12">
                            <Card className="directory-card">
                                <CardBody>
                                    {
                                        idRol === 1 ?
                                        <div>
                                            {
                                                dependencias.length === 0 ? ''
                                                :
                                                <div>
                                                    <EditProfile user={user} sedes={sedes} dependencias={dependencias} idRol={idRol}></EditProfile>
                                                    <hr></hr>
                                                </div>
                                            }
                                            <AddSede user={user}></AddSede>
                                            <hr></hr>
                                            <AddDependencia user={user} sedes={sedes}></AddDependencia>
                                            <hr></hr>
                                            <DisableUser user={user}></DisableUser>
                                            <hr></hr>
                                            <ChangePassword user={user}></ChangePassword>
                                        </div>
                                        : 
                                        idRol === 2 ?
                                        <div>
                                            {
                                                dependencias.length === 0 ? ''
                                                :
                                                <div>
                                                    <EditProfile user={user} sedes={sedes} dependencias={dependencias} idRol={idRol}></EditProfile>
                                                    <hr></hr>
                                                </div>
                                            }
                                            <AddSede user={user}></AddSede>
                                            <hr></hr>
                                            <AddDependencia user={user} sedes={sedes}></AddDependencia>
                                            <hr></hr>
                                            <ChangeRol user={user}></ChangeRol>
                                            <hr></hr>
                                            <DisableUser user={user}></DisableUser>
                                            <hr></hr>
                                            <ChangePassword user={user}></ChangePassword>
                                        </div>
                                        :
                                        idRol === 3 ? 
                                        <div>
                                            {
                                                dependencias.length === 0 ? ''
                                                :
                                                <div>
                                                    <EditProfile user={user} sedes={sedes} dependencias={dependencias} idRol={idRol}></EditProfile>
                                                    <hr></hr>
                                                </div>
                                            }
                                            <ChangePassword user={user}></ChangePassword>
                                        </div>
                                        :
                                        <div>
                                            {
                                                dependencias.length === 0 ? ''
                                                :
                                                <div>
                                                    <EditProfile user={user} sedes={sedes} dependencias={dependencias} idRol={idRol}></EditProfile>
                                                    <hr></hr>
                                                </div>
                                            }
                                            <ChangePassword user={user}></ChangePassword>
                                        </div>                                        
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Profile));