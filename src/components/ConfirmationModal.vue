<template>
  <div
    v-if="isVisible && companyId !== -1"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmação de Exclusão</h5>
        </div>
        <div class="modal-body">
          <p v-if="!success && !errorMessage">
            Tem certeza de que deseja excluir esta empresa?
          </p>
          <p class="text-success" v-if="success">
            Empresa excluída com sucesso!
          </p>
          <p class="text-danger" v-if="errorMessage">
            {{ errorMessage }}
          </p>
          <div v-if="localLoading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            @click="close"
            :disabled="localLoading"
          >
            Cancelar
          </button>
          <button
            class="btn btn-danger"
            @click="confirmDelete"
            :disabled="localLoading"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ConfirmationModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      companyId: {
        type: Number,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        success: false,
        errorMessage: "",
        successMessage: "",
        localLoading: this.loading,
      }
    },
    methods: {
      close() {
        this.$emit("close")
        this.resetState()
      },
      async confirmDelete() {
        this.localLoading = true
        this.errorMessage = ""
        try {
          const result = await this.$emit("delete", this.companyId)

          if (result && result.success) {
            this.success = true
          } else {
            this.success = result?.error || "Empresa excluída com sucesso!"
          }
        } catch (error) {
          this.errorMessage = "Erro ao excluir a empresa. Tente novamente."
        } finally {
          this.localLoading = false
        }
      },
      resetState() {
        this.success = false
        this.errorMessage = ""
        this.localLoading = false
      },
    },
  }
</script>
