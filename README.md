# 🏋️‍♂️ Proyecto Box de CrossFit

Sistema web para la gestión de un gimnasio tipo Box de CrossFit. Incluye control de usuarios, clases, inscripciones, asistencias, apto médico y más.

---

## 🚀 Tecnologías utilizadas

### 🛠 Backend
- Node.js + Express
- Sequelize (ORM)
- MySQL
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Cors para el acceso a rutas
- .Env para varialbes de entorno


### 💻 Frontend
- Angular
- Angular Router


---

## 📦 Estructura del proyecto

```
proyecto-box/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── app.js
│
└── frontend/
    └── src/app/
        ├── content/
        ├── core/
        ├── guards/
        ├── models/
        ├── services/
        ├── views/
        └── app.module.ts
```

---

## 📌 Funcionalidades principales

- Registro e inicio de sesión con JWT
- Roles: Alumno, Profesor, Admin
- Inscripción a clases según tipo y horario
- Registro de asistencias por parte de profesores
- Carga de aptos médicos (PDF o imagen)
- Gestión de clases, horarios y wod por el admin
- Página pública con horarios y contacto

---

## 🔑 Configuración del backend

1. Clonar el repo y entrar al backend:

```bash
cd backend
npm install
```

2. Crear archivo `.env`:

```env
DB_HOST=localhost
DB_NAME=proyectoBox
DB_USER=root
DB_PASSWORD=tu_clave
JWT_SECRET=palabra
```

3. Levantar el servidor:

```bash
npm start
```

---

## 📊 Base de datos

- Asegurate de tener creada la base de datos `proyectoBox`
- Sequelize se encarga de sincronizar los modelos
- Para borrar y regenerar: `DROP TABLE` y reiniciar app

---

## 🧪 Postman (testing de endpoints)

Podés probar los endpoints de `/api/register`, `/api/login`, `/api/classes`, `/api/enrollments`, etc.

---

## 📍 Frontend

1. Entrar a la carpeta `frontend/`:

```bash
cd frontend
npm install
ng serve
```

2. La app corre en: `http://localhost:4200`

---


## 🏁 Autor

Franco Gabrielleschi – 2025
