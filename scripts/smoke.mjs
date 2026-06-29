// Minimal smoke check: start preview, fetch root, expect non-empty HTML.
import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'

const port = 4173
const server = spawn('npx', ['vite', 'preview', '--port', String(port)], { stdio: 'inherit' })

let failed = false
try {
  await wait(2000)
  const res = await fetch(`http://localhost:${port}/`)
  const html = await res.text()
  if (res.status !== 200 || !html.includes('id="root"')) {
    console.error('SMOKE FAIL: expected 200 + #root in body')
    failed = true
  } else {
    console.log('SMOKE OK: page served and contains #root')
  }
} catch (e) {
  console.error('SMOKE FAIL:', e)
  failed = true
} finally {
  server.kill()
  process.exit(failed ? 1 : 0)
}
