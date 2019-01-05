<template>
  <div class="bg">
    <div v-if="exists==='true'" class="report">
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
        <h1>You had a thing for {{maxDay}}</h1>
        <div class="dayChartContainer">
          <div class="legend">
            <div class="dayblock"></div>
            <p>Number of Shots Posted per Day</p>
          </div>
          <canvas id="daychart"></canvas>
        </div>
        {{renderDayChart}}
      </div>
      <div class="sec">
        <h1>{{maxMonth}} saw a lot of pixels from you!</h1>
        <div class="monthChartContainer">
          <div class="legend">
            <div class="monthblock"></div>
            <p>Number of Shots Posted per Month</p>
          </div>
          <canvas id="monthchart"></canvas>
        </div>
        {{renderMonthChart}}
      </div>
      <div class="sec">
        <h1>{{maxMessage}}</h1>
        <div class="timeChartContainer">
          <div class="legend">
            <div class="timeblock"></div>
            <p>Number of Shots Posted per Time of the Day</p>
          </div>
          <canvas id="timechart"></canvas>
        </div>
        {{renderTimeChart}}
      </div>
      <div class="shotstream">
        {{getRandomShots}}
        <div class="shotsingle" v-for="t in randomShots" v-bind:key="t.id">
          <a :href="t.html_url">
            <img :src="t.images.normal">
          </a>
        </div>
      </div>
      <div class="share">
        {{getBtn}}
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-size="large"
          data-text="Checkout my Dribbble 2018 Report Card"
          data-hashtags="swishhh"
          data-related
          data-show-count="false"
        >Share on Twitter</a>
      </div>
      <div class="farewell">
        <p>I can’t wait to see what you create in 2019.</p>
        <p>Best wishes for the new year 😄</p>
      </div>
    </div>
    <h1 v-else-if="exists==='false'">Login</h1>
    <h1 v-else>Calculating</h1>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@font-face {
  font-family: "hkgrotesk";
  src: url("../assets/hkgrotesk-regular-webfont.woff2") format("woff2"),
    url("../assets/hkgrotesk-regular-webfont.woff") format("woff");
  font-weight: normal;
}
@font-face {
  font-family: "hkgrotesk";
  src: url("../assets/hkgrotesk-semibold-webfont.woff2") format("woff2"),
    url("../assets/hkgrotesk-semibold-webfont.woff") format("woff");
  font-weight: bold;
}
.bg {
  background-color: #fdfdfd;
  padding: 2em;
}
.report {
  max-width: 980px;
  padding: 2em;
  margin: 0 auto;
  font-family: "hkgrotesk";
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0 4px 20px 0 rgba(116, 116, 116, 0.05);
  h1 {
    font-family: "hkgrotesk";
    font-weight: bold;
    font-size: 1.125em;
    color: #1c2445;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>

<script>
import axios from "axios";
import Chart from "chart.js";
import "reset-css";
Chart.defaults.global.defaultFontFamily = "hkgrotesk";
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
      maxDay: "",
      maxMonth: "",
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
      timeData: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0
      },
      maxTime: 0,
      maxMessage: "",
      tags: {},
      randomShots: []
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
    getBtn: function() {
      let twitterScript = document.createElement("script");
      twitterScript.setAttribute(
        "src",
        "https://platform.twitter.com/widgets.js"
      );
      document.head.appendChild(twitterScript);
    },
    getRandomShots: function() {
      let shuffled = this.shots.sort(function() {
        return 0.5 - Math.random();
      });
      this.randomShots = shuffled.slice(0, 5);
    },
    renderDayChart: function() {
      this.$nextTick(() => {
        let chart = document.getElementById("daychart");
        let ctx = chart.getContext("2d");

        //get daydata
        let obj = this.dayData;
        this.shots.forEach(shot => {
          let day = shot.dayName;
          obj[day] += 1;
        });
        this.maxDay =
          Object.keys(obj).sort(function(a, b) {
            return obj[b] - obj[a];
          })[0] + "s";

let dayLabels = Object.keys(this.dayData).map(el => el.substr(0,3));
        let myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: dayLabels,
            datasets: [
              {
                data: Object.values(this.dayData),
                backgroundColor: "rgba(255, 177, 50, 0.5)",
                borderColor: "#FFB132",
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#FFB132"
                  },
                  barPercentage: 0.7
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#FFB132"
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1
                  }
                }
              ]
            },
            tooltips: {
              enabled: true,
              mode: "single",
              callbacks: {
                label: function(tooltipItems, data) {
                  return (
                    " " +
                    tooltipItems.yLabel +
                    " shots uploaded on " +
                    tooltipItems.xLabel +
                    "."
                  );
                }
              }
            }
          }
        });
      });
    },
    renderMonthChart: function() {
      this.$nextTick(() => {
        let chart = document.getElementById("monthchart");
        let ctx = chart.getContext("2d");

        //get monthdata

        let obj = this.monthData;
        this.shots.forEach(shot => {
          let month = shot.monthName;
          obj[month] += 1;
        });
        this.maxMonth = Object.keys(obj).sort(function(a, b) {
          return obj[b] - obj[a];
        })[0];


        let monthLabels = Object.keys(this.monthData).map(el => el.substr(0,3));

        let myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: monthLabels,
            datasets: [
              {
                data: Object.values(this.monthData),
                backgroundColor: "rgba(131, 165, 255, 0.5)",
                borderColor: "#83A5FF",
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#83A5FF"
                  },
                  barPercentage: 0.7
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#83A5FF"
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1
                  }
                }
              ]
            },
            tooltips: {
              enabled: true,
              mode: "single",
              callbacks: {
                label: function(tooltipItems, data) {
                  return (
                    " " +
                    tooltipItems.yLabel +
                    " shots uploaded in " +
                    tooltipItems.xLabel +
                    "."
                  );
                }
              }
            }
          }
        });
      });
    },
    renderTimeChart: function() {
      this.$nextTick(() => {
        let chart = document.getElementById("timechart");
        let ctx = chart.getContext("2d");

        //get daydata
        let obj = this.timeData;
        this.shots.forEach(shot => {
          let time = new Date(shot.published_at);
          let temp = time.toLocaleTimeString().split(":")[0];
          if (temp.substr(0, 1) === "0") {
            temp = temp.substr(1, 1);
          }
          obj[temp] += 1;
        });
        this.maxTime = Object.keys(obj).sort(function(a, b) {
          return obj[b] - obj[a];
        })[0];

        if (this.maxTime >= 21 && this.maxTime < 23) {
          this.maxMessage = "You were a night owl 🦉";
        }
        if (this.maxTime >= 0 && this.maxTime < 4) {
          this.maxMessage = "You were a night owl 🦉";
        }
        if (this.maxTime >= 4 && this.maxTime < 10) {
          this.maxMessage = "You were a early bird ☀️";
        }
        if (this.maxTime >= 9 && this.maxTime < 12) {
          this.maxMessage = "You hustled during the day 🌞";
        }
        if (this.maxTime >= 12 && this.maxTime < 16) {
          this.maxMessage = "You hustled during the day 🌞";
        }
        if (this.maxTime >= 16 && this.maxTime < 20) {
          this.maxMessage = "Your evenings were memorable 🌆";
        }
        let timeLabels = Object.keys(this.timeData).map(el => {
          let h = parseInt(el);
          if (h >= 1 && h <= 11) {
            el = h + " AM";
          } else if (h === 12) {
            el = h + " PM";
          } else if ((h >= 13) & (h <= 23)) {
            el = h - 12 + " PM";
          } else if (h === 0) {
            el = h + 12 + " AM";
          }
          return el;
        });
        let myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: timeLabels,
            datasets: [
              {
                data: Object.values(this.timeData),
                backgroundColor: "rgba(0, 217, 132, 0.5)",
                borderColor: "#00D98E",
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#00D98E"
                  },
                  barPercentage: 0.7
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                    color: "#00D98E"
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1
                  }
                }
              ]
            },
            tooltips: {
              enabled: true,
              mode: "single",
              callbacks: {
                label: function(tooltipItems, data) {
                  return (
                    " " +
                    tooltipItems.yLabel +
                    " shots uploaded at " +
                    tooltipItems.xLabel +
                    "."
                  );
                }
              }
            }
          }
        });
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
