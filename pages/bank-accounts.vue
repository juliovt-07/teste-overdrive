<template>
  <div>
    <div class="page-content">  
      <h1>Selecione a conta</h1>
      <hr>
      <div class="accounts">
        <div class="account" @click="selectAccount(refreshToken, account.codigo)" v-for="account in accounts" :key="account.numero">
          <div>
            <p><b>{{ account.agencia }} - {{ account.agenciaDigito }}</b></p>
            <p>{{ account.nomeCorrentista }}</p>
          </div>
          <div>            
            <p><b>{{ account.documentoFederal }}</b></p>
            <p>{{ account.descricao }}</p>
          </div>
        </div>
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .account {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, .1);
    border-radius: 6px;
    padding: 15px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    transition: all .4s ease;
  }
  .account:hover {
    box-shadow: 0px 0px 14px rgba(0, 0, 0, .2);
  }
  p {
    color: rgba(0, 0, 0, .9);
    font-size: 12px;
  }
</style>