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

  <v-container v-else-if="noData">
    <div class="text-xs-center">
    <h2>No Music in API with {{this.name}}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in albumList.results"
        :key="index"
        mb-2>
        <v-card>
          <v-img
            :src="item.artworkUrl100"
            aspect-ratio="1"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{item.artistName}}</h2>
              <div>Title: {{item.collectionName}}</div>
              <div>Date: {{item.releaseDate.substring(0,4)}}</div>
              <div>Genre: {{item.primaryGenreName}}</div>
              <div>Tracks: {{item.trackCount - 1}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat
              color="green"
              @click="singleMusic(item.collectionId)"
              >View</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script lang="ts">
import { State, Mutation, Action } from 'vuex-class';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AlbumList } from '../models/album.list';
import { Type } from '../models/type';

@Component({
  name: 'SearchMusic'
})
export default class SearchMusic extends Vue {

  // props
  @Prop({type: String})
  private name!: string;

  @State private loading!: boolean;
  @State private albumList!: AlbumList;
  // @Mutation private setSearch: any;
  @Action private getAlbums: any;

  // variables
  private noData: boolean = false;

  public singleMusic(id: string) {
    this.$router.push('/music/' + id);
  }

  public fetchResult(value: string) {
    // this.setSearch(value);
    this.getAlbums(value)
      .then(() => {
        // console.log('parsed albumList', this.albumList);
        if (this.albumList.resultCount > 0) {
          this.noData = false;
        } else {
          this.noData = true;
        }
      });
  }

  public mounted() {
    // console.log('SearchMusic mounted');
    this.fetchResult(this.name);
  }

  @Watch('name')
  public onNameChanged(val: string, oldVal: string) {
    // console.log('SearchMusic watch');
    this.fetchResult(val);
  }

}
</script>

<style lang="scss" scoped>
  .v-progress-circular {
    margin: 1rem
  }
</style>