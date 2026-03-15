"use client"

import { motion } from "framer-motion"
import { Award, Shield, Users, Cpu, Leaf, Check } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

const features = [
  { 
    key: "products", 
    icon: Award, 
    image: "/images/why-products.jpg",
    descFr: "Nous utilisons exclusivement des produits professionnels haut de gamme pour garantir des résultats exceptionnels et préserver la santé de vos cheveux et de votre peau.",
    descAr: "نستخدم حصريًا منتجات احترافية عالية الجودة لضمان نتائج استثنائية والحفاظ على صحة شعرك وبشرتك."
  },
  { 
    key: "hygiene", 
    icon: Shield, 
    image: "/images/why-hygiene.jpg",
    descFr: "Nos outils sont stérilisés après chaque utilisation et notre salon est nettoyé plusieurs fois par jour selon les normes les plus strictes.",
    descAr: "يتم تعقيم أدواتنا بعد كل استخدام ويتم تنظيف صالوننا عدة مرات يوميًا وفقًا لأعلى المعايير."
  },
  { 
    key: "team", 
    icon: Users, 
    image: "/images/why-team.jpg",
    descFr: "Notre équipe de stylistes certifiées cumule plus de 25 ans d'expérience et se forme régulièrement aux dernières tendances.",
    descAr: "يتمتع فريقنا من المصففات المعتمدات بخبرة تزيد عن 25 عامًا ويتدربن بانتظام على أحدث الاتجاهات."
  },
  { 
    key: "equipment", 
    icon: Cpu, 
    image: "/images/why-equipment.jpg",
    descFr: "Nous investissons dans les équipements les plus modernes pour vous offrir des soins de qualité salon dans un environnement confortable.",
    descAr: "نستثمر في أحدث المعدات لتقديم علاجات عالية الجودة في بيئة مريحة."
  },
  { 
    key: "ambiance", 
    icon: Leaf, 
    image: "/images/why-ambiance.jpg",
    descFr: "Détendez-vous dans notre espace inspiré du design marocain, pensé pour votre bien-être avec une ambiance zen et accueillante.",
    descAr: "استرخي في مساحتنا المستوحاة من التصميم المغربي، المصممة لراحتك مع أجواء هادئة ومرحبة."
  },
]

export function WhyUs() {
  const { t, isRTL, language } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)

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
            Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.why_us.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.why_us.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn("relative", isRTL && "lg:order-2")}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={features[activeFeature].image}
                  alt={t.why_us.items[features[activeFeature].key as keyof typeof t.why_us.items]}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              </motion.div>
              
              {/* Feature Info Overlay */}
              <motion.div
                key={`info-${activeFeature}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-5 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {(() => {
                        const IconComponent = features[activeFeature].icon
                        return <IconComponent className="w-5 h-5 text-primary" />
                      })()}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-foreground">
                      {t.why_us.items[features[activeFeature].key as keyof typeof t.why_us.items]}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === "ar" ? features[activeFeature].descAr : features[activeFeature].descFr}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/30 rounded-3xl -z-10" />
            
            {/* Image Thumbnails */}
            <div className="flex gap-2 mt-4 justify-center">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeFeature === index 
                      ? "bg-primary w-8" 
                      : "bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`View feature ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? "lg:order-1" : ""}
          >
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "w-full flex items-start gap-4 p-5 rounded-2xl border transition-all text-left",
                    activeFeature === index 
                      ? "bg-primary/5 border-primary/30 shadow-sm" 
                      : "bg-card border-border hover:border-primary/20 hover:bg-secondary/30"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-xl shrink-0 transition-colors",
                    activeFeature === index ? "bg-primary/15" : "bg-primary/10"
                  )}>
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">
                        {t.why_us.items[feature.key as keyof typeof t.why_us.items]}
                      </span>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-0.5 bg-primary rounded-full"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {language === "ar" ? feature.descAr : feature.descFr}
                    </p>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className={cn(
                    "relative w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all",
                    activeFeature === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  )}>
                    <Image
                      src={feature.image}
                      alt={t.why_us.items[feature.key as keyof typeof t.why_us.items]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
