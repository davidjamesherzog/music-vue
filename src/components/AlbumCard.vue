<template>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Type } from '../models/type';

@Component({
  name: 'AlbumCard'
})
export default class AlbumCard extends Vue {

  @Prop({type: Object})
  private item!: Type;

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