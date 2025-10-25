export const getImageUrl = (
  path: string | null,
  size: 'w500' | 'w1280' = 'w500'
) => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/no-image.svg'
}

export function formatRating(rating: number): string {
  return (Math.round(rating * 10) / 10).toFixed(1)
}

export function getYear(releaseDate?: string): string {
  if (!releaseDate) return 'N/A'
  return releaseDate.split('-')[0]
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes || minutes === 0) return '-'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}
