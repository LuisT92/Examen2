export interface ICotizacionDetalle {
  id: string;
  name: string;
  codigo: string ;
  vendedor : number;
  clasificacionVendedor : number;
  total : number;
  entrega  : number;
  padre :number;
  type : string;
}
