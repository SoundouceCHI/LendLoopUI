import { JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Provider } from '@angular/core';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
  }
};
export function provideJwtOptions(): Provider[] {
    return [
      { provide: JWT_OPTIONS, useValue: jwtConfig.config }
    ];
  }
