<template> 
    <nav id="nav">
        <img alt="groupomania logo" src="../assets/logo.png">
        <div >
            <ul class="navbar-nav">
                <Login />
                <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
                <router-link class="nav-link" to="/profil">Profil</router-link>
                </li>
                <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
                <a class="nav-link" href="" v-on:click="logout">Deconnexion</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Login from '../components/Login'
//import EventBus from './EventBus'
export default {
    name: "Navbar",
    components: {
        Login
    },

  data () {
    return {
      auth: '',
      token: localStorage.usertoken
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('usertoken')
    }
  },
  /* mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  } */
}
</script>

<style lang="scss">

    #nav {
        background: rgb(10, 32, 66);
        display: flex;
        justify-content: space-evenly;
        align-items: center;

    a {
        font-weight: bold;
    }
    img{
        height: 100px;
        margin-left: 10px;
    }
    }
</style>