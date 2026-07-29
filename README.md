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

## Seguridad y Modelo de Amenazas

TuxPass opera de manera 100% local (Client-Side). No requiere servidores externos, conexiones a internet ni herramientas de telemetría o analíticas.

### Comportamiento ante incidentes de seguridad:

1. **Datos en reposo (Bóveda almacenada):**
   Los datos guardados están cifrados mediante AES-256-GCM. Si un tercero obtiene acceso físico o copia la base de datos local, no podrá leer la información sin la Contraseña Maestra.

2. **Malware activo en el sistema (Keyloggers):**
   Si el sistema operativo anfitrión se encuentra infectado por un capturador de teclado o un infostealer activo durante el uso de la aplicación, las credenciales introducidas podrían ser interceptadas. Este es un riesgo común a cualquier software ejecutado en un entorno desprotegido.

---

## Propiedad y Licencia

© Todos los derechos reservados. Este código fuente es de carácter privado y propietario (**savage777js**), publicado únicamente para fines de inspección y visualización. Queda prohibida su copia, modificación, redistribución o uso comercial sin autorización expresa del autor.
