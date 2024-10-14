<template>
  <div class="container mt-5">
    <h3 class="text-center">Lista de Empresas</h3>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div
      class="text-center mb-3 d-flex justify-content-center align-items-center"
    >
      <input
        type="text"
        class="form-control w-50 mx-2"
        placeholder="Filtrar por nome..."
        v-model="filter"
        @input="filterCompanies"
      />
      <button class="btn btn-primary btn-sm" @click="addCompany">
        Adicionar Empresa
      </button>
    </div>

    <table
      class="table table-bordered table-hover table-striped"
      v-if="!loading && !errorMessage"
    >
      <thead class="text-center">
        <tr>
          <th @click="sortBy('id')" style="cursor: pointer">
            ID
            <span class="sort-icon">
              <i
                :class="
                  sortKey === 'id'
                    ? sortOrder === 'asc'
                      ? 'bi bi-chevron-up'
                      : 'bi bi-chevron-down'
                    : ''
                "
              ></i>
            </span>
          </th>
          <th @click="sortBy('name')" style="cursor: pointer">Nome</th>
          <th>Documento</th>
          <th class="text-center">E-mail</th>
          <th>Criado</th>
          <th>Ult. Atualização</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(company, index) in filteredCompanies"
          :key="company.id"
          @click="editCompany(company)"
          :style="{ backgroundColor: index % 2 === 0 ? '#66a0c0' : '#f8f9fa' }"
        >
          <td>{{ company.id }}</td>
          <td>{{ company.name }}</td>
          <td>{{ company.documento }}</td>
          <td>
            {{ company.mailList }}
          </td>
          <td>{{ formatDate(company.createdAt) }}</td>
          <td>{{ formatDate(company.updatedAt) }}</td>
          <td class="text-center">
            <button
              @click.stop="editCompany(company)"
              class="btn btn-primary mx-2"
            >
              Editar
            </button>
            <button
              @click.stop="openConfirmationModal(company.id)"
              class="btn btn-danger"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmationModal
      :isVisible="isModalVisible"
      :companyId="selectedCompanyId"
      :loading="isDeleting"
      @close="closeConfirmationModal"
      @delete="deleteCompany"
    />
  </div>
</template>

<script>
  import api from "@/utils/axios.js"
  import { format } from "date-fns"
  import ConfirmationModal from "@/components/ConfirmationModal.vue"

  export default {
    name: "CompanyList",
    components: {
      ConfirmationModal,
    },
    data() {
      return {
        companies: [],
        filteredCompanies: [],
        errorMessage: "",
        loading: true,
        filter: "",
        sortKey: "id",
        sortOrder: "asc",
        isModalVisible: false,
        selectedCompanyId: -1,
        isDeleting: false,
      }
    },
    methods: {
      formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm:ss")
      },
      editCompany(company) {
        this.$router.push({
          name: "CompanyEdit",
          params: { id: company.id },
        })
      },
      addCompany() {
        this.$router.push({ name: "CompanyCreate" })
      },
      openConfirmationModal(id) {
        this.selectedCompanyId = id
        this.isModalVisible = true
      },
      closeConfirmationModal() {
        this.isModalVisible = false
        this.selectedCompanyId = -1
      },
      async deleteCompany(id) {
        this.isDeleting = true
        try {
          await api.put(
            "/companies/delete",
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          this.companies = this.companies.filter((company) => company.id !== id)
          console.log("Empresa excluída com sucesso.")
          await this.created()
        } catch (error) {
          console.error(error)
        } finally {
          this.isDeleting = false
        }
      },
      filterCompanies() {
        this.filteredCompanies = this.companies.filter((company) =>
          company.name.toLowerCase().includes(this.filter.toLowerCase())
        )
      },
      sortBy(key) {
        this.sortOrder =
          this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc"
        this.sortKey = key
        this.filteredCompanies.sort((a, b) => {
          const modifier = this.sortOrder === "asc" ? 1 : -1
          if (a[key] < b[key]) return -1 * modifier
          if (a[key] > b[key]) return 1 * modifier
          return 0
        })
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
        this.filteredCompanies = this.companies
      } catch (error) {
        this.errorMessage = "Erro ao carregar a lista de empresas."
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  }
</script>

<style>
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  .table-bordered {
    border: 1px solid #dee2e6;
  }
</style>
