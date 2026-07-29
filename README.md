# 🐧 TuxPass - Linux Style Password Manager & Vault

![Copyright](https://img.shields.io/badge/Copyright-All%20Rights%20Reserved-red.svg)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)
![Distro Themes](https://img.shields.io/badge/Themes-Arch%20%7C%20Kali%20%7C%20Ubuntu%20%7C%20Matrix%20%7C%20Dracula%20%7C%20Retro-cyan.svg)
![Web Crypto API](https://img.shields.io/badge/Security-CSPRNG%20Standard-success.svg)
![Platform](https://img.shields.io/badge/Platform-Desktop%20%2F%20Web-orange.svg)

> **TuxPass** es un gestor de contraseñas y generador criptográfico de alta seguridad con estética de terminal Linux. Funciona de manera **100% privada, local y fuera de línea (Client-Side)** tanto como aplicación de escritorio (Electron) como sitio web desplegable en GitHub Pages.

---

## 🚀 Características Destacadas

- 🛡️ **Seguridad Criptográfica (CSPRNG):** Generación aleatoria mediante la API nativa `window.crypto.getRandomValues`.
- 🔐 **Bóveda de Contraseñas Encriptada (Mi Bóveda):** Almacenamiento local seguro cifrado con AES-256 y PBKDF2. Tus contraseñas guardadas nunca salen de tu dispositivo.
- 🎨 **Estética Linux & Temas Distro:**
  - **Arch Linux:** Neón cian y azul metálico.
  - **Kali Linux:** Cyberpunk magenta/rojo táctico.
  - **Ubuntu:** Púrpura Yaru y naranja característico.
  - **Matrix Terminal:** Verde fósforo hacker.
  - **Dracula Dark:** Tonos oscuros y colores pastel.
  - **Amber Retro CRT:** Monitor fósforo ámbar vintage.
- 🎛️ **Modos de Generación Avanzados:**
  - **Aleatorio Personalizado:** Mayúsculas, minúsculas, números, símbolos y exclusión de caracteres ambiguos (`1,l,I,0,O`).
  - **Frases de Paso (Diceware):** Palabras legibles en español e inglés unidas por separadores configurables.
- 💻 **Versión Portable de Escritorio:** Ejecutable autónomo para Windows empacado con Electron.
- 📻 **Desglose Fonético NATO:** Lectura fonética oficial en tiempo real para dictado seguro sin errores.

---

## 📁 Estructura del Proyecto

```text
TuxPass/
├── main.js                   # Proceso principal de Electron (Escritorio)
├── index.html                # Interfaz principal (Bóveda y Generador)
├── style.css                 # Estilos Linux, variables CSS y animaciones
├── script.js                 # Lógica criptográfica (WebCrypto, AES-256)
├── Iniciar_TuxPass.bat       # Acceso directo para ejecutar la app
├── Ejecutar_Boveda_TuxPass.bat
├── README.md                 # Documentación oficial
└── package.json              # Configuración y dependencias de Electron
```

---

## ⚡ Instalación y Uso

### 1. Ejecutar como Aplicación de Escritorio
```bash
# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

### 2. Despliegue en GitHub Pages (Web)
El proyecto está configurado para desplegarse automáticamente en GitHub Pages:
- Repositorio: `https://github.com/savage777js/-TuxPass`
- URL de la Web: `https://savage777js.github.io/-TuxPass/`

---

## 🔐 Seguridad, Privacidad y Modelo de Amenazas (100% Client-Side)

TuxPass opera **100% Client-Side**. No utiliza servidores backend, bases de datos remotas ni analíticas de terceros. Toda la entropía se obtiene directamente del motor criptográfico del hardware/navegador mediante la API W3C Web Crypto. Tus claves y credenciales jamás salen de tu computadora.

### 🛡️ ¿Qué ocurre en caso de un hackeo del equipo / malware?

1. **Datos almacenados (En Reposo): PROTEGIDOS (AES-256-GCM + PBKDF2)**
   - Si un atacante o troyano copia los archivos de tu computadora (o la base de datos de la bóveda), **no podrá ver tus contraseñas**.
   - Toda la bóveda está cifrada con algoritmos criptográficos estándar de la industria. Sin tu **Contraseña Maestra**, la información es un bloque indescifrable de caracteres.

2. **Malware activo en memoria / Keyloggers (En Tiempo Real): RIESGO GENERAL**
   - Si tu PC tiene un *Keylogger* o *Infostealer* activo en el sistema operativo registrando tus pulsaciones de teclado mientras escribes tu Contraseña Maestra, el malware podría capturar las teclas ingresadas.
   - **Nota de seguridad:** Este es un riesgo inherente a **cualquier** gestor de contraseñas (KeePass, Bitwarden, 1Password, etc.) cuando el sistema operativo anfitrión está comprometido.

---

## 🔒 Propiedad y Licencia

© Todos los derechos reservados. Este código fuente es de carácter privado/propietario (**savage777js**) y está publicado únicamente para fines de visualización e inspección pública. No se autoriza su uso comercial, copia, modificación o redistribución sin la autorización expresa del autor.
