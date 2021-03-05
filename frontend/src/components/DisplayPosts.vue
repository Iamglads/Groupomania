<template>
    <!-- all posts -->
    <section  class="display__posts">
        <!-- boucle dans le tableau afin de recupérer tous les posts -->
        <article v-for="post in posts" :key="post.id"  class="display__posts--bloc">
             <!--  publication -->
            <div>
                 <p> 
                    <i class="fas fa-user-clock"></i>
                        {{post.User.firstname}}
                    <strong>  {{post.User.lastname}} </strong> - 
                    <span> Posté {{ moment(post.createdAt).fromNow() }}</span>
                </p>
                    <hr class="my-1">
                <h3>{{post.title}}</h3>
                <!-- image publication -->
                <div v-if="post.attachment" class="post-img">
                    <img  :src="post.attachment" alt="image">
                </div>
                <!-- text publication -->
                <div class="post-content">
                    <p>{{post.content}}</p>
                </div>
            </div>
                
            <!-- commentaire publication -->
            <div class="post-comment">
                <input 
                v-model="comment"
                type="text" 
                class="input-comment" 
                placeholder="Commenter" 
                />
                <span @click.prevent="createComment(post.id)" class="validate-comment cursor-pointer">
                    <i class="fas fa-check"></i>
                </span>
            </div> 
            <!-- display comments -->               
            <div v-for="comment in comments" :key="comment.id">
                <div v-if="post.id == comment.PostId" class="display-comment">
                    <div>
                        <span><strong>{{ comment.User.firstname }}{{comment.User.lastname}}</strong> </span>
                        <span> a commenté {{ moment(comment.createdAt).fromNow() }}</span>
                        <p>{{comment.comment}}</p>
                    </div>               
                    <div
                    v-if="user.id == comment.UserId || user.isAdmin"
                    @click.prevent="deleteComment(comment.id)" 
                    class="cursor-pointer"
                    >
                        <i  class="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
            <hr class="my-1">
                <!-- likes and comments -->
                <div class="post-actions">
               <!--  <div @click.prevent="likePost()" class="cursor-pointer">
                    <i class="fas fa-thumbs-up"></i>
                    <span> 0 </span>
                </div>  -->
               <!--  <div class="cursor-pointer">
                    <i class="fas fa-comment-dots"></i> 
                    <span > {{commentQuantity(post.id).length}}</span>
                </div>  -->
                <!-- Delete post-->
                    <div
                    v-if="user.id == post.UserId || user.isAdmin"
                    @click.prevent="deletePost(post.id)" 
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
import CallApi from '../services/CallApi'
const moment = require('moment')

moment.locale('fr')


export default {
    name: "DisplayPosts",
    data() {
        return {
            moment: moment,
            userData : JSON.parse(localStorage.getItem("user")),
            posts: [],
            comments: [],
            message: "",
            submitted: false,
            comment: '',
            postId: '',
        }
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },
    // get and display all posts
    beforeCreate() {
            let userData = JSON.parse(localStorage.getItem("user"))
            let token = userData.token
          
            CallApi.getPosts()
            .then(response => {
                this.posts = response.data
                return Promise.resolve(response.data)

            })
            .catch(err => console.log(err))

            // comments
            axios.get('http://localhost:5000/api/comment', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                this.comments = response.data
            })
            .catch((err) => console.log(err))
        
    },

    methods: {
        // create comment
         createComment(postId) {
            let userData = JSON.parse(localStorage.getItem("user"))
            let token = userData.token
            let postComment = {
                comment: this.comment,
                postId: postId
            }

            if(this.comment =="") this.message = "Vous commentaire est vide!"

            axios.post('http://localhost:5000/api/comment', postComment, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
              },
            })
            .then((response) => {
                console.log(response.data)
                this.submitted = true
                window.location.reload();  
            })
            .catch(err => { console.log(err)})   
            
        },

        // delete post
        deletePost(postId) {
            let userData = JSON.parse(localStorage.getItem('user'))
            let token = userData.token
            console.log(userData)

            axios.delete(`http://localhost:5000/api/post/${postId}`, {
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

            axios.delete(`http://localhost:5000/api/comment/${commentId}`, {
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

        },

        commentQuantity(id) {
            const quantity = this.comments.filter((comment) => comment.postId == id)
            return quantity
        }

    }
}
</script>

<style lang="scss">
    .display__posts{
        &--bloc{
            height: auto;
            background: #ffffff;
            border-radius: 10px;
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