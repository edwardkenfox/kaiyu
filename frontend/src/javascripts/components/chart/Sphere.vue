<template>
  <g transform="translate({{cx}}, {{cy}})">
    <g transform="rotate(-90)">
      <shell v-for="shell in shells" :radius="shell.radius" :range="shell.range" :index="$index" :thickness="shell.thickness" :color="shell.color" :update-thickness="doUpdate"></shell>
    </g>
    <circle id="{{id}}" cx="0" cy="0" r="{{radius}}" stroke="#fefefe" stroke-width="0" fill="#fefefe"></circle>
    <text text-anchor="middle" alignment-baseline="middle" font-size="{{fontSize}}" fill="#ec4862">
      {{label}}
    </text>
  </g>
</template>

<script>

import Shell from './Shell.vue'

export default {

  name: 'Sphere',

  components: {
    Shell
  },

  created() {
    this.$on('update-shell-thickness-' + this.path, function (index, thickness) {
      this.$broadcast('update-thickness-' + index, thickness)
    })
  },

  props: ['label', 'path', 'cx', 'cy', 'radius', 'color', 'shellInfo'],

  watch: {
    'cx': (val, oldVal) => {
        console.log(oldVal + 'has been changed to ' + val + ' from outside.');
    }
  },

  data () {
    const shells = this.shellInfo
    return {
      fontSize: 14,
      id: 'id-' + Math.floor(Math.random() * 1000),
      shells: shells
    }
  },

  methods:{
  }
}
</script>

<style lang="stylus">
</style>
