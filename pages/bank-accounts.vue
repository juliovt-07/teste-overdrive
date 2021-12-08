<template>
  <div>
    <div class="page-content">  
      <h1>Selecione a conta</h1>
      <hr>
      <div class="accounts">
        <table>
          <thead>
            <tr>
              <th>Agência</th>
              <th>Dígito</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody v-for="account in accounts" :key="account.numero">
            <tr align="center">
              <td>{{ account.agencia }}</td>
              <td>{{ account.agenciaDigito }}</td>
              <td>{{ account.descricao }}</td>
            </tr>
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
    }
  },
  computed: {
    token() {
      return this.$store.state.token
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
  tbody {
    border: solid 1px rgba(0, 0, 255, .7);
    background-color: #ccc;
  }
  th {
    font-weight: 400;
    font-size: 14px;
  }
  tr {
    background-color: #ccc;
    font-weight: 500;
    font-size: 14px;
  }
</style>