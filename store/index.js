export const state = () => ({
  token: null,
  refreshToken: null,
  logoImg: null
})

export const mutations = {
  login(state, payload) {
    state.token = payload.data.token
    state.refreshToken = payload.data.refreshToken
    state.logoImg = payload.data.urlLogoParceiro
  },
  logout(state) {
    state.token = null
    state.refreshToken = null
    state.logoImg = null
  }
}