<template>
  <div class="banner" bis_skin_checked="1">
    <div id="banner_carousel" class="banner-carousel" bis_skin_checked="1">
      <!-- Fallback carousel if vue-slick fails -->
      <div v-if="!slickLoaded" class="fallback-carousel">
        <div class="carousel-container">
          <div 
            class="carousel-slide" 
            v-for="(slide, index) in slides" 
            :key="index"
            :class="{ active: currentSlide === index }"
          >
            <a :href="slide.link" target="_self">
              <img :src="slide.image" :alt="slide.alt" :title="slide.title" loading="lazy" width="1920" height="600">
            </a>
          </div>
        </div>
        
        <!-- Navigation dots -->
        <div class="carousel-dots">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="goToSlide(index)"
            :class="{ active: currentSlide === index }"
            class="dot"
          ></button>
        </div>
        
        <!-- Navigation arrows -->
        <button @click="prevSlide" class="carousel-arrow prev">&lt;</button>
        <button @click="nextSlide" class="carousel-arrow next">&gt;</button>
      </div>

      <!-- Vue Slick Carousel (primary) -->
      <VueSlickCarousel 
        v-else
        ref="mainCarousel"
        :dots="true"
        :infinite="true"
        :speed="500"
        :autoplay="true"
        :autoplaySpeed="5000"
        :touchMove="true"
        :swipe="true"
        :draggable="true"
        :mousewheel="true"
        class="main-carousel"
      >
        <!-- Slide 1: 5GG Banner -->
        <div class="slick-slide" data-slick-index="0" bis_skin_checked="1">
          <a href="javascript:openPopup('/dispatch/game/FIVEGG/Desktop/S5G-H5-99956', 'Main')" target="_self">
            <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-722-20250815153113.jpg" alt="5GG - FORTUNE TRIO GAME PROMO BANNER" title="5GG - FORTUNE TRIO GAME PROMO BANNER" loading="lazy" width="1920" height="600">
          </a>
        </div>

        <!-- Slide 2: BD303 Banner -->
        <div class="slick-slide" data-slick-index="1" bis_skin_checked="1">
          <a href="/#" target="_self" rel="">
            <img src="https://api2-bd3.imgnxa.com/images/r96QGwANso/id_cbd_c7de1e02-b5ca-470f-a341-7a5f7f6d03a6_1755603882717.jpg" alt="AGEN BOLA TERPERCAYA BD303" title="AGEN BOLA TERPERCAYA BD303" loading="eager" fetchpriority="high" width="1920" height="600">
          </a>
        </div>

        <!-- Slide 3: Mahjong Wins 3 -->
        <div class="slick-slide" data-slick-index="2" bis_skin_checked="1">
          <a href="/#" target="_self" rel="">
            <img src="https://api2-bd3.imgnxa.com/images/r96QGwANso/id_cbd_dcd83ec7-d09f-4528-bf8d-cb64fe2d2273_1755603596793.jpg" alt="MAHJONG WINS 3" title="MAHJONG WINS 3" loading="lazy" width="1920" height="600">
          </a>
        </div>

        <!-- Slide 4: Vertical Carousel - Slot88 & Fat Panda -->
        <div class="banner-group-vertical slick-slide" data-slick-index="3" bis_skin_checked="1">
          <VueSlickCarousel 
            ref="verticalCarousel1"
            :dots="true"
            :infinite="true"
            :speed="500"
            :autoplay="true"
            :autoplaySpeed="4000"
            :vertical="true"
            :verticalSwiping="true"
            :touchMove="true"
            :swipe="true"
            :draggable="true"
            :mousewheel="true"
            class="vertical-carousel"
          >
            <div class="vertical-slide">
              <a href="/desktop/slots/slot88" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-682-20250729150723.png" alt="SLOT88 X PP - FREESPINS FESTIVAL SLOT88 SWEET BONANZA 1000" title="SLOT88 X PP - FREESPINS FESTIVAL SLOT88 SWEET BONANZA 1000" loading="lazy" width="1920" height="600">
              </a>
            </div>
            <div class="vertical-slide">
              <a href="/desktop/slots/fat-panda" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-622-20250709165545.png" alt="FAT PANDA - WEEKEND HOKI: FAT PANDA PRIZE DROP " title="FAT PANDA - WEEKEND HOKI: FAT PANDA PRIZE DROP " loading="lazy" width="1920" height="600">
              </a>
            </div>
            <div class="vertical-slide">
              <a href="/desktop/slots/slot88" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-682-20250729150723.png" alt="SLOT88 X PP - FREESPINS FESTIVAL SLOT88 SWEET BONANZA 1000" title="SLOT88 X PP - FREESPINS FESTIVAL SLOT88 SWEET BONANZA 1000" loading="lazy" width="1920" height="600">
              </a>
            </div>
          </VueSlickCarousel>
        </div>

        <!-- Slide 5: Vertical Carousel - Playtech, Habanero, PG Soft, Hacksaw -->
        <div class="banner-group-vertical slick-slide" data-slick-index="4" bis_skin_checked="1">
          <VueSlickCarousel 
            ref="verticalCarousel2"
            :dots="true"
            :infinite="true"
            :speed="500"
            :autoplay="true"
            :autoplaySpeed="4000"
            :vertical="true"
            :verticalSwiping="true"
            :touchMove="true"
            :swipe="true"
            :draggable="true"
            :mousewheel="true"
            class="vertical-carousel"
          >
            <div class="vertical-slide">
              <a href="/desktop/slots/playtech" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-730-20250815173242.png" alt="PLAYTECH - MEGA FREE SPINS" title="PLAYTECH - MEGA FREE SPINS" loading="lazy" width="1920" height="600">
              </a>
            </div>
            <div class="vertical-slide">
              <a href="/desktop/slots/habanero" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-642-20250715134500.jpg" alt="HABANERO - HABANERO CHAMPION" title="HABANERO - HABANERO CHAMPION" loading="lazy" width="1920" height="600">
              </a>
            </div>
            <div class="vertical-slide">
              <a href="/desktop/slots/pgsoft" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-666-20250725172135.jpg" alt="PG SOFT - FORTUNE GAIA EXCLUSIVE," title="PG SOFT - FORTUNE GAIA EXCLUSIVE," loading="lazy" width="1920" height="600">
              </a>
            </div>
            <div class="vertical-slide">
              <a href="/desktop/slots/hacksaw" target="_self">
                <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-606-20250630164839.png" alt="HACKSAW - DUEL REELS TOURNAMENT (JULY BATTLE)" title="HACKSAW - DUEL REELS TOURNAMENT (JULY BATTLE)" loading="lazy" width="1920" height="600">
              </a>
            </div>
          </VueSlickCarousel>
        </div>

        <!-- Slide 6: 5GG Banner -->
        <div class="slick-slide" data-slick-index="5" bis_skin_checked="1">
          <a href="javascript:openPopup('/dispatch/game/FIVEGG/Desktop/S5G-H5-99956', 'Main')" target="_self">
            <img src="//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-722-20250815153113.jpg" alt="5GG - FORTUNE TRIO GAME PROMO BANNER" title="5GG - FORTUNE TRIO GAME PROMO BANNER" loading="lazy" width="1920" height="600">
          </a>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onErrorCaptured, onUnmounted } from "vue";
// @ts-ignore
import VueSlickCarousel from 'vue-slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default defineComponent({
  name: "Banner",
  components: {
    VueSlickCarousel
  },
  setup() {
    const mainCarousel = ref<any>(null);
    const verticalCarousel1 = ref<any>(null);
    const verticalCarousel2 = ref<any>(null);
    const slickLoaded = ref(false);
    const currentSlide = ref(0);
    let autoplayInterval: number | null = null;

    // Fallback carousel slides data
    const slides = ref([
      {
        image: "//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-722-20250815153113.jpg",
        link: "javascript:openPopup('/dispatch/game/FIVEGG/Desktop/S5G-H5-99956', 'Main')",
        alt: "5GG - FORTUNE TRIO GAME PROMO BANNER",
        title: "5GG - FORTUNE TRIO GAME PROMO BANNER"
      },
      {
        image: "https://api2-bd3.imgnxa.com/images/r96QGwANso/id_cbd_c7de1e02-b5ca-470f-a341-7a5f7f6d03a6_1755603882717.jpg",
        link: "/#",
        alt: "AGEN BOLA TERPERCAYA BD303",
        title: "AGEN BOLA TERPERCAYA BD303"
      },
      {
        image: "https://api2-bd3.imgnxa.com/images/r96QGwANso/id_cbd_dcd83ec7-d09f-4528-bf8d-cb64fe2d2273_1755603596793.jpg",
        link: "/#",
        alt: "MAHJONG WINS 3",
        title: "MAHJONG WINS 3"
      },
      {
        image: "//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-682-20250729150723.png",
        link: "/desktop/slots/slot88",
        alt: "SLOT88 X PP - FREESPINS FESTIVAL",
        title: "SLOT88 X PP - FREESPINS FESTIVAL"
      },
      {
        image: "//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-730-20250815173242.png",
        link: "/desktop/slots/playtech",
        alt: "PLAYTECH - MEGA FREE SPINS",
        title: "PLAYTECH - MEGA FREE SPINS"
      },
      {
        image: "//d2rzzcn1jnr24x.cloudfront.net/Images/banners/home/DesktopID-722-20250815153113.jpg",
        link: "javascript:openPopup('/dispatch/game/FIVEGG/Desktop/S5G-H5-99956', 'Main')",
        alt: "5GG - FORTUNE TRIO GAME PROMO BANNER",
        title: "5GG - FORTUNE TRIO GAME PROMO BANNER"
      }
    ]);

    // Fallback carousel navigation functions
    const goToSlide = (index: number) => {
      currentSlide.value = index;
    };

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length;
    };

    const prevSlide = () => {
      currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1;
    };

    // Start fallback autoplay
    const startFallbackAutoplay = () => {
      autoplayInterval = window.setInterval(() => {
        nextSlide();
      }, 5000);
    };

    // Stop fallback autoplay
    const stopFallbackAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    onMounted(() => {
      console.log('Banner component mounted');
      
      // Try to use vue-slick, fallback to custom carousel if it fails
      try {
        // Wait a bit to see if vue-slick loads properly
        setTimeout(() => {
          if (mainCarousel.value) {
            slickLoaded.value = true;
            console.log('Vue-slick carousel loaded successfully');
          } else {
            console.log('Vue-slick failed, using fallback carousel');
            startFallbackAutoplay();
          }
        }, 1000);
      } catch (error) {
        console.log('Vue-slick error, using fallback carousel:', error);
        startFallbackAutoplay();
      }
    });

    onUnmounted(() => {
      stopFallbackAutoplay();
    });

    onErrorCaptured((error, instance, info) => {
      console.error('Banner component error:', error, info);
      // If vue-slick fails, switch to fallback
      if (!slickLoaded.value) {
        startFallbackAutoplay();
      }
      return false; // Prevent error from propagating
    });

    return {
      mainCarousel,
      verticalCarousel1,
      verticalCarousel2,
      slickLoaded,
      slides,
      currentSlide,
      goToSlide,
      nextSlide,
      prevSlide
    };
  },
});
</script>

<style scoped>
.banner {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.banner-carousel {
  width: 100%;
  height: 600px;
}

.banner-group-vertical {
  position: relative;
  height: 600px;
}

.vertical-carousel {
  height: 600px;
}

.vertical-slide {
  height: 600px;
}

.vertical-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slick-slide {
  height: 600px;
}

.slick-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Vue Slick Carousel Customization */
:deep(.slick-slider) {
  position: relative;
  display: block;
  box-sizing: border-box;
  user-select: none;
  touch-action: pan-y;
}

:deep(.slick-list) {
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

:deep(.slick-list:focus) {
  outline: none;
}

:deep(.slick-list.dragging) {
  cursor: pointer;
  cursor: hand;
}

:deep(.slick-slider .slick-track),
:deep(.slick-slider .slick-list) {
  transform: translate3d(0, 0, 0);
}

:deep(.slick-track) {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

:deep(.slick-track:before),
:deep(.slick-track:after) {
  display: table;
  content: '';
}

:deep(.slick-track:after) {
  clear: both;
}

:deep(.slick-slide) {
  display: none;
  float: left;
  height: 100%;
  min-height: 1px;
}

:deep(.slick-slide img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.slick-initialized .slick-slide) {
  display: block;
}

:deep(.slick-vertical .slick-slide) {
  display: block;
  height: auto;
  border: 1px solid transparent;
}

:deep(.slick-arrow.slick-hidden) {
  display: none;
}

:deep(.slick-dots) {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
}

:deep(.slick-dots li) {
  display: inline-block;
}

:deep(.slick-dots button) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0;
  line-height: 0;
}

:deep(.slick-dots button:hover),
:deep(.slick-dots .slick-active button) {
  background-color: rgba(255, 255, 255, 1);
}

/* Multi-directional support */
:deep(.slick-list) {
  touch-action: pan-x pan-y;
}

:deep(.slick-list.dragging) {
  cursor: grab;
}

:deep(.slick-list.dragging:active) {
  cursor: grabbing;
}

/* Ensure images are visible */
:deep(.slick-slide) {
  opacity: 1 !important;
  visibility: visible !important;
}

:deep(.slick-slide img) {
  opacity: 1 !important;
  visibility: visible !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .banner-carousel {
    height: 400px;
  }
  
  .banner-group-vertical {
    height: 400px;
  }
  
  .vertical-carousel {
    height: 400px;
  }
  
  .vertical-slide {
    height: 400px;
  }
  
  .slick-slide {
    height: 400px;
  }
  
  :deep(.slick-dots) {
    bottom: 10px;
  }
  
  :deep(.slick-dots button) {
    width: 10px;
    height: 10px;
  }
  
  :deep(.slick-arrow) {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
}

/* Fallback Carousel Styles */
.fallback-carousel {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot:hover,
.dot.active {
  background-color: rgba(255, 255, 255, 1);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}

.carousel-arrow.prev {
  left: 20px;
}

.carousel-arrow.next {
  right: 20px;
}

/* Responsive adjustments for fallback carousel */
@media (max-width: 768px) {
  .fallback-carousel {
    height: 400px;
  }
  
  .carousel-arrow {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  
  .carousel-dots {
    bottom: 10px;
  }
  
  .dot {
    width: 10px;
    height: 10px;
  }
}
</style>
