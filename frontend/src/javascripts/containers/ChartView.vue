<template>
  <div class="chart-view">
    <!-- log loader -->
    <div class="loader">
      <log-loader></log-loader>
    </div>

    <div v-if="logs.length > 0">
    <!-- chart view -->
      <div class="chart">
        <shell-chart
          :width="800"
          :height="800"
          :tree="tree"
          :groups="groups"
          ></shell-chart>
      </div>

      <!-- seek bar -->
      <div class="seekbar">
        <seek-bar
          :start-time="startTime"
          :end-time="endTime"
          ></seek-bar>
      </div>
    </div>
  </div>
</template>

<script>
import ShellChart from '../components/chart/ShellChart.vue'
import SeekBar from '../components/control/SeekBar.vue'
import LogLoader from './LogLoader.vue'
export default {
  name: 'ChatView',
  components: {
    ShellChart,
    LogLoader,
    SeekBar
  },
  attached() {
    this.$on('loaded-data', (data)=>{
      this.$set('startTime', data.logs[0].time)
      this.$set('endTime', data.logs[data.logs.length - 1].time)
      this.$set('groups', data.groups)
      this.$set('tree', data.tree)
      this.$set('logs', data.logs)
    })
    this.$on('tick-event', timeDiff => {
      let sliceCount = 0
      for (let log of this.logs){
        if (log.time < this.startTime + timeDiff) {
          sliceCount++
        } else {
          break
        }
      }
      if (sliceCount < 1) {
        return
      }
      //parse and broadcast event
      let events = this.logs.slice(0, sliceCount)
      for(let e of events) {
        this.$broadcast('update-tree', e)
      }

      let newLog = this.logs.slice(sliceCount)
      this.$set('logs', newLog)
    })
  },
  data () {
    return {
      logs: [],
      groups: [],
      tree: {},
      startTime: 0,
      endTime: 0
    }
  },
  route: {
    data ({ to }) {
      // get from store
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
.chart-view
  margin 48px
  .loader
    margin-bottom 24px
</style>
