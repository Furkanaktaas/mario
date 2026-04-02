export interface CameraState {
  x: number;
  y: number;
}

export function updateCamera(
  camera: CameraState,
  playerX: number,
  screenWidth: number,
  levelWidth: number
): CameraState {
  const targetX = playerX - screenWidth / 2;
  const newX = Math.max(0, Math.min(targetX, levelWidth - screenWidth));
  return { ...camera, x: camera.x + (newX - camera.x) * 0.1 };
}
