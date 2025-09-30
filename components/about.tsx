import { Card } from "@/components/ui/card"
import { Globe, Cloud, Award } from "lucide-react"

export function About() {
  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">About Me</h2>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-foreground/90 leading-relaxed">
            I'm a Cloud Specialist with extensive experience across all major cloud platforms. My journey in technology
            spans from banking to software engineering, and now to cloud infrastructure, giving me a unique perspective
            on how technology drives business transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Multilingual</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fluent in Korean, Japanese, and English, enabling seamless communication across global teams.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Cloud className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Multi-Cloud Expert</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hands-on experience with Azure, GCP, and AWS, providing comprehensive cloud solutions.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Certified Professional</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multiple GCP certifications and actively working with Azure in production environments.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
