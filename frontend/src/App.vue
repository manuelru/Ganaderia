<template>
  <div class="app-wrapper">
    <nav class="main-nav">
      <div class="nav-content">
        <h1 class="logo-title">
          Ganadería App 🤠
          <img 
            src="https://scontent.fmga9-2.fna.fbcdn.net/v/t39.30808-6/607038253_2353931871722071_220401672892895015_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_ohc=-o4rKQl93IsQ7kNvwHsJUzt&_nc_oc=AdonkEyKp3HWSgvB_dRPzpUuE_eoq2vC5P-zCsDzF0osie2yhgw3tcQoTaYoLLOc8CM&_nc_zt=23&_nc_ht=scontent.fmga9-2.fna&_nc_gid=HLhnhi6zw1zRFLrFfqOW7Q&_nc_ss=7a3a8&oh=00_Af2Pi5dDodJWrvWE1aGgJrDHz0wiZ0KvnTiLcoYopJbhoA&oe=69DE0C8B" 
            alt="Logo" 
            class="nav-logo"
          />
        </h1>
        
        <div class="menu">
          <router-link to="/lista" class="nav-link">Ver Registros</router-link>
          <router-link to="/agregar" class="nav-link btn-add">+ Nuevo Registro</router-link>
        </div>
      </div>
    </nav>

    <div class="content">
      <router-view></router-view> 
    </div>
  </div>
</template>

<style>
/* --- Tus estilos originales --- */
.main-nav { background: #2c3e50; color: white; padding: 1rem; }
.nav-content { display: flex; justify-content: space-between; align-items: center; max-width: 1000px; margin: 0 auto; }
.nav-link { color: white; text-decoration: none; margin-left: 20px; padding: 10px; }
.btn-add { background: #27ae60; border-radius: 5px; }
.content { max-width: 1000px; margin: 40px auto; padding: 0 20px; }
body { margin: 0; font-family: sans-serif; background-color: #f9f9f9; }

/* --- NUEVOS ESTILOS PARA LA IMAGEN --- */
.logo-title {
  display: flex;
  align-items: center; /* Esto centra verticalmente el texto, el emoji y la imagen */
  gap: 10px;           /* Espacio entre el emoji y la imagen */
  margin: 0;
}

.nav-logo {
  height: 40px;        /* Ajusta el tamaño a tu gusto */
  width: auto;
  border-radius: 4px;  /* Opcional: bordes redondeados */
  object-fit: contain;
}
</style>