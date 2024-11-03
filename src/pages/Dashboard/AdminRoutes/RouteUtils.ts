export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance} metros`;
  } else {
    return `${(distance / 1000).toFixed(2)} kilómetros`;
  }
}

export const formatEstimatedTime = (seconds: string): string => {
  const totalSeconds = parseInt(seconds, 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const remainingSeconds = totalSeconds - (hours * 3600) - (minutes * 60);

  if (hours > 0) {
    return `${hours}h:${minutes}m:${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m:${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}
