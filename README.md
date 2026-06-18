# 💻 Proyecto Individual Israel Andres Quenta Pomacusi

Este proyecto es una plataforma web modular interactiva desarrollada para el laboratorio de Computación Gráfica. El sistema integra dos grandes áreas de estudio: el Procesamiento Digital de Imágenes (PDI) en 2D a nivel de arreglos de píxeles y la renderización en tiempo real de modelos abstractos animados en un entorno tridimensional (3D).

---

## 🛠️ Estructura del Proyecto

El laboratorio está dividido en tres ejercicios prácticos e independientes:

1. **Ejercicio 1: Clasificación de Terrenos (RGB):** Algoritmo de segmentación espacial que analiza los canales $R$, $G$ y $B$ de cada píxel en tiempo real para clasificar e identificar componentes como nubes, vegetación, tierra y cemento.
2. **Ejercicio 2: Filtro de Suavizado 3×3:** Implementación de un filtro espacial de convolución mediante una máscara de vecindad de $3 \times 3$ (filtro promedio) para la atenuación de ruido visual de alta frecuencia, manejando los bordes del lienzo mediante duplicación estricta.
3. **Ejercicio 3: Animación de Modelo 3D (La Vaca Lola):** Módulo gráfico que migra hacia el entorno WebGL utilizando la librería **Three.js**. Carga de forma asíncrona la estructura geométrica, texturas y huesos (*rigging*) de un modelo en formato binario comprimido (`.glb`), sincronizando su animación por código con una pista de audio a través de un botón de interacción controlado.

---

## 📂 Arquitectura de Archivos

La distribución modular del repositorio está organizada de la siguiente manera:

```text
├── audio/
│   └── vaca-lola.mp3        # Pista de audio sincronizada
├── js/
│   └── app.js               # Lógica del motor gráfico y escena Three.js
├── models/
│   └── dance.glb            # Modelo geométrico 3D y clips de animación
├── index.html               # Interfaz principal y módulos de PDI (Ejercicios 1 y 2)
├── animacion.html           # Entorno enmarcado para la escena 3D (Ejercicio 3)
└── README.md                # Documentación del proyecto
