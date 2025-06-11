<template>
    <div class="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
                <img :src="slide.image" :alt="slide.alt">
            </div>
        </div>

        <button class="carousel-control prev" @click="prev">❮</button>
        <button class="carousel-control next" @click="next">❯</button>

        <div class="carousel-indicators">
            <span v-for="(slide, index) in slides" :key="index" :class="{ active: currentIndex === index }"
                @click="goTo(index)"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    props: {
        slides: {
            type: Array,
            required: true,
            default: () => []
        },
        interval: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            currentIndex: 0,
            timer: null
        }
    },
    mounted() {
        this.startAutoPlay();
    },
    beforeDestroy() {
        this.stopAutoPlay();
    },
    methods: {
        startAutoPlay() {
            this.timer = setInterval(() => {
                this.next();
            }, this.interval);
        },
        stopAutoPlay() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        },
        goTo(index) {
            this.currentIndex = index;
        }
    }
}
</script>

<style scoped>
.carousel {
    width: 1200px;
    height: 400px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-slide {
    min-width: 100%;
    box-sizing: border-box;
}

.carousel-slide img {
    width: 100%;
    height: 100%;
    display: block;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
}

.carousel-control.prev {
    left: 10px;
}

.carousel-control.next {
    right: 10px;
}

.carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
}

.carousel-indicators span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
}

.carousel-indicators span.active {
    background: white;
}
</style>