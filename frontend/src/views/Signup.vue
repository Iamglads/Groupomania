<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Créer un compte</h1>
                <div class="divider"></div>
                <form id="contact-form" name="contact-form" @submit.prevent="handleSignup()">
                    <!--Grid row-->
                    <div v-if="!successful" class="row">
                        <!--Grid column firstname-->
                            <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="firstname" class=""></label>
                                <input 
                                v-model="user.firstname"
                                type="text" 
                                class="form-control" 
                                placeholder="Prénom"
                                required
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="lastname" class=""></label>
                                <input 
                                v-model="user.lastname"
                                type="text" 
                                name="lastname" 
                                class="form-control" 
                                placeholder="Nom"
                                required
                                />
                            </div>
                        </div>
                        <!--Grid column-->
                    </div>
                    <!--Grid row-->
                    <!--Grid row-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="email" class=""></label>
                                <input 
                                v-model="user.email"
                                type="email" 
                                name="email" 
                                class="form-control" 
                                placeholder="E-mail"
                                required
                                />
                            </div>
                            <div
                            v-if="submitted && errors.has('email')"
                            class="alert-danger"
                            >{{ errors.first('email') }}</div>
                        </div>
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="password" class=""></label>
                                <input 
                                v-model="user.password"
                                type="password" 
                                id="password" 
                                name="password" 
                                class="form-control" 
                                placeholder="Mot de passe"
                                required
                                />
                            </div>
                        </div>
                         <div class="col-md-12">
                            <div class="md-form">
                                <label for="fonction" class=""></label>
                                <input 
                                v-model="user.fonction"
                                type="text" 
                                name="fonction" 
                                class="form-control" 
                                placeholder="Fonction"
                                />
                            </div>
                        </div>
                        <!--Grid row-->
                    </div>

                    <button class="btn-signup col-md-12">S'incrire</button>
                </form>
                <!-- alert message error -->
                    <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                    >{{ message }}</div>
            </div>
        </div>
    </div>
</template>


<script>

import User from '../models/user'

export default {
    name : 'Signup',
    data() {
        return {
            user : new User('', '', '', '', ''),
            submitted: false,
            successful: false,
            message: ''
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
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
                    this.$store.dispatch('auth/signup', this.user)
                    .then(data => {
                        this.message = data.message
                        this.successful = true
                    }, 
                    error => {
                        this.message = (error.response.data) || error.message || error.toString()
                        this.successful = false
                    }
                    )
                    .catch(error => console.log(error))
                }
            })
        }
    }

}
</script>


<style lang="scss">
    .container{
        margin-top: 150px;
        h1{
            color: rgb(10, 32, 66);
            text-align: left;
        }
        label{
            text-align: left;
        }
        .divider{
            width: 70px;
            height: 3px;
            background-color: rgb(207, 82, 92);
        }
        .btn-signup{
            padding: .3em;
            border: 2px solid rgb(207, 82, 92);
            color: rgb(10, 32, 66);
            background: none;
            margin-top: 50px;
            border-radius: 5px;
            &:hover{
                background:rgb(207, 82, 92);
                color: #ffffff;
            }
        }
    }
</style>