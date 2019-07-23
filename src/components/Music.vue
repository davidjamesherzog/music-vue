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

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <v-card>
          <v-img
            :src="album.artworkUrl60"
            aspect-ratio="1"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">{{album.artistName}}</h2>
              <div>Title: {{album.collectionName}}</div>
              <div>Date: {{album.releaseDate.substring(0,4)}}</div>
              <div>Genre: {{album.primaryGenreName}}</div>
              <div>Tracks: {{album.trackCount - 1}}</div>
            </div>
            <v-container
              fluid
              grid-list-md
            >
              <v-list>
                <v-list-tile
                  v-for="(song, index) in songs"
                  :key="index">
                  <v-list-tile-action>
                    <v-list-tile-title v-text="song.trackNumber"></v-list-tile-title>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title v-text="song.trackName"></v-list-tile-title>
                  </v-list-tile-content>

                  <!-- <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar> -->
                </v-list-tile>
              </v-list>
            </v-container>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AlbumDetails } from '../models/album.details';

@Component({
  name: 'Music'
})
export default class Music extends Vue {

  // props
  @Prop({type: String})
  private id!: string;

  // variables
  private album: any = {};
  private songs: any = [];
  private loading: boolean = true;

  public mounted() {
    console.log('Music mounted');
    fetch(`https://itunes.apple.com/lookup?id=${this.id}&entity=song`)
      .then((response: any) => {
        return response.json();
      }).then((albumDetails: AlbumDetails) => {
        console.log('parsed albumDetails', albumDetails);
        this.album = albumDetails.results[0];
        this.songs = albumDetails.results;
        this.songs.shift();
        console.log(this.songs);
        this.loading = false;
      });
  }
}
</script>
<style lang="scss">
  .v-progress-circular {
    margin: 1rem
  } 
</style>