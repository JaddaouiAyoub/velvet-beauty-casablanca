"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  { 
    key: "review1", 
    image: "/images/client-review-1.jpg",
    serviceFr: "Coiffure Mariage",
    serviceAr: "تسريحة عرس",
    dateFr: "Il y a 2 semaines",
    dateAr: "منذ أسبوعين",
    verified: true
  },
  { 
    key: "review2", 
    image: "/images/client-review-2.jpg",
    serviceFr: "Soin du Visage",
    serviceAr: "العناية بالبشرة",
    dateFr: "Il y a 1 mois",
    dateAr: "منذ شهر",
    verified: true
  },
  { 
    key: "review3", 
    image: "/images/client-review-1.jpg",
    serviceFr: "Balayage",
    serviceAr: "باليآج",
    dateFr: "Il y a 3 semaines",
    dateAr: "منذ 3 أسابيع",
    verified: true
  },
]

export function Testimonials() {
  const { t, language } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, handleNext])

  return (
    <section id="testimonials" className="py-24 bg-secondary/30 overflow-hidden">
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
            {language === "ar" ? "آراء العملاء" : "Avis Clients"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.testimonials.subtitle}
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">4.9/5</span>
            <span className="text-muted-foreground">
              {language === "ar" ? "بناءً على +500 تقييم" : "basé sur +500 avis"}
            </span>
          </div>
        </motion.div>

        {/* Featured Testimonial (Mobile Carousel / Desktop Grid) */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border relative group hover:border-primary/30 hover:shadow-lg transition-all"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/30 transition-colors" />
                </div>

                {/* Service Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {language === "ar" ? testimonial.serviceAr : testimonial.serviceFr}
                  </span>
                  {testimonial.verified && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Verified className="w-3 h-3 text-primary" />
                      {language === "ar" ? "موثق" : "Vérifié"}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                  &ldquo;{t.testimonials.reviews[testimonial.key as keyof typeof t.testimonials.reviews].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <Image
                      src={testimonial.image}
                      alt={t.testimonials.reviews[testimonial.key as keyof typeof t.testimonials.reviews].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">
                      {t.testimonials.reviews[testimonial.key as keyof typeof t.testimonials.reviews].name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{t.testimonials.reviews[testimonial.key as keyof typeof t.testimonials.reviews].location}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{language === "ar" ? testimonial.dateAr : testimonial.dateFr}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div 
            className="md:hidden relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-3xl p-8 border border-border relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-10 h-10 text-primary/20" />
                </div>

                {/* Service Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {language === "ar" ? testimonials[activeIndex].serviceAr : testimonials[activeIndex].serviceFr}
                  </span>
                  {testimonials[activeIndex].verified && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Verified className="w-3 h-3 text-primary" />
                      {language === "ar" ? "موثق" : "Vérifié"}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  &ldquo;{t.testimonials.reviews[testimonials[activeIndex].key as keyof typeof t.testimonials.reviews].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={t.testimonials.reviews[testimonials[activeIndex].key as keyof typeof t.testimonials.reviews].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {t.testimonials.reviews[testimonials[activeIndex].key as keyof typeof t.testimonials.reviews].name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{t.testimonials.reviews[testimonials[activeIndex].key as keyof typeof t.testimonials.reviews].location}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{language === "ar" ? testimonials[activeIndex].dateAr : testimonials[activeIndex].dateFr}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="p-2 bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      activeIndex === index 
                        ? "bg-primary w-6" 
                        : "bg-muted hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="p-2 bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full text-foreground hover:border-primary/50 transition-colors"
          >
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>
              {language === "ar" 
                ? "اطلعي على جميع التقييمات على Google"
                : "Voir tous nos avis sur Google"
              }
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
