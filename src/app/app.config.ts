import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(BrowserAnimationsModule),  // Import BrowserAnimationsModule
    importProvidersFrom(ToastrModule.forRoot()),   // Import ToastrModule with forRoot()
  ],
};
