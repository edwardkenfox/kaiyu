<template>
  <g transform="translate({{x}}, {{y}})">
    <line v-for="sphere in spheres" :x0="sphere.x" :y0="sphere.y" :x1="sphere.parent.x" :y1="sphere.parent.y"></line>
    <g id="line-effects">
      <line-effect v-for="lineEffect in lineEffects" :index="$index" :x0="lineEffect.x0" :y0="lineEffect.y0" :x1="lineEffect.x1" :y1="lineEffect.y1" :color="lineEffect.color" :deflection="20" :stroke="lineEffect.value"></line-effect>
    </g>
    <sphere v-for="sphere in spheres" :cx="sphere.x" :cy="sphere.y" :radius="sphere.radius" :path="sphere.path" :label="sphere.label" :shell-info="shells"></sphere>
  </g>
</template>

<script>

import Sphere from './Sphere.vue'
import Line from './Line.vue'
import LineEffect from './LineEffect.vue'
import { parse } from '../../utils/parser.js'

export default {

  name: 'ShellTree',

  components: {
    Sphere,
    Line,
    LineEffect
  },

  props: ['x', 'y', 'tree', 'shellInfo'],

  data () {
    return {
      spheres: [],
      lineEffects: []
    }
  },

  attached() {

    this.$on('update-tree', function (action) {
      // move group 1 / to /pageA
      // update / of group 1
      switch (action.type) {
        case 'update': this.$broadcast('update-shell-thickness-' + action.path, action.group, action.value)
          break
        case 'move':
          const from = this.spheres.filter(sphere => {
            return sphere.path == action.from
          })[0]
          const to = this.spheres.filter(sphere => {
            return sphere.path == action.to
          })[0]
          const obj = {
            x0: from.x,
            y0: from.y,
            x1: to.x,
            y1: to.y,
            value: action.value,
            color: this.shellInfo.groups[action.group].color
          }
          const effects = this.$get('lineEffects')
          this.$set('lineEffects', [...effects, obj])
          break
      }
    })
  },

  computed: {
    spheres () {
      const s = parse(this.tree)
      this.spheres = s
      return s
    },
    shells () {
      return this.shellInfo.groups.map((info, index, groups) => {
        const shell = {
          range: 360 / groups.length,
          radius: 20,
          thickness: 0,
          color: info.color
        }
        return shell
      })
    }
  }

}
</script>

<style lang="stylus">
</style>
