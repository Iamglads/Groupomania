<template>
    <!-- all posts -->
    <section  class="display__posts">
        <!-- boucle dans le tableau afin de recupérer tous les posts -->
        <md-card v-for="post in posts" :key="post.id"  class="display__posts--bloc">
            <md-card-header> 
                <md-avatar>
                     <img  :src="post.attachment" :alt="post.title">
                </md-avatar>
                <div class="md-title"> {{post.User.firstname}}  {{post.User.lastname}} </div> 
                <div class="md-subhead"> Posté {{ moment(post.createdAt).fromNow() }}</div>
            </md-card-header>
            
            <md-card-media v-if="post.attachment" class="post-img">
                <img  :src="post.attachment" :alt="post.title">
            </md-card-media>

            <md-card-content >
                <p>{{post.content}}</p>
            </md-card-content>

            <!-- display comments -->               
            <Comments :postId="post.id" />    
            <md-card-actions class="post-actions">
                <i
                v-if="user.id == post.UserId || user.isAdmin"
                @click.prevent="deletePost(post.id)" 
                 class="far fa-trash-alt"> </i>
            </md-card-actions>           
        </md-card>
    </section>
    <!-- all posts end-->
</template>

<script>
// imports 
import Comments from '../components/Comments'
import axios from 'axios'
import CallApi from '../services/CallApi'
const moment = require('moment')

moment.locale('fr')


export default {
    name: "DisplayPosts",
    components: { Comments },

    data() {
        return {
            moment: moment,
            posts: [],
            message: "",
            submitted: false,
            postId: '',
        }
    },

    computed: {
        user() {
            return this.$store.state.user
        }
    },
    
    beforeCreate() {
          
        CallApi.getPosts()
        .then(response => {
            this.posts = response.data || []
        })
        .catch(err => console.log(err))
        
    },

    methods: {

        // delete post
        deletePost(postId) {

            axios.delete(`http://localhost:5000/api/post/${postId}`, {
                headers: {
                Authorization: `Bearer ${this.user.token}`,
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
                    max-width: 300px;
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

    .post-img{
                height: auto;
                background:  rgb(167, 184, 208);
                img{
                    max-width: 100%;
                    height: auto;
                }
    }

</style>