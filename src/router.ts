import Vue from 'vue';
import Router from 'vue-router';
import LatestMusic from '@/views/LatestMusic.vue';
import Music from '@/views/Music.vue';
import SearchMusic from '@/views/SearchMusic.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LatestMusic',
      component: LatestMusic,
    },
    {
      path: '/music/:id',
      name: 'Music',
      props: true,
      component: Music
    },
    {
      path: '/search/:name',
      name: 'SearchMusic',
      props: true,
      component: SearchMusic
    }
  ]
});
