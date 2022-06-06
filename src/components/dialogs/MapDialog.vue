<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow>
      <v-tab v-for="item in tabs" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <team-side :map="map" :teams="teamsInfo" />
      </v-tab-item>
      <v-tab-item>
        <picks-bans :map="map" :teams="teamsInfo" />
      </v-tab-item>
      <v-tab-item>
        <draft :map="map" :teams="teamsInfo" />
      </v-tab-item>
      <v-tab-item>
        <final-stats @save="save" :map="map" :teams="teamsInfo" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import axios from 'axios';
  import TeamSide from '@/components/mapInfo/TeamSide';
  import PicksBans from '@/components/mapInfo/PicksBans';
  import Draft from '@/components/mapInfo/Draft';
  import FinalStats from '@/components/mapInfo/FinalStats';
  export default {
    name: 'MapDialog',
    components: {
      TeamSide,
      PicksBans,
      Draft,
      FinalStats
    },
    props: {
      matchup: Number
    },
    created () {
      console.log(this.matchup);
      this.getPlayers();
    },
    data() {
      return {
        tab: null,
        tabs: ['side', 'Picks & Bans', 'Champion Picks', 'Map stats'],
        teamsInfo: {}, 
        teamsList: [],
        map: {
          blue_side: null,
          red_side: null,
          blue_baron_player: null,
          blue_jungle_player: null,
          blue_mid_player: null,
          blue_dragon_player: null,
          blue_sup_player: null,
          red_baron_player: null,
          red_jungle_player: null,
          red_mid_player: null,
          red_dragon_player: null,
          red_sup_player: null,
          patch: '3.2a',
        },
      }
    },
    methods: {
      getPlayers() {
        axios.get(`/v1/matchup/${this.matchup}/teams`).then(res => {
          this.teamsInfo = res.data;
          // console.log(this.teamsInfo);
        });
      },
      save(signal) {
        // console.log('MapDialog');
        axios.post(`v1/matchup/${this.matchup}/map`, this.map).then(res => {
          this.$emit('saved', true);
        });
      }
    }
  }
</script>
