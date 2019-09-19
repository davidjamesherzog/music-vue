<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        Music
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field
          label='Search Musician'
          v-model='searchString'
          >
        </v-text-field>
        </v-flex>
      <v-btn
        flat
        :disabled="!dataAvailable"
        @click="searchMusic"
      >
       <span class="mr-2">Search</span>
      </v-btn>
    </v-toolbar>

    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'App'
})
export default class App extends Vue {

  private searchString: string = '';

  public searchMusic() {
    // console.log(`SEARCH MUSIC - ${this.searchString}`);
    this.$router.push('/search/' + this.searchString);
    this.searchString = '';
  }

  get dataAvailable() {
    return this.searchString !== null && this.searchString !== '';
  }
}
</script>
