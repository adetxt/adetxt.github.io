import { useCallback, useState } from 'react'

export function useTileExpand() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])
  return { openId, open, close }
}
