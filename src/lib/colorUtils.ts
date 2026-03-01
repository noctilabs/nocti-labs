/**
 * Determines if a hex color is light or dark based on luminance
 * @param hexColor - Hex color string (e.g., #ffffff)
 * @returns true if the color is light, false if dark
 */
export const isLightBackground = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

/**
 * Gets the appropriate nav theme based on background color
 * @param backgroundColor - Hex color string for the background
 * @returns 'light' if background is light, 'dark' if background is dark
 */
export const getNavTheme = (backgroundColor?: string): 'light' | 'dark' => {
  return backgroundColor && !isLightBackground(backgroundColor) ? 'dark' : 'light'
}
