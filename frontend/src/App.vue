<template>
    <div id="app">
		<nav class="navbar fixed-top ">
			<!-- logo groupomania -->
			<router-link to="/" class="nav-link"> 
				<img class="logo" alt="groupomania logo" src="././assets/logo.png">
			</router-link>	
			<!-- logo groupomania end-->
			<div>
				<ul class="nav mr-auto">
					<li v-if="!currentUser"  class="nav-item"> 
						<router-link to="/" class="nav-link"> Connexion</router-link>
					</li>
					<li v-if="!currentUser"  class="nav-item">
						<router-link to="/signup" class="nav-link"> créer un compte</router-link>
					</li>
				</ul>
			</div>
		</nav>
      <router-view></router-view>
      <Footer />
    </div>
</template>

<script>
import Footer from './components/Footer';

export default {
	name: 'App',
	components: { Footer},
	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('auth/lougout')
			this.$router.push('/')
		}
	}
}
</script>


<style lang="scss">

  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
  }
   .navbar {
        background: rgb(10, 32, 66);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 1;

		.logo{
			height: 60px;
			margin-left: 10px;
			cursor: pointer;
		}
    }


</style>
