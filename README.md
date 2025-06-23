# 🧪 Nolatech – Prueba Técnica Frontend React Senior

Aplicación de gestión de publicaciones en tiempo real con edición, validación, sincronización entre pestañas y optimización del bundle.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React 18 + Vite**
- 🎨 **Tailwind CSS** y **Mantine UI**
- 💬 **React Hook Form** + **Zod** (validación)
- 🧠 **Socket.IO** (tiempo real)
- 💾 `localStorage` para persistencia local
- 🔬 **Vitest** + **React Testing Library** para testing
- 📊 `rollup-plugin-visualizer` para análisis del bundle

---

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/nolatech-test.git
cd nolatech-test
npm install
npm run dev
```

---

## 🔌 Configurar WebSocket (local)

Este proyecto usa un servidor WebSocket para la sincronización en tiempo real.  
Puedes simularlo localmente con el siguiente archivo:

### 📁 `server.cjs`

```js
const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("new-post", (post) => {
    socket.broadcast.emit("new-post", post);
  });

  socket.on("post-updated", (post) => {
    socket.broadcast.emit("post-updated", post);
  });
});
```

### ▶️ Ejecutar servidor

```bash
node server.cjs
```

---

## 🧪 Ejecutar los tests

```bash
npx vitest run
```

---

## ✨ Funcionalidades implementadas

- ✅ Crear y editar publicaciones con título, contenido, autor y estado (`borrador` o `publicado`)
- ✅ Validación robusta con Zod (campos requeridos y tipos)
- ✅ Modal reutilizable con `React.lazy` (lazy loading para optimización)
- ✅ Sincronización en tiempo real entre pestañas con `Socket.IO`
- ✅ Persistencia de datos en `localStorage`
- ✅ Filtros dinámicos por autor y estado
- ✅ Sincronización de cambios sin recargar

---

## 📦 Análisis del bundle

Se utilizó `rollup-plugin-visualizer` para analizar el tamaño del build.

| Paquete           | Tamaño | Comentario                                |
| ----------------- | ------ | ----------------------------------------- |
| `react-dom`       | Alto   | Parte del core de React, esperado         |
| `react-hook-form` | Medio  | Necesario para formularios y validaciones |
| `zod`             | Medio  | Justificado para validaciones tipadas     |

**Optimización:**  
El modal de edición fue cargado con `React.lazy` para reducir el bundle inicial.

---

## 🧪 Testing

Incluye un test mínimo para validar el renderizado del formulario del modal, usando:

- `Vitest`
- `React Testing Library`
- `@testing-library/jest-dom`

Archivo principal:  
`src/components/PostFormModal/PostFormModal.test.tsx`

---

## 🧼 Limpieza del código

Se eliminaron archivos no utilizados en la versión final, como `Home.tsx` y `broadcast.ts`, para mantener el proyecto claro y enfocado.

---

## 👨‍💻 Autor

Wistremiro Pulido  
Frontend Web Developer  
Caracas, Venezuela
