# Sistema de Diseño - Variables

Este archivo contiene todas las variables de diseño centralizadas para mantener consistencia en toda la aplicación.

## Uso

Para usar las variables en cualquier archivo `.scss`, importa el archivo de variables:

```scss
@import '../../variables'; // Ajusta la ruta según la ubicación del archivo
```

## Variables Disponibles

### Colores Primarios
- `$primary`: #1976d2 - Color principal de la marca
- `$primary-dark`: #1565c0 - Versión oscura del color principal
- `$primary-light`: #e3f2fd - Versión clara del color principal

### Colores de Texto
- `$text-primary`: #333 - Texto principal/titulares
- `$text-secondary`: #666 - Texto secundario/descripción
- `$text-disabled`: #999 - Texto deshabilitado
- `$text-on-primary`: #ffffff - Texto sobre fondos primarios

### Colores de Estado - Success
- `$success`: #388e3c - Color de éxito principal
- `$success-dark`: #2e7d32 - Versión oscura de éxito
- `$success-light`: #e8f5e9 - Fondo de éxito
- `$success-border`: #66bb6a - Borde de éxito

### Colores de Estado - Error
- `$error`: #d32f2f - Color de error principal
- `$error-dark`: #c62828 - Versión oscura de error
- `$error-light`: #ffebee - Fondo de error
- `$error-border`: #ef5350 - Borde de error

### Colores de Estado - Warning
- `$warning`: #f57c00 - Color de advertencia principal
- `$warning-dark`: #e65100 - Versión oscura de advertencia
- `$warning-light`: #fff3e0 - Fondo de advertencia
- `$warning-border`: #ffb74d - Borde de advertencia

### Colores de Estado - Info
- `$info`: #1565c0 - Color de información principal
- `$info-light`: #e3f2fd - Fondo de información
- `$info-border`: #64b5f6 - Borde de información

### Colores de Fondo
- `$background-default`: #ffffff - Fondo blanco por defecto
- `$background-paper`: #f5f5f5 - Fondo gris claro tipo papel
- `$background-light`: #f0f0f0 - Fondo gris muy claro

### Colores de Bordes
- `$border-light`: #e0e0e0 - Borde gris claro
- `$border-default`: #f0f0f0 - Borde gris muy claro

### Sombras
- `$shadow-sm`: 0 2px 8px rgba(0, 0, 0, 0.05) - Sombra pequeña
- `$shadow-md`: 0 2px 8px rgba(0, 0, 0, 0.1) - Sombra mediana
- `$shadow-lg`: 0 4px 20px rgba(25, 118, 210, 0.3) - Sombra grande
- `$shadow-xl`: 0 8px 16px rgba(0, 0, 0, 0.1) - Sombra extra grande

### Overlays
- `$overlay-light`: rgba(0, 0, 0, 0.5) - Overlay semi-transparente
- `$overlay-dark`: rgba(0, 0, 0, 0.6) - Overlay más oscuro

### Valores de Opacidad
- `$opacity-light`: 0.6 - Opacidad ligera
- `$opacity-medium`: 0.8 - Opacidad media
- `$opacity-high`: 0.9 - Opacidad alta

## Ejemplo de Uso

```scss
@use 'variables' as *;

.my-component {
  background-color: $primary;
  color: $text-on-primary;
  box-shadow: $shadow-md;
  
  &:hover {
    background-color: $primary-dark;
  }
}

.error-message {
  background: $error-light;
  color: $error-dark;
  border: 1px solid $error-border;
}
```

## Nota para Variables de Material

Cuando uses variables SCSS dentro de propiedades CSS custom de Material Design (`--mdc-*`), debes usar interpolación:

```scss
.badge-info {
  --mdc-chip-elevated-container-color: #{$info-light};
  --mdc-chip-label-text-color: #{$primary};
}
```
