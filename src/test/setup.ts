import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest runs without `globals: true`, so React Testing Library cannot
// register its automatic cleanup. Unmount rendered trees after each test.
afterEach(() => {
  cleanup()
})
