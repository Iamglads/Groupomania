<template>
  <div class="marketplace">
    <Slider :width="250" format="push" direction="left" :opacity="0.15">
    </Slider>
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <h1>Marketplace</h1>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../components/Slider";
export default {
  name: "Marketplace",
  components: { Slider },
};
</script>

<style lang="scss">
.marketplace {
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 110px;
}
</style>
