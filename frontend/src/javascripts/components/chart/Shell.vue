<template>
  <g>
    <path id="{{id}}" stroke="{{color}}" strokeWidth="2" fill="{{color}}" d="{{graph}}"></path>
  </g>
</template>

<script>

import { getShellPath } from '../../utils/graph.js'

export default {

  name: 'Shell',

  components: {

  },

  activate(done) {
    done()

  },

  created: function() {
    this.$on('update-thickness-' + this.index, function (thickness) {
      //getShellPath(this.range, this.index, this.radius, thickness)
      const path = getShellPath(this.range, this.index, this.radius, thickness)
      Snap('#' + this.id).animate({d: path}, 500, mina.elastic, ()=>{
        this.thickness = thickness
      })
    })
  },

  props: ['radius', 'thickness', 'index', 'range', 'color'],

  data () {
    return {
      fontSize: 14,
      id: 'shell-id-' + Math.floor(Math.random() * 10000000000)
    }
  },

  computed: {

    graph() {
      return getShellPath(this.range, this.index, this.radius, this.thickness)
    }
  }
}
</script>

<style lang="stylus">
</style>
