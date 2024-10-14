<template>
  <div class="container mt-4">
    <h2>{{ isEdit ? "Editar Empresa" : "Cadastrar Nova Empresa" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nome da Empresa</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="company.name"
          required
        />
      </div>

      <div class="mb-3">
        <label for="document" class="form-label">CNPJ</label>
        <input
          type="text"
          class="form-control"
          id="document"
          v-model="company.documento"
          @input="validateCNPJ"
          required
        />
        <div v-if="documentError" class="text-danger">{{ documentError }}</div>
      </div>

      <div class="mb-3">
        <label for="mailList" class="form-label">Lista de E-mails</label>
        <input
          type="text"
          class="form-control"
          id="mailList"
          v-model="company.mailList"
          placeholder="Insira e-mails separados por vírgula"
        />
      </div>

      <div class="mb-3">
        <label for="contatosTecnicos" class="form-label"
          >Contatos Técnicos</label
        >
        <input
          type="text"
          class="form-control"
          id="contatosTecnicos"
          v-model="company.contatosTecnicos"
          readonly
        />
      </div>

      <div class="mb-3">
        <label for="tecnologias" class="form-label">Tecnologias</label>
        <input
          type="text"
          class="form-control"
          id="tecnologias"
          v-model="company.tecnologias"
          readonly
        />
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? "Atualizar" : "Cadastrar" }}
        </button>
        <router-link to="/companies" class="btn btn-secondary ms-2"
          >Cancelar</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
  import api from "@/utils/axios.js"

  export default {
    name: "CompanyCreate",
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isEdit: !!this.id,
        company: {
          documento: "",
          name: "",
          mailList: "",
          contatosTecnicos: [],
          tecnologias: [],
        },
        documentError: "",
      }
    },
    mounted() {
      if (this.isEdit) {
        this.fetchCompanyDetails(this.id)
      }
    },
    methods: {
      async fetchCompanyDetails(id) {
        console.log("Fetching company with ID:", id)
        try {
          const response = await api.get(`/companies/list`)
          console.log("Companies list:", response.data)

          const empresaEncontrada = response.data.find(
            (empresa) => empresa.id === Number(id)
          )

          console.log("Empresa encontrada:", empresaEncontrada)

          if (empresaEncontrada) {
            this.company = {
              ...empresaEncontrada,
              mailList: Array.isArray(empresaEncontrada.mailList)
                ? empresaEncontrada.mailList.join(", ")
                : empresaEncontrada.mailList,
            }
          } else {
            console.error("Empresa não encontrada.")
          }
        } catch (error) {
          console.error("Erro ao buscar dados da empresa:", error)
        }
      },
      validateCNPJ() {
        const cnpj = this.company.documento.replace(/[^\d]/g, "")
        if (cnpj.length !== 14) {
          this.documentError = "CNPJ deve ter 14 dígitos."
        } else {
          this.documentError = ""
        }
      },
      async handleSubmit() {
        if (this.documentError) return

        try {
          const payload = {
            id: this.isEdit ? this.id : undefined,
            code: this.company.code,
            documento: this.company.documento,
            name: this.company.name,
            mailList: this.company.mailList,
            contatosTecnicos: this.company.contatosTecnicos || [],
            tecnologias: this.company.tecnologias || [],
          }

          if (this.isEdit) {
            // Update
            const response = await api.post("/companies/update", payload)
            console.log("Empresa atualizada:", response.data)
          } else {
            // Create
            const response = await api.post("/companies/create", payload)
            console.log("Empresa criada:", response.data)
          }

          this.$router.push({ name: "CompanyList" })
        } catch (error) {
          console.error("Erro ao salvar empresa:", error.response.data)
        }
      },
    },
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
  }
</style>
