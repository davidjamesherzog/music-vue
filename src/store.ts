import Vue from 'vue';
import Vuex from 'vuex';
import { AlbumList } from './models/album.list';
import { AlbumDetails } from './models/album.details';
import { Type } from './models/type';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    search: '',
    id: 0,
    albumList: new AlbumList(),
    albumDetails: new AlbumDetails(),
    album: new Array<Type>(),
    songs: new Array<Type>()
  },
  getters: {
    getAlbum(state) {
      // console.log('getAlbum getter');
      let album: Type = state.albumDetails.results.find((type: Type) => type.wrapperType === 'collection')!;
      if (!album) {
        album = new Type();
      }
      return album;
    },
    getSongs(state) {
      return state.albumDetails.results.filter((type) => type.wrapperType === 'track');
    }
  },
  mutations: {
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setSearch(state, search: string) {
      state.search = search;
    },
    setId(state, id: number) {
      state.id = id;
    },
    setAlbumList(state, albumList: AlbumList) {
      state.albumList = albumList;
    },
    setAlbumDetails(state, albumDetails: AlbumDetails) {
      state.albumDetails = albumDetails;
    }
  },
  actions: {
    getAlbums({commit, state}, search: string) {
      if (state.search === search) {
        return;
      }
      commit('setSearch', search);
      commit('setLoading', true);
      fetch(`https://itunes.apple.com/search?term=${search}&entity=album`)
        .then((response: any) => {
          return response.json();
        }).then((albumList: AlbumList) => {
          commit('setAlbumList', albumList);
          commit('setLoading', false);
        });
    },
    getAlbumDetails({commit, state}, id: number) {
      if (state.id === id) {
        return;
      }
      commit('setId', id);
      commit('setLoading', true);
      fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`)
        .then((response: any) => {
          return response.json();
        }).then((albumDetails: AlbumDetails) => {
          // console.log(albumDetails);
          commit('setAlbumDetails', albumDetails);
          commit('setLoading', false);
        });
    }
  }
});
