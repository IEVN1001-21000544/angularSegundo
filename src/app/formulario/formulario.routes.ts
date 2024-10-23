import { Route, Routes } from "@angular/router";
export default[
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'resistencia',
        loadComponent:() =>import('./resistencias/resistencias.component'),
    },
    {
        path: 'empleados',
        loadComponent: () =>import('./empleados/empleados.component'),
    },
    //{
      //  path: 'empleados2',
       // loadComponent: () =>import('./empleados2/empleados.component (1) 1'),
   // },
   // {
     //   path: 'resistencias2',
      //  loadComponent: () =>import('./resistencias2/resistencias.component (1) 1'),
    //}
]as Routes