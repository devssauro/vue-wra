<template>
  <v-main fill-height>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-sheet class="pt-6" rounded="lg">
            <v-row>
              <v-col cols="4">
                <v-autocomplete clearable class="px-4 mb-n5" outlined label="Campeonato" v-model="search.t"
                  :items="tournaments" item-text="name" item-value="id" @change="tournamentChanged" />
              </v-col>
              <v-col cols="4">
                <v-autocomplete @change="getRotations" clearable class="px-4 mb-n5" outlined label="Time"
                  v-model="search.team" :items="teams" item-text="name" item-value="id" />
              </v-col>
              <v-col cols="4">
                <v-autocomplete @change="getRotations" clearable class="px-4 mb-n5" outlined label="Patch"
                  v-model="search.patch" :items="['3.2a']" />
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-tabs v-model="tab">
            <v-tab>
              Picks
            </v-tab>
            <v-tab>
              Bans
            </v-tab>
            <v-tab>
              Presença
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-row>
                <v-col cols="6">
                  <v-card>
                    <v-card-title>Pick Rate</v-card-title>
                    <v-data-table :headers="prioHeaders" :items="resume" item-key="name" group-by="side" show-group-by
                      :items-per-page="-1" :sort-by="['side', 'rotation']" :sort-desc="[false, false]" multi-sort
                      hide-default-footer />
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>
                    <v-card-title>Win Rate</v-card-title>
                    <v-data-table :headers="prioHeaders" :items="resumeWR" item-key="name" group-by="side" show-group-by
                      :items-per-page="-1" :sort-by="['side', 'rotation']" :sort-desc="[false, false]" multi-sort
                      hide-default-footer />
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-data-table :headers="pickHeaders" :items="bluePicks" item-key="name" sort-by="qty_win"
                    group-by="rotation" show-group-by :items-per-page="-1" sort-desc hide-default-footer>
                    <template v-slot:item.champion_name="{ item }">
                      <v-avatar rounded size="36">
                        <img :alt="item.champion" :src="getImg(item.champion_name)">
                      </v-avatar>
                      <span class="pl-2 subtitle-1">
                        {{item.champion_name}}
                      </span>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="6">
                  <v-data-table :headers="pickHeaders" :items="redPicks" item-key="name" sort-by="qty_win"
                    group-by="rotation" show-group-by :items-per-page="-1" sort-desc hide-default-footer>
                    <template v-slot:item.champion_name="{ item }">
                      <v-avatar rounded size="36">
                        <img :alt="item.champion" :src="getImg(item.champion_name)">
                      </v-avatar>
                      <span class="pl-2 subtitle-1">
                        {{item.champion_name}}
                      </span>
                    </template>

                  </v-data-table>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="6">
                  <v-data-table :headers="banHeaders" :items="blueBans" item-key="name" sort-by="qty_win"
                    group-by="rotation" show-group-by :items-per-page="-1" sort-desc hide-default-footer>
                    <template v-slot:item.champion_name="{ item }">
                      <v-avatar rounded size="36">
                        <img :alt="item.champion" :src="getImg(item.champion_name)">
                      </v-avatar>
                      <span class="pl-2 subtitle-1">
                        {{item.champion_name}}
                      </span>
                    </template>

                  </v-data-table>
                </v-col>
                <v-col cols="6">
                  <v-data-table :headers="banHeaders" :items="redBans" item-key="name" sort-by="qty_win"
                    group-by="rotation" show-group-by :items-per-page="-1" sort-desc hide-default-footer>
                    <template v-slot:item.champion_name="{ item }">
                      <v-avatar rounded size="36">
                        <img :alt="item.champion" :src="getImg(item.champion_name)">
                      </v-avatar>
                      <span class="pl-2 subtitle-1">
                        {{item.champion_name}}
                      </span>
                    </template>

                  </v-data-table>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col v-for="role in ['baron', 'jungle', 'mid', 'dragon', 'sup']" :key="role">
                  <v-data-table dense :headers="presenceHeaders" :items="presence[role]" item-key="name"
                    hide-default-footer :sort-by="['total_presence', 'qty_win']" :sort-desc="[true, true]" multi-sort
                    :items-per-page="-1">
                    <template v-slot:item.champion_name="{ item }">
                      <v-avatar rounded size="36">
                        <img :alt="item.champion" :src="getImg(item.champion_name)">
                      </v-avatar>
                      <!-- <span class="pl-2 subtitle-1">
                        {{item.champion_name}}
                      </span> -->
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
  import axios from 'axios'
  import PlayerField from '@/components/mapInfo/PlayerField'
  import ChampionField from '@/components/mapInfo/ChampionField'
  export default {
    name: 'Matchups',
    components: {
      ChampionField,
      PlayerField
    },
    created() {
      this.getTournaments();
      this.getTeams();
      this.getRotations();
    },
    data: () => ({
      tab: null,
      tournaments: [],
      bluePicks: [],
      redPicks: [],
      resume: [],
      resumeWR: [],
      blueBans: [],
      redBans: [],
      presence: {
        baron: [], jungle: [], mid: [], dragon: [], sup: []
      },
      pickHeaders: [
        {
          text: 'Champion',
          align: 'start',
          sortable: true,
          value: 'champion_name',
          groupable: false,
        },
        {
          text: 'Rotação',
          align: 'end',
          sortable: true,
          value: 'rotation',
          groupable: true,
        },
        {
          text: 'Qtd Picks',
          align: 'end',
          sortable: true,
          value: 'qty_games',
          groupable: false,
        },
        {
          text: 'Qtd Win',
          align: 'end',
          sortable: true,
          value: 'qty_win',
          groupable: false,
        },
      ],
      prioHeaders: [
        {
          text: 'Side',
          align: 'start',
          sortable: true,
          value: 'side',
          groupable: true,
        },
        {
          text: 'Rotação',
          align: 'start',
          sortable: true,
          value: 'rotation',
          groupable: true,
        },
        {
          text: 'Baron',
          align: 'end',
          sortable: true,
          value: 'baron',
          groupable: false,
        },
        {
          text: 'Jungle',
          align: 'end',
          sortable: true,
          value: 'jungle',
          groupable: false,
        },
        {
          text: 'Mid',
          align: 'end',
          sortable: true,
          value: 'mid',
          groupable: false,
        },
        {
          text: 'Dragon',
          align: 'end',
          sortable: true,
          value: 'dragon',
          groupable: false,
        },
        {
          text: 'Sup',
          align: 'end',
          sortable: true,
          value: 'sup',
          groupable: false,
        },
      ],
      banHeaders: [
        {
          text: 'Champion',
          align: 'start',
          sortable: true,
          value: 'champion_name',
          groupable: false,
        },
        {
          text: 'Rotação',
          align: 'end',
          sortable: true,
          value: 'rotation',
          groupable: true,
        },
        {
          text: 'Qtd Bans',
          align: 'end',
          sortable: true,
          value: 'qty_games',
          groupable: false,
        },
        {
          text: 'Qtd Win',
          align: 'end',
          sortable: true,
          value: 'qty_win',
          groupable: false,
        },
      ],
      presenceHeaders: [
        {
          text: 'Champ',
          align: 'start',
          sortable: false,
          value: 'champion_name',
          groupable: false,
        },
        {
          text: 'Picks',
          align: 'end',
          sortable: true,
          value: 'qty_picks',
          groupable: false,
        },
        {
          text: 'Bans',
          align: 'end',
          sortable: true,
          value: 'qty_bans',
          groupable: false,
        },
        {
          text: 'Win',
          align: 'end',
          sortable: true,
          value: 'qty_win',
          groupable: false,
        },
        {
          text: 'Presença',
          align: 'end',
          sortable: true,
          value: 'total_presence',
          groupable: false,
        },
      ],
      search: {
        patch: null,
        t: null,
        team: null,
        sort: 'name'
      },
      snackText: '',
      snackbar: false,
      teams: [],
      roles: [
        {title: 'TOP', tag: 'baron'},
        {title: 'JG', tag: 'jungle'},
        {title: 'MID', tag: 'mid'},
        {title: 'ADC', tag: 'dragon'},
        {title: 'SUP', tag: 'sup'},
      ],
    }),
    methods: {
      getTournaments() {
        axios.get('v1/tournament').then(res => {
          this.tournaments = res.data.tournaments.map(m => {
            return m;
          });
        });
      },
      tournamentChanged(val) { 
        this.getTeams();
        this.getRotations();
      },
      playerChanged(val) { 
        this.search.player_id = val;
        this.selectedPlayer = this.players.filter(c => c.id === val)[0];
        this.getAllInfo();
      },
      getPickRotations() {
        axios.get(`v1/view/picks`, {params: this.search}).then(res => {
          this.bluePicks = res.data.blue_picks;
          this.redPicks = res.data.red_picks;
          this.resume = res.data.abstract;
          this.resumeWR = res.data.wr_rotation;
        });
      },
      getBanRotations() {
        axios.get(`v1/view/bans`, { params: this.search }).then(res => {
          this.blueBans = res.data.blue_bans;
          this.redBans = res.data.red_bans;
        });
      },
      getPresence() {
        axios.get(`v1/view/presence`, { params: this.search }).then(res => {
          this.presence = res.data;
        });
      },
      getRotations() { 
        this.getPickRotations();
        this.getBanRotations();
        this.getPresence();
      },
      getTeams() {
        axios.get(`v1/team`, {params: this.search}).then(res => {
          this.teams = res.data.teams;
        });
      },
      getImg(champion) {
        return require(`@/assets/${champion}.png`);
      },
      getAllInfo() {
      }
    }
  }
</script>

