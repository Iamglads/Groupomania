<template>
    <!--LOGIN COMPONENT -->
    <div id="login" class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Connexion</h1>
                <div class="divider"></div>
                <form class="login-form" @submit.prevent="handleLogin()">
            <!--identifiant -->
            <div class="md-form mb-0">
                <label for="email"></label> <br />
                <input 
                v-model="user.email"
                v-validate=" 'required'"
                type="email" 
                name="email"
                class="form-control"
                placeholder="Email"
                />
                <p
                v-if="errors.has('email')"
                class="alert alert-danger"
                >Identifiant incorrect</p>
            </div>
            <!--identifiant fin -->
            <!--Password -->
            <div  class="md-form mb-0">
                <label for="password"></label> <br />
                <input 
                 v-model="user.password"
                v-validate="'required'"
                type="password" 
                name="password" 
                class="form-control"
                placeholder="Mot de passe"
                />
                <p
                v-if="errors.has('password')"
                class="alert alert-danger"
                >Mot de passe invalid</p>
                <router-link to="/signup">Vous n'avez de compte? Créer un compte! </router-link>
            </div>
            <!--password end  -->
             <div  class="md-form mb-0">
                 <button type="submit" class="btn-login col-md-12" :disabled="loading">
                     <span>Connexion</span>
                </button>
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <p v-if="message" class="alert alert-danger" role="alert">{{ message }}</p>
            </div>
        </form>
            </div>
        </div>
    </div>
</template>

<script>

import User from '../models/user'

export default {
    name: "Login",
    data() {
        return {
            user: new User('', ''),
            loading: false,
            message: ''
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    },

    created() {
        if (this.loggedIn) {
            this.$router.push('/')
        }
    },

    methods: {
        handleLogin() {
            this.loading = true
            this.$validator.validateAll()
            .then(isValid => {
                if(!isValid) {
                    this.loading = false 
                    return
                }
                if (this.user.email && this.user.password) {
                    this.$store.dispatch('auth/login', this.user)
                    .then(() => this.$router.push('/home'))
                        error => {
                        this.loading = false 
                        this.message = (error.response && error.response.data) || error.message || error.toString()
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .login-form{
        .btn-login{
            padding: .3em;
            border: 2px solid rgb(207, 82, 92);
            color: rgb(10, 32, 66);
            background: none;
            margin-top: 30px;
            border-radius: 5px;
            &:hover{
                background:rgb(207, 82, 92);
                color: #ffffff;
            }
        }
    }
    
</style>