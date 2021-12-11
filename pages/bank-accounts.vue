<template>
  <div>
    <div class="page-content">  
      <h1>Selecione a conta</h1>
      <hr>
      <div class="accounts">
        <table>
          <thead>
            <tr>
              <th colspan="2">Agência</th>
              <th></th>
              <th align="left">| Descrição</th>
              <th align="left">| Documento</th>
            </tr>
          </thead>
          <br>
          <tbody v-for="account in accounts" :key="account.numero">
            <tr class="account" @click="selectAccount(refreshToken, account.codigo)" align="center">
              <td>{{ account.agencia }}</td>
              <td>{{ account.agenciaDigito }}</td>
              <td></td>
              <td><p>{{ account.descricao }}</p></td>
              <td><p>{{ account.documentoFederal }}</p></td>
            </tr>
            <br>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accounts: []
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.fetchAccounts()
  },
  methods: {
    async fetchAccounts() {
      this.$axios.setHeader('Authorization', this.token)
      this.accounts = await this.$axios.$get('https://fulltech.api.dbs.moneyp.dev.br/v1/Conta/Usuario')
      this.accounts = this.accounts.data      
    },
    async selectAccount(refreshToken, codigoConta) {
      this.$axios.setHeader('Authorization', this.token)
      const token = await this.$axios.$post('https://fulltech.api.dbs.moneyp.dev.br/v1/Autenticacao/AuthCompany',      
      {
       refreshToken: refreshToken,
       codigoConta: codigoConta
      })
      this.$store.commit('login', token)
      this.$router.push('/transactions') 
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    refreshToken() {
      return this.$store.state.refreshToken
    }
  }
}
</script>

<style>
  .accounts {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  table {
    color: rgba(0, 0, 0, .8);
  }
  th {
    font-weight: 400;
    font-size: 14px;
  }
  tr {
    font-weight: 500;
    font-size: 14px;
    transition: all .2s ease;
  }
  .account {
    cursor: pointer;
  }
  .account:hover {
    color: rgba(0, 0, 255, .6);
  }
  tr p {
    font-size: 11px;
    margin-left: 9px;
    text-align: left;
  }
</style>