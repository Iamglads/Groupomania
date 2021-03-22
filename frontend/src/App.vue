<template>

  <v-app id="id">
    <v-navigation-drawer
		v-model="drawer"
		app
		v-if="loggedIn"
    >
		<!--  -->
		<Sidebar />
    </v-navigation-drawer>

    <v-app-bar app >
		<v-app-bar-nav-icon 
		@click="drawer = !drawer">
		</v-app-bar-nav-icon>

		<MenuBar />
    </v-app-bar>

    <v-main>
		<!--  -->
		<router-view></router-view>
    </v-main>
	<Footer />
  </v-app>
</template>

<script>

import Footer from './components/Footer';
import Sidebar from './components/Sidebar'
import MenuBar from './components/MenuBar'

export default {
	name: 'App',
	components: { Sidebar, MenuBar, Footer},

    data() {  
		return {
			drawer: null,
		}
	},

	methods: {
		loggedIn() {
			return this.$store.state.status.loggedIn
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;

  }
   
</style>
