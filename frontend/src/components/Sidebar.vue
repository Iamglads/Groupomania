<template>
    <nav id="sidebar">
		<div class="sidebar-content">
			<div class="sidebar-content-chevron">
				<!-- toggle button -->
				<button class="btn-chevron-right">
					<i class="fas fa-chevron-left"></i> 
					<i class="fas fa-chevron-right"></i>
				</button>
				<!-- toggle button end -->
			</div>
			
			<div class="sidebar-header">
				<div class="user-pic">
					<i class="fas fa-user-circle"></i>
				</div>
				<div class="user-info">
					<span class="user-name">  {{currentUser.firstname }} <strong>  {{currentUser.lastname}}  </strong></span>
				</div>
			</div>
			<!-- nav links -->
			<div class="sidebar-menu">
				<ul class="nav">
					<li class="nav-item">
						<i class="fas fa-user-lock"></i>
						<router-link to="/admin"> Admin</router-link>
					</li>
					<li class="nav-item">
						<i class="fas fa-user-circle"></i> 
						<router-link to="/profil">Profil</router-link>
					</li>
					<li class="nav-item">
						<i class="fas fa-home"></i>
						<router-link to="/home">Forum</router-link>
					</li>
					<li class="nav-item">
						<i class="fas fa-store"></i>
						<router-link to="/marketplace">Marketplace</router-link>
					</li>
					<li class="nav-item">
						<i class="fas fa-calendar-alt"></i>
						<router-link to="/events">Evènements</router-link>
					</li>
					<!-- deconnexion -->
					<li class="nav-item item-logout" v-if="currentUser">	
						<a href @click.prevent="logout"> Déconnexion</a>
					</li>
				</ul>
			</div>
			<!-- nav links -->
		</div>
    </nav>
</template>

<script>
export default {
	name: "Profil",
	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},

	methods: {
		logout() {
			this.$store.dispatch('auth/logout')
			this.$router.push('/')
		},

		toglleForm() {
			
		}
	}

};
</script>

<style lang="scss">
	#sidebar {
		width: 20%;
		min-width: 250px;
		height: 750px;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100%;
		z-index: 10;
		.fas{
			margin-right: 10px;
		}

		@media (max-width: 900px) { 
			//margin-left: -250px;
		}
	}

	.sidebar-content {
		display: block;
		margin-top: 100px;
		.sidebar-header {
		.fa-user-circle {
			font-size: 100px;
			color: rgb(10, 32, 66);
		}
	}

	.sidebar-menu {
		margin-top: 30px;
		display: flex;
		justify-content: center;
			.nav{
				display: block;
			}
			li {
				font-size: 20px;
				color: rgb(10, 32, 66);
				margin-bottom: 15px;
				text-align: left;
			}
			.item-logout{
				position: fixed;
				bottom: 20px;

			}
		}
	}
	.sidebar-content-chevron{
		display: flex;
		justify-content: flex-end;
		margin-right: -40px;
		.btn-chevron-right{
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: rgb(207, 82, 92);
		border: none;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		top: 0px;
		right: 0px;
			.fa-chevron-right{
				color: white;
				font-size: 30px;
			}
			.fa-chevron-left{
				color: rgb(207, 82, 92);
			}
		}
	}
	
</style>
