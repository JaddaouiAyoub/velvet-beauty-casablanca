"use client"

import { motion } from "framer-motion"
import { Scissors, Sparkles, Palette, Heart, Star, Droplets, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

type ServiceType = "all" | "hairdressing" | "facial"

const allServices = [
  // Hairdressing
  { 
    key: "cut", 
    category: "hairdressing" as const,
    icon: Scissors, 
    image: "/images/service-haircut.jpg", 
    price: "150 DH", 
    duration: "45 min",
    descFr: "Une coupe sur mesure adaptée à la forme de votre visage et votre style de vie.",
    descAr: "قصة مخصصة تناسب شكل وجهك ونمط حياتك."
  },
  { 
    key: "brushing", 
    category: "hairdressing" as const,
    icon: Sparkles, 
    image: "/images/hair-style-3.jpg", 
    price: "100 DH", 
    duration: "30 min",
    descFr: "Un brushing professionnel pour des cheveux brillants et volumineux toute la journée.",
    descAr: "تجفيف احترافي لشعر لامع وكثيف طوال اليوم."
  },
  { 
    key: "coloring", 
    category: "hairdressing" as const,
    icon: Palette, 
    image: "/images/service-coloring.jpg", 
    price: "350 DH", 
    duration: "2h",
    descFr: "Une coloration experte avec des produits premium pour une couleur vibrante et durable.",
    descAr: "صبغة خبيرة بمنتجات فاخرة للون نابض بالحياة وطويل الأمد."
  },
  { 
    key: "balayage", 
    category: "hairdressing" as const,
    icon: Star, 
    image: "/images/hair-style-2.jpg", 
    price: "500 DH", 
    duration: "3h",
    descFr: "Technique de balayage pour des reflets naturels et un effet soleil dans les cheveux.",
    descAr: "تقنية باليآج لانعكاسات طبيعية وتأثير مشمس في الشعر."
  },
  { 
    key: "bridal", 
    category: "hairdressing" as const,
    icon: Heart, 
    image: "/images/service-bridal.jpg", 
    price: "800 DH", 
    duration: "2h30",
    descFr: "Coiffure de mariée personnalisée pour le plus beau jour de votre vie.",
    descAr: "تسريحة عروس مخصصة لأجمل يوم في حياتك."
  },
  // Facial
  { 
    key: "cleansing", 
    category: "facial" as const,
    icon: Droplets, 
    image: "/images/service-facial.jpg", 
    price: "200 DH", 
    duration: "1h",
    descFr: "Nettoyage en profondeur pour éliminer les impuretés et retrouver une peau nette.",
    descAr: "تنظيف عميق لإزالة الشوائب واستعادة بشرة نقية."
  },
  { 
    key: "hydration", 
    category: "facial" as const,
    icon: Sparkles, 
    image: "/images/service-hydration.jpg", 
    price: "250 DH", 
    duration: "1h",
    descFr: "Soin hydratant intensif pour une peau repulpée et éclatante de santé.",
    descAr: "علاج ترطيب مكثف لبشرة ممتلئة ومشرقة بالصحة."
  },
  { 
    key: "anti_aging", 
    category: "facial" as const,
    icon: Star, 
    image: "/images/facial-care.jpg", 
    price: "400 DH", 
    duration: "1h30",
    descFr: "Traitement anti-âge premium pour réduire les rides et raffermir la peau.",
    descAr: "علاج مضاد للشيخوخة فاخر لتقليل التجاعيد وشد البشرة."
  },
  { 
    key: "mask", 
    category: "facial" as const,
    icon: Heart, 
    image: "/images/service-facial.jpg", 
    price: "180 DH", 
    duration: "45 min",
    descFr: "Masque purifiant et revitalisant adapté à votre type de peau.",
    descAr: "ماسك منقي ومنعش مناسب لنوع بشرتك."
  },
  { 
    key: "glow", 
    category: "facial" as const,
    icon: Sparkles, 
    image: "/images/service-hydration.jpg", 
    price: "300 DH", 
    duration: "1h15",
    descFr: "Soin éclat pour une peau lumineuse et un teint unifié.",
    descAr: "علاج إشراق لبشرة متألقة ولون موحد."
  },
]

const filterTabs = [
  { key: "all" as ServiceType, labelFr: "Tous les services", labelAr: "جميع الخدمات" },
  { key: "hairdressing" as ServiceType, labelFr: "Coiffure", labelAr: "تصفيف الشعر" },
  { key: "facial" as ServiceType, labelFr: "Soins du visage", labelAr: "العناية بالبشرة" },
]

export function Services() {
  const { t, language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<ServiceType>("all")
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const filteredServices = activeFilter === "all" 
    ? allServices 
    : allServices.filter(s => s.category === activeFilter)

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
              )}
            >
              {language === "ar" ? tab.labelAr : tab.labelFr}
            </button>
          ))}
        </motion.div>

        {/* Services Grid - Individual Cards */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.key}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredService(service.key)}
              onMouseLeave={() => setHoveredService(null)}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.category === "hairdressing" 
                    ? t.services.hairdressing.items[service.key as keyof typeof t.services.hairdressing.items]
                    : t.services.facial.items[service.key as keyof typeof t.services.facial.items]
                  }
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    service.category === "hairdressing" 
                      ? "bg-primary/90 text-primary-foreground" 
                      : "bg-accent/90 text-foreground"
                  )}>
                    {service.category === "hairdressing" 
                      ? (language === "ar" ? "تصفيف" : "Coiffure")
                      : (language === "ar" ? "عناية" : "Soins")
                    }
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-sm font-bold">
                    {service.price}
                  </span>
                </div>

                {/* Hover CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredService === service.key ? 1 : 0,
                    y: hoveredService === service.key ? 0 : 20
                  }}
                  className="absolute bottom-3 left-3 right-3"
                >
                  <a
                    href="#booking"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    {language === "ar" ? "احجزي الآن" : "Réserver"}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* Icon & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-xl shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                      {service.category === "hairdressing" 
                        ? t.services.hairdressing.items[service.key as keyof typeof t.services.hairdressing.items]
                        : t.services.facial.items[service.key as keyof typeof t.services.facial.items]
                      }
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === "ar" ? service.descAr : service.descFr}
                </p>

                {/* Duration & Details */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <a
                    href="#booking"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {language === "ar" ? "المزيد" : "En savoir plus"}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground">
              {language === "ar" 
                ? "هل تحتاجين إلى استشارة مجانية؟"
                : "Besoin d'une consultation gratuite ?"
              }
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {language === "ar" ? "تواصلي معنا" : "Contactez-nous"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
