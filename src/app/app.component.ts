import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddMessageComponent } from "./tem/add-message/add-message.component";
import { ListMessageComponent } from "./tem/list-message/list-message.component";
import { CapturaPedidoComponent } from "./formulario/pizzas/captura-pedido/captura-pedido.component";
import { DetallePedidoComponent } from "./formulario/pizzas/detalle-pedido/detalle-pedido.component";
import { VentasDiaComponent } from "./formulario/pizzas/ventas-dia/ventas-dia.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddMessageComponent, ListMessageComponent, CapturaPedidoComponent, DetallePedidoComponent, VentasDiaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'angularSegundo';
}
