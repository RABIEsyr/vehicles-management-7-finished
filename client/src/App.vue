<template>
  <v-app>
    <router-view v-if="!getIsAutenticated"> </router-view>
  <div id="app" v-else style="height: 100%">
    <!-- <Home v-if="getIsAutenticated"></Home>
    <Login v-else></Login>  -->
    <!-- <h2>hhhh</h2> -->
    <NavDrawer></NavDrawer>
    <router-view></router-view>
  </div>
</v-app>
</template>

<script>
// import Home from './components/Home.vue'
// import Login from './components/auth/Login.vue';
import NavDrawer from './components/navigationDrawer/navigationDrawer.vue';

import {mapActions, mapGetters, mapMutations} from 'vuex';
// import {eventBus} from './main';

export default {
  name: 'app',
  data() {
    return {
      
    }
  },
   components: {
  //   Home,
  //   Login
  NavDrawer
   },
  computed: {
    ...mapGetters([
      'getIsAutenticated'
    ])
  },
  methods: {
        ...mapActions({
          'checkIsAuthenticated': 'checkIsAuthenticated',
          'checkIsAdmin': 'checkIsAdmin',
          'actPoliceUsername': 'actPoliceUsername'
        }),
        ...mapMutations({
          'setAuthTemp': 'setAuthTemp'
        })
      },
      
     async created() {
      
    const token = localStorage.getItem('token');
    // const result = await this.checkIsAuthenticated(token);
    var tot = await this.checkIsAuthenticated(token);
    console.log('tottot', tot)
    // eventBus.setAuthentication(result)
    await this.checkIsAdmin(token);

    if (tot) {
      this.actPoliceUsername();
    }
  },
 
}
</script>

<style >
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 1px; */
  }
</style>
