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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AlbumList } from '../models/album.list';
import { Type } from '../models/type';

@Component({
  name: 'LatestMusic'
})
// import movieApi from '@/services/MovieApi';
export default class LatestMusic extends Vue {
  private albums: any = null;
  /* private albums: AlbumList = {
    resultCount: 0,
    results: []
  }; */
  private loading: boolean = true;

  public mounted() {
    console.log('LatestMusic mounted');
    fetch('https://itunes.apple.com/search?term=Metallica&entity=album')
      .then((response: any) => {
        return response.json();
      }).then((albumList: AlbumList) => {
        console.log('parsed albumList', albumList);
        this.albums = albumList.results;
        this.loading = false;
      });
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