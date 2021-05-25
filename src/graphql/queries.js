import { gql } from '@apollo/client';

export const GET_SEDE_DEPENDENCIES = gql`
    query getSedeAndDepdendencies {
        sede(order_by: {id: asc}) {
            sede
            id
            dependencia {
                dependencia
                id
            }
        }
    }
`;

export const LOGIN_USER = gql`
    query loginUsuario($correo: String!, $password: String!) {
        usuario(where: { correo: { _eq: $correo }, _and: { auth: { password: { _eq: $password } } } }) {
            id
            nombres
            apellidos
            correo
            verificado
            estado {
                estado
                id
            }
            cargos {
                cargo
                id
            }
            auth {
                rol {
                    rol
                    id
                }
            }
            dependencia {
                dependencia
                id
                sede {
                    sede
                    id
                }
            }
        }
    }
`

export const GET_BIENES = option => {
    let filters = ''
    let where = ''
    switch (option) {
        // Dashboard
        case 1:
            where = `, where: {_and: [{fk_estado: {_in: [1, 2]}} ]}`
            break;
        // Baja de bien
        case 2:
            where = `, where: {_and: [{fk_estado: {_in: [1]}} ]}`
            break;
        // alta de bien
        case 3:
            where = `, where: {_and: [{fk_estado: {_in: [2]}} ]}`
            break;
        // levantamiento
        case 4:
            // filters = `, $fk_usuario: Int!`
            where   = `, where: {_and: [{fk_estado: {_in: [1]}}, {fk_usuario: {_is_null: false}} ]}`
            break;
        // Dashboard bienes director
        case 5:
            filters = `, $fk_usuario: Int!`
            where = `, where: {_and: [{fk_estado: {_in: [1, 2]}}, {fk_usuario: {_eq: $fk_usuario}}]}`
            break;
        // Alta de bien funcionario
        case 6:
            filters = `, $fk_usuario: Int!`
            where = `, where: {_and: [{fk_estado: {_in: [2]}}, {fk_usuario: {_eq: $fk_usuario}}]}`
            break;
        // Baja de bien funcionario
        case 7:
            filters = `, $fk_usuario: Int!`
            where = `, where: {_and: [{fk_estado: {_in: [1]}}, {fk_usuario: {_eq: $fk_usuario}}]}`
            break;

        default:
            break;
    }

    return gql`
        query getBienes($idSede: Int!${filters}) {
            bien(order_by: {fecha_creacion: desc}${where}) {
                placa
                descripcion
                usuario {
                    nombres
                    apellidos
                    id
                    dependencia {
                    dependencia
                    id
                    sede {
                        sede
                        id
                    }
                    }
                }
                espacio_fisico
                observaciones
                id
                nombre
                marca_serie
                estado {
                    estado
                    id
                }
                comprobante {
                    proveedor
                }
            }
            dependencia(where: {fk_sede: {_eq: $idSede}}) {
                id
                dependencia
                fk_sede
            }
        }
    `
}

export const GET_BIEN_BY_COMPROBANTE = gql`
    query getBienIdByIdComprobante($idComprobante: Int!) {
        bien(where: { comprobante: { id: { _eq: $idComprobante } } }) {
            id
            contratista
            fk_estado
        }
    }
`

export const GET_USUARIO_BY_ID = gql`
    query getUsuarioById($id: Int!) {
        usuario(where: { id: { _eq: $id } }) {
            nombres
            apellidos
            id
            correo
            dependencia {
                dependencia
                id
                sede {
                    sede
                    id
                }
            }
            cargos {
                cargo
                id
            }
            auth {
                rol {
                    rol
                    id
                }
            }
        }
    }
`

export const GET_BIEN_COMPROBANTE_BY_ID = gql`
    query getBienComprobanteByIdBien($id: Int!) {
        bien(where: { id: { _eq: $id } }) {
            id
            contratista
            fk_estado
            comprobante {
                cantidad
                clase_entrada
                descripcion_comprobante
                factura
                fecha_creacion
                fk_estado
                grupo
                id
                numero
                observaciones
                porcentaje_iva
                proveedor
                subtotal
                subtotal_grupo
                tipo_contrato
                total
                total_cantidad
                total_cantidad_entrada
                total_entrada
                total_iva
                unidad
                valor_unitario
            }
        }
    }
`

export const GET_USER_ENCARGADO_DEPENDENCIA = gql`
    query getEncargadoDepenedencia($idUsuario: Int!) {
        encargado_dependencia(where: { fk_usuario: { _eq: $idUsuario } }) {
            usuario {
                id
                nombres
                apellidos
                correo
                cargos {
                    cargo
                    fk_usuario
                }
            }
            dependencia {
                dependencia
                id
            }
        }
    }
`

export const GET_BIENES_DEPENDENCIA = rol => {
    // let where = ''
    // let variables = ''
    if (rol === 4) {
        return gql
        `query getBienes($idSede: Int!, $idDependencia: Int!, $fk_usuario : Int) {
            bien(order_by: { fecha_creacion: desc }, where: { _and: [{ fk_usuario: { _eq: $fk_usuario} }, { dependencia: { id: { _eq: $idDependencia } } }] }) {
                placa
                descripcion
                usuario {
                    nombres
                    apellidos
                    id
                    dependencia {
                        dependencia
                        id
                        sede {
                            sede
                            id
                        }
                    }
                }
                espacio_fisico
                observaciones
                id
                nombre
                marca_serie
                estado {
                    estado
                    id
                }
                fk_usuario
            }
            dependencia(where: { fk_sede: { _eq: $idSede } }) {
                id
                dependencia
                fk_sede
            }
        }
        `

    }
    else {
        return gql`
        query getBienes($idSede: Int!, $idDependencia: Int!) {
            bien(order_by: { fecha_creacion: desc }, where: { _and: [{ fk_usuario: { _is_null: false } }, { dependencia: { id: { _eq: $idDependencia } } }] }) {
                placa
                descripcion
                usuario {
                    nombres
                    apellidos
                    id
                    dependencia {
                        dependencia
                        id
                        sede {
                            sede
                            id
                        }
                    }
                }
                espacio_fisico
                observaciones
                id
                nombre
                marca_serie
                estado {
                    estado
                    id
                }
                fk_usuario
            }
            dependencia(where: { fk_sede: { _eq: $idSede } }) {
                id
                dependencia
                fk_sede
            }
        }
        `
    }
}


export const GET_DEPENDENCIAS = gql`
    query getDependencias {
        dependencia(order_by: {dependencia: asc}) {
            dependencia
            id
        }
    }
`

export const GET_USER_PWD = gql`
    query getUserPw($id: Int!) {
        usuario_auth(where: { fk_usuario: { _eq: $id } }) {
            password
        }
    }
`

export const GET_ROLES = gql`
    query getRoles {
        rol {
            id
            rol
        }
    }
`
export const GET_NOTIFICACIONES = gql`
    query notificaciones($fk_usuario: Int!) {
        notificaciones(order_by: { id: asc }, where: { _and: [{ fk_estado: { _nin: [2,3, 9] } }, { fk_usuario_destino: { _eq: $fk_usuario } }] }) {
            id
            usuario_destino {
                id
                nombres
                apellidos
            }
            usuario_origen {
                id
                nombres
                apellidos
            }
            proceso {
                id
                bienes
            }
            fk_estado
            tipo_solicitud {
                id
                solicitud
            }
        }
    }
`

export const GET_NOTIFICACIONES_ORIGEN = gql`
    query notificaciones($fk_usuario: Int!) {
        notificaciones(order_by: { id: asc }, where: { _and: [{ fk_estado: { _in: [3, 9] } }, { fk_usuario_origen: { _eq: $fk_usuario } }] }) {
            id
            usuario_destino {
                id
                nombres
                apellidos
            }
            usuario_origen {
                id
                nombres
                apellidos
            }
            proceso {
                id
                bienes
            }
            fk_estado
            tipo_solicitud {
                id
                solicitud
            }
        }
    }
`

export const GET_NOTIFICACIONES_APROBADOR = gql`
    query notificaciones($fk_usuario: Int!) {
        notificaciones(order_by: { id: asc }, where: { _and: [{ fk_estado: { _nin: [2,3, 9] } }, { fk_usuario_aprobador: { _eq: $fk_usuario } }] }) {
            id
            usuario_destino {
                id
                nombres
                apellidos
            }
            usuario_origen {
                id
                nombres
                apellidos
            }
            proceso {
                id
                bienes
            }
            fk_estado
            tipo_solicitud {
                id
                solicitud
            }
        }
    }
`

export const GET_USER_DEPENDENCIA = gql`
    query getEncargadoDependencia($idDependencia: Int!) {
        encargado_dependencia(where: { fk_dependencia: { _eq: $idDependencia } }) {
            usuario {
                id
                nombres
                apellidos
                cargos {
                    cargo
                }
                correo
            }
        }
    }
`

export const GET_BIENES_NOTIFICATIONS = gql`
    query getBienesById($_in: [Int!]) {
        bien(where: { id: { _in: $_in } }) {
            placa
            descripcion
            dependencia {
                sede {
                    sede
                    id
                }
                dependencia
                id
            }
            espacio_fisico
            observaciones
            hash_bien
        }
    }
`

export const GET_APROBADOR = gql`
    query getEncargadoDependencia($idDependencia: Int) {
        encargado_dependencia(where: { fk_dependencia: { _eq: $idDependencia } }) {
            fk_usuario
            usuario {
                id
                nombres
                apellidos
                correo
                cargos {
                    cargo
                }
            }
        }
    }
`


export const GET_TRANSACTIONS = gql`
    query getTransactions($fk_usuario: Int) {
        transacciones(where: { fk_usuario: { _eq: $fk_usuario }},order_by: {fecha: desc}) {
            tx_id
            fecha
            fk_usuario
            proceso {
                notificaciones {
                    tipo_solicitud {
                        solicitud
                        id
                    }
                }
            }
            hash_bc
            ipfs_link
        }
    }
`
