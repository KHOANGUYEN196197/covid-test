<template>
  <div :class="`noData ${customClass}`" style="margin-top: 85px">
    <div class="noData-content">
      <p class="noData-text">{{ title }}</p>
      <div class="noData-thumb">
        <img src="../../src/assets/amico.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "No Data",
    },
  },
};
</script>
<style>
.noData {
  margin-top: 85px;
  color: #0c0033;
  font-size: 25px;
}
</style>
