<template>
    <div class="profil">
        <Sidebar />
        <div class="profil__content col-md-6 ">
            <section class="profil__content--info">
                <h1>Profil</h1>
                <div class="divider"></div>
                <article class="profil-picture">
                    <img class="img-profil" src="../assets/glad.jpg" alt="logo_groupomania" />
                    <div>
                        <h1 class="name">{{currentUser.firstname}} <strong>{{currentUser.lastname}}</strong></h1>
                        <p class="fonction">{{currentUser.fonction}}</p>
                    </div>
                </article>
                 <!-- update and delete profil informations -->
                <div class="profil-actions">
                    <div @click="displayForm()" class="cursor-pointer">
                        <i class="fas fa-user-edit"></i>
                        <span> Modifier </span>
                    </div>
                    <div @click="deleteAccount()" class="cursor-pointer">
                        <i class="far fa-trash-alt"></i>
                        <span> Suprimer</span>
                    </div>
                </div>
            </section>

            <section class="profil__content--form">
                <hr class="my-4">
                <form v-if="editForm" id="contact-form" name="contact-form">
                    <!--Grid row-->
                    <h2>Compléter votre profil</h2>
                    <div class="row">
                        <!--Grid column firstname-->
                        <div class="col-md-6">
                        <div class="md-form mb-0">
                            <label for="firstname" class=""></label>
                            <input
                            v-model="updateUser.firstname"
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
                            v-model="updateUser.lastname"
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
                        <div class="col-md-6">
                        <div class="md-form mb-0">
                            <label for="email" class=""></label>
                            <input
                            v-model="updateUser.email"
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
                        <div class="col-md-6">
                            <div class="md-form mb-0">
                                <label for="password" class=""></label>
                                <input
                                v-model="updateUser.password"
                                type="password"
                                id="password"
                                name="password"
                                class="form-control"
                                placeholder="Mot de passe"
                                required
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form">
                                <label for="fonction" class=""></label>
                                <input
                                v-model="updateUser.fonction"
                                type="text"
                                name="fonction"
                                class="form-control"
                                placeholder="Fonction"
                                required
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="md-form nmb-0">
                                <label for="exampleFormControlFile1"></label>
                                <input 
                                @change="selectFile()"
                                accept="images/*"
                                type="file" 
                                class="form-control-file" 
                                ref="file"
                                id="file" 
                                />
                            </div>
                        </div>
                        <!--Grid row-->
                    </div>
                    <button @click="updateInfoAccount()" class="btn-update-profil col-sm-3">Enregistrer</button>
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
          user: JSON.parse(localStorage.getItem('user')).data,
          editForm: false,
          message: '',
          submitted: false,
          updateUser: {
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              fonction: ''
          }
      }
  },
  computed: {
      currentUser() {
        return this.$store.state.auth.user
    }
  },

  methods: {
        displayForm() {
        return (this.editForm = true)
        },
        // update user account
        updateInfoAccount() {
            this.submitted = true
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            let user = userData

            if(this.updateUser.firstname == '') {
                this.updateUser.firstname = userData.data.firstname
            }
            if(this.updateUser.lastname == '') {
                this.updateUser.lastname = userData.data.lastname
            }
            if(this.updateUser.email == '') {
                this.updateUser.email = userData.data.email
            }
            if(this.updateUser.fonction == '') {
                this.updateUser.fonction = userData.data.fonction
            }

            axios.put(`http://localhost:3000/api/user/${user.userId}`, {
                firstname: this.updateUser.firstname,
                lastname: this.updateUser.lastname,
                email: this.updateUser.email,
                password: this.updateUser.password,
                fonction: this.updateUser.fonction
            }, 
            {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          })
          .then((data) => {
              localStorage.removeItem('user')
              localStorage.setItem('user', JSON.stringify(data.data))
              window.location.reload()
              this.message === "Vous avez modifié vos informations!"
          })
          .catch(err => {
              return err
          })
        },
        // delete user acccount
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

        .profil__content {
            justify-content: center;
            &--info {
                margin: auto;
                .profil-picture {
                    background: #ffffff;
                    padding: 0.5em;
                    display: flex;
                    align-items: center;
                    border-radius: 20px;
                    margin-top: 10px;
                    .img-profil {
                        width: 100px;
                        border-radius: 100%;
                    }
                    .fonction {
                        text-align: left;
                    }
                }
                .profil-actions{
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0px 40px;
                }
            @media (max-width: 500px) { 
                width: 90%;
            }
        }
   
    }
    @media (max-width: 500px) { 
        width: 100%;
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

</style>
