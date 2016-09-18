<template>
  <g>
    <path id="line-effect-{{index}}" stroke="{{color}}" stroke-width="{{strokeWidth}}" d="{{path}}"></path>
  </g>
</template>

<script>

export default {

  name: 'LineEffect',

  components: {

  },

  created() {
    this.$set('deflectionX', Math.random() * this.deflection - (this.deflection / 2))
    this.$set('deflectionY', Math.random() * this.deflection - (this.deflection / 2))
  },

  attached() {
    const x0 = Math.floor(this.x0) + this.deflectionX
    const y0 = Math.floor(this.y0) + this.deflectionY
    const x1 = Math.floor(this.x1) + this.deflectionX
    const y1 = Math.floor(this.y1) + this.deflectionY

    Snap('#line-effect-' + this.index).animate({d: `M${x0},${y0} L${x1},${y1}`}, 50, ()=>{
      Snap('#line-effect-' + this.index).animate({d: `M${x1},${y1} L${x1},${y1}"`}, 200)
    })
  },

  props: ['x0', 'x1', 'y0', 'y1', 'color', 'index', 'deflection', 'stroke'],

  data () {
    return {
      id: 'line-id-' + Math.floor(Math.random() * 10000000000)
    }
  },

  computed: {
    path() {
      const x0 = Math.floor(this.x0) + this.deflectionX
      const y0 = Math.floor(this.y0) + this.deflectionY
      const x1 = Math.floor(this.x1) + this.deflectionX
      const y1 = Math.floor(this.y1) + this.deflectionY
      return `M${x0},${y0} L${x0},${y0}`
    },
    strokeWidth() {
      return this.stroke
    }
  }
}
</script>

<style lang="stylus">
</style>
