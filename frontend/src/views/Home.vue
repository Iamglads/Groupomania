<template>
  <div class="home">
    <div class="home__content ">
      <div class="home__content--block col-md-6">
        <div class="home__content--form">
          <h1>{{ user.firstname }} Publiez un poste...</h1>
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
              <!-- display erros -->
              <p v-if="message" class="alert alert-danger">{{ message }}</p>
            </div>
            <div class="select-img-and-btn">
              <span class="btn btn-file">
                <i class="fas fa-cloud-upload-alt"></i>
                Importer une image
                <input
                  @change="selectFile()"
                  accept="images/*"
                  type="file"
                  class="form-control-file"
                  ref="file"
                  id="file"
                />
              </span>
              <!-- submit button fom -->
              <button
                @click="createPost()"
                type="submit"
                class="btn-post col-sm-3"
              >
                Publier
              </button>
            </div>
          </form>
          <!-- form add post -->
        </div>
        <!-- all posts -->
        <DisplayPosts />
        <!-- all posts end-->
      </div>
    </div>
  </div>
</template>

<script>
// imports
import DisplayPosts from "../components/DisplayPosts";
import axios from "axios";

export default {
  name: "Home",
  components: { Sidebar, DisplayPosts },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("user")),
      message: "",
      submitted: false,
      post: {
        title: "",
        content: "",
        attachment: "",
      },
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.status.loggedIn;
    },

    user() {
      return this.$store.state.user;
    },
  },

  beforeCreated() {
    if (!this.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    // select file
    selectFile() {
      this.post.attachment = this.$refs.file.files[0];
      console.log(this.post.attachment);
    },
    // create post
    createPost() {
      let postContent = {
        title: this.post.title,
        content: this.post.content,
        attachment: this.post.attachment,
      };

      console.log(postContent);

      if (this.post.title == "")
        this.message = "Ajoutez un titre à votre publication!";
      let formdata = new FormData();
      formdata.append(
        "attachment",
        postContent.attachment,
        postContent.attachment.name
      );
      formdata.append("title", JSON.stringify(postContent.title));
      formdata.append("content", JSON.stringify(postContent.content));

      axios({
        url: "http://localhost:5000/api/post",
        method: "post",
        data: formdata,
        headers: {
          Authorization: `Bearer ${this.userData.token}`,
        },
      })
        .then((response) => {
          //this.post.id = response.data.id
          console.log(response.data);
          this.submitted = true;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/variables.scss";

.home {
  display: flex;
  justify-content: center;
  .home__content {
    width: 80%;
    display: flex;
    justify-content: center;
    margin-top: 120px;
    &--form {
      background: #ffffff;
      border-radius: 10px;
      padding: 1em;
      margin-bottom: 30px;
    }
    .home-form {
      .form-control {
        border-radius: 10px;
        margin-top: 10px;
        font-size: 14px;
      }
      .select-img-and-btn {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn-file {
          position: relative;
          overflow: hidden;
          padding: 0.3em;
          border: 1px solid $second-color;
        }
        .btn-file input[type="file"] {
          position: absolute;
          top: 0;
          right: 0;
          min-width: 100%;
          min-height: 100%;
          font-size: 100px;
          text-align: right;
          filter: alpha(opacity=0);
          opacity: 0;
          outline: none;
          cursor: inherit;
          display: block;
          cursor: pointer;
        }
        .fa-cloud-upload-alt {
          font-size: 1em;
          color: $second-color;
        }
      }
      .btn-post {
        padding: 0.3em;
        border: 1px solid $second-color;
        color: $main-color;
        background: none;
        margin-top: 10px;
        border-radius: 5px;
        max-width: 100px;
        &:hover {
          background: $second-color;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
