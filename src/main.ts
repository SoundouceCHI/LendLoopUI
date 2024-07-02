import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { HttpClientModule,  provideHttpClient, withFetch} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideJwtOptions } from './app/config/jwt.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    importProvidersFrom(HttpClientModule) , 
    provideHttpClient(withFetch()),
    provideJwtOptions(),
    JwtHelperService, provideAnimationsAsync(),
  ]
}
)
  .catch((err) => console.error(err));
