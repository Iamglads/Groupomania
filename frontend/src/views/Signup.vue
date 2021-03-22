<template>
    <section id="signup">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Créer un compte</h1>
                <div class="divider"></div>
                <form class="signup-form"  @submit.prevent="handleSignup()">
                    <!--Grid row-->
                    <div class="row">
                        <!--Grid column firstname-->
                        <div class="col-md-6">
                            <BaseInput type="text" label="Prénom" v-model="user.firstname" required="true"/>
                        </div>
                        <div class="col-md-6">
                            <BaseInput type="text" label="Nom" v-model="user.lastname" required="true"/>
                        </div>
                        <!--Grid column-->
                    </div>
                    <!--Grid row-->
                    <!--Grid row-->
                    <div class="row">
                        <div class="col-md-12">
                            <BaseInput type="email" label="E-mail" v-model="user.email" required="true"/>
                        </div>
                        <div class="col-md-12">
                            <BaseInput type="password" label="Mot de passe" v-model="user.password" required="true"/>
                        </div>
                         <div class="col-md-12">
                            <BaseInput type="text" label="Fonction" v-model="user.fonction" required="true"/>
                        </div>                     
                        <!--Grid row-->
                    </div>
                    <button type="submit" class="btn-signup col-md-12">S'incrire</button> 
                </form>
                <p> Vous avez déjà un compte? <router-link to="/">Connectez-vous! </router-link></p>
                <!-- alert message error -->
                <p v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message }}</p>
            </div>
        </div>
    </section>
</template>


<script>

import User from '../models/user'
import BaseInput from '../components/BaseInput'

export default {
    name : 'Signup',
    components: { BaseInput },
    data() {
        return {
            user : new User('', '', '', '', ''),
            submitted: false,
            message: '',
            successful: false
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.status.loggedIn
        }
    },

    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profil')
        }
    },

    methods: {
        handleSignup() {
            this.message = ''
            this.submitted = true
            this.$validator.validate()
            .then(isValid => {
                if(isValid) {
                    this.$store.dispatch('signup', this.user)
                    .then(data => {
                        this.message = data.message
                        this.successful = true
                    }, 
                    error => {
                        this.message = (error.response.data) || error.message || error.toString()
                        this.successful = false
                    })
                    .catch(error => console.log(error))
                }
            })
        }
    }

}
</script>


<style lang="scss">
   
    #signup{
        height: 100%;
        padding: 50px 1em;
        background: rgb(216, 216, 216);
        h1{
            color: rgb(10, 32, 66);
            text-align: left;
        }
        .divider{
                width: 70px;
                height: 3px;
                background-color: rgb(207, 82, 92);
                margin-bottom: 30px;
        }
         .signup-form{
              margin-bottom: 20px;
            label{
                text-align: left;
            }
            .btn-signup{
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
        
    }
</style>