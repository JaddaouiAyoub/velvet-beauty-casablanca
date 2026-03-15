"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { useState } from "react"

export function BeforeAfter() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.before_after.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.before_after.subtitle}
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            {/* After Image (Background) */}
            <Image
              src="/images/after-hair.jpg"
              alt={t.before_after.after}
              fill
              className="object-cover"
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/before-hair.jpg"
                alt={t.before_after.before}
                fill
                className="object-cover"
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-background shadow-lg"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-foreground/50" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-foreground/50" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-background/90 rounded-full text-sm font-medium text-foreground">
              {t.before_after.before}
            </div>
            <div className="absolute bottom-4 right-4 px-4 py-2 bg-background/90 rounded-full text-sm font-medium text-foreground">
              {t.before_after.after}
            </div>

            {/* Hidden Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Glissez pour comparer
          </p>
        </motion.div>
      </div>
    </section>
  )
}
