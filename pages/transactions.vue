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
      <div class="navigation">
        <svg style="cursor: pointer;" @click="backPage" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.7" d="M6 10.873L1 5.97681L6 1.08057" stroke="#505050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p @click="toPage(page-2)" v-if="this.page > 2">{{ this.page-2 }}</p>
        <p @click="toPage(page-1)" v-if="this.page > 2">{{ this.page-1 }}</p>
        <p @click="toPage(page)"><b>{{ this.page }}</b></p>
        <p @click="toPage(page+1)">{{ this.page+1 }}</p>
        <p @click="toPage(page+2)">{{ this.page+2 }}</p>
        <svg style="cursor: pointer;" @click="nextPage" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.7" d="M1 10.873L6 5.97681L1 1.08057" stroke="#505050" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transations: [],
      page: 1,
      totalPages: undefined
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
      this.transations = await this.$axios.$get('https://fulltech.api.dbs.moneyp.dev.br/v1/Extrato/Periodo?dataInicial=2021-06-23&dataFinal=2021-08-23&pageSize=5&page='+this.page)
      this.totalPages = this.transations.meta.totalPages
      this.transations = this.transations.data
    },
    nextPage() {
      this.page = this.page + 1
      if (this.page === this.totalPages) {
        this.page = 1
      }
      this.fetchTransations()
    },
    backPage() {
      this.page = this.page - 1
      if (this.page === 0) {
        this.page = this.totalPages-1
      }
      this.fetchTransations()
    },
    toPage(page) {
      this.page = page
      this.fetchTransations()
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
.navigation {
  display: flex;
  width: 50%;
  justify-content: space-between;
}
.navigation p {
  cursor: pointer;
}
</style>