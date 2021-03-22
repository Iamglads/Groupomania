<template>
    <!--LOGIN View -->
    <section id="login">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Connexion</h1>
                <div class="divider"></div>
                <form class="login-form" @submit.prevent="handleLogin()">
                    <!--identifiant -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="md-form">
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
                        </div>
                        <div class="col-md-6">
                             <!--Password -->
                            <div  class="md-form">
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
                            </div>
                            <!--password end  -->
                        </div> 
                    </div>
                    
                    <button type="submit" class="btn-login col-md-12">Connexion</button>
                </form>
                <p> Vous n'avez pas de compte? <router-link to="/signup">Créez votre compte! </router-link></p>
                  <!-- alert message error -->
            <p v-if="message" class="alert alert-danger" role="alert">{{ message }}</p>
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            </div>
        </div>
    </section>
</template>

<script>

import User from '../models/user'
//import BaseInput from '../components/BaseInput'

export default {
    name: "Login",
    data() {
        return {
            user: new User('', ''),
            loading: false,
            message: '',
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.status.loggedIn
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
                    this.$store.dispatch('login', this.user)
                    .then(() => this.$router.push('/home'))
                    error => {
                        this.loading = false 
                        this.message = (error.response && error.response.data) || error.message || error.toString()
                    }
                }
            })
        },
    }
}
</script>

<style lang="scss">
    #login{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 1em;
        background: rgb(216, 216, 216);
        .divider{
            width: 70px;
            height: 3px;
            background-color: rgb(207, 82, 92);
        }
        .login-form{
            margin-bottom: 20px;
            .btn-login{
                padding: .3em;
                border: 2px solid rgb(207, 82, 92);
                color: #0a2042;
                background: none;
                margin-top: 30px;
                border-radius: 5px;
                &:hover{
                    background:rgb(207, 82, 92);
                    color: #ffffff;
                }
            }
        }
    } 
    
</style>