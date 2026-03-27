export interface DashboardOverlayProps {
  year: number;
  label: string;
  metrics: {
    co2: number;
    temp: number;
    seaLevel: number;
  };
  description: string;
}
