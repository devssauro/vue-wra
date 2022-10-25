<template>
  <v-main fill-height >
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item link @click="newMatchup" v-if="isOperationalUser">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon>
                      add
                    </v-icon>
                      Nova Matchup
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="host" />
              <v-list-item>
               <v-list-item-content>
                <v-autocomplete
                  v-model="selectedTournaments"
                  :items="tournaments" class="mb-n8"
                  item-text="name"
                  item-value="id"
                  outlined dense label="Campeonatos" />
                </v-list-item-content>
              </v-list-item>
              <!-- <v-divider /> -->
            </v-list>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg">
            <!-- {{Matchups}} -->
            <v-expansion-panels :multiple="false" accordion>
              <template v-for="matchup in matchups">
                <v-expansion-panel :key="matchup.id">
                  <v-expansion-panel-header>
                      <span>{{matchup.datetime}} | {{matchup.team1.name}} X {{matchup.team2.name}}</span>
                      <v-spacer /> <span/>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <template v-if="matchup.maps.length === 1">
                        <template v-for="n in [0]">
                          <v-col cols="12">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 2">
                        <template v-for="n in [0, 1]">
                          <v-col cols="6">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 3">
                        <template v-for="n in [0, 1, 2]">
                          <v-col cols="4">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 4">
                        <template v-for="n in [0, 1, 2, 3]">
                          <v-col cols="3">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 5">
                        <template v-for="n in [0, 1, 2]">
                          <v-col cols="4">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                        <template v-for="n in [3, 4]">
                          <v-col cols="6">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 6">
                        <template v-for="n in [0, 1, 2, 3, 4, 5]">
                          <v-col cols="4">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <template v-if="matchup.maps.length === 7">
                        <template v-for="n in [0, 1, 2, 3]">
                          <v-col cols="3">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                        <template v-for="n in [4, 5, 6]">
                          <v-col cols="4">
                            <v-card :color="`${matchup.maps[n].winner_side} darken-3`">
                              <v-card-title>
                                {{matchup[matchup.maps[n].winner].tag}}
                                <v-spacer />
                                {{matchup.maps[n].length}}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </template>
                      </template>
                      <v-col cols="12">
                        <v-btn block depressed color="success" v-if="isOperationalUser" @click="newMap(matchup.id)">
                          Adicionar mapa
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- <v-divider :key="`${matchup.id}-${matchup.id}`"/> -->
              </template>
            </v-expansion-panels>        
          </v-sheet>
        </v-col>
      </v-row>
      <v-dialog max-width="650" v-model="matchupDialog">
        <matchup-dialog :tournament="selectedTournaments" v-if="matchupDialog" @saved="closeMatchupDialog" />
      </v-dialog>
      <v-dialog fullscreen v-model="mapDialog" persistent>
        <map-dialog v-if="mapDialog" @saved="closeMapDialog" :matchup="selectedMatchup" />
      </v-dialog>
    </v-container>
    <v-snackbar
      v-model="snackbar">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          icon
          v-bind="attrs"
          @click="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
  import {bus} from '@/main';
  import moment from 'moment';
  import axios from 'axios';
  import MatchupDialog from '@/components/dialogs/MatchupDialog'
  import MapDialog from '@/components/dialogs/MapDialog'
  export default {
    name: 'MatchupsComp',
    components: {
      MatchupDialog,
      MapDialog
    },
    computed: {
      isOperationalUser() {
        if (this.user !== null && this.user !== undefined) {
          return this.user.roles.indexOf('operational') > -1;
        } else
          return false;
      },
    },
    created() {
      this.getTournaments();
      bus.$on('login', (user) => {
        this.user = user;
      });
    },
    data: () => ({
      user: JSON.parse(localStorage.getItem('user')),
      host: window.location.host.indexOf('localhost') > -1,
      selectedTournaments: [],
      tournaments: [],
      matchupDialog: false,
      mapDialog: false,
      snackText: '',
      snackbar: false,
      matchups: [],
      selectedMatchup: null
    }),
    watch: {
      selectedTournaments: function (t) {
        this.getMatchups(t);
      }
    },
    methods: {
      getMatchups(tournaments) {
        let params = new URLSearchParams();
        if (Array.isArray(tournaments))
          for (const t in tournaments) {
            params.append('t', tournaments[t]);
          }
        else {
          params = {t: tournaments}
        }
        axios.get('v1/matchup', {'params': params}).then(res => {
          this.matchups = res.data.matchups.map(m => {
            m.datetime = moment(`${m.datetime}-3`).format('DD/MM/YY HH:mm');
            return m;
          });
          if(this.matchups.length > 0)
            this.selectedMatchup = this.matchups[0].id;
          // this.mapDialog = true;
        });
      },
      getTournaments() {
        axios.get('v1/tournament').then(res => {
          this.tournaments = res.data.tournaments.map(m => {
            // m.datetime = moment(`${m.datetime}`).format('DD/MM/YYYY HH:mm');
            return m;
          });
          this.selectedTournaments = 7;
          this.getMatchups(this.selectedTournaments);
        });
      },
      newMatchup() {
        this.matchupDialog = true;
      },
      newMap(matchupId) {
        this.selectedMatchup = matchupId;
        this.mapDialog = true;
      },
      closeMatchupDialog() {
        this.getMatchups(this.selectedTournaments);
        this.matchupDialog = false;
        this.snackText = 'Nova matchup criada';
        this.snackbar = true;
      },
      closeMapDialog() {
        this.getMatchups();
        this.mapDialog = false;
        this.snackText = 'Novo mapa criado';
        this.snackbar = true;
      }
    }
  }
</script>
