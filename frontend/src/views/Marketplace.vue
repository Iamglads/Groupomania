<template>
    <div class="marketplace"> 
        <Sidebar
        :width="250"
        format="push"
        direction="left"
        :opacity="0.15"
        />
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <h1>Marketplace</h1>
                <div class="divider"></div>
            </div>
        </div>
    </div>
</template>


<script>
import Sidebar from '../components/Sidebar'
export default {
    name: "Marketplace",
    components: { Sidebar }
}
</script>


<style lang="scss" >
     .marketplace{
        width: 70%;
        display: flex;
        justify-content: center;
        padding-top: 110px;
    }

</style>
