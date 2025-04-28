import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProjects } from "../services/useGetProjects";
import { Search } from "lucide-react";

export function Home() {
  const { projects } = useGetProjects();
  const [search, setSearch] = useState("");

  // Filtrage des projets selon la recherche
  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(search.toLowerCase()) ||
    project.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-100">
      <div className="w-full max-w-4xl mx-auto px-4 pt-24 pb-12">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          Découvrez les portfolios des élèves
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 text-center"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Bienvenue sur la plateforme qui met en avant les projets, compétences et réalisations des étudiants de l'école. Explorez, recherchez et soutenez la créativité de nos talents !
        </motion.p>
        <div className="flex gap-2 w-full max-w-lg mx-auto mb-12 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <Input 
            placeholder="Rechercher un projet par nom ou description..." 
            className="flex-1 pl-10 py-3 rounded-full border-2 border-blue-200 focus:border-pink-400 shadow-sm transition" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <section className="w-full max-w-3xl mx-auto">
          {search.trim() ? (
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      key={project.id || idx}
                      className="rounded-2xl shadow-lg hover:shadow-2xl transition bg-white overflow-hidden group border border-gray-100"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                    >
                      {project.image && project.image[0] && (
                        <div className="h-40 w-full overflow-hidden">
                          <img src={project.image[0].url} alt={project.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <CardContent className="p-5 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          {project.categoryDetails && project.categoryDetails[0] && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              {project.categoryDetails[0].category_name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-1 text-pink-700 group-hover:underline">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                          {project.description}
                        </p>
                      </CardContent>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="text-gray-500 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Aucun projet ne correspond à votre recherche.
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="text-gray-400 mt-8 text-center">Utilisez la barre de recherche pour trouver un projet.</div>
          )}
        </section>
      </div>
    </main>
  );
}