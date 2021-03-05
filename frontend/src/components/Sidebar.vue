<template>
    <nav v-bind:class="{active: active} " id="sidebar">
		<div class="sidebar__content">
			<div class="sidebar__content--chevron">
				<!-- toggle button -->
				<button @click="toggleSidebar()" class="btn-chevron-right">
					<i class="fas fa-chevron-left"></i> 
					<i class="fas fa-chevron-right"></i>
				</button>
				<!-- toggle button end -->
			</div>
			
			<div class="sidebar__content--header">
				<div class="user-pic">
					<img src="../assets/glad.png" alt="image">
				</div>
				<div class="user-info">
					<span class="user-name">  {{user.firstname }} <strong>  {{user.lastname}}  </strong></span>
				</div>
			</div>
			<!-- nav links -->
			<div class="sidebar__content--menu">
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
					<li class="nav-item item-logout" v-if="user">	
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
		
		data() {
			return {
				active: true
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},

		mounted() {
			this.$parent.$on('toggleSidebar', () => {
				this.active = !this.active
			})
		},

		methods: {
			logout() {
				this.$store.dispatch('logout')
				this.$router.push('/')
				window.location.reload()
			},

			toggleSidebar() {
				this.$parent.$emit('toggleSidebar')
			}

		}

	};
</script>

<style lang="scss">

@import '@/assets/sass/variables.scss';

	#sidebar {
		width: 20%;
		min-width: 250px;
		height: 750px;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100%;
		border-right: 1px solid $second-color;
		z-index: 10;
		.fa-user-lock, .fa-user-circle, .fa-home, .fa-calendar-alt, .fa-store {
			margin-right: 10px;
			font-size: 10px;
			padding: 0.5em;
			border: 1px solid  $main-color;
			border-radius: 100px;
		}

	}

	.sidebar__content {
		display: block;
		margin-top: 110px;

	&--chevron{
		display: flex;
		justify-content: flex-end;
		margin-right: -40px;
		.btn-chevron-right{
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background: $second-color;
			border: none;
			border-top-right-radius: 20px;
			border-bottom-right-radius: 20px;
			top: 0px;
			right: 0px;
			.fa-chevron-right{
				color: $white;
				font-size: 30px;
			}
			.fa-chevron-left{
				color: $second-color;
			}
		}
	}

	&--header {
		.user-pic{
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
			img{
				margin: auto;
				max-width: 50%;
				border-radius: 100%;
				box-shadow: 1px 1px 6px 1px rgb(216, 216, 216);
			}
		}
	}

	&--menu {
		margin-top: 30px;
		display: flex;
		justify-content: center;
			.nav{
				display: block;
				.nav-item{
					&:hover{
						color: $second-color;
						transition: 0.5s;
					}
					.router-link-active{
						color: $second-color
					}

				}
			}
			li {
				font-size: 20px;
				color:  $main-color;
				margin-bottom: 15px;
				text-align: left;
			}
			.item-logout{
				position: fixed;
				bottom: 20px;

			}
		}
	}

	.active {
		margin-left: -250px;
		transition: 1s;
	}
</style>
