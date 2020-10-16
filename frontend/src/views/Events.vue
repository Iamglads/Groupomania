<template>
    <div class="events"> 
        <Sidebar />
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Evenements</h1>
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
     .events{
        width: 70%;
        display: flex;
        justify-content: center;
        margin-top: 110px;
    }

</style>