<template>
    <div class="admin"> 
        <Sidebar />
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Administrateur</h1>
                <div class="divider"></div>
                
            </div>
        </div>
    </div>
</template>


<script>
import Sidebar from '../components/Sidebar'
export default {
    name: "Events",
    components: { Sidebar}
}
</script>

<style lang="scss" >
     .admin{
        width: 70%;
        display: flex;
        justify-content: center;
        padding-top: 110px;
    }

</style>