<template>
    <section class="profil__content--form">
        <form v-if="editForm" id="contact-form" name="contact-form">
            <h2>Modifiez les informations de votre profil</h2>
            <div class="row">
                <div class="col-md-6">
                    <BaseInput type="text" label="Prénom" v-model="updateUser.firstname"/>
                </div>
                <div class="col-md-6">
                    <BaseInput type="text" label="Prénom" v-model="updateUser.lastname"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <BaseInput type="email" label="Prénom" v-model="updateUser.email"/>
                    <p v-if="submitted && errors.has('email')" class="alert-danger">
                        {{ errors.first("email") }}
                    </p>
                </div>
                <div class="col-md-6">
                    <BaseInput type="password" label="Prénom" v-model="updateUser.password"/>
                </div>
                <div class="col-md-6">
                    <BaseInput type="text" label="Prénom" v-model="updateUser.fonction"/>
                </div>
            </div>
            <button @click="updateInfoAccount(user.id)" class="btn-update-profil col-sm-3">Enregistrer</button>
        </form>
    </section>
</template>

<script>
import BaseInput from '../components/BaseInput'
export default {
    components: { BaseInput }
    
}
</script>


<style lang="scss">
@import '@/assets/sass/variables.scss'; 

 .btn-update-profil {
        padding: 0.3em;
        border: 2px solid $second-color;
        color: $main-color;
        background: none;
        margin-top: 30px;
        border-radius: 5px;
        &:hover {
            background: $second-color;
            color: #ffffff;
        }
    }
</style>