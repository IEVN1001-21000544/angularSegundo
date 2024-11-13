import { Route, Routes } from "@angular/router";

export default[
    {
        path: 'listaalumnos',
        loadComponet:()=>import('./alumnos/alumnos.component')
    },
    {
        path: 'agregar',
        loadComponent:()=>import('./agregar/agregar.component')
    }
] as Routes 