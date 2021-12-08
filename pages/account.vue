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
            <tr align="center">
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
  th {
    font-weight: 400;
    font-size: 14px;
  }
  tr {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all .2s ease;
  }
  tr:hover {
    color: rgba(0, 0, 255, .6)
  }
  tr p {
    font-size: 11px;
    margin-left: 9px;
    text-align: left;
  }
</style>