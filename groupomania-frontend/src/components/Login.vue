<template>
    <div id="login">
        <form action="" class="login-form" method="POST">
            <div class="login-input">
                <label for="email">Adresse e-mail</label> <br />
                <input type="email" name="email" id="email" class="input">
            </div>
            <div  class="login-input">
                <label for="password">Mot de passe</label> <br />
                <input type="password" name="password" id="password" class="input">
            </div>
            <input type="submit" class="btn" value="Connexion">
        </form>
        <p>Mot de passe oublié?</p>
    </div>
</template>

<script>
export default {
    name: "Login",
}
</script>

<style lang="scss">
    .login-form{
        display: flex;
            .login-input{
                margin-right: 12px;;
                label{
                color: #ffffff;
                font-size: 10px;
            }
        }
        .btn{
            height: 31px;
            background: #ffffff;
            color: rgb(10, 32, 66);
            margin-top: 29px;
            &:hover{
                border-radius: 30px;
            }
        } 
        
    }
   
    
</style>