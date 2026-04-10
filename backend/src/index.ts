import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 1. RUTA DE PRUEBA (Para saber si el servidor está vivo)
app.get('/', (req, res) => {
  res.send('Servidor de Ganadería API Activo 🤠');
});

// 2. OBTENER TODOS LOS ANIMALES (Para la tabla del frontend)
app.get('/animales', async (req, res) => {
  try {
    const animales = await prisma.animal.findMany({
      include: {
        madre: true,
        padre: true
      },
      orderBy: { id: 'desc' } // Los más recientes primero
    });
    res.json(animales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener animales' });
  }
});

// 3. OBTENER SOLO PADRES/MADRES (Para los selects del formulario)
app.get('/animales/padres', async (req, res) => {
  const padres = await prisma.animal.findMany();
  res.json(padres);
});

// 4. CREAR NUEVO ANIMAL
app.post('/animales', async (req, res) => {
  const { nombre, sexo, fechaNacimiento, fechaDestete, madreId, padreId } = req.body;
  try {
    const nuevo = await prisma.animal.create({
      data: {
        nombre,
        sexo,
        fechaNacimiento: new Date(fechaNacimiento),
        fechaDestete: fechaDestete ? new Date(fechaDestete) : null,
        madreId: madreId ? Number(madreId) : null,
        padreId: padreId ? Number(padreId) : null,
      },
    });
    res.json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear animal' });
  }
});

// 5. ACTUALIZAR ANIMAL (Para la opción de editar)
app.put('/animales/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, sexo, fechaNacimiento, fechaDestete, madreId, padreId } = req.body;
  try {
    const actualizado = await prisma.animal.update({
      where: { id: Number(id) },
      data: {
        nombre,
        sexo,
        fechaNacimiento: new Date(fechaNacimiento),
        fechaDestete: fechaDestete ? new Date(fechaDestete) : null,
        madreId: madreId ? Number(madreId) : null,
        padreId: padreId ? Number(padreId) : null,
      },
    });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
});

// 6. ELIMINAR ANIMAL
app.delete('/animales/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.animal.delete({
      where: { id: Number(id) },
    });
    res.json({ mensaje: 'Animal eliminado con éxito' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Ganadería corriendo en http://localhost:${PORT}`);
});