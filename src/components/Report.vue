<template>
  <div>
    <div v-if="exists==='true'">
      <div class="sec">
        <h1>
          Here’s how 2018 went for you,
          <a :href="profile.html_url">{{getName}}</a>
        </h1>
        <div class="stats">
          <div class="block">
            <div class="head">
              <img src>
              <h2>{{shots.length}}</h2>
            </div>
            <p>Total Shots Posted</p>
          </div>
          <div class="block">
            <div class="head">
              <img src>
              <h2>{{getAnimations}}</h2>
            </div>
            <p>Shots Animated</p>
          </div>
          <div class="block">
            <div class="head">
              <img src>
              <h2>{{projects.length}}</h2>
            </div>
            <p>New Projects Created</p>
          </div>
        </div>
      </div>
      <div class="sec" v-show="filteredTeams.length > 0">
        <h1>You joined {{getTeams}}!</h1>
        <div class="teams">
          <div class="team" v-for="t in filteredTeams" v-bind:key="t.id">
            <div class="teamdp">
              <img :src="t.avatar_url">
            </div>
            <div class="info">
              <h2>{{t.name}}</h2>
              <p>{{t.location}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="sec">
        <h1>Your Favorite Tags</h1>
        <p v-for="tag in getTags" v-bind:key="tag">{{tag}}</p>
      </div>
      <div class="sec">
        <h1>You have a thing for Mondays</h1>
      </div>
    </div>
    <h1 v-else-if="exists==='false'">Login</h1>
    <h1 v-else>Calculating</h1>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
export default {
  name: "Report",
  data() {
    return {
      exists: "working",
      shots: {},
      profile: {},
      projects: {},
      dayData: {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
      },
      filteredTeams: [],
      monthData: {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
      },
      tags: {}
    };
  },
  mounted() {
    //get username from the route
    let user = this.$route.params.id;
    let vm = this;
    axios
      .get("http://bounnce.herokuapp.com/data?user=" + this.$route.params.id)
      .then(function(response) {
        response.data.length === 1
          ? (vm.exists = "true")
          : (vm.exists = "false");
        vm.profile = response.data[0].profile;
        vm.shots = response.data[0].shots;
        vm.projects = response.data[0].projects;
        console.log(response.data);
      });
  },
  computed: {
    getDayData: function() {
      let obj = this.dayData;
      this.shots.forEach(shot => {
        let day = shot.dayName;
        obj[day] += 1;
      });
    },
    getName: function() {
      return this.profile.name.split(" ")[0];
    },
    getTeams: function() {
      this.profile.teams.forEach(element => {
        let d = new Date(element.created_at);
        if (d.getFullYear() === 2018) {
          this.filteredTeams.push(element);
        }
      });
      let length = this.filteredTeams.length;
      let string;
      length === 1 ? (string = "team") : (string = "teams");
      return length + " new " + string;
    },
    getMonthData: function() {
      let obj = this.monthData;
      this.shots.forEach(shot => {
        let month = shot.monthName;
        obj[month] += 1;
      });
    },
    getAnimations: function() {
      let animatedshots = [];
      this.shots.forEach(shot => {
        if (shot.animated === true) {
          animatedshots.push(shot);
        }
      });
      return animatedshots.length;
    },
    getTags: function() {
      let obj = this.tags;
      this.shots.forEach(shot => {
        shot.tags.forEach(temp => {
          if (temp in obj) {
            obj[temp] += 1;
          } else {
            obj[temp] = 1;
          }
        });
      });
      var sortable = [];
      for (var tag in obj) {
        sortable.push([tag, obj[tag]]);
      }
      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });
      sortable = sortable.slice(0, 5);
      return Object.keys(this.objectify(sortable));
    }
  },
  methods: {
    objectify: function(array) {
      return array.reduce(function(result, currentArray) {
        result[currentArray[0]] = currentArray[1];
        return result;
      }, {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
