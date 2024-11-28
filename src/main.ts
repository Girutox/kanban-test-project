/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

async function enableMocking() {
  if (environment.production) {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass'
  })
}

enableMocking().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});