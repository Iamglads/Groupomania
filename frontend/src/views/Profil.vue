<template>
    <div class="profil">
        <Sidebar />
        <div class="profil-content col-md-6 ">
            <section class="profil-content-info">
                <h1>Profil</h1>
                <div class="divider"></div>
                <article class="profil-picture">
                <img class="img-profil" src="../assets/glad.jpg" alt="photo" />
                <div>
                    <h1 class="name">{{currentUser.firstname}} <strong>{{currentUser.lastname}}</strong></h1>
                    <p class="fonction">{{currentUser.fonction}}</p>
                </div>
                </article>
                <div class="profil-actions">
                <!-- update profil informations -->
                <div v-on:click="displayForm" class="cursor-pointer">
                    <i class="fas fa-user-edit"></i>
                    <span> Modifier </span>
                </div>
                <!-- delete profil -->
                <div @click="deleteAccount()" class="cursor-pointer">
                    <i class="far fa-trash-alt"></i>
                    <span> Suprimer</span>
                </div>
                </div>
            </section>

            <section class="profil-content-form">
                <hr class="my-4">
                <form 
                v-if="editForm"
                id="contact-form"
                name="contact-form">
                <!--Grid row-->
                <h2>Compléter votre profil</h2>
                <div class="row">
                    <!--Grid column firstname-->
                    <div class="col-md-6">
                    <div class="md-form mb-0">
                        <label for="firstname" class=""></label>
                        <input
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
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="E-mail"
                        required
                        />
                    </div>
                    <div v-if="submitted && errors.has('email')" class="alert-danger">
                        {{ errors.first("email") }}
                    </div>
                    </div>
                    <div class="col-md-12">
                    <div class="md-form mb-0">
                        <label for="password" class=""></label>
                        <input
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
                        type="text"
                        name="fonction"
                        class="form-control"
                        placeholder="Fonction"
                        />
                    </div>
                    </div>
                    <!--Grid row-->
                </div>

                <button class="btn-update-profil col-sm-3">Modifier</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>

// imports 
import Sidebar from "../components/Sidebar";
import axios from "axios"
import Swal from "sweetalert2"


export default {
  name: "Profil",
  components: { Sidebar },
  data() {
      return {
          user: JSON.parse(localStorage.getItem('user')),
          editForm: false,
          message: ''
      }
  },
  computed: {
      currentUser() {
        return this.$store.state.auth.user
    },
  },

  methods: {
        displayForm() {
        return (this.editForm = true)
        },

        updateInfoAccount() {
            
        },

        deleteAccount() {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            let user = userData
            console.log(user)

            Swal.fire({
                title: "Voulez vous supprimer votre compte?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Supprimé!",
                cancelButtonText: "Annulé",
                confirmButtonColor: "#0a2042",
                cancelButtonColor: "#cf525c",
            })
            .then(result => {
                if(result.isConfirmed) {
                    axios.delete(`http://localhost:3000/api/user/${user.userId}`, {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json"
                    },
                    })
                    .then(() => {
                        console.log('Vous avez supprimé votre compte!')
                    })
                    .catch(error  => { return error });
                    localStorage.removeItem("user");
                    this.user = "";
                    this.$router.push("/");
                    window.location.reload();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Annulé')
                }

            })
            
        }

  },

  mounted() {
      if(!this.currentUser) {
          this.$router.push('/login')
      }
  }

}; 
</script>

<style lang="scss">
    .profil {
        display: flex;
        justify-content: center;
        margin-top: 120px;
        padding: 1em;
        .name {
            text-align: left;
            @media (max-width: 500px) { 
        width: 100%;
        font-size: 1em;
     }

        }
    @media (max-width: 500px) { 
        width: 100%;
     }
}
.profil-content {
    justify-content: center;
    .profil-content-info {
        margin: auto;
        .profil-picture {
        background: #ffffff;
        padding: 0.5em;
        display: flex;
        align-items: center;
        border-radius: 20px;
        margin-top: 10px;
        .fonction {
            text-align: left;
        }
        
        }
        .profil-actions{
            display: flex;
            justify-content: space-between;
            margin: 20px 0px 40px;
            .cursor-pointer{
                &:hover{
                     cursor: pointer;
                    color: rgb(207, 82, 92);
                }
            }
        }
         @media (max-width: 500px) { 
        width: 90%;
     }
    }
   
    }

    .btn-update-profil {
        padding: 0.3em;
        border: 2px solid rgb(207, 82, 92);
        color: rgb(10, 32, 66);
        background: none;
        margin-top: 30px;
        border-radius: 5px;
        &:hover {
            background: rgb(207, 82, 92);
            color: #ffffff;
        }
    }

    .img-profil {
    width: 100px;
    border-radius: 100%;
    }


</style>
