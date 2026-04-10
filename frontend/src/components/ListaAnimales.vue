<template>
  <div class="lista-container">
    <h2>📋 Inventario de Ganado</h2>
    
    <table class="tabla-ganado">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Sexo</th>
          <th>Nacimiento</th>
          <th>Padre/Madre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animales" :key="animal.id">
          <td>{{ animal.id }}</td>
          <td><strong>{{ animal.nombre }}</strong></td>
          <td>{{ animal.sexo }}</td>
          <td>{{ new Date(animal.fechaNacimiento).toLocaleDateString() }}</td>
          <td>
            <small>P: {{ animal.padre?.nombre || 'N/A' }}</small><br>
            <small>M: {{ animal.madre?.nombre || 'N/A' }}</small>
          </td>
          <td>
            <button @click="irAEditar(animal.id)" class="btn-edit">Editar</button>
            <button @click="eliminarAnimal(animal.id)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const animales = ref([]);
const router = useRouter();

const cargarAnimales = async () => {
  try {
    const res = await axios.get('http://localhost:3000/animales');
    animales.value = res.data;
  } catch (e) { alert("Error cargando datos"); }
};

const eliminarAnimal = async (id) => {
  if (confirm('¿Estás seguro de eliminar este registro?')) {
    await axios.delete(`http://localhost:3000/animales/${id}`);
    cargarAnimales(); // Recargamos la lista
  }
};

const irAEditar = (id) => {
  router.push(`/editar/${id}`);
};

onMounted(cargarAnimales);
</script>

<style scoped>
.tabla-ganado { width: 100%; border-collapse: collapse; margin-top: 20px; }
.tabla-ganado th, .tabla-ganado td { border: 1px solid #ddd; padding: 12px; text-align: left; }
.tabla-ganado th { background-color: #f4f4f4; }
.btn-edit { background: #3498db; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; }
</style>