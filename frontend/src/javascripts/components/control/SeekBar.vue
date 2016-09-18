<template>
  <div class="container">
    <div class="seekbar-container">
      <div class="bar"></div>
      <div class="nob" style="left: {{progress}}px"></div>

    </div>
    <div class="button" v-on:click="play" v-bind:class="{ 'disable': isLoading }">
      <a class="text" >Play</a>
    </div>
    <div class="time-counter-container">
      <time-counter></time-counter>
    </div>
  </div>
</template>

<script>

import TimeCounter from './TimeCounter.vue'

export default {

  name: 'SeekBar',

  components: {
    TimeCounter
  },

  created() {
    this.$on('tick-counter', (timeDiff)=>{
      this.$set('timeDiff', timeDiff)
      this.$dispatch('tick-event', timeDiff)
      //this.$data.seekbar.setValue(timeDiff + this.startTime)
    })
  },

  attached() {

  },

  props: ['startTime', 'endTime'],

  data () {
    return {
      timeDiff: 0
    }
  },

  computed: {
    progress() {
      const diff = this.endTime - this.startTime
      return Math.floor(this.timeDiff / diff * 800)
    }
  }
}
</script>

<style lang="stylus">
.container
  .seekbar-container
    width 800px
    height 20px
    margin-bottom 20px
    .bar
      position relative
      top 10px
      background-color #828282
      width 800px
      height 1px
    .nob
      position relative
      width 20px
      height 20px
      border-radius 10px
      background-color #ec4862
  .button
    display inline
    padding 5px 6px 5px 10px
    background-color #ec4862
    border-radius 5px
    margin-right 20px
    &.disable
      background-color #828282
    .text
      font-size 12px
      text-decoration none
      display inline
      text-align center
      color #fefefe
  .time-counter-container
    display: inline
</style>
