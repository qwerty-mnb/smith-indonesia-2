<template>
  <section
    id="main-banner"
    class="relative z-0"
  >
    <swiper
      :centered-slides="true"
      :speed="1000"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="false"
      :modules="modules"
      :mousewheel="true"
      :free-mode="true"
      :grab-cursor="true"
      :touch-ratio="1"
      :resistance="true"
      :resistance-ratio="0.85"
      :threshold="10"
      :allow-touch-move="true"
      :simulate-touch="true"
      :short-swipes="false"
      :long-swipes="true"
      :long-swipes-ratio="0.5"
      :long-swipes-ms="300"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      @touchStart="onTouchStart"
      @touchEnd="onTouchEnd"
      class="banner-swiper"
    >
      <template
        v-for="(banner, index) in banners"
        :key="index"
      >
        <swiper-slide>
          <div class="relative banner-container">
            <!-- <div class="banner-content">
              <h1
                :class="`${banner.text1Fs} ${banner.text1Fc}`"
              >
                {{ banner.text1 }}
              </h1>

              <h3
                :class="`${banner.text2Fs} ${banner.text2Fc}`"
              >
                {{ banner.text2 }}
              </h3>

            </div> -->
            <picture>
              <img
                :src="banner.src"
                alt=""
                class="cover"
              >
            </picture>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'
import 'swiper/css/free-mode'
import { Autoplay, Pagination, Mousewheel, FreeMode } from 'swiper/modules'

export default defineComponent({
  name: 'MainBanner',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const banners = ref([
      {
        src: '/img/new/banner/1.jpg',
      },
      {
        src: '/img/new/banner/2.jpg',
      },
      {
        src: '/img/new/banner/3.png',
      },
      {
        src: '/img/new/banner/4.jpg',
      },
    ])

    const onSwiper = (swiper: any) => {
      console.log('Swiper initialized:', swiper)
    }

    const onSlideChange = () => {
      console.log('Slide changed')
    }

    const onTouchStart = (swiper: any) => {
      console.log('Touch started')
    }

    const onTouchEnd = (swiper: any) => {
      console.log('Touch ended')
    }

    return {
      banners,
      modules: [Autoplay, Pagination, Mousewheel, FreeMode],
      onSwiper,
      onSlideChange,
      onTouchStart,
      onTouchEnd,
    }
  },
})
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.swiper:active {
  cursor: grabbing;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

picture {
  height: 100%;
}

/* Enhanced touch feedback */
.banner-swiper {
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
}

.banner-swiper:active {
  cursor: grabbing;
}

/* Smooth transitions for all directions */
.swiper-wrapper {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Enable multi-directional dragging */
.swiper-slide {
  cursor: grab;
}

.swiper-slide:active {
  cursor: grabbing;
}

/* Remove direction restrictions */
.swiper-container {
  overflow: visible;
}
</style>
