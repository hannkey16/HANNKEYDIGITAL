import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { faqs } from '@/lib/site-data'

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan Yang Sering"
          highlight="Ditanyakan"
          description="Belum menemukan jawabannya? Tim support kami siap membantu 24/7."
        />

        <Reveal direction="up" delay={0.08} className="mx-auto mt-12 max-w-3xl">
          <div className="gradient-border glass rounded-3xl p-2 sm:p-4">
            <Accordion multiple={false} className="gap-0">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className="border-white/8 not-last:border-b"
                >
                  <AccordionTrigger className="items-center px-3 py-5 text-[15px] font-semibold hover:no-underline sm:px-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
