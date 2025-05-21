## Instalación de Dependencias

Antes de iniciar el proyecto, instala las siguientes dependencias y cambiar el nombre del env a (.env) unicamente al igual que tus llaves para las dependencias como clerk y base de datos:

```bash
#Instalacion

npm install --force
npm install --legacy-peer-deps
npx prisma generate
npm install @clerk/nextjs
