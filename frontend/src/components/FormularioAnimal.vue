<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// 1. Definimos la interfaz con campos que pueden ser nulos o no venir (undefined)
interface Animal {
  id: number;
  nombre: string;
  sexo: string;
  fechaNacimiento: string | Date;
  fechaDestete?: string | Date | null;
  padreId?: number | null;
  madreId?: number | null;
}

const route = useRoute()
const router = useRouter()

const idAnimal = computed(() => route.params.id)
const esEdicion = computed(() => !!route.params.id)

// Estado del formulario (siempre strings para los inputs)
const nombre = ref('')
const sexo = ref('Hembra')
const fechaNacimiento = ref('')
const fechaDestete = ref('') 
const padreId = ref<number | null>(null)
const madreId = ref<number | null>(null)

const listaPadres = ref<Animal[]>([])
const listaMadres = ref<Animal[]>([])

// FUNCIÓN CLAVE: Convierte cualquier dato de fecha a string YYYY-MM-DD para el input
const limpiarFecha = (fecha: any): string => {
  if (!fecha) return '';
  const d = new Date(fecha);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
}

const cargarDatos = async () => {
  try {
    const res = await axios.get('http://localhost:3000/animales');
    const todos: Animal[] = res.data;
    
    listaPadres.value = todos.filter(a => a.sexo === 'Macho');
    listaMadres.value = todos.filter(a => a.sexo === 'Hembra');

    if (esEdicion.value) {
      const editado = todos.find(a => a.id === Number(idAnimal.value));
      
if (editado) {
    nombre.value = editado.nombre || '';
    sexo.value = editado.sexo || 'Hembra';

    // Usamos una validación simple para las fechas
    if (editado.fechaNacimiento) {
        // Forzamos a string para poder usar split
        const fNac = String(editado.fechaNacimiento);
        fechaNacimiento.value = fNac.includes('T') ? fNac.split('T')[0] : fNac;
    }

    if (editado.fechaDestete) {
        const fDes = String(editado.fechaDestete);
        fechaDestete.value = fDes.includes('T') ? fDes.split('T')[0] : fDes;
    } else {
        fechaDestete.value = '';
    }

    padreId.value = editado.padreId ?? null;
    madreId.value = editado.madreId ?? null;
}
    }
  } catch (error) {
    console.error("Error cargando datos", error);
  }
} // <--- Aquí cerraba mal en tu código anterior

const guardarAnimal = async () => {
  const payload = {
    nombre: nombre.value,
    sexo: sexo.value,
    fechaNacimiento: fechaNacimiento.value,
    fechaDestete: fechaDestete.value || null,
    padreId: padreId.value,
    madreId: madreId.value
  }

  try {
    if (esEdicion.value) {
      await axios.put(`http://localhost:3000/animales/${idAnimal.value}`, payload);
      alert("¡Registro actualizado!");
    } else {
      await axios.post('http://localhost:3000/animales', payload);
      alert("¡Animal registrado!");
    }
    router.push('/lista');
  } catch (error) {
    alert("Error al guardar");
  }
}

onMounted(cargarDatos);
</script>

<template>
  <div class="form-card">
    <h2>{{ esEdicion ? 'Editar Animal' : 'Registrar Nuevo Animal' }}</h2>
    <form @submit.prevent="guardarAnimal">
      <div class="field">
        <label>Nombre:</label>
        <input v-model="nombre" required type="text">
      </div>

      <div class="field">
        <label>Sexo:</label>
        <select v-model="sexo">
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <div class="field">
        <label>Fecha Nacimiento:</label>
        <input v-model="fechaNacimiento" type="date" required>
      </div>

      <div class="field">
        <label>Fecha de Destete (Opcional):</label>
        <input v-model="fechaDestete" type="date">
      </div>

      <div class="field">
        <label>Padre:</label>
        <select v-model="padreId">
          <option :value="null">Ninguno</option>
          <option v-for="p in listaPadres" :key="p.id" :value="p.id">{{ p.nombre }}</option>
        </select>
      </div>

      <div class="field">
        <label>Madre:</label>
        <select v-model="madreId">
          <option :value="null">Ninguno</option>
          <option v-for="m in listaMadres" :key="m.id" :value="m.id">{{ m.nombre }}</option>
        </select>
      </div>

      <div class="botones">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" @click="router.push('/lista')" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; margin: auto; }
form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; }
label { font-weight: bold; margin-bottom: 4px; }
input, select { padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; }
.botones { display: flex; gap: 1rem; margin-top: 1rem; }
.btn-save { background: #27ae60; color: white; border: none; padding: 0.8rem; cursor: pointer; flex: 1; border-radius: 4px; }
.btn-cancel { background: #95a5a6; color: white; border: none; padding: 0.8rem; cursor: pointer; flex: 1; border-radius: 4px; }
</style>