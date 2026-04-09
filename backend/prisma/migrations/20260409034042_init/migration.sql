-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "fechaDestete" DATETIME,
    "madreId" INTEGER,
    "padreId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Animal_madreId_fkey" FOREIGN KEY ("madreId") REFERENCES "Animal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Animal_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Animal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
