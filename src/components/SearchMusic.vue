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
    <h2>No Movie in API with {{this.name}}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in albums"
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AlbumList } from '../models/album.list';

@Component({
  name: 'SearchMusic'
})
export default class SearchMusic extends Vue {

  // props
  @Prop({type: String})
  private name!: string;

  // variables
  private albums: any = null;
  private loading: boolean = true;
  private noData: boolean = false;

  public singleMusic(id: string) {
    this.$router.push('/music/' + id);
  }

  public fetchResult(value: string) {
    this.albums = null;
    fetch(`https://itunes.apple.com/search?term=${value}&entity=album`)
      .then((response: any) => {
        return response.json();
      }).then((albumList: AlbumList) => {
        console.log('parsed albumList', albumList);
        if (albumList.resultCount > 0) {
          this.albums = albumList.results;
          this.noData = false;
        } else {
          this.noData = true;
        }
        this.loading = false;
      });
  }

  public mounted () {
    console.log('SearchMusic mounted');
    this.fetchResult(this.name);
  }

  @Watch('name')
  onNameChanged(val: string, oldVal: string) {
    this.fetchResult(val);
  }

}
</script>

<style lang="scss" scoped>
  .v-progress-circular {
    margin: 1rem
  }
</style>