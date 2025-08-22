<template>
  <div class="download-apk-container" :style="{ '--image-src': 'url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/download-apk-background.webp?v=20250528)' }">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="download-apk" id="download_apk">
            <div :style="{ transform: 'translateX(0%)', opacity: 1 }">
              <picture>
                <source srcset="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/download-apk-phone.webp?v=20250528" type="image/webp">
                <source srcset="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/download-apk-phone.png?v=20250528" type="image/png">
                <img alt="Download APK" class="img-responsive" height="408" loading="lazy" src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/home/download-apk-phone.png?v=20250528" width="566">
              </picture>
            </div>
            <div :style="{ transform: 'translateX(0%)', opacity: 1 }">
              <div class="h2">
                Unduh aplikasi gratis
                <strong>BD303 App</strong>
              </div>
              <div class="h3">Nikmati berbagai permainan dalam satu genggaman</div>
              <div class="download-apk-info">
                <div class="download-apk-section">
                  <div class="download-apk-qr-code">
                    <a :href="apkDownloadUrl">
                      <picture>
                        <source srcset="//d2rzzcn1jnr24x.cloudfront.net/Images/apk-qrcodes/BD3.webp?v=20250528" type="image/webp">
                        <source srcset="//d2rzzcn1jnr24x.cloudfront.net/Images/apk-qrcodes/BD3.jpg?v=20250528" type="image/jpeg">
                        <img alt="Unduh Aplikasi Permainan" height="94" loading="lazy" src="//d2rzzcn1jnr24x.cloudfront.net/Images/apk-qrcodes/BD3.jpg?v=20250528" width="94">
                      </picture>
                    </a>
                  </div>
                  <div class="download-apk-detail">
                    <div>BD303 App</div>
                    <a class="btn" href="#" @click.prevent="showInstallGuide">Panduan instalasi</a>
                  </div>
                  <span>Pindai kode QR untuk Unduh <i>Android APK</i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="modal download-popup-modal" role="dialog" data-title="Panduan Instalasi">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="hideInstallGuide" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div class="modal-title" id="apk_install_guide_modal_title">
              Panduan Instalasi
            </div>
          </div>
          <div class="modal-body" id="apk_install_guide_modal_body">
            <span>
              <img alt="Android" height="20" loading="lazy" src="//d2rzzcn1jnr24x.cloudfront.net/Images/icons/android-logo.svg?v=20250528" width="20"> 
              Instalasi Android
            </span>
            <ol>
              <li>Pindai kode QR untuk Android</li>
              <li>Pilih buka situs web</li>
              <li>Pilih "UNDUH" untuk mengunduh BD303 App</li>
              <li>Pilih "PENGATURAN"</li>
              <li>Pilih "Mengizinkan" dari sumber kami</li>
              <li>Pilih "Terima"</li>
              <li>Pilih "INSTAL"</li>
            </ol>
            <div class="download-32-bit-cntr">
              <div>Instalasi gagal?</div>
              <div>Coba versi 32-bit <a :href="apk32BitDownloadUrl" target="_blank">di sini</a> jika versi bawaan tidak bisa diinstal.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
const apkDownloadUrl = 'https://apk-depot.s3.ap-northeast-1.amazonaws.com/bd303.apk';
const apk32BitDownloadUrl = 'https://apk-depot.s3.ap-northeast-1.amazonaws.com/bd303-32bit.apk';

const showInstallGuide = () => {
  showModal.value = true;
};

const hideInstallGuide = () => {
  showModal.value = false;
};
</script>