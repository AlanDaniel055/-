## Instalación de Dependencias

Antes de iniciar el proyecto, instala las siguientes dependencias y cambiar el nombre del env a .env unicamente:

```bash
#NOTA DE ERRORES COMUNES
Si el proyecto falla una ves instalado todo por favor ejecuta los siguientes comandos
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install -g npm@11.3.0
npm install next react react-dom
npm install --force
npm install --legacy-peer-deps
npm install next@14.2.25
npm install @prisma/client
npx prisma generate
npm install stripe@latest
Una vez hecho esto instala desde el paso 3
# 1 Prisma
npm install @prisma/client
npx prisma generate

# 2 Next.js y React
npm install next@latest react@latest react-dom@latest

# 3 Gantt y TipTap
npm install dhtmlx-gantt
npm install --save-dev @types/dhtmlxgantt
npm install @tiptap/react @tiptap/starter-kit html2pdf.js

# 4 TinyMCE
npm install @tinymce/tinymce-react

# 5 Generative AI
npm install @google/generative-ai

# 6 Ant Design
npm install antd
npm install @ant-design/icons

# 7 Tipos de Node
npm install --save-dev @types/node
