<template>
  <v-container fluid>
    <!-- {{map}} -->
    <v-row>
      <v-col cols="4">
        <v-card color="red darken-3" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            First Blood
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense v-model="map.team_first_blood" @change="setTeamFirstDeath" outlined label="Time"
                  :items="teamsList" item-text="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select dense v-model="map.player_first_blood" outlined label="First Blood" :items="firstBloodTeam()"
                  item-text="nickname" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select dense v-model="map.player_first_death" outlined label="First Death" :items="firstDeathTeam()"
                  item-text="nickname" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select dense v-model="map.place_first_blood" outlined label="Local" :items="roles" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="purple" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            First Herald
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense v-model="map.team_first_herald" outlined label="Time" :items="teamsList"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12" class="mb-8">
                <v-checkbox dense v-model="map.first_herald_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="12" class="mb-12">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="deep-orange darken-3" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            First tower
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense dense v-model="map.team_first_tower" outlined label="Time" :items="teamsList"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select dense dense v-model="map.first_tower_route" outlined label="Rota" :items="roles"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-checkbox class="pl-1" v-model="map.first_tower_herald" label="Com arauto" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="blue-grey" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            First Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense dense v-model="map.team_first_drake" outlined label="Time" :items="teamsList"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select dense dense v-model="map.first_drake_type" outlined label="Dragão" :items="drakes"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="map.first_drake_teamfight" label="Com luta" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="blue-grey" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            Second Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense dense v-model="map.team_second_drake" outlined label="Time" :items="teamsList"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select dense dense v-model="map.second_drake_type" outlined label="Dragão" :items="drakes"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="map.second_drake_teamfight" label="Com luta" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="blue-grey" dark outlined>
          <v-card-title style="display: flex; justify-content: center">
            Third Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select dense dense v-model="map.team_third_drake" outlined label="Time" :items="teamsList"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select dense dense v-model="map.third_drake_type" outlined label="Dragão" :items="drakes"
                  item-text="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="map.third_drake_teamfight" label="Com luta" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import ChampionField from '@/components/mapInfo/ChampionField'
  export default {
    name: 'Matchups',
    props: {
      map: Object,
      teams: Object
    },
    components: {
      ChampionField
    },
    created () {
    },
    watch: {
    },
    computed: {
    },
    data() {
      return {
        teamsList: [this.teams.team1, this.teams.team2],
        blueSidePlayers: [],
        redSidePlayers: [],
        roles: ['baron', 'jungle', 'mid', 'dragon', 'sup'],
        drakes: ['infernal', 'mountain', 'ocean']
      }
    },
    methods: {
      setTeamFirstDeath(val) {
        this.map.team_first_death = this.teamsList.filter(t => t.id !== val)[0].id;
      },
      firstBloodTeam() {
        if (this.map.team_first_blood !== undefined) 
          return this.teamsList.filter(t => t.id === this.map.team_first_blood)[0].players;
        return [];
      },
      firstDeathTeam() {
        if (this.map.team_first_blood !== undefined)
          return this.teamsList.filter(t => t.id !== this.map.team_first_blood)[0].players;
        return [];
      },
      getPlayerName(teamId, playerId) {
        if (this.teams.team1.id == teamId)
          return this.teams.team1.players.filter(p => p.id === playerId)[0].nickname;
        else
          return this.teams.team2.players.filter(p => p.id === playerId)[0].nickname;
      }
    }
  }
</script>
