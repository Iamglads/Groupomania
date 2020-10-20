<template>
    <!-- all posts -->
    <section  class="display__posts">
        <!-- boucle dans le tableau afin de recupérer tous les posts -->
        <article v-for="currentPost in currentPosts" :key="currentPost.id"  class="display__posts--bloc">
            <p> 
                <i class="fas fa-user-clock"></i>
                    {{currentPost.User.firstname}}
                <strong>  {{currentPost.User.lastname}} </strong> - 
                <span> Posté {{ moment(currentPost.createdAt).fromNow() }}</span>
            </p>
                <hr class="my-1">
            <h3>  {{ currentPost.title}} </h3>
            <!-- image publication -->
            <div v-if="currentPost.attachment" class="post-img">
                <img  v-bind:src=" currentPost.attachment " alt="photo">
            </div>
            <!-- text publication -->
            <div class="post-content">
                <p>  {{ currentPost.content}}  </p>
            </div>
                
            <!-- commentaire publication -->
            <div class="post-comment">
                    <input 
                type="text" 
                class="input-comment" 
                placeholder="Commenter" 
                />
                <span class="validate-comment cursor-pointer">
                    <i class="fas fa-check"></i>
                </span>
            </div> 
            <!-- display comments -->               
            <div v-for="comment in currentComments" :key="comment.id" class="display-comment">
                <div v-if="currentPost.id == comment.PostId">
                    <span>{{ comment.User.firstname }}<strong>{{comment.User.lastname}}</strong> </span>
                    <p>{{comment.comment}}</p>
                </div> 
                <div
                v-if="currentUser.id == comment.UserId"
                @click.prevent="deleteComment(comment.id)" 
                class="cursor-pointer"
                >
                    <i  class="far fa-trash-alt"></i>
                </div>
            </div>
            <hr class="my-1">
                <!-- likes and comments -->
                <div class="post-actions">
                <div class="cursor-pointer">
                    <i class="fas fa-thumbs-up"></i>
                    <span> 0 </span>
                </div> 
                <div class="cursor-pointer">
                    <i class="fas fa-comment-dots"></i> 
                    <span> 0 </span>
                </div> 
                <!-- Delete post-->
                    <div
                    v-if="currentUser.id == currentPost.UserId"
                    @click.prevent="deletePost(currentPost.id)" 
                    class="cursor-pointer"
                >
                    <i  class="far fa-trash-alt"></i>
                </div>
            </div>               
        </article>
    </section>
    <!-- all posts end-->
</template>

<script>
// imports 
//import Comment from '../components/Comment'
import axios from 'axios'
const moment = require('moment')
moment.locale('fr')


export default {
    name: "DisplayPosts",
    data() {
        return {
            moment: moment,
            userData : JSON.parse(localStorage.getItem("user")),
            currentPosts: [],
            currentComments: [],
            message: "",
            submitted: false,
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
            // posts
            axios.get('http://localhost:3000/api/post', {
                 headers: {
                    Authorization: `Bearer ${userData.token}`,
                    "Content-type": "application/json"
              },
            })
            .then((response) => {
                if(!response) return []
                else {
                    this.currentPosts = response.data
                    //console.log(response.data);
                }
            })
            .catch((err) => console.log(err));

            // comments
            axios.get('http://localhost:3000/api/comment', {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                this.currentComments = response.data
                //console.log(response.data);
            })
            .catch((err) => console.log(err))
        
    },

    methods: {
        // delete post
        deletePost(currentPostId) {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            console.log(userData)

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
            
        },
        // delete comment 
         deleteComment(commentId) {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token

            axios.delete(`http://localhost:3000/api/comment/${commentId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            })
            .then(() => {
                console.log('Vous avez supprimé votre commentaire!')
                window.location.reload();
            })
            .catch(error  => { return error });
            
        }

    }
}
</script>

<style lang="scss">
    .display__posts{
        &--bloc{
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

            .post-comment{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .input-comment{
                    width: 85%;
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                    border: none;
                    padding: .4em;
                    background: #eeeeee;
                }
                .validate-comment{
                    color:#ffffff;
                    font-size: 1.5em;
                    width: 15%;
                    background: #0a2042;
                    border-top-right-radius: 20px;
                    border-bottom-right-radius: 20px;
                    &:hover{
                        background: rgb(207, 82, 92);
                    }
                }
            }
            .display-comment{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                border-radius: 10px;
                padding: 0.5em;
                text-align: left;
                background: #eeeeee;
                color: #0a2042;
            }
        }

    }

</style>