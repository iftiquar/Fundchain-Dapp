import { Injectable } from '@angular/core';


export interface FundsChartData{
  labels: string[],
  Data: number[][]
}

export interface OrdersChartData{
  labels: string[],
  Data: number[][]
}

@Injectable({
  providedIn: 'root'
})
export class FcChartService {

  constructor() { }

  getOrdersChartData(period: string): any{
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      Data: [[440, 44, 333, 453, 65, 431, 643]]
    }
  }

  getFundsChartData(period: string): any{
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      Data: [[440, 44, 333, 453, 65, 431, 643]]
    }
  }

}
