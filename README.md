# 🐧 TuxPass - Linux Style Password Generator

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)
![Distro Themes](https://img.shields.io/badge/Themes-Arch%20%7C%20Kali%20%7C%20Ubuntu%20%7C%20Matrix%20%7C%20Dracula%20%7C%20Retro-cyan.svg)
![Web Crypto API](https://img.shields.io/badge/Security-CSPRNG%20Standard-success.svg)

> **TuxPass** es un generador de contraseñas de alta seguridad, altamente personalizable y con un diseño visual al más puro estilo de terminal y escritorio Linux (Arch, Kali, Ubuntu, Matrix, etc.). Diseñado específicamente para desplegar directamente en **GitHub Pages**.

---

## 🚀 Características Destacadas

- 🛡️ **Seguridad Criptográfica (CSPRNG):** Generación mediante la API nativa `window.crypto.getRandomValues`. Las contraseñas nunca salen de tu navegador.
- 🎨 **Estética Linux & Temas Distro:**
  - **Arch Linux:** Neón cian y azul metálico.
  - **Kali Linux:** Cyberpunk magenta/rojo táctico.
  - **Ubuntu:** Púrpura Yaru y naranja característico.
  - **Matrix Terminal:** Verde fósforo hacker.
  - **Dracula Dark:** Tonos oscuros y colores pastel.
  - **Amber Retro CRT:** Monitor fósforo ámbar vintage.
- 🎛️ **4 Modos de Generación Integrados:**
  1. **Aleatorio Avanzado:** Selección personalizada de mayúsculas, minúsculas, números, símbolos y exclusión de caracteres ambiguos (`1,l,I,0,O`).
  2. **Diceware / Frases de Paso:** Palabras humanas recordables unidas por separadores personalizables.
  3. **Pronunciable:** Basado en alternancia consonante-vocal para fácil memorización.
  4. **PIN / Hex:** Códigos numéricos de seguridad.
- 💻 **Terminal CLI Interactiva:** Modela una consola bash funcional con comandos como `gen`, `diceware`, `pin`, `theme`, `copy`, `clear` y `help`.
- 🔑 **Generador Determinista (Master Vault):** Calcula contraseñas únicas y reproducible usando algoritmos **HMAC-SHA256** combinando tu frase maestra secreta con el nombre del servicio (sin necesidad de almacenar nada en la nube).
- 📦 **Generador por Lotes (Bulk Gen):** Crea decenas o cientos de contraseñas simultáneamente y expórtalas en un clic en formato **TXT** o **JSON**.
- 🔊 **Efectos de Sonido Sintetizados:** Audio tipo teclado mecánico alimentado por Web Audio API (desactivable).
- 📻 **Desglose Fonético NATO:** Muestra en tiempo real la lectura fonética oficial de la contraseña para dictarla por teléfono o radio sin errores.

---

## 📁 Estructura del Proyecto

```text
Generador de contraseñas/
├── index.html       # Estructura principal y componentes de interfaz Linux
├── style.css        # Variables CSS, efectos scanline, temas de distribuciones y animaciones
├── script.js        # Lógica criptográfica, emulador CLI, cálculo de entropía y exportación
└── README.md        # Documentación oficial para GitHub
```

---

## ⚡ Cómo Desplegar en GitHub Pages

1. **Crear repositorio en GitHub:**
   Crea un nuevo repositorio público en GitHub llamado `tuxpass` o `generador-contrasenas`.

2. **Subir los archivos:**
   ```bash
   git init
   git add .
   git commit -m "feat: Lanzamiento inicial de TuxPass Linux Password Generator"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/tuxpass.git
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Ve a los **Settings** de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Source**, selecciona `Deploy from a branch` y elige la rama `main` / carpeta `/ (root)`.
   - Haz clic en **Save**. En 1 o 2 minutos tu sitio estará en vivo en `https://TU-USUARIO.github.io/tuxpass/`.

---

## ⌨️ Comandos de la Terminal Integrada

| Comando | Ejemplo | Descripción |
| :--- | :--- | :--- |
| `gen` | `gen -l 24` | Genera una contraseña con la longitud especificada |
| `diceware` | `diceware` | Genera una frase de paso estilo Diceware |
| `pin` | `pin` | Genera un número PIN aleatorio de seguridad |
| `theme` | `theme kali` | Cambia instantáneamente el tema visual (`arch`, `kali`, `ubuntu`, `matrix`, `dracula`, `retro`) |
| `copy` | `copy` | Copia la última contraseña generada al portapapeles |
| `clear` | `clear` | Limpia la pantalla de la terminal |

---

## 🔐 Seguridad y Privacidad

TuxPass opera **100% Client-Side**. No utiliza servidores backend ni analíticas de terceros. Toda la entropía se obtiene directamente del motor criptográfico del hardware/navegador mediante la API de W3C Web Crypto.

---

## 📜 Licencia

Desarrollado bajo la licencia [MIT](LICENSE). Libre para usar, modificar y compartir en tu perfil de GitHub.
