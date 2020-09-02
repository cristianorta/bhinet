import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = false;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://bhinetportfolio.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });
  }

  getProducto( id: string ) {
    return this.http.get(`https://bhinetportfolio.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos( termino );
      })
    } else {
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const categoria = prod.categoria.toLocaleLowerCase();
      const titulo = prod.titulo.toLocaleLowerCase();

      if ( categoria.indexOf( termino ) >= 0 || titulo.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }

    });
    console.log(this.productosFiltrado);

  }
}
