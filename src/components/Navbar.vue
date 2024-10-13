<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo à esquerda -->
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo-viseu.png" alt="Logo" width="100" />
      </a>

      <!-- Botão de colapsar para dispositivos móveis -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <!-- Dropdown à direita -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle"></i> Menu
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <router-link class="dropdown-item" to="/companies">
                  <i class="bi bi-building"></i> Empresas
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click="logout">
                  <i class="bi bi-box-arrow-right"></i> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar-app",
    methods: {
      logout() {
        // Limpar o token e redirecionar para a página de login
        this.$store.dispatch("saveToken", null)
        localStorage.removeItem("authToken")
        this.$router.push({ name: "Login" })
      },
    },
  }
</script>

<style scoped>
  .navbar-brand img {
    max-height: 40px;
  }
</style>
