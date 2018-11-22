import Axios from 'axios'

export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = user => ({
  type: AUTHENTICATE,
  user: user
})

export const authentification = (email,pass) => dispatch => {
  const url = 'http://localhost:3030/authentication'
  Axios({
    method: 'POST',
    url: url,
    params: {
      'strategy': 'local',
      'email': email,
      'password': pass
    }
  }).then(res=>{
    dispatch(
      authenticate({
        user: res.data.accessToken
      })
    )
  })
}