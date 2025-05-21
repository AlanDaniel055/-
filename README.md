##Instalación de Dependencias

1. Antes de iniciar el proyecto, instala las siguientes dependencias y cambiar el nombre del env a (.env) dentro de este archivo especificar tus llaves de acceso y conexion a base de datos
2. El archivo kanban.sql es la base de datos exportalo a tu xampp
```bash
#Instalacion

npm install --force
npm install --legacy-peer-deps
npx prisma generate
npm install @clerk/nextjs
