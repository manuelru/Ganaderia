import { createRouter, createWebHistory } from 'vue-router';
import ListaAnimales from '../components/ListaAnimales.vue';
import FormularioAnimal from '../components/FormularioAnimal.vue';

const routes = [
  { path: '/', redirect: '/lista' },
  { path: '/lista', component: ListaAnimales },
  { path: '/agregar', component: FormularioAnimal },
  { path: '/editar/:id', component: FormularioAnimal, props: true } // Reutilizamos el formulario para editar
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;