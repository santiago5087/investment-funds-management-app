# 💰 BTG Investment Funds Management App

Una aplicación moderna para la gestión de fondos de inversión construida con Angular 21, implementando arquitectura limpia, principios SOLID y Atomic Design.

![Angular](https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![NGXS](https://img.shields.io/badge/NGXS-21.0-673AB7)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest)

## ✨ Características

- 📊 **Exploración de Fondos** - Visualiza y explora fondos de inversión disponibles
- 💰 **Suscripción a Fondos** - Suscríbete a fondos con seguimiento de saldo en tiempo real
- 📧 **Notificaciones por Email** - Confirmaciones automáticas con [Resend](https://resend.com)
- 📱 **Notificaciones por SMS** - Mensajes de confirmación vía [Twilio](https://www.twilio.com)
- 📈 **Historial de Transacciones** - Gestión completa de tu portafolio
- 🎨 **UI Moderna** - Diseño responsivo con Material Design 3
- 🔔 **Notificaciones Toast** - Feedback visual elegante y funcional
- 🏗️ **Arquitectura Limpia** - Separación de responsabilidades y alta mantenibilidad
- ⚛️ **Atomic Design** - Componentes reutilizables y escalables
- 🧪 **Testing Completo** - Suite de pruebas unitarias con Vitest

---

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Clean Architecture** y **SOLID**, garantizando código mantenible, testeable y escalable.

### 📁 Estructura del Proyecto

```
src/app/
├── core/                    # Lógica de negocio central
│   ├── services/           # Servicios compartidos (notificaciones)
│   └── store/              # Estado global con NGXS
│       ├── actions/        # Acciones del store
│       ├── models/         # Modelos del estado
│       └── states/         # Estados y lógica de estado
│
├── domain/                  # Capa de dominio (Clean Architecture)
│   ├── models/             # Entidades del dominio
│   ├── repositories/       # Interfaces de repositorios
│   └── usecases/           # Casos de uso de negocio
│
├── data/                    # Capa de datos (Clean Architecture)
│   ├── data.providers.ts   # Proveedores de dependencias
│   └── repositories/       # Implementaciones de repositorios
│
└── presentation/            # Capa de presentación
    ├── components/         # Componentes UI (Atomic Design)
    │   ├── atoms/         # Componentes básicos (Button, Input, Icon)
    │   ├── molecules/     # Grupos de atoms (Card, Form)
    │   ├── organisms/     # Secciones completas (Header, FundGrid)
    │   └── templates/     # Layouts de páginas
    ├── pages/             # Páginas/Vistas principales
    └── styles/            # Estilos globales y variables
```

### 🎯 Principios SOLID Aplicados

- **S**ingle Responsibility: Cada clase/componente tiene una única responsabilidad
- **O**pen/Closed: Código abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Interfaces y abstracciones bien definidas
- **I**nterface Segregation: Interfaces específicas por necesidad
- **D**ependency Inversion: Dependencias de abstracciones, no de implementaciones

### ⚛️ Atomic Design

Los componentes están organizados siguiendo la metodología Atomic Design:

- **Atoms** (`atoms/`): Botones, inputs, iconos, labels
- **Molecules** (`molecules/`): Cards, formularios, grupos de controles
- **Organisms** (`organisms/`): Header, grids de fondos, tablas de transacciones
- **Templates** (`templates/`): Layouts y estructuras de páginas
- **Pages** (`pages/`): Páginas completas con datos y lógica

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm 11+
- Cuenta en [Resend](https://resend.com) (opcional, para emails)
- Cuenta en [Twilio](https://www.twilio.com) (opcional, para SMS)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd investment-funds-management-app

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env
# Edita .env y agrega tus API keys
```

### 🔧 Levantar el Proyecto

Para ejecutar la aplicación localmente, necesitas iniciar tanto el servidor API como la aplicación Angular:

#### Opción 1: Dos Terminales (Recomendado)

**Terminal 1 - API Server:**
```bash
npm run api
```
El servidor JSON con soporte de email/SMS estará disponible en `http://localhost:3000`

**Terminal 2 - Angular App:**
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

#### Opción 2: Una Terminal con Scripts Paralelos

```bash
# Requiere instalar concurrently
npm install -g concurrently
npm run dev  # Si tienes este script configurado
```

### 📧 Configuración de Resend (Email)

1. Crea una cuenta gratuita en [resend.com](https://resend.com)
2. Obtén tu API key en [resend.com/api-keys](https://resend.com/api-keys)
3. Agrega a tu archivo `.env`:
   ```env
   RESEND_API_KEY=re_tu_api_key_aqui
   ```
4. Reinicia el servidor API

**Características:**
- ✅ 100 emails/día en plan gratuito
- ✅ Plantillas HTML profesionales
- ✅ Tracking de entregas
- ✅ Sin tarjeta de crédito requerida

Ver [RESEND_SETUP.md](RESEND_SETUP.md) para más detalles.

### 📱 Configuración de Twilio (SMS)

1. Crea una cuenta gratuita en [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Obtén $15 USD de crédito gratis
3. Copia del Dashboard: Account SID, Auth Token, Phone Number
4. Agrega a tu archivo `.env`:
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=tu_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```
5. Reinicia el servidor API

Ver [TWILIO_SETUP.md](TWILIO_SETUP.md) para más detalles.

---

## 📱 Diseño Responsivo

La aplicación está completamente optimizada para todos los dispositivos:

- 📱 **Mobile First**: Diseñado primero para dispositivos móviles
- 💻 **Desktop**: Experiencia optimizada para pantallas grandes
- 📐 **Breakpoints**:
  - Mobile: < 600px
  - Tablet: 600px - 1024px
  - Desktop: > 1024px
- 🎨 **CSS Grid & Flexbox**: Layouts flexibles y adaptables
- 🖼️ **Imágenes Responsivas**: Optimización automática de recursos
- ⚡ **Performance**: Carga rápida en cualquier dispositivo

---

## 🛠️ Desarrollo

### Generar Componentes

Angular CLI incluye herramientas de scaffolding. Para generar un nuevo componente:

```bash
# Generar un atom
ng generate component presentation/components/atoms/component-name

# Generar una molecule
ng generate component presentation/components/molecules/component-name

# Generar una página
ng generate component presentation/pages/page-name

# Ver todos los esquemas disponibles
ng generate --help
```

### Estructura de un Componente

```typescript
// Componente con señales (Angular 21)
@Component({
  selector: 'app-example',
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  // Input signals
  data = input.required<DataType>();
  
  // Output events
  onChange = output<ChangeEvent>();
  
  // Computed signals
  processedData = computed(() => {
    return this.data().map(item => /* transform */);
  });
}
```

---

## 🧪 Testing

El proyecto utiliza **Vitest** para pruebas unitarias con **@testing-library/angular** para testing de componentes.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch (desarrollo)
npm run test:watch

# Ver cobertura
npm run test:coverage

# UI interactiva de tests
npm run test:ui
```

### Estructura de Tests

```typescript
import { render, screen } from '@testing-library/angular';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  it('should render correctly', async () => {
    await render(ExampleComponent, {
      componentInputs: { data: mockData }
    });
    
    expect(screen.getByText('Expected Text')).toBeTruthy();
  });
});
```

### Mejores Prácticas de Testing

- ✅ Test de comportamiento, no de implementación
- ✅ Usar queries accesibles (`getByRole`, `getByLabelText`)
- ✅ Mock de servicios externos
- ✅ Tests aislados e independientes
- ✅ Nombres descriptivos de casos de prueba

---

## 📦 Build & Deployment

### Build de Producción

```bash
# Build optimizado para producción
npm run build

# Los archivos estarán en dist/investment-funds-management-app/browser/
```

**Optimizaciones incluidas:**
- 🗜️ Minificación y tree-shaking
- 📦 Code splitting automático
- 🖼️ Optimización de assets
- 🔒 Hashing de archivos para cache
- ⚡ Lazy loading de rutas

### 🚀 Deploy en Vercel

Este proyecto está optimizado para Vercel con **cero configuración**.

#### Deploy Rápido

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Importar en Vercel**
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente Angular

3. **Configurar Variables de Entorno**
   
   En Settings → Environment Variables:
   ```env
   RESEND_API_KEY=re_tu_api_key
   TWILIO_ACCOUNT_SID=ACxxxxxxxxx
   TWILIO_AUTH_TOKEN=tu_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

4. **¡Deploy! 🎉**
   - Click en "Deploy"
   - Tu app estará disponible en `https://tu-proyecto.vercel.app`

#### Características del Deploy

- ✅ Frontend optimizado y servido via CDN
- ✅ API endpoints serverless en `/api/*`
- ✅ Notificaciones por email funcionando
- ✅ HTTPS automático
- ✅ Red global edge
- ✅ Preview deployments para PRs
- ✅ Rollback instantáneo

Ver [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) para más detalles.

### Alternativas de Deployment

```bash
# Deploy con Vercel CLI
npm install -g vercel
vercel login
vercel

# O deploy manual en cualquier servidor
npm run build
# Subir dist/investment-funds-management-app/browser/ a tu servidor
```

---

## 📚 Stack Tecnológico

### Frontend
- **Angular 21** - Framework principal
- **TypeScript 5.9** - Lenguaje tipado
- **NGXS 21** - State management
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **Angular Signals** - Reactividad granular

### Backend/API
- **JSON Server** - API REST mock (desarrollo)
- **Vercel Serverless Functions** - API en producción
- **Resend** - Servicio de email transaccional
- **Twilio** - Servicio de SMS

### Testing
- **Vitest** - Test runner rápido
- **@testing-library/angular** - Testing de componentes
- **jsdom** - DOM environment para tests

### DevOps
- **Vercel** - Hosting y deployment
- **GitHub** - Control de versiones
- **npm** - Gestor de paquetes

---

## 📖 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia Angular dev server
npm run api            # Inicia API server con Resend/Twilio
npm run watch          # Build en modo watch

# Testing
npm test               # Ejecuta todos los tests
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Genera reporte de cobertura
npm run test:ui        # UI interactiva de Vitest

# Build
npm run build          # Build de producción

# Utilidades
ng generate component <name>  # Genera un componente
ng generate service <name>     # Genera un servicio
ng --help                      # Ver todos los comandos
```

---

## 🎨 Convenciones de Código

### Estructura de Archivos

```
component-name/
├── component-name.component.ts      # Lógica del componente
├── component-name.component.html    # Template
├── component-name.component.scss    # Estilos
└── component-name.component.spec.ts # Tests
```

### Naming Conventions

- **Componentes**: `PascalCase` - `FundCardComponent`
- **Servicios**: `PascalCase` + `Service` - `NotificationService`
- **Modelos**: `PascalCase` - `InvestmentFund`
- **Interfaces**: `PascalCase` - `FundsRepository`
- **Archivos**: `kebab-case` - `fund-card.component.ts`

### Estilo de Código

```typescript
// ✅ Bueno: Usar signals y computed
title = input.required<string>();
displayTitle = computed(() => this.title().toUpperCase());

// ✅ Bueno: Dependency injection con inject()
private store = inject(Store);

// ✅ Bueno: Tipado explícito
funds$: Observable<InvestmentFund[]>;

// ✅ Bueno: Funciones puras en pipes
transform(value: number): string {
  return formatCurrency(value);
}
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Commits Convencionales

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan lógica)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👥 Autores

- **Santiago** - [GitHub](https://github.com/santiago5087)

---

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda?

- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [GitHub Issues](https://github.com/santiago5087/investment-funds-management-app/issues)
- 📚 Docs: [Angular Documentation](https://angular.dev)

---

## 🙏 Agradecimientos

- [Angular Team](https://angular.dev) - Framework increíble
- [Resend](https://resend.com) - Servicio de email moderno
- [Twilio](https://www.twilio.com) - Plataforma de comunicaciones
- [Vercel](https://vercel.com) - Deployment sin complicaciones
- [Material Design](https://material.angular.io) - Sistema de diseño

---

<div align="center">
  
**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Made with ❤️ and Angular

</div>
