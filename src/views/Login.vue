<template>
  <div
    class="d-flex align-items-center justify-content-center min-vh-100 bg-light no-guetter"
  >
    <div class="row w-100">
      <div class="col-md-6 d-none d-md-block bg-image"></div>

      <div class="col-md-6 d-flex align-items-center justify-content-center">
        <div class="login-form">
          <img
            src="@/assets/logo-viseu.png"
            alt="Logo"
            class="img-fluid mb-4"
          />
          <form @submit.prevent="handleLogin">
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div class="mb-3 text-start">
              <label for="username" class="form-label">Usuário</label>
              <input
                type="text"
                class="form-control"
                placeholder="Digite o seu usuário"
                id="username"
                v-model="username"
                required
              />
            </div>
            <div class="mb-3 text-start">
              <label for="password" class="form-label">Senha</label>
              <input
                type="password"
                class="form-control"
                placeholder="Digite sua senha"
                id="password"
                v-model="password"
                required
              />
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from "@/services/authService"
  import { mapActions } from "vuex"

  export default {
    name: "LoginPage",
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      }
    },
    methods: {
      ...mapActions(["saveToken"]),
      async handleLogin() {
        try {
          const response = await login(this.username, this.password)
          this.saveToken(response.token)
          console.log("Login bem-sucedido!")
          this.$router.push("/home")
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Usuário ou senha inválidos."
        }
      },
    },
  }
</script>

<style scoped>
  .bg-image {
    background-image: url("@/assets/background_3.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
  }

  .login-form {
    width: 80%;
    max-width: 400px;
    text-align: center;
  }

  .btn-primary {
    background-color: #66a0c0;
    border-color: #66a0c0;
    padding: 0.375rem 1.75rem;
  }

  .btn-primary:hover {
    background-color: #66a0c0;
    border-color: #fff;
  }

  .bg-light {
    background-color: #f8f9fa !important;
  }
</style>
