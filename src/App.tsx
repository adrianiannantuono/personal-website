import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-6">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </main>
    </div>
  )
}

export default App
