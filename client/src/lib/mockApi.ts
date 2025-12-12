// Simulación de consumo de API para métricas de marketing/predicción
export interface InsightsResponse {
  topSellerIds: string[];
  weeklyForecast: number[];
  ticketPromedio: number;
}

export function fetchInsights(): Promise<InsightsResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topSellerIds: ["ropa-vieja", "lechon-asado", "tres-leches"],
        weeklyForecast: [120, 140, 155, 170, 165, 185, 210],
        ticketPromedio: 4200,
      });
    }, 400); // retardo simulado de red
  });
}


