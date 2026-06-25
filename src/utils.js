// A value is a real (filled-in) field if it has no [PLACEHOLDER] brackets.
export const isFilled = (v) => typeof v === 'string' && v.length > 0 && !v.includes('[')
