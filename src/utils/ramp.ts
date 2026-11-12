export const ramp = (name: string, steps: readonly number[]) =>
  Object.fromEntries([
    ["DEFAULT", `rgb(var(--ign-${name}) / <alpha-value>)`],
    ...steps.map((s) => [s, `rgb(var(--ign-${name}-${s}) / <alpha-value>)`]),
  ]);