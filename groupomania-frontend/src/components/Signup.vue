<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form id="contact-form" name="contact-form" method="POST">
                    <!--Grid row-->
                    <div class="row">
                        <!--Grid column-->
                            <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="firstname" class="">Prénom</label>
                                <input type="text" id="name" name="firstname" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="lastname" class="">Nom</label>
                                <input type="text" id="name" name="lastname" class="form-control">
                            </div>
                        </div>
                        <!--Grid column-->
                    </div>
                    <!--Grid row-->
                    <!--Grid row-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="email" class="">E-mail</label>
                                <input type="text" id="email" name="email" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="password" class="">Mot de passe</label>
                                <input type="password" id="password" name="password" class="form-control">
                            </div>
                        </div>
                         <div class="col-md-12">
                            <div class="md-form mb-0">
                                <label for="fonction" class="">Fonction</label>
                                <input type="text" id="subject" name="fonction" class="form-control">
                            </div>
                        </div>
                        <!--Grid row-->
                    </div>
                    <!--Grid row-->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Signup'
}
</script>

<style lang="scss">

</style>