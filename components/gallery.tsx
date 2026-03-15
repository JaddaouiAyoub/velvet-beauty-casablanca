"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  { 
    src: "/images/hair-style-1.jpg", 
    altFr: "Coiffure mariage traditionnelle", 
    altAr: "تسريحة عرس تقليدية",
    category: "bridal",
    categoryFr: "Mariage",
    categoryAr: "عرس",
    descFr: "Une coiffure de mariage élégante avec des tresses et des perles, parfaite pour une mariée traditionnelle.",
    descAr: "تسريحة زفاف أنيقة مع ضفائر ولآلئ، مثالية للعروس التقليدية."
  },
  { 
    src: "/images/hair-style-2.jpg", 
    altFr: "Balayage californien", 
    altAr: "باليآج كاليفورنيا",
    category: "coloring",
    categoryFr: "Coloration",
    categoryAr: "صبغة",
    descFr: "Un balayage ensoleillé aux reflets naturels pour un look moderne et lumineux.",
    descAr: "باليآج مشمس بانعكاسات طبيعية لإطلالة عصرية ومشرقة."
  },
  { 
    src: "/images/hair-style-3.jpg", 
    altFr: "Brushing volumineux", 
    altAr: "تجفيف كثيف",
    category: "styling",
    categoryFr: "Coiffage",
    categoryAr: "تصفيف",
    descFr: "Un brushing professionnel pour des cheveux brillants et pleins de volume.",
    descAr: "تجفيف احترافي لشعر لامع ومليء بالحجم."
  },
  { 
    src: "/images/facial-care.jpg", 
    altFr: "Soin visage hydratant", 
    altAr: "علاج ترطيب الوجه",
    category: "facial",
    categoryFr: "Soins",
    categoryAr: "عناية",
    descFr: "Un soin du visage profond pour une peau éclatante et hydratée.",
    descAr: "علاج عميق للوجه لبشرة مشرقة ورطبة."
  },
  { 
    src: "/images/service-bridal.jpg", 
    altFr: "Maquillage et coiffure mariée", 
    altAr: "مكياج وتسريحة العروس",
    category: "bridal",
    categoryFr: "Mariage",
    categoryAr: "عرس",
    descFr: "Un look de mariée complet avec maquillage et coiffure assortis pour le plus beau jour de votre vie.",
    descAr: "إطلالة عروس كاملة مع مكياج وتسريحة متناسقة لأجمل يوم في حياتك."
  },
  { 
    src: "/images/service-coloring.jpg", 
    altFr: "Coloration professionnelle", 
    altAr: "صبغة احترافية",
    category: "coloring",
    categoryFr: "Coloration",
    categoryAr: "صبغة",
    descFr: "Une coloration experte réalisée avec des produits professionnels pour un résultat parfait.",
    descAr: "صبغة خبيرة بمنتجات احترافية لنتيجة مثالية."
  },
  { 
    src: "/images/gallery-makeup.jpg", 
    altFr: "Maquillage soirée", 
    altAr: "مكياج سهرة",
    category: "makeup",
    categoryFr: "Maquillage",
    categoryAr: "مكياج",
    descFr: "Un maquillage sophistiqué pour vos événements spéciaux et soirées élégantes.",
    descAr: "مكياج متطور لمناسباتك الخاصة وسهراتك الأنيقة."
  },
  { 
    src: "/images/gallery-nails.jpg", 
    altFr: "Manucure artistique", 
    altAr: "مانيكير فني",
    category: "nails",
    categoryFr: "Ongles",
    categoryAr: "أظافر",
    descFr: "Des ongles soignés avec des designs uniques et tendance.",
    descAr: "أظافر أنيقة بتصاميم فريدة وعصرية."
  },
]

const categories = [
  { key: "all", labelFr: "Tout", labelAr: "الكل" },
  { key: "bridal", labelFr: "Mariage", labelAr: "عرس" },
  { key: "coloring", labelFr: "Coloration", labelAr: "صبغة" },
  { key: "styling", labelFr: "Coiffage", labelAr: "تصفيف" },
  { key: "facial", labelFr: "Soins", labelAr: "عناية" },
  { key: "makeup", labelFr: "Maquillage", labelAr: "مكياج" },
  { key: "nails", labelFr: "Ongles", labelAr: "أظافر" },
]

export function Gallery() {
  const { t, language } = useLanguage()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1)
    }
  }, [selectedIndex, filteredImages.length])

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1)
    }
  }, [selectedIndex, filteredImages.length])

  const toggleLike = (index: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, handlePrev, handleNext])

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
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
            Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
              )}
            >
              {language === "ar" ? cat.labelAr : cat.labelFr}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "relative cursor-pointer group overflow-hidden rounded-2xl",
                  index === 0 && filteredImages.length > 4 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                )}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={language === "ar" ? image.altAr : image.altFr}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium mb-2">
                        {language === "ar" ? image.categoryAr : image.categoryFr}
                      </span>
                      <h4 className="text-background font-medium text-sm">
                        {language === "ar" ? image.altAr : image.altFr}
                      </h4>
                    </div>
                    <button 
                      className="p-2 bg-background/20 backdrop-blur-sm rounded-full text-background hover:bg-background/40 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedIndex(index)
                      }}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-sm"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 p-3 bg-background/10 rounded-full text-background hover:bg-background/20 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/10 rounded-full text-background hover:bg-background/20 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/10 rounded-full text-background hover:bg-background/20 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image Container */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl mx-4 flex flex-col lg:flex-row gap-6 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative w-full lg:w-2/3 aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={filteredImages[selectedIndex].src}
                    alt={language === "ar" ? filteredImages[selectedIndex].altAr : filteredImages[selectedIndex].altFr}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Details Panel */}
                <div className="w-full lg:w-1/3 bg-background/10 backdrop-blur-md rounded-2xl p-6 text-background">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-4">
                    {language === "ar" ? filteredImages[selectedIndex].categoryAr : filteredImages[selectedIndex].categoryFr}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    {language === "ar" ? filteredImages[selectedIndex].altAr : filteredImages[selectedIndex].altFr}
                  </h3>
                  <p className="text-background/80 leading-relaxed mb-6">
                    {language === "ar" ? filteredImages[selectedIndex].descAr : filteredImages[selectedIndex].descFr}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(selectedIndex)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
                        likedImages.has(selectedIndex)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/20 text-background hover:bg-background/30"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", likedImages.has(selectedIndex) && "fill-current")} />
                      <span className="text-sm font-medium">
                        {language === "ar" ? "اعجاب" : "J'aime"}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-background/20 text-background rounded-full hover:bg-background/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {language === "ar" ? "مشاركة" : "Partager"}
                      </span>
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                    {filteredImages.map((img, idx) => (
                      <button
                        key={img.src}
                        onClick={() => setSelectedIndex(idx)}
                        className={cn(
                          "relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all",
                          selectedIndex === idx 
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-transparent opacity-100" 
                            : "opacity-50 hover:opacity-80"
                        )}
                      >
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-background text-sm">
                {selectedIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
