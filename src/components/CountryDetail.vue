<template>
  <div class="popup country">
    <div class="brg"></div>
    <div class="box">
      <span @click="this.$emit('onFinishScreen')" class="btn-close">X</span>
      <div v-if="objCountry" class="content">
        <div class="box-content">
          <div class="left-box">
            <div class="box-flag">
              <img
                :src="
                  objCountry?.flags?.svg
                    ? objCountry?.flags?.svg
                    : objCountry?.flags?.png
                "
              />
            </div>
          </div>
          <div class="right-box">
            <div class="box-info">
              <ul>
                <li>Name: {{ objCountry?.name?.common }}</li>
                <li>
                  Population: {{ formatPopulation(objCountry?.population) }}
                </li>
                <li>Capital: {{ objCountry?.capital[0] }}</li>
                <li>Region: {{ objCountry?.region }}</li>
                <li>Subregion: {{ objCountry?.subregion }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="not-found">404 Not Found</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CountryDetail",
  emits: ["onFinishScreen"],
  data() {
    return {
      objCountry: {},
    };
  },
  watch: {
    countryDetail(props) {
      this.objCountry = props[0];
    },
  },
  computed: {
    countryDetail() {
      return this.$store.state.countryDetail;
    },
  },
  methods: {
    formatPopulation(x) {
      x = x?.toString();
      const pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      return x;
    },
  },
};
</script>

<style scoped>
.not-found {
  color: #fff;
  font-size: 100px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
}
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.brg {
  position: absolute;
  background: #302b24;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
.box {
  box-shadow: 0px 0px 5px #b7c3cb;
  background: #2b3945;
  opacity: 1;
  position: relative;
  left: 0;
  right: 0;
  width: 65%;
  margin: auto;
  top: 150px;
  bottom: 0;
  height: 365px;
}
.btn-close {
  font-size: 22px;
  font-weight: 700;
  position: absolute;
  right: 12px;
  top: 10px;
  cursor: pointer;
  color: #fff;
  z-index: 999;
}
.content {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: start;
}
.box-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.right-box {
  width: 40%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.left-box {
  width: 60%;
  height: 100%;
}
.box-flag {
  height: 100%;
}
ul {
  color: #fff;
  line-height: 1.5;
}
li {
  font-size: 18px;
  margin-bottom: 5px;
}
</style>

<script></script>
