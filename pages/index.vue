<template>
  <div>
    <div class="page-content">  
      <h1>LOGIN</h1>
      <input type="number" placeholder="CPF" v-model="cpf" maxlength="11" name="">
      <input type="password" placeholder="Senha (Use o teclado virtual)" v-model="password" maxlength="8" disabled name="">
      <hr>
      <div v-if="keys.length > 0" class="keys">
        <div @click="concatPassword(key.key)" class="key" v-for="key in keys" :key="key.key">
          {{ key.values[0] }} ou {{ key.values[1] }}
        </div>
        <div class="key" @click="password = ''">Limpar</div>
      </div>
      <button :disabled="!loginDisabled" :class="!loginDisabled ? 'disabled' : ''" @click="login(cpf, password)">Entrar</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      cpf: '',
      password: '',
      keys: {}
    }
  },
  created() {
    if (this.$store.state.token) {
      this.$router.push('/bank-accounts')
    }
  },
  watch: {
    cpf(value) {
      if (value.length === 11) {
        this.fetchKeys(value)
      }
      if (value.length > 11) {
        this.cpf = value.slice(0,11)
      }
    },
    password(value) {
        if (value.length > 8) {
        this.password = value.slice(0,8)
      }
    }
  },
  computed: {
    loginDisabled() {
      return Boolean(this.cpf.length === 11 && this.password.length === 8)
    }
  },
  methods: {
    async fetchKeys(value) {
      this.keys = await this.$axios.$post('https://fulltech.api.dbs.moneyp.dev.br/v1/Autenticacao/Challenge',
      {
         data: {
          cpf: value
         }
      })
      this.keys = this.keys.data.keys
    },
    async login(cpf, password) {
      const token = await this.$axios.$post('https://fulltech.api.dbs.moneyp.dev.br/v1/Autenticacao/Login',
      {
         data: {
          cpf: cpf,
          senha: password
         }
      })
      this.$store.commit('login', token)
      this.$router.push('/bank-accounts')
    },
    concatPassword(value) {
      this.password = this.password.concat(value)
    }
  }
}
</script>

<style>
  button, input {
    width: 100%;
    max-width: 300px;
    border: none;
    outline: none;
  }
  input {
    padding: 4px 0px;
    border-bottom: solid 1px rgba(0, 0, 0, .4);
  }
  button {
    cursor: pointer;
    padding: 8px 40px;
    background-color: rgba(0, 0, 255, .8);
    border-radius: 5px;
    color: #fafafa;
  }
  button.disabled {
    background-color: #8c8c8c;
  }
  .keys {
    display: flex;
    flex-wrap: wrap;
    max-width: 350px;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .keys .key {
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: rgba(0, 0, 255, .9);
    border: solid 1px rgba(0, 0, 255, .5);
    border-radius: 4px;
    padding: 8px;
    min-width: 50px;
    height: 20px;
    transition: all .2s ease;
  }
  .keys .key:hover {
    background-color: rgba(0, 0, 255, .5);
    color: #fafafa;
  }
</style>