<template>
  <div class="log-leader-view">
    <select v-model="selected">
      <option v-for="site in sites" value="{{site.id}}">{{site.root_url}}</option>
    </select>
    <div class="button" v-on:click="load" v-bind:class="{ 'disable': isLoading }">
      <a class="text" >Load</a>
    </div>
    <div class="status">
      <span v-show="isDefault">Site ID: {{ selected }}</span>
      <span v-show="isLoading">Loading...</span>
      <span v-show="isError">Error: {{ selected }}</span>
    </div>
  </div>
</template>

<script>
const STATE_DEFAULT = 'default'
const STATE_LOADING = 'loading'
const STATE_LOADED = 'loaded'
const STATE_ERROR = 'error'
// import store from 'store/log.js'
export default {
  name: 'LogLoader',
  components: {

  },
  data () {
    return {
      selected: null,
      state: STATE_DEFAULT,
      disabled: true,
      sites: []
    }
  },
  created() {
    fetch("http://localhost:3000/sites").then(response => { return response.json() }).then (json => {
      this.$set('sites', json)
    })
  },
  methods: {
    load() {
      this.state = STATE_LOADING
      fetch("http://localhost:3000/load_log?site_id=" + this.selected).then(response => { return response.json() }).then (json => {
        this.$set('state', STATE_LOADED)
        this.$dispatch('loaded-log-data', json)
      })
    },
  },
  computed: {
    isDefault () {
      return this.state == STATE_DEFAULT
    },
    isLoading () {
      return this.state == STATE_LOADING
    },
    isError () {
      return this.state == STATE_ERROR
    },
    isLoading () {
      return this.state == STATE_LOADED
    }
  }
}
</script>

<style lang="stylus">
.log-leader-view
  select
    width 200px
    margin-right 20px
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
  .status
    color #fefefe
    display: inline
</style>
