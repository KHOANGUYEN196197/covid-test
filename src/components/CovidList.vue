<template>
  <div class="covid-19">
    <div v-if="loading" class="box-spin">
      <Spinner />
    </div>
    <div v-else class="covid">
      <div class="covid-wrap">
        <div class="title">
          <span class="title-covid">Covid-19</span
          ><span class="system">/system</span>
        </div>
        <div class="box-filter">
          <span class="filter-by">Filter By &nbsp;</span>
          <select @change="setSortBy($event)">
            <option
              v-for="option of arrSort"
              :key="option.key"
              :value="option.key"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="box-table">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Country</th>
                <th>Date</th>
                <th>Total Confirmed</th>
                <th>Total Deaths</th>
                <th>Total Recovered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="countries.length > 0">
              <tr
                v-for="(country, index) in currentPageCountries"
                :key="country.CountryCode"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ country.Country }}</td>
                <td>{{ formatFullDate(country.Date) }}</td>
                <td>{{ country.TotalConfirmed }}</td>
                <td>{{ country.TotalDeaths }}</td>
                <td>{{ country.TotalRecovered }}</td>
                <td>
                  <button
                    @click="showDetail(country.Slug)"
                    class="custom-btn btn-3"
                  >
                    <span>See More</span>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7">
                  <EmptyData title="No Data" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="countries.length > 0">
        <button @click="prevPage">Prev</button>
        Page {{ currentPage }} of {{ pageCount }}
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </div>
  <CountryDetail v-if="showPopup" @onFinishScreen="onFinishScreen" />
</template>

<style>
.box-spin {
  position: fixed;
  top: 30%;
  bottom: 50%;
  right: 50%;
  left: 50%;
}
.covid {
  margin: 20px;
}
.covid-wrap {
  padding: 18px;
}
.title {
  text-align: start;
}
.title-covid {
  color: #0c0033;
  font-weight: bold;
  font-size: 65px;
}
.system {
  color: #0c0033;
  font-size: 45px;
  font-weight: 100;
}
.box-filter {
  text-align: end;
}
.box-table {
  margin-top: 15px;
  box-shadow: 0px 0px 5px #b7c3cb;
  background: #fff;
  overflow: auto;
  width: 100%;
  height: 720px;
  overflow-x: auto;
}
@media (max-width: 1600px) {
  .box-table {
    height: 550px;
  }
}
table {
  width: 100%;
  padding: 10px;
}
table th {
  color: #0c0033;
  padding-top: 7px;
  padding-bottom: 7px;
  border-bottom: none;
  vertical-align: middle;
}
table td {
  padding-top: 12px;
  padding-bottom: 12px;
  color: #0c0033;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #0c0033;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn-3 {
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover {
  background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover {
  color: rgba(2, 126, 251, 1);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}
</style>

<script>
import Spinner from "./Spinner.vue";
import EmptyData from "./EmptyData.vue";
import CountryDetail from "./CountryDetail.vue";
import moment from "moment";
export default {
  name: "CovidList",
  components: {
    Spinner,
    EmptyData,
    CountryDetail,
  },
  data() {
    return {
      arrSort: [
        {
          key: "TotalConfirmed",
          name: "Total Confirmed",
        },
        {
          key: "TotalDeaths",
          name: "Total Deaths",
        },
        {
          key: "TotalRecovered",
          name: "Total Recovered",
        },
      ],
      showPopup: false,
    };
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    perPage() {
      return this.$store.state.perPage;
    },
    pageCount() {
      return this.$store.state.pageCount;
    },
    currentPageCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.countries.slice(start, start + this.perPage);
    },
  },
  created() {
    this.$store.dispatch("getCovidData");
  },
  methods: {
    setSortBy(event) {
      const selectedOption = event.target.value;
      this.$store.dispatch("setSortBy", selectedOption);
    },
    prevPage() {
      this.$store.dispatch("setCurrentPage", this.currentPage - 1);
    },
    nextPage() {
      this.$store.dispatch("setCurrentPage", this.currentPage + 1);
    },
    formatFullDate(date) {
      return moment(new Date(date)).format("D/MM/YYYY");
    },
    showDetail(slug) {
      this.$store.dispatch("getDetailCountry", slug);
      this.showPopup = true;
    },
    onFinishScreen() {
      this.showPopup = false;
    },
  },
};
</script>
