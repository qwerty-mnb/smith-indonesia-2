<template>
  <div class="announcement-container" bis_skin_checked="1">
    <div data-section="title" bis_skin_checked="1">
      <i data-icon="announcement" style="--image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/icon-sprite.png?v=20250529);"></i>
      Pemberitahuan
    </div>
    <div data-section="announcements" bis_skin_checked="1">
      <div id="ER_1755622699773" bis_skin_checked="1">
        <div class="tickercontainer" bis_skin_checked="1">
          <div class="mask" bis_skin_checked="1">
            <ul class="announcement-list newsticker" id="announcement_list" style="width: 12871px; left: -369.12px;">
              <li>Pemeliharaan Terjadwal: AdvantPlay Mini Game pada 17-Agt-2025 dari 22.01.34 sampai 09-Agt-2026 12.59.59. Selama waktu ini, AdvantPlay Mini Game permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li>Pemeliharaan Terjadwal: Spinix pada 07-Des-2024 dari 11.36.12 sampai 01-Jan-2026 02.29.00. Selama waktu ini, Spinix permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li>Pemeliharaan Terjadwal: Fairbet pada 14-Jan-2025 dari 14.00.00 sampai 01-Jan-2026 02.00.00. Selama waktu ini, Fairbet permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li>Pemeliharaan Terjadwal: PPVIRTUALGAMES pada 06-Des-2024 dari 23.36.12 sampai 31-Des-2025 14.00.00. Selama waktu ini, PPVIRTUALGAMES permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li>Pemeliharaan Terjadwal: MG Live pada 25-Feb-2025 dari 02.00.00 sampai 25-Mar-2050 02.00.00. Selama waktu ini, MG Live permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li class="tick-clones">Selamat Datang Di BD303. Harap Selalu Check No Tujuan Deposit Yang Aktif Di Menu Deposit Sebelum Transfer Dana Anda.</li>
              <li class="tick-clones">Pemeliharaan Terjadwal: AdvantPlay Mini Game pada 17-Agt-2025 dari 22.01.34 sampai 09-Agt-2026 12.59.59. Selama waktu ini, AdvantPlay Mini Game permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li class="tick-clones">Pemeliharaan Terjadwal: Spinix pada 07-Des-2024 dari 11.36.12 sampai 01-Jan-2026 02.29.00. Selama waktu ini, Spinix permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li class="tick-clones">Pemeliharaan Terjadwal: Fairbet pada 14-Jan-2025 dari 14.00.00 sampai 01-Jan-2026 02.00.00. Selama waktu ini, Fairbet permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li class="tick-clones">Pemeliharaan Terjadwal: PPVIRTUALGAMES pada 06-Des-2024 dari 23.36.12 sampai 31-Des-2025 14.00.00. Selama waktu ini, PPVIRTUALGAMES permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li class="tick-clones">Pemeliharaan Terjadwal: MG Live pada 25-Feb-2025 dari 02.00.00 sampai 25-Mar-2050 02.00.00. Selama waktu ini, MG Live permainan tidak akan tersedia. Kami memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan.</li>
              <li>Selamat Datang Di BD303. Harap Selalu Check No Tujuan Deposit Yang Aktif Di Menu Deposit Sebelum Transfer Dana Anda.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div data-section="date" bis_skin_checked="1">
      Rab, 20-Agt-2025 01.58.18
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "Announcement",
  setup() {
    let tickerInterval: number | null = null;

    const startTicker = () => {
      const announcementList = document.getElementById('announcement_list');
      if (announcementList) {
        tickerInterval = window.setInterval(() => {
          const currentLeft = parseFloat(announcementList.style.left) || 0;
          const newLeft = currentLeft - 1; // Adjust speed here
          
          // Reset position when it goes too far left
          if (newLeft < -announcementList.scrollWidth / 2) {
            announcementList.style.left = '0px';
          } else {
            announcementList.style.left = newLeft + 'px';
          }
        }, 50); // Adjust interval for smoother/faster movement
      }
    };

    const stopTicker = () => {
      if (tickerInterval) {
        clearInterval(tickerInterval);
        tickerInterval = null;
      }
    };

    onMounted(() => {
      startTicker();
    });

    onUnmounted(() => {
      stopTicker();
    });

    return {};
  },
});
</script>