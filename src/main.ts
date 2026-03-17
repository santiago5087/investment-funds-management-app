import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { appConfig } from './app/app.config';
import { App } from './app/presentation/app';

// Registrar locale español de Colombia
registerLocaleData(localeEsCo, 'es-CO');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
