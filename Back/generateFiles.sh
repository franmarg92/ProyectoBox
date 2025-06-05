#!/bin/bash

# Lista de modelos
models=("User" "Role" "Attendance" "Class" "Enrollment" "MedicalFit" "TeacherClass" "ClassType")

# Crear archivos por cada modelo
for model in "${models[@]}"
do
  # Services
  touch "./services/${model}Service.js"
  echo "// ${model} service logic" > "./services/${model}Service.js"

  # Controllers
  touch "./controllers/${model}Controller.js"
  echo "// ${model} controller logic" > "./controllers/${model}Controller.js"

  # Routes
  touch "./routes/${model}Routes.js"
  echo "// ${model} routes" > "./routes/${model}Routes.js"

  echo "Archivos generados para ${model}"
done

echo "✅ Todos los servicios, controladores y rutas fueron creados."