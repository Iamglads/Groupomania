<template>
    <div class="profil">
        <Sidebar />
        <div class="profil__content col-md-6 ">
            <section class="profil__content--info">
                <h1>Profil</h1>
                <div class="divider"></div>
                <article class="profil-picture">            
                     <div class="col-md-6">
                         <i class="fas fa-user-circle"></i>
                           
                        </div>
                    <div>
                        <h1 class="name">{{currentUser.firstname}} <strong>{{currentUser.lastname}}</strong> <br />
                        <span class="fonction">{{currentUser.fonction}}</span></h1>
                    </div>
                </article>
                 <!-- update and delete profil informations -->
                <div class="profil-actions">
                    <div @click="displayForm()" class="cursor-pointer">
                        <i class="fas fa-user-edit"></i>
                        <span> Modifier </span>
                    </div>
                    <div @click="deleteAccount(currentUser.id)" class="cursor-pointer">
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
                                name="password"
                                class="form-control"
                                placeholder="password"
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
                                />
                            </div>
                        </div>
                        <!--Grid row-->
                    </div>
                    <button @click="updateInfoAccount(currentUser.id)" class="btn-update-profil col-sm-3">Enregistrer</button>
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
          editForm: false,
          message: '',
          submitted: false,
          updateUser: {
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              fonction: '',
              picture: ''
          }
      }
  },
  computed: {
      currentUser() {
        return this.$store.state.auth.user
    },

    loggedIn() {
        return this.$store.state.auth.loggedIn
    }
  },

  beforeCreated() {
      if(!this.loggedIn) {
          this.$router.push('/')
      }
  },

  methods: {
        displayForm() {
        return (this.editForm = true)
        },
        // update user account
        updateInfoAccount(currentUserId) {
            this.submitted = true

            if(this.updateUser.firstname == '') {
                this.updateUser.firstname = this.currentUser.firstname
            }
            if(this.updateUser.lastname == '') {
                this.updateUser.lastname = this.currentUser.lastname
            }
            if(this.updateUser.email == '') {
                this.updateUser.email = this.currentUser.email
            }
            if(this.updateUser.password == '') {
                this.updateUser.paswword = this.currentUser.password
            }
            if(this.updateUser.fonction == '') {
                this.updateUser.fonction = this.currentUser.fonction
            }

            axios.put(`http://localhost:3000/api/user/unique/${currentUserId}`, {
                firstname: this.updateUser.firstname,
                lastname: this.updateUser.lastname,
                email: this.updateUser.email,
                password: this.updateUser.password,
                fonction: this.updateUser.fonction
            }, 
            {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${this.currentUser.token}`,
            }
          })
          .then((data) => {
              localStorage.removeItem('user')
              localStorage.setItem('user', JSON.stringify(data.data))
              //window.location.reload()
              this.message === "Vous avez modifié vos informations!"
          })
          .catch(err => {
              return err
          })
        },
        // delete user acccount
        deleteAccount() {

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
                    axios.delete(`http://localhost:3000/api/user/unique/${this.currentUser.id}`, {
                        headers: {
                        Authorization: `Bearer ${this.currentUser.token}`,
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
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Annulé')
                }

            })
            
        }

  },

  mounted() {
      if(!this.currentUser) {
          this.$router.push('/')
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
                    justify-content: center;
                    align-items: center;
                    border-radius: 20px;
                    margin-top: 10px;
                    .img-profil {
                        width: 100px;
                        border-radius: 100%;
                    }
                    .fonction {
                        font-size: 15px;
                    }
                    .fa-user-circle{
                        font-size: 150px;
                    }
                    h1{
                        @media (max-width: 600px) { 
                        text-align: center;
                        }
                    }
                    p{
                        @media (max-width: 600px) { 
                        text-align: center;
                        }
                    }

                    @media (max-width: 600px) { 
                        display: block;
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
