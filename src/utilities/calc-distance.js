const toRad = function (num) {
  return num * Math.PI / 180;
};

export function getDistance(start, end, options) {
  if (start && end) {
    const newOptions = options || {};

    const radii = {
      km: 6371,
      mile: 3960,
      meter: 6371000,
      nmi: 3440
    };

    const R = newOptions.unit in radii
      ? radii[newOptions.unit]
      : radii.mile;

    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (newOptions.threshold) {
      return newOptions.threshold > (R * c);
    }

    const distance = Math.round(R * c * 10) / 10;
    return distance === 1 ? '1 mile' : `${distance} miles`;
  }

  return 0;
}
