<template>
  <svg class="shell-chart" width="{{ width }}px" height="{{ height }}px" >
    <sphere-tree
      :x="width / 2"
      :y="height / 2"
      :tree="tree"
      :shell-info="shellInfo"
      ></sphere-tree>
  </svg>
</template>

<script>

import SphereTree from './SphereTree.vue'

export default {

  name: 'SphereChart',

  components: {
    SphereTree
  },

  props: [
    'width',
    'height',
    'groups',
    'tree'
  ],

  activate(done) {
    done()
  },

  data () {
    return {
    }
  },

  route: {
    data ({ to }) {
    }
  },

  computed: {
    shellInfo() {
      return {
        groups: this.groups
      }
    }
  }
}
</script>

<style lang="stylus">
.item-view
  .item
    padding-left 0
    margin-bottom 30px
    .index
      display none
  .poll-options
    margin-left 30px
    margin-bottom 40px
    li
      margin 12px 0
    p
      margin 8px 0
    .subtext
      color #828282
      font-size 11px
  .itemtext
    color #828282
    margin-top 0
    margin-bottom 30px
  .itemtext p
    margin 10px 0
</style>
