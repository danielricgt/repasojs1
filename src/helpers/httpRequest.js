import axios from 'axios'
import jwt from 'jsonwebtoken'

const URL = 'https://e0ab7ac4ba5f.ngrok.io'
const SECRET_SEED = 'UD2021!'
const TOKEN_EXP = '7d'
const token = jwt.sign({ id: '1231' }, SECRET_SEED, { expiresIn: TOKEN_EXP });

// BAJA_BIEN: 1,
// LEVANTAMIENTO: 2,
// INGRESO_BIEN_ENTRADA: 3,
// INGRESO_BIEN_SALIDA: 4,
// TRASLADO_BIENES_INDIVIDUALES: 5,
// TRASLADO_DEPENDENCIA: 6,
export const createProcess = data => {
  return new Promise( (resolve, reject) => {
    axios.post(URL+'/api/process/create', data, { 
        headers: {
            'Authorization': token
        }
    })
      .then( response => {
        // handle success
        console.log(response);
        resolve(response)
      })
      .catch( error => {
        // handle error
        console.log(error);
        reject(error)
      })
  })
}

// Estados
// 9 Aceptado
// 3 Rechazado
export const aceptRejectProcess = data => {
  return new Promise( (resolve, reject) => {
    axios.post(URL+'/api/process/accept-reject', data, { 
        headers: {
            'Authorization': token
        }
    })
      .then( response => {
        // handle success
        console.log(response);
        resolve(response)
      })
      .catch( error => {
        // handle error
        console.log(error);
        reject(error)
      })
  })
}