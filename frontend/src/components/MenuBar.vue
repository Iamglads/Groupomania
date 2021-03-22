<template>
    <div class="navbar">
		<!-- logo groupomania -->
		<div class="nav-link"> 
			<img class="logo" alt="groupomania logo" src="../assets/logo-rouge.png">
		</div>	
		<!-- logo groupomania end-->
		<div>
			<ul class="nav mr-auto">
				<li v-if="!user"  class="nav-item"> 
					<router-link to="/" class="nav-link"> Se connecter</router-link>
				</li>
				<li v-if="!user"  class="nav-item">
					<router-link to="/signup" class="nav-link"> S'inscrire</router-link>
				</li>
				<li v-if="user"  class="nav-item">
					<p> Bienvenu {{ user.firstname }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
    computed: {
		user() {
			return this.$store.state.user
		}
	}
}
</script>


<style lang="scss">

@import '@/assets/sass/variables.scss';
.navbar {
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
		.router-link-exact-active{
			color: #ffffff;
			border-bottom: 1px solid #ffffff;
		}
    }
</style>