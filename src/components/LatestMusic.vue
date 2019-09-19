<template>

  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular
        indeterminate
        :size="150"
        :width="8"
        color="green">
      </v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in albumList.results"
        :key="index"
        mb-2>

        <album-card :item="item"></album-card>
        
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State,
  Mutation,
  Action
} from 'vuex-class';
import { AlbumList } from '../models/album.list';
import { Type } from '../models/type';
import AlbumCard from './AlbumCard.vue';

@Component({
  name: 'LatestMusic',
  components: {
    AlbumCard
  }
})
export default class LatestMusic extends Vue {

  @State private loading!: boolean;
  @State private albumList!: AlbumList;
  // @Mutation private setSearch: any;
  @Action private getAlbums: any;

  // variables
  // private loading: boolean = true;

  public mounted() {
    // console.log('LatestMusic mounted');
    this.getAlbums('Metallica');
  }

  public singleMusic(id: number) {
    this.$router.push('/music/' + id);
  }
}
</script>

<style lang="scss" scoped>
  .v-progress-circular {
    margin: 1rem
  } 
</style>