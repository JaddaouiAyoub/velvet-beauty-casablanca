"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { Instagram, Facebook, Award, Scissors, Sparkles } from "lucide-react"

const teamMembers = [
  { 
    key: "member1", 
    image: "/images/team-1.jpg",
    specialtyIcon: Scissors,
    experienceFr: "12 ans d'expérience",
    experienceAr: "12 سنة من الخبرة",
    specialtiesFr: ["Coupes tendance", "Coiffures de mariage", "Extensions"],
    specialtiesAr: ["قصات عصرية", "تسريحات الزفاف", "وصلات الشعر"],
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  },
  { 
    key: "member2", 
    image: "/images/team-2.jpg",
    specialtyIcon: Sparkles,
    experienceFr: "8 ans d'expérience",
    experienceAr: "8 سنوات من الخبرة",
    specialtiesFr: ["Soins du visage", "Maquillage", "Épilation"],
    specialtiesAr: ["العناية بالبشرة", "المكياج", "إزالة الشعر"],
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  },
  { 
    key: "member3", 
    image: "/images/team-3.jpg",
    specialtyIcon: Award,
    experienceFr: "10 ans d'expérience",
    experienceAr: "10 سنوات من الخبرة",
    specialtiesFr: ["Balayage", "Coloration", "Mèches"],
    specialtiesAr: ["باليآج", "صبغات", "هايلايت"],
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  },
]

export function Team() {
  const { t, language } = useLanguage()

  return (
    <section id="team" className="py-24 bg-background">
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
            {language === "ar" ? "الفريق" : "Équipe"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.team.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.team.subtitle}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={t.team.members[member.key as keyof typeof t.team.members].name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Specialty Icon Badge */}
                <div className="absolute top-4 right-4 p-2 bg-primary/90 rounded-full text-primary-foreground">
                  <member.specialtyIcon className="w-5 h-5" />
                </div>
                
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {/* Experience */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-foreground rounded-full text-xs font-medium">
                      {language === "ar" ? member.experienceAr : member.experienceFr}
                    </span>
                  </div>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(language === "ar" ? member.specialtiesAr : member.specialtiesFr).map((specialty, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-background/20 backdrop-blur-sm text-background text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <motion.a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  {t.team.members[member.key as keyof typeof t.team.members].name}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {t.team.members[member.key as keyof typeof t.team.members].role}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "ar" ? member.experienceAr : member.experienceFr}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground mb-4">
              {language === "ar" 
                ? "هل أنت محترفة في مجال التجميل؟ انضمي إلى فريقنا!"
                : "Vous êtes professionnelle de la beauté ? Rejoignez notre équipe !"
              }
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {language === "ar" ? "تواصلي معنا" : "Contactez-nous"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
