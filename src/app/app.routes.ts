import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: () => import('./auth/features/auth.routes')
    },
    {
        path:'formulario',
        loadChildren: () => import('./formulario/formulario.routes')
    },
    {
        path:'resistencia',
        loadChildren: () => import('./formulario/formulario.routes')
    },
    {
        path:'empleados',
        loadChildren: () => import('./formulario/formulario.routes')
    },
    {
        path: 'utl',
        loadChildren: () => import('./utl/utl.routes')
    }
];
