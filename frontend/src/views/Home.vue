<template>
    <div class="home">
        <Sidebar />
        <div class="home__content row col-md-6 ">
            <div class="home__content--block ">
                <h1> Publication </h1>
                <div class="divider"></div>
                <!-- post form -->
                <form class="home__post--form">
                    <div class="form-group">
                        <label></label>
                        <input 
                        v-model="post.title"
                        type="text" 
                        class="form-control" 
                        aria-describedby="emailHelp" 
                        placeholder="Titre de la publication" 
                        />
                    </div>
                    <div class="form-group">
                        <label></label>
                        <input 
                        v-model="post.content"
                        type="textarea" 
                        class="form-control" 
                        placeholder="Ecrire votre publication" 
                        />
                    </div>
                    <div class="form-group">
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
                    <!-- submit button fom -->
                    <button @click="createPost()" type="submit" class="btn-post col-sm-3">Publier</button>
                    <!-- display erros -->
                    <p v-if="message" class="alert alert-danger"> {{ message }}</p>
                </form>
                <!-- form add post -->
                 <hr class="my-4">
                <!-- all posts -->
                <section  class="home-post">
                    <!-- boucle dans le tableau afin de recupérer tous les posts -->
                    <article v-for="currentPost in currentPosts" :key="currentPost.id"  class="post-bloc">
                        <p> 
                            <i class="fas fa-user"></i> 
                             {{currentPost.User.firstname}}
                            <strong>  {{currentPost.User.lastname}} </strong> 
                        </p>
                        <p>{{ moment(currentPost.createdAt).fromNow() }}</p>
                         <hr class="my-1">
                        <h3>  {{ currentPost.title}} </h3>
                        <!-- image publication -->
                        <div class="post-img">
                            <img  src="../assets/glad.jpg" alt="photo">
                        </div>
                        <!-- text publication -->
                        <div class="post-content">
                            <p>  {{ currentPost.content}}  </p>
                        </div>
                          <!-- likes and comments -->
                          <hr class="my-1">
                        <div class="post-actions">
                            <div>
                                <i class="fas fa-thumbs-up"></i>
                                <span> 0 </span>
                            </div> 
                            <div>
                                <i class="fas fa-comment-dots"></i> 
                                <span> 0 </span>
                            </div> 
                            <!-- Delete post-->
                             <div
                             v-if="currentUser.id == currentPost.UserId"
                              @click.prevent="deletePost(currentPost.id)" 
                              class="cursor-pointer">
                                <i  class="far fa-trash-alt"></i>
                            </div>
                        </div>
                        <hr class="my-1">
                        <!-- commentaire publication -->
                        <div class="post-commment">
                             <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Commentaire" 
                            />
                        </div> 
                        <!-- display comments -->
                        <div class="post-commment">
                          <p>Les commentaires seront affichés ici</p>
                        </div> 
                        
                    </article>
                </section>
                <!-- all posts end-->
            </div>
        </div>
    </div>
</template>

<script>
// imports 
import Sidebar from '../components/Sidebar'
import axios from 'axios'
const moment = require('moment')
moment.locale('fr')


export default {
    name: "Home",
    components: { Sidebar},
    data() {
        return {
            moment: moment,
            userData : JSON.parse(localStorage.getItem("user")),
            currentPosts: [],
            message: "",
            submitted: false,
            post: {
                title: '',
                content: '',
                attachment: '',
            }
        }
    },

    computed: {
      currentUser() {
        return this.$store.state.auth.user
    }
    },
    // get and display all posts
    beforeCreate() {
            let userData = JSON.parse(localStorage.getItem("user"))
            axios.get('http://localhost:3000/api/post', {
                 headers: {
                    Authorization: `Bearer ${userData.token}`,
                    "Content-type": "application/json"
              },
            })
            .then((response) => {
            this.currentPosts = response.data;
            //console.log(response.data);
            })
            .catch((err) => {console.log(err);});
        
    },

    methods: {
        createPost() {
            let data = {
                title: this.post.title,
                content: this.post.content,
                attachment: this.selectFile(),
            }

            axios.post('http://localhost:3000/api/post', data, {
                headers: {
                Authorization: `Bearer ${this.userData.token}`,
                "Content-type": "application/json"
              },
            })
            .then((response) => {
                this.post.id = response.data.id
                console.log(response.data)
                this.submitted = true
            })
            .catch(err => { console.log(err)})   
            window.location.reload();  
            
        },

        selectFile() {
            this.post.attachment = this.$refs.file.files
        },


        deletePost(currentPostId) {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            let user = userData
            console.log(user)

            axios.delete(`http://localhost:3000/api/post/${currentPostId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            })
            .then(() => {
                console.log('Vous avez supprimé votre publication!')
                window.location.reload();
            })
            .catch(error  => { return error });
            
        }       
}
}
</script>

<style lang="scss">
    .home{
        display: flex;
        justify-content: center;
        .home__content{
            width: 80%;
            display: flex;
            justify-content: center;
            margin-top: 120px;
            .home__post--form{
                  .btn-post{
                    padding: .3em;
                    border: 2px solid #cf525c;
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
            .home-post{
                .post-bloc{
                    height: auto;
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1em;
                    margin-bottom: 10px;
                    .post-img{
                        height: auto;
                        background:  rgb(167, 184, 208);
                        img{
                            max-width: 100%;
                            height: auto;
                        }
                    }
                    .post-actions{
                        display: flex;
                        justify-content: space-evenly;
                        .fas{
                            font-size: 20px;
                        }
                    }
                    h3{
                        text-align: left;
                    }
                    p{
                        text-align: left;
                    }
                }

            }
        }

    }

</style>