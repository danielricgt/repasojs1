import * as mutation from './../graphql/mutations';
import * as queries from './../graphql/queries'
import client from './../graphql/client';

// QUERIES
export const getBienes = async (data, option) => {
    return await client.query({
        query: queries.GET_BIENES(option),
        variables: data,
        fetchPolicy: 'no-cache'
    })
}

export const getBienIdByComprobante = async data => {
    return await client.query({
        query: queries.GET_BIEN_BY_COMPROBANTE,
        variables: data,
    })
}

export const getBienComprobanteByIdBien = async data => {
    return await client.query({
        query: queries.GET_BIEN_COMPROBANTE_BY_ID,
        variables: data,
    })
}

export const getUsuarioById = async data => {
    return await client.query({
        query: queries.GET_USUARIO_BY_ID,
        variables: data,
    })
}

export const getUserEncargadoDependencia = async data => {
    return await client.query({
        query: queries.GET_USER_ENCARGADO_DEPENDENCIA,
        variables: data,
    })
}

export const getBienesDependencia = async (data, idRol) => {
    return await client.query({
        query: queries.GET_BIENES_DEPENDENCIA(idRol),
        variables: data,
        fetchPolicy: 'no-cache',
    })
}

export const getDependencias = async () => {
    return await client.query({
        query: queries.GET_DEPENDENCIAS
    })
}

export const getSedesDependencias = async () => {
    return await client.query({
        query: queries.GET_SEDE_DEPENDENCIES
    })
}

export const getUserPwd = async data => {
    return await client.query({
        query: queries.GET_USER_PWD,
        variables: data,
    })
}

export const getRoles = async () => {
    return await client.query({
        query: queries.GET_ROLES,
    })
}

export const getNotificaciones = async (data) => {
    return await client.query({
        query: queries.GET_NOTIFICACIONES,
        variables: data,
        fetchPolicy: 'no-cache'
    })
}

export const getNotificacionesOrigen = async (data) => {
    return await client.query({
        query: queries.GET_NOTIFICACIONES_ORIGEN,
        variables: data,
        fetchPolicy: 'no-cache'
    })
}

export const getNotificacionesAprobador = async (data) => {
    return await client.query({
        query: queries.GET_NOTIFICACIONES_APROBADOR,
        variables: data,
        fetchPolicy: 'no-cache'
    })
}

export const getDependenciaEncargado = async data => {
    return await client.query({
        query: queries.GET_USER_DEPENDENCIA,
        variables: data,
    })
}

export const getBienesNotificaciones = async data => {
    return await client.query({
        query: queries.GET_BIENES_NOTIFICATIONS,
        variables: data,
    })
}

export const getAprobador = async data => {
    return await client.query({
        query: queries.GET_APROBADOR,
        variables: data
    })
}

export const getTransactions = async data => {
    return await client.query({
        query: queries.GET_TRANSACTIONS,
        variables: data
    })
}

// MUTATIONS
export const update_bien = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_BIEN,
        variables: data,
    })
}

export const create_comprobante_bien = async data => {
    return await client.mutate({
        mutation: mutation.CREATE_COMPROBANTE_ENTRADA,
        variables: data,
    })
}

export const editarBienSalida = async data => {
    return await client.mutate({
        mutation: mutation.EDIT_BIEN_SALIDA,
        variables: data,
    })
}

export const trasladoDependencia = async data => {
    return await client.mutate({
        mutation: mutation.TRASLADO_DEPENDENCIA,
        variables: data
    })
}

export const trasladoBienes = (data, Bienes) => {
    Bienes.map(async  item => {
        return await client.mutate({
            mutation: mutation.TRASLADO_BIENES(item.id), 
            variables: data
        })
    })
}

export const updateUsuarios = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_USUARIO,
        variables: data
    })
}

export const createDependencia = async data => {
    return await client.mutate({
        mutation: mutation.CREATE_DEPENDENCIA,
        variables: data
    })
}

export const createDependenciaUser = async data => {
    return await client.mutate({
        mutation: mutation.CREATE_DEPENDENCIA_USER,
        variables: data
    })
}

export const createSede = async data => {
    return await client.mutate({
        mutation: mutation.CREATE_SEDE,
        variables: data
    })
}

export const disableUser = async data => {
    return await client.mutate({
        mutation: mutation.DISABLE_USER,
        variables: data
    })
}

export const updatePwd = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_PWD,
        variables: data
    })
}

export const changeRol = async data => {
    return await client.mutate({
        mutation: mutation.CHANGE_ROL,
        variables: data
    }) 
}

export const updateDependencia = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_DEPENDENCIA,
        variables: data
    }) 
}

export const updateBienState  = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_BIEN_STATE,
        variables: data
    }) 
}