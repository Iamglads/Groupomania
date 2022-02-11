<template>
  <div v-bind:class="{ active: active }" id="sidebar">
    <div class="sidebar__content">
      <div class="sidebar__content--header">
        <div class="user-pic">
          <img src="../assets/glad.png" alt="image" />
        </div>
        <div class="user-info">
          <span class="user-name">
            {{ user.firstname }} <strong> {{ user.lastname }} </strong></span
          >
        </div>
      </div>
      <!-- nav links -->
      <div class="sidebar__content--menu">
        <ul class="nav">
          <li class="nav-item">
            <i class="fas fa-user-lock"></i>
            <router-link to="/admin"> Admin</router-link>
          </li>
          <li class="nav-item">
            <i class="fas fa-user-circle"></i>
            <router-link to="/profil">Profil</router-link>
          </li>
          <li class="nav-item">
            <i class="fas fa-home"></i>
            <router-link to="/home">Forum</router-link>
          </li>
          <li class="nav-item">
            <i class="fas fa-store"></i>
            <router-link to="/marketplace">Marketplace</router-link>
          </li>
          <li class="nav-item">
            <i class="fas fa-calendar-alt"></i>
            <router-link to="/events">Evènements</router-link>
          </li>
          <!-- deconnexion -->
          <li class="nav-item item-logout" v-if="user">
            <a href @click.prevent="logout"> Déconnexion</a>
          </li>
        </ul>
      </div>
      <!-- nav links -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Profil",

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/variables.scss";

#sidebar {
  width: 20%;
  min-width: 250px;
  height: 750px;
  background: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 10;
  .fa-user-lock,
  .fa-user-circle,
  .fa-home,
  .fa-calendar-alt,
  .fa-store {
    margin-right: 10px;
    font-size: 10px;
    padding: 0.5em;
    border: 1px solid $main-color;
    border-radius: 100px;
  }
}

.sidebar__content {
  display: block;
  margin-top: 50px;

  &--header {
    .user-pic {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      img {
        margin: auto;
        max-width: 50%;
        border-radius: 100%;
        box-shadow: 1px 1px 6px 1px rgb(216, 216, 216);
      }
    }
  }

  &--menu {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .nav {
      display: block;
      .nav-item {
        &:hover {
          color: $second-color;
          transition: 0.5s;
        }
        .router-link-active {
          color: $second-color;
        }
      }
    }
    li {
      font-size: 20px;
      color: $main-color;
      margin-bottom: 15px;
      text-align: left;
    }
    .item-logout {
      position: fixed;
      bottom: 20px;
    }
  }
}
</style>
