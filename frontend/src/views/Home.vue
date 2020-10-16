<template>
    <div class="home">
        <Sidebar />
        <div class="home-content row">
            <div class="home-content-block col-md-6 mt-5 mx-auto">
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
                        <label for="exampleFormControlFile1"></label>
                        <input 
                        @change="previewFiles"
                        type="file" 
                        class="form-control-file" 
                        ref="myFiles"
                        id="file" 
                        />
                    </div>
                    <!-- submit button fom -->
                    <button @click="createPost()" type="submit" class="btn-post col-md-12">Publier</button>
                    <!-- display erros -->
                    <p v-if="message" class="alert alert-danger"> {{ message }}</p>
                </form>
                <!-- form add post -->
                 <hr class="my-4">
                <!-- all posts -->
                <section v-for="currentPost in currentPosts" :key="currentPost.id" class="home-content-info">
                    <!-- boucle dans le tableau afin de recupérer tous les posts -->
                    <article  class="home-content-posts">
                        <p> 
                            <i class="fas fa-user"></i> 
                            {{ currentPost.user.firstname}}
                            <strong> {{ currentPost.user.lastname}} </strong> 
                        </p>
                        <div class="home-content-posts-img">
                            <img  src="../assets/glad.jpg" alt="photo">
                        </div>
                        <div class="home-content-text">
                            <h3>  {{ currentPost.title}} </h3>
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
                             <div class="cursor-pointer">
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

export default {
    name: "Home",
    components: { Sidebar},
    data() {
        return {
            userData : JSON.parse(localStorage.getItem("user")),
            currentPosts: [],
            message: "",
            submitted: false,
            post: {
                id: '',
                title: '',
                content: '',
                attachment: '',
            }
        }
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
        },
        newPost() {
            this.submitted = false
            this.post = {}
        },

        previewFiles() {
            this.files = this.$refs.myFiles.files
        },

        // get and display all posts

         beforeCreate() {
            axios.get('http://localhost:3000/api/post', {
                 headers: {
                    Authorization: `Bearer ${this.userData.token}`,
                    "Content-type": "application/json"
              },
            })
            .then((response) => {
            this.currentPosts = response.data;
            console.log(response.data);
            })
            .catch((err) => {console.log(err);});
        
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
        margin-top: 110px;
    }

    .home-content-info{
        display: flex;
        max-width: 600px;
        .home-content-posts{
            height: auto;
            background: #ffffff;
            border-radius: 20px;
            padding: 1em;
            .home-content-posts-img{
                    height: auto;
                    background:  rgb(167, 184, 208);
                    img{
                        max-width: 100%;
                        height: auto;
                    }
            }
            .home-content-text{
                h3{
                    text-align: left;
                }
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

</style>