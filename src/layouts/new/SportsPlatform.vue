<template>
  <div class="sports-platform-container" :style="{ '--image-src': 'url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/sports-background.jpg?v=20250528)' }">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="sports-platform">
            <div data-section="players">
              <img src="https://api2-bd3.imgnxa.com/images/r96QGwANso/sportImage_bbd08d87-902a-45a6-992b-bb22d082eff6_1753926985993.png" alt="Sports Player">
            </div>
            <div data-section="matches">
              <div class="sports-platform-title">
                <i data-icon="play" :style="{ '--image-src': 'url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/icon-sprite.png?v=20250528)' }"></i>
                PLATFORM OLAHRAGA-<span>Event yang Direkomendasikan</span>
              </div>
              <div class="sports-matches-container">
                <div>
                  <div v-for="match in hotMatches" :key="match.id" class="hot-match-container" :style="{ '--image-src': 'url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/matches-background.png?v=20250528)' }">
                    <div data-team="home">
                      <img :src="match.homeTeam.image" :alt="match.homeTeam.name">
                      <span>{{ match.homeTeam.name }}</span>
                    </div>
                    <div class="match-info">
                      <div data-match-info="date">
                        {{ match.date }}
                      </div>
                      <div data-match-info="time">
                        {{ match.time }}
                      </div>
                      <a :href="match.liveStreamUrl" class="live-streaming-link">Live Streaming</a>
                      <div data-match-info="league">
                        {{ match.league }}
                      </div>
                    </div>
                    <div data-team="away">
                      <img :src="match.awayTeam.image" :alt="match.awayTeam.name">
                      <span>{{ match.awayTeam.name }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <ul class="sport-matches">
                    <li v-for="match in upcomingMatches" :key="match.id" class="sport-match-item">
                      <div class="match-date">
                        <span>{{ match.date }}</span>
                        {{ match.time }}
                      </div>
                      <div class="match-info-container">
                        <div data-team="home">
                          <img :src="match.homeTeam.image" :alt="match.homeTeam.name">
                        </div>
                        <div class="match-info">
                          <div>{{ match.league }}</div>
                          <div class="match-teams">
                            <div>{{ match.homeTeam.name }}</div>
                            <span>VS</span>
                            <div>{{ match.awayTeam.name }}</div>
                          </div>
                        </div>
                        <div data-team="away">
                          <img :src="match.awayTeam.image" :alt="match.awayTeam.name">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Team {
  name: string;
  image: string;
}

interface Match {
  id: number;
  date: string;
  time: string;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  liveStreamUrl?: string;
}

const hotMatches = ref<Match[]>([
  {
    id: 1,
    date: '05 Mei',
    time: '04.00.00',
    league: 'Champions League',
    homeTeam: {
      name: 'REAL.MADRID',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/REALMADRID_c2f1ec4a-623e-4fd2-9805-6b29b17ba1bd_1651634968923.png'
    },
    awayTeam: {
      name: 'MANCHESTER.CITY',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/MANCHESTERCITY_c2f1ec4a-623e-4fd2-9805-6b29b17ba1bd_1651634968923.png'
    },
    liveStreamUrl: '#'
  },
  {
    id: 2,
    date: '04 Mei',
    time: '05.00.00',
    league: 'Europa League',
    homeTeam: {
      name: 'VILAREAL',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/VILAREAL_6a79317d-0349-4ddc-8172-850ea1615a9e_1651635226633.png'
    },
    awayTeam: {
      name: 'LIVERPOOL',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/LIVERPOOL_6a79317d-0349-4ddc-8172-850ea1615a9e_1651635226633.png'
    },
    liveStreamUrl: '#'
  }
]);

const upcomingMatches = ref<Match[]>([
  {
    id: 3,
    date: '06 Mei',
    time: '04.00.00',
    league: 'Europa League',
    homeTeam: {
      name: 'WESTHAM',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/WESTHAM_919087a7-c174-4ab4-8e07-e3cb7c3739bd_1651665547547.png'
    },
    awayTeam: {
      name: 'EINTRACHT',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/EINTRACHT_919087a7-c174-4ab4-8e07-e3cb7c3739bd_1651665547547.png'
    }
  },
  {
    id: 4,
    date: '06 Mei',
    time: '04.00.00',
    league: 'Europa League',
    homeTeam: {
      name: 'AS.ROMA',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/ASROMA_b3f6f884-6ae0-46a6-ac2e-5a792d7bbf07_1651665182890.png'
    },
    awayTeam: {
      name: 'LEICESTER',
      image: 'https://api2-bd3.imgnxa.com/images/r96QGwANso/LEICESTER_b3f6f884-6ae0-46a6-ac2e-5a792d7bbf07_1651665182890.png'
    }
  }
]);

onMounted(() => {
  console.log('SportsPlatform component mounted');
});
</script>