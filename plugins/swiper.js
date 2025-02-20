import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      Swiper
    }
  }
})