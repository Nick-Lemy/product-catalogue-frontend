export interface ReadinessCheck {
  requirement: string;
  met: boolean;
}

export interface ReadinessReport {
  productId: string;
  checks: ReadinessCheck[];
  canPublish: boolean;
}
