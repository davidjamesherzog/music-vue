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
            :src="getAlbum.artworkUrl60"
            aspect-ratio="1"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">{{getAlbum.artistName}}</h2>
              <div>Title: {{getAlbum.collectionName}}</div>
              <div>Date: {{getAlbum.releaseDate.substring(0,4)}}</div>
              <div>Genre: {{getAlbum.primaryGenreName}}</div>
              <div>Tracks: {{getAlbum.trackCount - 1}}</div>
            </div>
            <v-container
              fluid
              grid-list-md
            >
              <v-list>
                <v-list-tile
                  v-for="(song, index) in getSongs"
                  :key="index">
                  <v-list-tile-action>
                    <v-list-tile-title v-text="song.trackNumber"></v-list-tile-title>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title v-text="song.trackName"></v-list-tile-title>
                  </v-list-tile-content>

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
import {
  State,
  Getter,
  Action,
  namespace
} from 'vuex-class';
import { AlbumDetails } from '../models/album.details';
import { Type } from '../models/type';

const musicModule = namespace('Music');

@Component({
  name: 'Music'
})
export default class Music extends Vue {

  // props
  @Prop({type: String})
  private id!: string;

  @musicModule.State
  private loading!: boolean;
  @musicModule.Getter
  private getAlbum: any;
  @musicModule.Getter
  private getSongs: any;
  @musicModule.Action
  private getAlbumDetails: any;

  public mounted() {
    // console.log('Music mounted');
    this.getAlbumDetails(this.id);
  }
}
</script>
<style lang="scss">
  .v-progress-circular {
    margin: 1rem
  } 
</style>