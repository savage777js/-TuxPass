# TuxPass - Gestor de Contraseñas y Generador de Escritorio

TuxPass es una aplicación de escritorio local diseñada para la generación y gestión segura de contraseñas con interfaz inspirada en terminales de distribuciones Linux. Funciona de forma totalmente fuera de línea (Client-Side), garantizando la privacidad de los datos en el equipo del usuario.

---

## Características

- **Generación Criptográfica:** Generación de aleatoriedad mediante la API nativa `window.crypto.getRandomValues` (CSPRNG).
- **Bóveda Encriptada:** Almacenamiento local protegido con cifrado AES-256-GCM y derivación de clave PBKDF2.
- **Temas Visuales Linux:** Personalización con estéticas de Arch, Kali, Ubuntu, Matrix, Dracula y CRT Retro.
- **Modos de Generación:** Soporte para contraseñas aleatorias avanzadas y frases de paso (Diceware).
- **Lectura Fonética NATO:** Desglose en tiempo real para dictado por voz o radio.
- **Aplicación Portable:** Ejecutable autónomo para Windows empaquetado con Electron.

---

## Estructura del Proyecto

```text
TuxPass/
├── main.js                   # Proceso principal de Electron
├── index.html                # Interfaz de usuario (Bóveda y Generador)
├── style.css                 # Estilos y temas visuales
├── script.js                 # Lógica de cifrado y generación
├── Iniciar_TuxPass.bat       # Lanzador directo para Windows
├── Ejecutar_Boveda_TuxPass.bat
├── README.md                 # Documentación
└── package.json              # Configuración y dependencias
```

---

## Uso Local

Para ejecutar la aplicación en entorno de desarrollo o prueba:

```bash
# Instalar dependencias
npm install

# Iniciar aplicación
npm start
```

También es posible iniciar la aplicación mediante el script `Iniciar_TuxPass.bat`.

---

## Arquitectura de Seguridad y Privacidad

TuxPass opera de manera 100% local (Client-Side). No requiere servidores externos, conexiones a internet ni herramientas de telemetría o analíticas.

- **Cifrado Fuerte (AES-256-GCM):** Toda la información de la bóveda se almacena cifrada localmente en el dispositivo.
- **Derivación de Clave (PBKDF2):** Las claves se derivan de la Contraseña Maestra utilizando algoritmos de derivación robustos para proteger la integridad de los datos.
- **Zero-Knowledge Local:** Las credenciales y llaves generadas nunca abandonan la memoria local ni el entorno de la aplicación.

---

## Propiedad y Licencia

© Todos los derechos reservados. Este código fuente es de carácter privado y propietario (**savage777js**), publicado únicamente para fines de inspección y visualización. Queda prohibida su copia, modificación, redistribución o uso comercial sin autorización expresa del autor.
