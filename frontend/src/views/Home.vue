<template>
    <div class="home">
        <Sidebar />
        <div class="home__content row col-md-6 ">
            <div class="home__content--block ">
                <h1> Publication </h1>
                <div class="divider"></div>
                <!-- post form -->
                <form class="home-form" enctype="formdata">
                    <div>
                        <input 
                        v-model="post.title"
                        type="text" 
                        class="form-control" 
                        aria-describedby="emailHelp" 
                        placeholder="Titre de la publication" 
                        />
                    </div>
                    <div>
                        <textarea 
                        v-model="post.content"
                        type="textarea" 
                        class="form-control" 
                        placeholder="Ecrire votre publication" 
                        />
                    </div>
                    <div>
                        <label></label>
                        <input 
                        @change="selectFile()"
                        accept="images/*"
                        type="file" 
                        class="form-control-file" 
                        ref="file"
                        id="file" 
                        />
                    </div>
                    <div>
                        <!-- submit button fom -->
                        <button @click="createPost()" type="submit" class="btn-post col-sm-3">Publier</button>
                        <!-- display erros -->
                        <p v-if="message" class="alert alert-danger"> {{ message }}</p>
                    </div>
                </form>
                <!-- form add post -->
                 <hr class="my-2">
                <!-- all posts -->
                <DisplayPosts />
                <!-- all posts end-->
            </div>
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
            userData : JSON.parse(localStorage.getItem("user")),
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
        loggedIn() {
        return this.$store.state.status.loggedIn
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
            this.post.attachment = this.$refs.file.files[0];  
            console.log(this.post.attachment)
        },
        // create post
        createPost() {
            let postContent = {
                title: this.post.title,
                content: this.post.content,
                attachment: this.post.attachment,
            }

            console.log(postContent)

            if(this.post.title =="") this.message = "Ajoutez un titre à votre publication!"
            let formdata  = new FormData ();
            formdata.append('attachment', postContent.attachment, postContent.attachment.name);
              formdata.append('title', JSON.stringify(postContent.title));
                formdata.append('content', JSON.stringify(postContent.content));

           
            axios( {url: 'http://localhost:3000/api/post',
                    method: 'post',
                    data: formdata,
                    headers: {
                        Authorization: `Bearer ${this.userData.token}`
                    }
            
            })
            .then((response) => {
                this.post.id = response.data.id
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
    .home{
        display: flex;
        justify-content: center;
        .home__content{
            width: 80%;
            display: flex;
            justify-content: center;
            margin-top: 120px;
            .home-form{
                .form-control{
                    border-radius: 25px;
                    margin-top: 10px;
                    font-size: 14px;
                }
                .btn-post{
                    padding: .3em;
                    border: 1px solid #cf525c;
                    color: #0a2042;
                    background: none;
                    margin-top: 10px;
                    border-radius: 5px;
                    &:hover{
                        background:rgb(207, 82, 92);
                        color: #ffffff;
                    }
                }
            }
            
        }

    }

</style>