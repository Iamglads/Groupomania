
<template>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ copyright }} — <strong>Gladston Aristoverne</strong>
    </v-col>
  </v-footer>
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
  #footer {
    width: 100%;
    color: gray;
    text-align: center;
    z-index: -10;
}
</style>