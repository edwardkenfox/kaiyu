<template>
  <div style="display:none"></div>
</template>

<script>

export default {

  name: 'Ticker',

  components: {

  },

  created: function() {
    this.$on('tick-start', (timeOffset)=>{
      this.$set('timeOffset', timeOffset)
      this.$set('timer', setInterval(()=>{
        const now = new Date().getTime()
        this.$dispatch('tick', now - timeOffset)
      }, 20))
    })
  },

  props: [],

  data () {
    return {
      timeOffset: null,
      timer: null
    }
  },

  computed: {

  }
}
</script>

<style lang="stylus">
</style>
