<template>
    <div class="profil">
        <card class="profil__content--info">
            <md-card class="info-bloc">            
                <md-card-media class="user-picture">
                    <i class="fas fa-user-circle"></i>
                </md-card-media>

                <md-card-header>
                    <h1 class="name">{{user.firstname}} <strong>{{user.lastname}}</strong> <br />
                    <span class="fonction">{{user.fonction}}</span></h1>
                </md-card-header>

                <md-card-content>
                    Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s, when an unknown printer took 
                    a galley of type and scrambled it to make a type specimen 
                    book. It has survived not only five centuries, but also 
                    the leap into electronic typesetting, remaining essentially unchanged. 
                </md-card-content>
                <md-field>
                    <input 
                        @change="selectFile()"
                        accept="images/*"
                        type="file" 
                        ref="file"
                        id="file" 
                        />
                </md-field>
                <button class="btn" @click="addPicture()">Ajouter</button>

                <md-card-actions class="profil-actions">
                    <div @click="displayForm()" class="cursor-pointer">Modifier</div>
                    <div @click="deleteAccount(user.id)" class="cursor-pointer">Supprimé votre profil</div>
                </md-card-actions>
            </md-card>
        </card>

        <UpdateProfil />

    </div>
</template>

<script>

// imports 
import UpdateProfil from "../components/UpdateProfil"
import axios from "axios"
import Swal from "sweetalert2"


export default {
    name: "Profil",
    components: { UpdateProfil },
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
                user_picture: ''
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },

        loggedIn() {
            return this.$store.state.loggedIn
        }
    },

    beforeCreated() {
        if(!this.loggedIn) {
            this.$router.push('/')
        }
    },

    methods: {
        selectFile() {
            this.user_picture = this.$refs.file.files[0]
            console.log(this.user_picture)
        },

        addPicture() {

            console.log('Add user picture')
            let user_picture = this.user_picture
            let formdata = new FormData()
            formdata.append('user_picture', user_picture)

            console.log(formdata)

            axios.post('http://localhost:5000/api/user/picture', formdata , {
                headers: {
                Authorization: `Bearer ${this.user.token}`,
                }
            })
            .then(() => {
                 console.log('vous ajoutez une photo de profil')
            })
            .catch(err => {
                return err 
            })
        },

        displayForm() {
        return (this.editForm = true)
        },
        // update user account
        updateInfoAccount(userId) {
            this.submitted = true

            if(this.updateUser.firstname == '') {
                this.updateUser.firstname = this.user.firstname
            }
            if(this.updateUser.lastname == '') {
                this.updateUser.lastname = this.user.lastname
            }
            if(this.updateUser.email == '') {
                this.updateUser.email = this.user.email
            }
            if(this.updateUser.password == '') {
                this.updateUser.paswword = this.user.password
            }
            if(this.updateUser.fonction == '') {
                this.updateUser.fonction = this.user.fonction
            }

            axios.put(`http://localhost:5000/api/user/unique/${userId}`, {
                firstname: this.updateUser.firstname,
                lastname: this.updateUser.lastname,
                email: this.updateUser.email,
                password: this.updateUser.password,
                fonction: this.updateUser.fonction
            }, 
            {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${this.user.token}`,
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
                    axios.delete(`http://localhost:5000/api/user/unique/${this.user.id}`, {
                        headers: {
                        Authorization: `Bearer ${this.user.token}`,
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
      if(!this.user) {
          this.$router.push('/')
      }
  }

}; 
</script>

<style lang="scss">

@import '@/assets/sass/variables.scss'; 

    .profil {
        height: 100%;
        display: flex;
        justify-content: center;
        background: rgb(216, 216, 216);

        .profil__content {
            justify-content: center;
            &--info {
                margin: auto;
                padding: 1em;
                .info-bloc{
                    padding: 0.5em;
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
                    p{
                        @media (max-width: 600px) { 
                        text-align: center;
                        }
                    }
                    .btn{
                        padding: .3em;
                        border: 1px solid $second-color;
                        color: $main-color;
                        background: none;
                        margin-top: 10px;
                        border-radius: 5px;
                        max-width: 100px;
                        &:hover{
                            background:$second-color;
                            color: #ffffff;
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


</style>
