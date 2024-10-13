<template>
  <div class="container mt-5">
    <h3>Listagem de Empresas</h3>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Documento</th>
          <th>Criado</th>
          <th>Ult. Atualização</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>{{ company.id }}</td>
          <td>{{ company.name }}</td>
          <td>{{ company.documento }}</td>
          <td>{{ formatDate(company.createdAt) }}</td>
          <td>{{ formatDate(company.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import api from "@/utils/axios.js"
  import { format } from "date-fns"

  export default {
    data() {
      return {
        companies: [],
        errorMessage: "",
      }
    },
    methods: {
      formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm:ss")
      },
    },
    async created() {
      try {
        const response = await api.get("/companies/list", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        this.companies = response.data
      } catch (error) {
        this.errorMessage = "Erro ao carregar a lista de empresas."
        console.error(error)
      }
    },
  }
</script>
