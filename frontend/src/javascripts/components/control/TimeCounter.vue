<template>
  <div class="time-counter">
    <span>{{counter}}</span>
    <ticker></ticker>
  </div>
</template>

<script>

import Ticker from './Ticker.vue'

export default {

  name: 'TimeCounter',

  components: {
    Ticker
  },

  activate(done) {
    done()
    this.$broadcast('tick-start', new Date())
  },

  created() {
    this.$on('tick', (timeDiff)=>{
      this.$set('timeDiff', timeDiff)
      this.$dispatch('tick-counter', timeDiff)
    })
  },

  props: [],

  data () {
    return {
      timeDiff: null
    }
  },

  computed: {
    counter() {
      const hour = ( '0' + (Math.floor(this.timeDiff / 1000 / 60 / 60)) ).slice( -2 )
      const minutes = ( '0' + (Math.floor(this.timeDiff / 1000 / 60) % 60) ).slice( -2 )
      const seconds = ( '0' + (Math.floor(this.timeDiff / 1000) % 60) ).slice( -2 )
      return hour + ":" + minutes + ":" + seconds
    }
  }
}
</script>

<style lang="stylus">
.time-counter
  display inline
  span
    color #fefefe
</style>
