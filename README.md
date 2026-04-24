# Cato Menu

**Cato Menu** es una plataforma de menú digital moderna, rápida y elegante diseñada para locales gastronómicos que buscan ofrecer una experiencia premium a sus clientes. Cuenta con una gestión administrativa robusta y dos interfaces visuales optimizadas para diferentes momentos del día: **Café** y **Bar**.



## 🚀 Características Principales

- **Doble Perfil Visual**: Temas específicos para el día (Café) y la noche (Bar), con estéticas cuidadosamente diseñadas.
- **Panel de Administración Responsive**: Gestión completa de productos y categorías desde cualquier dispositivo, con edición "inline" y carga de datos en paralelo para máxima velocidad.
- **Carga Optimizada**: Implementación de `Promise.all` para el fetching de datos y navegación instantánea.
- **Experiencia de Usuario Premium**:
  - Pantallas de carga temáticas con animaciones fluidas.
  - Diseño basado en Google Material Design 3 con variables CSS personalizadas.
  - Uso de unidades `dvh` para un ajuste perfecto en navegadores móviles.
- **Exportación Inteligente**: Sistema para previsualizar y generar versiones exportables del menú.
- **Seguridad**: Autenticación gestionada a través de Supabase Auth y Middleware de protección de rutas.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) con Turbopack.
- **Base de Datos y Auth**: [Supabase](https://supabase.com/).
- **Estilos**: CSS nativo con arquitectura de variables (Tokens de diseño).
- **Lenguaje**: TypeScript para máxima robustez.
- **Despliegue**: Optimizado para Vercel.

## 📦 Estructura del Proyecto

```text
src/
├── app/               # Rutas de Next.js (cafe, bar, admin)
│   ├── admin/         # Dashboard administrativo y acciones del servidor
│   ├── cafe/          # Interfaz pública de cafetería
│   └── bar/           # Interfaz pública de bar/noche
├── components/        # Componentes UI reutilizables
├── lib/               # Utilidades y configuración de Supabase
├── types/             # Definiciones de TypeScript (Base de datos y App)
└── middleware.ts      # Protección de rutas y gestión de sesiones
```

## ⚙️ Configuración e Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/vapluxarg/cato-menu.git
    cd cato-menu
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz con las siguientes claves:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
    SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key (opcional para admin)
    ```

4.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```

## 📝 Notas de Desarrollo

- **Rendimiento**: Se ha priorizado el uso de Server Components donde es posible para minimizar el JS enviado al cliente, manteniendo la interactividad en el Panel de Admin mediante Client Components específicos.
- **Diseño Móvil**: El panel de administración utiliza formularios apilables dinámicamente para garantizar que la edición de productos sea cómoda en pantallas pequeñas desde un celular.

