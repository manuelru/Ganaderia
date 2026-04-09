<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Interfaces para TypeScript
interface Animal {
  id: number;
  nombre: string;
}

// Estado del formulario
const nombre = ref('')
const sexo = ref('Hembra')
const fechaNacimiento = ref('')
const fechaDestete = ref('')
const padreId = ref<number | null>(null)
const madreId = ref<number | null>(null)

// Listas para los selects
const listaPadres = ref<Animal[]>([])
const listaMadres = ref<Animal[]>([])

// Cargar padres y madres al iniciar
const cargarProgenitores = async () => {
  try {
    const res = await axios.get('http://localhost:3000/animales')
    const todos = res.data
    listaPadres.value = todos.filter((a: any) => a.sexo === 'Macho')
    listaMadres.value = todos.filter((a: any) => a.sexo === 'Hembra')
  } catch (error) {
    console.error("Error cargando animales", error)
  }
}

const registrarAnimal = async () => {
  try {
    const payload = {
      nombre: nombre.value,
      sexo: sexo.value,
      fechaNacimiento: fechaNacimiento.value,
      fechaDestete: fechaDestete.value || null,
      padreId: padreId.value,
      madreId: madreId.value
    }
    await axios.post('http://localhost:3000/animales', payload)
    alert("¡Animal registrado con éxito!")
    // Limpiar formulario o recargar lista
  } catch (error: any) {
    alert(error.response?.data?.error || "Error al registrar")
  }
}

onMounted(cargarProgenitores)
</script>

<template>
  <div class="container">
    <h1>Registro de Ganado</h1>
    
    <form @submit.prevent="registrarAnimal">
      <label>Nombre del Animal:</label>
      <input v-model="nombre" type="text" required />

      <label>Sexo:</label>
      <select v-model="sexo">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <label>Fecha de Nacimiento:</label>
      <input v-model="fechaNacimiento" type="date" required />

      <label>Fecha de Destete (Opcional):</label>
      <input v-model="fechaDestete" type="date" />

      <label>Padre:</label>
      <select v-model="padreId">
        <option :value="null">Ninguno / Desconocido</option>
        <option v-for="p in listaPadres" :key="p.id" :value="p.id">{{ p.nombre }} (ID: {{ p.id }})</option>
      </select>

      <label>Madre:</label>
      <select v-model="madreId">
        <option :value="null">Ninguno / Desconocida</option>
        <option v-for="m in listaMadres" :key="m.id" :value="m.id">{{ m.nombre }} (ID: {{ m.id }})</option>
      </select>

      <button type="submit">Guardar Registro</button>
    </form>
  </div>
</template>

<style scoped>
.container { max-width: 500px; margin: auto; font-family: sans-serif; }
form { display: flex; flex-direction: column; gap: 10px; }
label { font-weight: bold; margin-top: 5px; }
input, select, button { padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
button { background-color: #2c3e50; color: white; cursor: pointer; margin-top: 15px; }
button:hover { background-color: #34495e; }
</style>