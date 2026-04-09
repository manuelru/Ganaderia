import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';



const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener la lista de posibles padres (Machos)
app.get('/animales/padres', async (req, res) => {
    const padres = await prisma.animal.findMany({
        where: { sexo: 'Macho' },
        select: { id: true, nombre: true }
    });
    res.json(padres);
});

// Ruta para registrar un nuevo animal o nacimiento
app.post('/animales', async (req, res) => {
    try {
        const { nombre, sexo, fechaNacimiento, madreId, padreId, fechaDestete } = req.body;
        
        const fNac = new Date(fechaNacimiento);
        const fDest = fechaDestete ? new Date(fechaDestete) : null;

        // --- VALIDACIÓN ---
        if (fDest && fDest <= fNac) {
             res.status(400).json({ 
                error: 'La fecha de destete debe ser posterior a la fecha de nacimiento.' 
            });
            return; // Detenemos la ejecución
        }

        const nuevoAnimal = await prisma.animal.create({
            data: {
                nombre,
                sexo,
                fechaNacimiento: fNac,
                fechaDestete: fDest,
                madreId: madreId ? parseInt(madreId) : null,
                padreId: padreId ? parseInt(padreId) : null,
            }
        });

        res.status(201).json(nuevoAnimal);
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el animal', details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de Ganadería corriendo en http://localhost:${PORT}`);
});