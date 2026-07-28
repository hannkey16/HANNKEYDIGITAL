'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export function LiveChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease }}
            className="glass-strong mb-1 w-72 rounded-3xl border border-white/10 p-5 shadow-2xl"
          >
            <p className="text-sm font-semibold">Butuh bantuan?</p>
            <p className="mt-1 text-xs text-muted-foreground">Tim support kami siap membantu 24/7.</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#25D366]/15 px-4 py-3 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/25"
              >
                <MessageCircle className="size-5 shrink-0" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href="https://t.me/hannkeydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#2AABEE]/15 px-4 py-3 text-sm font-medium text-[#2AABEE] transition-colors hover:bg-[#2AABEE]/25"
              >
                <Send className="size-5 shrink-0" />
                <span>Telegram</span>
              </a>
              <a
                href="mailto:support@hannkey.digital"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-5 shrink-0" />
                <span>Email Support</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="glow-brand grid size-14 place-items-center rounded-full bg-brand-gradient shadow-lg"
        aria-label={open ? 'Tutup live chat' : 'Buka live chat'}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="size-6 text-white" /></motion.span>
            : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle className="size-6 text-white" /></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
