<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">{{ statusCode }}</p>
      <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
        <div v-if="statusCode == 403">Forbidden</div>
        <div v-else-if="statusCode == 404">Page not found</div>
        <div v-else>Server error</div>
      </h1>
      <div class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        <div v-if="statusCode == 403">Sorry, you are not authorized to access this page.</div>
        <div v-else-if="statusCode == 404">
          Sorry, we couldn't find the page you're looking for.
        </div>
        <div v-else>Sorry, the server is wrong.</div>
      </div>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="$router.go(-1)"
        >
          Back to previous page
        </button>
        <button class="text-sm font-semibold text-gray-900" @click="$router.push({name: 'Dashboard'})">
          Back to dashboard <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const statusCode = route.query.status_code
</script>

<style scoped></style>
