<template>
  <div class="layout">
    <img class="logo" v-if="logged" :src="logoImg" width="150">
    <div v-if="logged" class="exit" @click="logout()">Sair</div>
    <transition name="fade">    
      <Nuxt class="content"/>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  transition: 'fade',
  computed: {
    logged() {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    },
    logoImg() {
      return this.$store.state.logoImg
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
  * {
    padding: 0;
    margin: 0;
  }
  .layout {
    background-color: #dcdcdc;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    position: relative;
  }
  .exit {
    border: solid 1px #8c8c8c;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 6px;
    color: rgba(0, 0, 0, .8);
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: all .2s ease;
  }
  .exit:hover {
    background-color: #8c8c8c;
    color: #fafafa;
  }
  .logo {
    position: absolute;
    top: 65px;
  }
  .content {
    background-color: #fff;
    width: 80vw;
    max-width: 600px;
    min-height: 200px;
    border-radius: 8px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, .1);
    padding: 15px;
  }
  h1 {
    color: rgba(0, 0, 0, .8);
    font-size: 26px;
    font-weight: 400;
  }
  .page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active { transition: opacity .8s; }
  .fade-enter, .fade-leave-active { opacity: 0; }
</style>