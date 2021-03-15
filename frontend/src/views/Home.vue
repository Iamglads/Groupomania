<template>
    <div class="home">
        <Sidebar />
        <div class="home__content ">
            <div class="home__content--createPost">
                <h1> 
                    {{ user.firstname }}, Publiez maintenant
                </h1>
                <!-- post form -->
                <form enctype="formdata">
                    <md-field>
                        <label>Titre de la publication</label>
                        <md-input 
                        v-model="post.title" 
                        aria-describedby="Titre de la publication"
                        @focus="showAllForm = true"
                        @keydown="showAllForm = true"
                        ></md-input>
                    </md-field>
                    <div v-if="showAllForm">
                        <md-field>
                            <label>Votre publication</label>
                            <md-textarea v-model="post.content"></md-textarea>
                        </md-field>
                        <div>
                            <md-field>
                                <input 
                                @change="selectFile()"
                                accept="images/*"
                                type="file" 
                                ref="file"
                                id="file" 
                                />
                            </md-field>
                                <!-- submit button fom -->
                            <button @click="createPost()" type="submit" class="btn-post col-sm-3">Publier</button>
                                <!-- display erros -->
                            <div> 
                                <p v-if="message" class="alert alert-danger"> {{ message }}</p>
                            </div>
                        </div>
                    </div>
                </form>
                    <!-- form add post -->
            </div>
            <!-- COMPONENT DISPLAY POST -->
            <DisplayPosts />
        </div>
    </div>
</template>

<script>
// imports 
import DisplayPosts from '../components/DisplayPosts'
import Sidebar from '../components/Sidebar'
import axios from 'axios'


export default {
    name: "Home",
    
    components: { Sidebar, DisplayPosts},
    data() {
        return {
            message: "",
            submitted: false,
            showAllForm: false,
            post: {
                title: "",
                content: "",
                attachment: "",
            }
        }
    },
    
    computed: {
        loggedIn() {
        return this.$store.state.status.loggedIn
        },
         user() {
            return this.$store.state.user
        }
    },

    beforeCreated() {
        if(!this.loggedIn) {
            this.$router.push('/')
        }
    },
    
    methods: {
        // select file
        selectFile(){
            this.post.attachment = this.$refs.file.files[0]
            console.log(this.post.attachment)
        },
        // create post
        createPost() {
            let postContent = {
                title: this.post.title,
                content: this.post.content,
                attachment: this.post.attachment,
            }


            if(this.post.title =="") this.message = "Ajoutez un titre à votre publication!"
            let formdata  = new FormData ();
            formdata.append('attachment', postContent.attachment, postContent.attachment.name);
              formdata.append('title', postContent.title);
                formdata.append('content', postContent.content);

           
            axios( {url: 'http://localhost:5000/api/post',
                    method: 'post',
                    data: formdata,
                    headers: {
                        Authorization: `Bearer ${this.user.token}`
                    }
            
            })
            .then((response) => {
                //this.post.id = response.data.id
                console.log(response.data)
                this.submitted = true
                window.location.reload();  
            })
            .catch(err => { console.log(err)})   
            
        }   

    }
}
</script>

<style lang="scss">
 
 @import '@/assets/sass/variables.scss';

.home{
    display: flex;
    justify-content: center;
    background: rgb(216, 216, 216);
    .home__content{
        width: 60%;
        min-width: 300px;
        padding: 130px 1em;
        &--createPost{
            background: #ffffff;
            border-radius: 10px;
            padding: 1em;
            margin-bottom: 10px;
        }

        .btn-post{
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
    

        @media screen and (max-width: 400px){
            width: 100%;
        }  
    }

}

</style>