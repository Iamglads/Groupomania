<template>
    <nav class="navMenu" :style="[userStyles.navMenu, menuDirection, menuWidth]">
		<div class="sidebar__content">
            <a href="javscript:void(0)" class="closebtn" @click.prevent="closeMenu">&times;</a>
			<div class="sidebar__content--chevron">
				<!-- toggle button -->
				<button @click.prevent="toggleMenu" class="btn-chevron-right">
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

import styles from '../assets/sass/variables.scss'
import utilities from '../js/utilities'
export default {
    name: 'slider',
    props: {
        width: {
            type: Number,
            required: false, 
            default: 250
        }, 
        format: {
            type: String,
            required: false,
            default: 'overlay',
            validator: (value) => ['push', 'full', 'overlay'].indexOf(value) > -1
        },
        direction: {
            type: String,
            required: false,
            default: 'left',
            validator: (value) => ['left', 'rigth'].indexOf(value)
        },
        opacity: {
            type: Number,
            required: false,
            default: 0
        },
        customStyles: {
            type: Object,
            required: false,
            deep: true,
            default: () => ({})
        }
    },

    data() {

        const defaultStyles = {
            'navMenu': {},
            'navIcon': {}
        }

        return {
            styles: styles,
            menuWidth: {
                'width': 0
            },
            userStyles: Object.assign({}, defaultStyles, this.customStyles)
        }
    },
    watch: {
        customStyles() {
            this.userStyles = Object.assign({}, this.userStyles, this.customStyles)
        }
    },

    computed: {
        user() {
				return this.$store.state.user
        },
            
        menuDirection() {
            return this.direction === 'rigth'
            ? { 'rigth': 0 }
            : { 'left' : 0}
        },
        iconDirection () {
            return { 'float': this.direction}
        },
        app () {
            return document.getElementById('app')
        }
    },

    mounted () {
        if(!this.app) {
            console.warn(`[Slider] The format was set to '${this.format}', but there is no element with an id 'app'. Add id='app' to the element to move.`)
        }
    },

    methods: {

        openMenu () {
            const width = `${this.width}px`
            const marginDirection = `margin-${this.direction}`

            this.menuWidth = {
                'width': this.format === 'full' ? '100%' : width
            }

            if(this.app && this.format === 'push') {
                this.app.style[marginDirection] = width
                this.app.style.transition = `${marginDirection} .5s`
            }

            if(this.opacity) {
                document.body.style.background = utilities.hexToRGB(styles['white'], this.opacity)
            }
        },

        closeMenu() {
            this.menuWidth = { 'width': 0 }
            if (this.app) {
                this.app.style.marginLeft = '0'
                this.app.style.marginRight = '0'
            }
            if(this.opacity) {
                document.body.style.background = styles['white']
            }
        },

        toggleMenu() {
            if (this.menuWidth.width === 0) {
                this.openMenu()
            } else {
                this.closeMenu()
            }
        },

        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
            window.location.reload()
        },
    }
}
</script>

<style lang="scss">

@import '@/assets/sass/variables.scss';

	.navMenu {
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
          .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }

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


@media screen and (max-height: 450px) {
  .navMenu {
    padding-top: 15px;
    a {
      font-size: 18px;
    }
  }
}
</style>
