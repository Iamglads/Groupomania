<template>
    <div class="home">
        <Sidebar />
        <div class="home-content row col-md-6 ">
            <div class="home-content-block ">
                <h1> Publication </h1>
                <div class="divider"></div>
                <!-- post form -->
                <form>
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
                        <label for="exampleFormControlFile1">Ajouter une image</label>
                        <input 
                        @change="previewFiles"
                        type="file" 
                        class="form-control-file" 
                        ref="myFiles"
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
                <section  class="home-content-info">
                    <!-- boucle dans le tableau afin de recupérer tous les posts -->
                    <article v-for="currentPost in currentPosts" :key="currentPost.id"  class="home-content-posts">
                        <p> 
                            <i class="fas fa-user"></i> 
                             {{currentPost.User.firstname}}
                            <strong>  {{currentPost.User.lastname}} </strong> 
                        </p>
                        <p>{{ moment(currentPost.createdAt).fromNow() }}</p>
                         <hr class="my-1">
                        <h3>  {{ currentPost.title}} </h3>
                        <div class="home-content-posts-img">
                            <img  src="../assets/glad.jpg" alt="photo">
                        </div>
                        <div class="home-content-text">
                            <p>  {{ currentPost.content}}  </p>
                        </div>
                        <hr class="my-4">
                        <!-- likes and comments -->
                        <div class="actions-post">
                            <div>
                                <i class="fas fa-thumbs-up"></i>
                                <span> 0 </span>
                            </div> 
                            <div>
                                <i class="fas fa-comment-dots"></i> 
                                <span> 0 </span>
                            </div> 
                            <!-- Upadate post -->
                             <div v-on:click="showForm" class="cursor-pointer">
                                <i class="fas fa-user-edit"></i>
                            </div>
                            <!-- Delete post-->
                             <div @click="deletePost()" class="cursor-pointer">
                                <i class="far fa-trash-alt"></i>
                            </div>
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
            console.log(response.data);
            })
            .catch((err) => {console.log(err);});
        
    },

    methods: {
        createPost() {
            let data = {
                title: this.post.title,
                content: this.post.content,
                attachment: this.previewFiles(),
            }

            axios.post('http://localhost:3000/api/post', data, {
                headers: {
                Authorization: `Bearer ${this.userData.token}`,
                "Content-type": "application/json"
              },
            })
            .then((response) => {
                this.post.userId = response.data.userId
                console.log(response.data)
                this.submitted = true
            })
            .catch(err => { console.log(err)})   
            window.location.reload();  
            
        },
        newPost() {
            this.submitted = false
            this.post = {}
        },

        previewFiles() {
            this.files = this.$refs.myFiles.files
        },


        deletePost() {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            let user = userData
            console.log(user)

            axios.delete(`http://localhost:3000/api/post/${user.userId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            })
            .then(() => {
                console.log('Vous avez supprimé votre compte!')
            })
            .catch(error  => { return error });
            window.location.reload();     
            
        }       
}
}
</script>

<style lang="scss">
    .home{
        display: flex;
        justify-content: center;
        h1{
            text-align: left;
        }
    }

    .home-content{
        width: 80%;
        display: flex;
        justify-content: center;
        margin-top: 120px;
    }

    .home-content-info{
        .home-content-posts{
            height: auto;
            background: #ffffff;
            border-radius: 20px;
            padding: 1em;
            margin-bottom: 10px;
            .home-content-posts-img{
                height: auto;
                background:  rgb(167, 184, 208);
                img{
                    max-width: 100%;
                    height: auto;
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

    .actions-post{
        display: flex;
        justify-content: space-evenly;
        .fas{
            font-size: 20px;
        }
    }

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

</style>