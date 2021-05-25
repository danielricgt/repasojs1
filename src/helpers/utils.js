export const getCargos = (cargos = []) => {
    let userCargos = []
    cargos.map(cargo => userCargos.push(cargo.cargo))
    if (userCargos.length === 1) return userCargos[0]
    userCargos = userCargos.join(', ')
    return userCargos
}