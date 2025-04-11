import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Home() {
  return (
    <main className="min-h-screen p-8 text-center flex flex-col items-center justify-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Découvrez les portfolios des élèves
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 max-w-xl mb-6"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Bienvenue sur notre plateforme dédiée aux projets et réalisations des étudiants de notre école. Explorez, aimez et soutenez leur créativité !
      </motion.p>
      <div className="flex gap-2 w-full max-w-md mb-12">
        <Input placeholder="Entrez votre email pour vous inscrire" className="flex-1" />
        <Button>Inscription</Button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {[1, 2, 3].map((id) => (
          <Card key={id} className="rounded-2xl shadow-md hover:shadow-xl transition">
            <CardContent className="p-4 text-left">
              <h3 className="text-xl font-semibold mb-2">Projet Étudiant #{id}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Une brève description du projet réalisé par un élève, mettant en avant sa créativité et ses compétences.
              </p>
              <Button variant="outline" className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-500" /> Aimer
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}