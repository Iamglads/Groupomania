<template>
    <div id="footer">
        <p>{{ copyright }}</p>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            companyName: 'Groupomania'
        }
    },
    computed: {
        copyright() {
               const currentYear = new Date().getFullYear()
                return `Copyright ${this.companyName} ${currentYear}`
        }
     
    }
}
</script>   

<style lang="scss">
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
    }
    p{
        color:grey;
    }
</style>