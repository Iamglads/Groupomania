<template>
    <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
            <div class="sidebar-header">
                <div class="user-pic">
                    <img class="img-responsive img-rounded"
                        src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                        alt="User picture">
                </div>
                <div class="user-info">
                    <span class="user-name">Prénom
                        <strong>Nom</strong>
                    </span>
                    <span class="user-role">Fonction</span>
                    <span class="user-status">
                        <i class="fa fa-circle"></i>
                        <span>Online</span>
                    </span>
                </div>
            </div>
            <!-- sidebar-search  -->
            <div class="sidebar-menu">
                <ul>
                    <li class="header-menu">
                        <router-link to="/profil">Profil</router-link>
                    </li>
                    <li class="sidebar-dropdown">
                        <router-link to="/home">Accueil</router-link>
                    </li>
                </ul>
            </div>
            <!-- sidebar-menu  -->
        </div>
    </nav>

    <router-view />
</template>

<script>
    export default {

    }
</script>


<style>

</style>