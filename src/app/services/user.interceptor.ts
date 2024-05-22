import { HttpInterceptorFn } from '@angular/common/http';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem('userToken');
  const cloneReq = req.clone(
    {
      setHeaders: {
        Authorization: `Bearer ${myToken}`
      }
    }
  ) 
  return next(req);
};
