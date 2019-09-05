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

        <album-card :item="item"></album-card>
        
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
  private albums!: Type[];
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