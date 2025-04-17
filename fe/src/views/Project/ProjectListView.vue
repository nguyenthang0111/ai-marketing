<template>
  <div class="p-6">
    <header class="">
      <div class="flex justify-between">
        <h1 class="text-xl font-semibold">Project list</h1>
        <CreateProjectModal v-model:projects="projects" />
      </div>
      <div class="my-3 flex justify-end">
        <search-bar class="w-60" placeholder="Search for projects" v-model:value="searchText" />
      </div>
    </header>

    <main class="grid-custom">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.projectId"
        :project-id="project.projectId"
        :name="project.name"
        :description="project.description"
        :updated-at="project.updatedAt"
        v-model:projects="projects"
      />
    </main>
    <div v-show="!filteredProjects.length || !projects.length">
      <NoResultsFound
        @clear-filters="handleClearFilters"
        :is-button-visible="projects.length > 0"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { getAllProjectOfWorkspace } from '@/services/project.service'
import { useLoadingStore } from '@/stores/loading.store'
import SearchBar from '@/components/Search/SearchBar.vue'
import ProjectCard from '@/components/Card/ProjectCard.vue'
import CreateProjectModal from '@/components/Modal/Create/CreateProjectModal.vue'
import NoResultsFound from '@/components/Search/NoResultsFound.vue'
import debounce from 'lodash.debounce'

const loadingStore = useLoadingStore()
const projects = ref([])
const filteredProjects = ref([])
const searchText = ref('')

onBeforeMount(() => {
  fetchProjects()
})

const filterItems = () => {
  filteredProjects.value = projects.value.filter((project) =>
    project.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
}
const debouncedFilterItems = debounce(filterItems, 500)
watch(projects, filterItems)
watch(searchText, debouncedFilterItems)

const fetchProjects = async () => {
  try {
    const response = await getAllProjectOfWorkspace()
    projects.value = response.data || []
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.setIsLoading(false)
  }
}
const handleClearFilters = () => {
  searchText.value = ''
}
</script>

<style scoped></style>
