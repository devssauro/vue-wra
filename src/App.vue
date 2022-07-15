<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container class="py-0 fill-height">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text class="mr-1" v-bind="attrs" v-on="on">
              Relatórios
            </v-btn>
          </template>
          <v-list>
            <template v-for="(item, index) in items">
              <v-list-item link :key="index" @click="goTo(item.to)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
        <template v-for="link in links">
          <v-btn @click="goTo(link.to)" :key="link.title" text class="mr-1" v-if="link.toShow"> {{ link.title }} </v-btn>
        </template>
        <v-spacer />
        <v-responsive max-width="260">
          <v-text-field dense flat hide-details rounded solo-inverted />
        </v-responsive>
      </v-container>
    </v-app-bar>
    <v-main fill-height class="pt-0">
      <router-view fill-height />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    links: [
      { title: 'Matchups', to: '/', toShow: true},
      { title: 'Cadastros', to: '/cadastros', toShow: window.location.host.indexOf('localhost') > -1},
      { title: 'Download', to: '/download', toShow: true },
    ],
    items: [
      { title: 'Champion', to: '/view/champion' },
      { title: 'Player', to: '/view/player' },
      { title: 'Picks & Bans', to: '/view/picks_bans' },
      { title: 'Stats Geral', to: '/view/stats' },
    ],
  }),
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  }
};
</script>
