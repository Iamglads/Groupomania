<template>
    <div>
    <!-- commentaire publication -->
        <md-field md-inline>
            <label> Commenter </label>
            <md-input v-model="comment"  @keyup.enter="createComment(postId)"></md-input>
            <span v-if="message"> {{ message }}</span>
        </md-field>

        <md-list-item v-for="comment in comments" :key="comment.id">
            <div v-if="postId == comment.PostId">
                <div class="md-title">
                    {{ comment.User.firstname }}{{comment.User.lastname}} -
                    <span class="heureCommentaire"> a commenté {{ moment(comment.createdAt).fromNow() }}</span>
                </div>
                <p>{{comment.comment}}</p>
            </div>               
            <md-button
            v-if="user.id == comment.UserId || user.isAdmin"
            @click.prevent="deleteComment(comment.id)" 
            class="cursor-pointer"
            >
                <i  class="far fa-trash-alt"></i>
            </md-button>
        </md-list-item>
    </div>
</template>

<script>
import axios from 'axios'
const moment = require('moment')
import CallApi from '../services/CallApi'


export default {
    name: "Comments",
     props: {
        postId: {
            type: Number
        },
    },

    data() {
        return {
            moment: moment,
            comments: [],
            comment: '',
            message: ''
        }
    },


    computed: {
        user() {
            return this.$store.state.user
        }
    },

    created () {
        console.log(this.$props)
        // comments
        CallApi.getComments()
        .then((response) => {
            //console.log(response.data)
            this.comments = response.data
        })
        .catch((err) => console.log(err))
    },

    methods: {

        // create comment
         createComment(postId) {
            let postComment = {
                comment: this.comment,
                postId: postId
            }

            if(!this.comment =="") {
                 axios.post('http://localhost:5000/api/comment', postComment, {
                headers: {
                Authorization: `Bearer ${this.user.token}`,
                "Content-type": "application/json"
              },
            })
            .then((response) => {
                console.log(response.data)
                this.submitted = true
                window.location.reload();  
            })
            .catch(err => { console.log(err)}) 
            } 
            else {
                 this.message = "Le champs est vide!"
            }
            
           

             
            
        },
        
          // delete comment 
         deleteComment(commentId) {

            axios.delete(`http://localhost:5000/api/comment/${commentId}`, {
                headers: {
                Authorization: `Bearer ${this.user.token}`,
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

    .heureCommentaire {
        font-size: 10px;
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

</style>