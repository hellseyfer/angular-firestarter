export function isPWA(): boolean {
  return (
    (window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches) || // Most platforms
    (window.navigator as any).standalone === true // iOS Safari
  );
}
