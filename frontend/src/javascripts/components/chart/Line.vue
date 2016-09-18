<template>
  <g>
    <path stroke="#fefefe" strokeWidth="1" d="M{{x0}},{{y0}} L{{x1}},{{y1}}"></path>
  </g>
</template>

<script>

export default {

  name: 'Line',

  components: {

  },

  created: function() {

  },

  props: ['x0', 'x1', 'y0', 'y1'],

  data () {
    return {
      fontSize: 14,
      id: 'line-id-' + Math.floor(Math.random() * 10000000000)
    }
  },

  computed: {

  }
}
</script>

<style lang="stylus">
</style>
