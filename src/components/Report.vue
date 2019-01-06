<template>
  <div class="bg">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/swishhhllogo.svg">
      </router-link>
    </div>
    <transition name="fade">
      <div v-if="exists==='true'&&shots.length>1" class="report">
        <div class="sec">
          <h1>
            Here’s how 2018 went for you,
            <a :href="profile.html_url" class="link">{{getName}}</a>
          </h1>
          <div class="stats">
            <div class="block">
              <div class="head">
                <img src="../assets/shots.svg">
                <h2 style="color:#FFB132">{{shots.length}}</h2>
              </div>
              <p>Total Shots Posted</p>
            </div>
            <div class="block">
              <div class="head">
                <img src="../assets/animations.svg">
                <h2 style="color:#83A5FF">{{getAnimations}}</h2>
              </div>
              <p>Shots Animated</p>
            </div>
            <div class="block">
              <div class="head">
                <img src="../assets/projects.svg">
                <h2 style="color:#00D98E">{{projects.length}}</h2>
              </div>
              <p>New Projects Created</p>
            </div>
          </div>
        </div>
        <div class="sec" v-show="filteredTeams.length > 0">
          <h1>
            You joined
            <span style="color:#5AC531">{{getTeams}}</span>
          </h1>
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
          <h1>
            Your
            <span style="color:#A867F9">Favorite</span> Tags
          </h1>
          <div class="tags">
            <a
              v-for="tag in getTags"
              v-bind:key="tag"
              :href="'https://dribbble.com/'+ profile.login +'/tags/' + tag"
              class="tag"
            >{{tag}}</a>
          </div>
        </div>
        <div class="sec">
          <h1>
            You had a thing for
            <span style="color:#FFB132">{{maxDay}}</span>
          </h1>
          <div class="dayChartContainer">
            <div class="legend-container">
              <div class="legend">
                <div class="dayblock"></div>
                <span>Number of Shots Posted per Day</span>
              </div>
            </div>
            <canvas id="daychart"></canvas>
          </div>
          {{renderDayChart}}
        </div>
        <div class="sec">
          <h1>
            <span style="color:#83A5FF">{{maxMonth}}</span> saw a lot of pixels from you!
          </h1>
          <div class="monthChartContainer">
            <div class="legend-container">
              <div class="legend">
                <div class="monthblock"></div>
                <span>Number of Shots Posted per Month</span>
              </div>
            </div>
            <canvas id="monthchart"></canvas>
          </div>
          {{renderMonthChart}}
        </div>
        <div class="sec">
          <h1>
            You
            <span style="color:#00D98E">{{maxMessage}}</span>
          </h1>
          <div class="timeChartContainer">
            <div class="legend-container">
              <div class="legend">
                <div class="timeblock"></div>
                <span>Number of Shots Posted per Time of the Day</span>
              </div>
            </div>
            <canvas id="timechart"></canvas>
          </div>
          {{renderTimeChart}}
        </div>
        <div class="sec">
          <h1 style="color:#F765B8;font-size:2em">Cheers to 2018.</h1>
          <div class="stream">
            {{getRandomShots}}
            <div class="single" v-for="t in randomShots" v-bind:key="t.id">
              <a :href="t.html_url" target="_blank">
                <img :src="t.images.normal">
              </a>
            </div>
          </div>
        </div>
        <div class="sharebtn">
          <div class="share">
            {{getBtn}}
            <a :href="shareUrl" target="_blank">
              <img src="../assets/twitter.svg">Share on Twitter
            </a>
          </div>
        </div>
        <div class="divider"></div>
        <div class="farewell">
          <div class="message">
            <p>I can’t wait to see what you create in 2019.</p>
            <p>Best wishes for the new year ✨</p>
          </div>
          <div class="footer">
            <div>
              <span>
                Put Together by
                <a href="https://twitter.com/lilwonderspeaks">Abhishek /</a>
              </span>
              <a href="https://github.com/littlewonder/swishh">
                <img src="../assets/github.svg"> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="exists==='false'" class="noexists">
        <img src="../assets/404.svg">
        <h1>Report Card does not exist.</h1>
        <p>If you’re {{getQuery}}, please login to view your report card.</p>
        <button @click="auth">
          <img src="../assets/dribbble.svg">Login with Dribbble
        </button>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="exists==='working'">
        <loader></loader>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="exists==='true'&&shots.length<=1" class="noshots">
        <img src="../assets/noshots.svg">
        <h1>Work In Progress?</h1>
        <p>Seems like you did not upload enough shots in 2018. No worries, happens to best of us :)</p>
      </div>
    </transition>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.noshots {
  max-width: 980px;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  padding: 2em;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eeeeee;
  box-shadow: 0 4px 20px 0 rgba(116, 116, 116, 0.05);
  h1 {
    font-family: "Prata";
    font-size: 32px;
    color: #1d88e5;
    letter-spacing: -0.67px;
    text-align: center;
  }
  p {
    font-family: "HKGrotesk-Regular";
    font-size: 18px;
    color: #666666;
    line-height: 1.25em;
    letter-spacing: 0;
    text-align: center;
    margin: 1em 0 2em 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@font-face {
  font-family: "HKGrotesk-Regular";
  src: url("../assets/hkgrotesk-regular-webfont.woff2") format("woff2"),
    url("../assets/hkgrotesk-regular-webfont.woff") format("woff");
  font-weight: normal;
}
@font-face {
  font-family: "HKGrotesk-SemiBold";
  src: url("../assets/hkgrotesk-semibold-webfont.woff2") format("woff2"),
    url("../assets/hkgrotesk-semibold-webfont.woff") format("woff");
  font-weight: normal;
}
@font-face {
  font-family: "Prata";
  src: url("../assets/prata-regular-webfont.woff2") format("woff2"),
    url("../assets/prata-regular-webfont.woff") format("woff");
  font-weight: normal;
}
.bg {
  background-color: #fdfdfd;
  padding: 1.5em;
  .logo {
    text-align: center;
    a {
      display: inline-block;
      padding: 1.5em 0;
      img {
        height: 3em;
      }
    }
  }
}
.report {
  max-width: 980px;
  margin: 0 auto;
  font-family: "HKGrotesk-Regular";
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0 4px 20px 0 rgba(116, 116, 116, 0.05);
  h1 {
    font-family: "Prata";
    font-size: 1.5em;
    color: #1c2445;
    line-height: 1.75em;
    letter-spacing: -0.3px;
    text-align: center;
    margin-bottom: 2em;
    .link {
      color: #ea4c89;
      text-decoration: none;
    }
  }
  .stats {
    display: flex;
    .block {
      display: flex;
      flex-direction: column;
      .head {
        align-self: center;
        font-family: "HKGrotesk-Bold";
        font-size: 2em;
        display: flex;
        flex-direction: row;
        img {
          margin-right: 0.25em;
        }
      }
      p {
        margin-top: 0.5em;
        font-family: "HKGrotesk-Regular";
        font-size: 1em;
        color: #666666;
      }
    }
  }
  .teams {
    display: flex;
    .team {
      display: flex;
      flex-direction: row;
      align-items: center;
      .teamdp {
        margin-right: 0.5em;
        img {
          height: 3em;
          border-radius: 50%;
        }
      }
      .info {
        h2 {
          font-family: "HKGrotesk-Regular";
          font-size: 1.3em;
          color: #333333;
        }
        p {
          font-family: "HKGrotesk-Regular";
          font-size: 1em;
          color: #666666;
          margin-top: 0.5em;
        }
      }
    }
  }
  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .tag {
      text-decoration: none;
      font-family: "HKGrotesk-Regular";
      font-size: 1.125em;
      color: #a867f9;
      padding: 4px 10px 6px 10px;
      background-color: rgba(168, 103, 249, 0.1);
      border-radius: 4px;
    }
  }
  .legend-container {
    text-align: center;
  }
  .legend {
    display: inline-block;
    margin-bottom: 3.5em;
    div {
      display: inline-block;
      vertical-align: middle;
    }
    .dayblock {
      background: rgba(255, 177, 50, 0.7);
      border: 1px solid #ffb132;
      height: 16px;
      width: 16px;
      margin-right: 10px;
    }
    span {
      font-family: "HKGrotesk-Regular";
      font-size: 14px;
      color: #666666;
    }
    .monthblock {
      height: 16px;
      width: 16px;
      margin-right: 10px;
      background: rgba(131, 165, 255, 0.7);
      border: 1px solid #83a5ff;
    }
    .timeblock {
      background-image: linear-gradient(-180deg, #00d98e 0%, #00d98e 100%);
      border: 1px solid #00d98e;
      height: 16px;
      width: 16px;
      margin-right: 10px;
    }
  }

  .stream {
    display: flex;
    .single {
      img {
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.07);
      }
    }
  }
  .divider {
    height: 2px;
    width: 100px;
    background-color: #00d98e;
    text-align: center;
  }
  .farewell {
    .message {
      p {
        font-family: "Prata";
        font-size: 20px;
        color: #1c2445;
        line-height: 36px;
        text-align: center;
      }
    }
    .footer {
      margin-top: 3em;
      font-family: "HKGrotesk-Regular";
      font-size: 16px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;

      img {
        margin-left: 8px;
        vertical-align: bottom;
      }
      a {
        text-decoration: none;
        color: inherit;
        display: inline-block;
        transition-property: all;
        transition-duration: 0.25s;
        transition-timing-function: ease-in-out;
        &:hover {
          color: #1da1f2;
        }
      }
    }
  }
  .sharebtn {
    text-align: center;
    .share {
      background: #1da1f2;
      border-radius: 2px;
      margin: 0 auto;
      display: inline-block;
      padding: 1em 0em;
      img {
        vertical-align: middle;
        margin-right: 8px;
      }
      a {
        text-align: center;
        font-family: "HKGrotesk-Regular";
        font-size: 18px;
        color: #ffffff;
        text-decoration: none;
        padding: 1em;
      }
    }
  }
}
@media screen and (min-width: 980px) {
  .stats,
  .teams {
    flex-direction: row;
    justify-content: space-around;
  }
  .report {
    padding: 4em 2em;
  }

  .sec {
    margin-bottom: 8em;
    &:last-child {
      margin-bottom: 4em;
    }
  }
  .tags {
    .tag {
      margin: 0 1em;
    }
  }
  .stream {
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
    .single {
      img {
        height: 140px;
      }
    }
  }
  .divider {
    margin: 6em auto 3em auto;
  }
}
@media screen and (max-width: 979px) {
  .stats,
  .teams,
  .stream {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .block {
      margin-bottom: 3em;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .footer {
    span {
      display: block;
      margin-bottom: 1em;
    }
  }
  .report {
    padding: 1em;
  }
  .divider {
    margin: 3em auto;
  }
  .tags {
    .tag {
      margin: 0.5em;
    }
  }
  .stream {
    .single {
      img {
        margin-bottom: 1em;
        width: 100%;
      }
    }
  }

  .sec {
    margin-bottom: 5em;
  }
}
.noexists {
  max-width: 980px;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  padding: 2em;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eeeeee;
  box-shadow: 0 4px 20px 0 rgba(116, 116, 116, 0.05);
  h1 {
    font-family: "Prata";
    font-size: 32px;
    color: #00796b;
    letter-spacing: -0.67px;
    text-align: center;
  }
  p {
    font-family: "HKGrotesk-Regular";
    font-size: 18px;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    margin: 1em 0 2em 0;
  }
  button {
    background: #f765b8;
    cursor: pointer;
    align-self: center;
    font-family: "HKGrotesk-Regular";
    font-size: 1.25em;
    padding: 0.5em 1em;
    color: #ffffff;
    line-height: 1.25em;
    border: none;
    text-align: center;
    border-radius: 2px;
    &:focus {
      outline: none;
    }
    img {
      margin-right: 0.5em;
      vertical-align: bottom;
    }
  }
}
</style>

<script>
import axios from "axios";
import Chart from "chart.js";
import loader from "./Loader.vue";
import "reset-css";
Chart.defaults.global.defaultFontFamily = "HKGrotesk-Regular";
export default {
  name: "Report",
  components: { loader },
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
      randomShots: [],
      shareUrl: "",
      client_id:
        "a7175aac5cccae62b2f94952db17a8c8e74a69e2d05cd04dd796e44a0baedc73"
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
        if (vm.exists === "true") {
          const descEl = document.querySelector(
            'head meta[property="og:title"]'
          );
          const titleEl = document.querySelector(
            'head meta[property="og:description"]'
          );
                    const descEl2 = document.querySelector(
            'head meta[property="twitter:title"]'
          );
          const titleEl2 = document.querySelector(
            'head meta[property="twitter:description"]'
          );
          let desc ="In 2018, I posted " + vm.shots.length + " shots on Dribbble. " +"Checkout my Dribbble Report Card!";
          descEl.setAttribute("content", desc);
          titleEl.setAttribute("content", vm.profile.name + " : Dribbble Report Card");
          descEl2.setAttribute("content", desc);
          titleEl2.setAttribute("content", vm.profile.name + " : Dribbble Report Card");
        }
      });
  },
  computed: {
    getQuery: function() {
      return window.location.href.split("/")[3];
    },
    getBtn: function() {
      let text =
        "In 2018, I posted " +
        this.shots.length +
        " shots on Dribbble. " +
        "Checkout my Dribbble Report Card! #swishhh";
      this.shareUrl =
        "https://twitter.com/intent/tweet?url=" +
        window.location.href +
        "&text=" +
        text;
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

        let dayLabels = Object.keys(this.dayData).map(el => el.substr(0, 3));
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

        let monthLabels = Object.keys(this.monthData).map(el =>
          el.substr(0, 3)
        );

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
          this.maxMessage = " were a night owl 🦉";
        }
        if (this.maxTime >= 0 && this.maxTime < 4) {
          this.maxMessage = " were a night owl 🦉";
        }
        if (this.maxTime >= 4 && this.maxTime < 10) {
          this.maxMessage = " were a early bird ☀️";
        }
        if (this.maxTime >= 9 && this.maxTime < 12) {
          this.maxMessage = " hustled during the day 🌞";
        }
        if (this.maxTime >= 12 && this.maxTime < 16) {
          this.maxMessage = " hustled during the day 🌞";
        }
        if (this.maxTime >= 16 && this.maxTime < 20) {
          this.maxMessage = " dribbbled in the evening 🌆";
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
    },

    auth: function() {
      //open auth window
      window.location.href =
        "https://dribbble.com/oauth/authorize?" + "client_id=" + this.client_id;
    }
  }
};
</script>
