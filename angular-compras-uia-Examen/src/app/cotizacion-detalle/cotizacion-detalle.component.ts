import { Component, Input, OnInit } from '@angular/core';
import { ICotizacionDetalle } from '../iCotizacionDetalle';
import { IReporte } from '../iReporte';
import {CotizacionDetalleService} from '../cotizacion-detalle.service';

@Component({
  selector: 'app-cotizacion-detalle',
  templateUrl: './cotizacion-detalle.component.html',
  styleUrls: ['./cotizacion-detalle.component.css']
})
export class CotizacionDetalleComponent implements OnInit {

  public cotizacion = { name: "", id: 0, padre:0 }

 cotizaciones : ICotizacionDetalle[] = [];

 selectedCotizacion?: ICotizacionDetalle;

 @Input() reporte!: IReporte;

 constructor(public datoscotizacion:CotizacionDetalleService) { }



  ngOnInit(): void {
    this.datoscotizacion.getCotizacioDetalle(this.reporte.id).subscribe((data: any[])=>{
      console.log(data);
      this.cotizaciones = data;
  })

}
onSelect(cotizacion: ICotizacionDetalle): void {
  this.selectedCotizacion = cotizacion;
}

agregar(name: string, id:string): void {
  name = name.trim();

  var newSolicitud = <ICotizacionDetalle>{};

  newSolicitud.id=id;
  newSolicitud.name=name;
  newSolicitud.type="cotizaciones";

  if (!name) { return; }
  this.datoscotizacion.agregacotizacion(newSolicitud)
    .subscribe(cotizacion => {
      this.cotizaciones.push(cotizacion);
    });
}

}
