<template>
  <div>
    <div class="page-content">  
      <h1>Extrato</h1>
      <div class="transations">
        <div class="transation" v-for="transaction in transations" :key="transaction.codigoTransacao">
          <div class="icon">          
            <TransactionIcon :type="transaction.tipoLancamento"/>
            <div>
              <p class="description">{{ transaction.descricaoOperacao }}</p>
              <p>{{ transaction.nome }}</p>
            </div>
          </div>
          <div>
            <p>{{ transaction.descricaoCliente }}</p>
            <p>{{ transaction.identificadorOperacao }}</p>
          </div>
          <div :class="transaction.tipoLancamento === 'C' ? 'red' : 'green'">
            <p class="value">R$ {{ transaction.valorMovimento }}</p>
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
      transations: []
    }
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.fetchTransations()
  },
  methods: {
    async fetchTransations() {
      this.$axios.setHeader('Authorization', this.token)
      this.transations = await this.$axios.$get('https://fulltech.api.dbs.moneyp.dev.br/v1/Extrato/Periodo?dataInicial=2021-06-23&dataFinal=2021-08-23&pageSize=8&page=370')
      this.transations = this.transations.data
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
.transations {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.transation {
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
.transation:hover {
  box-shadow: 0px 0px 14px rgba(0, 0, 0, .2);
}
.icon {
  display: flex;
  gap: 5px;
  max-width: 70%;
}
.description, .value {
  font-weight: 500;
}
p {
  color: rgba(0, 0, 0, .9);
  font-size: 12px;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>