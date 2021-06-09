<template>
    <div class="home">

        <section class="hero is-medium is-dark mb-6">
            <div class="hero-body has-text-centered">
                <p class="title mb-6">
                    Welcome to Support shop
                </p>
                <p class="subtitle">
                    Thanks for your support!
                </p>
            </div>
        </section>

        <ProductBox
            v-for="product in latestProducts"
            v-bind:key="product.id"
            v-bind:product="product" />
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from "@/components/ProductBox";

export default {
    name: 'Home',
    data() {
        return {
            latestProducts: []
        }
    },
    components: {
        ProductBox
    },
    mounted() {
        this.getLatestProducts()
    },
    methods: {
        async getLatestProducts() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/latest-products/')
                .then(response => {
                    this.latestProducts = response.data

                    document.title = 'Welcome to Support shop'
                })

                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>
