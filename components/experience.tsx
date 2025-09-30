import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    period: "Present",
    company: "Microsoft",
    role: "Technical Support Engineer",
    description:
      "Providing technical support for Azure cloud services, helping enterprise customers optimize their cloud infrastructure and resolve complex technical challenges.",
    skills: ["Azure", "Cloud Architecture", "Technical Support", "Customer Success"],
  },
  {
    period: "2020 - 2024",
    company: "EPAM Systems",
    role: "Senior System Engineer",
    description:
      "Led cloud infrastructure projects and provided cloud support engineering across multiple platforms. Designed and implemented scalable cloud solutions for enterprise clients.",
    skills: ["AWS", "GCP", "Azure", "System Design", "DevOps"],
  },
  {
    period: "2018 - 2020",
    company: "EPAM Systems",
    role: "Cloud Support Engineer",
    description:
      "Supported cloud infrastructure operations and helped clients migrate to cloud platforms. Developed automation tools and maintained cloud environments.",
    skills: ["Cloud Migration", "Infrastructure", "Automation", "Monitoring"],
  },
  {
    period: "2016 - 2018",
    company: "UZEN Japan",
    role: "Java Software Engineer",
    description:
      "Developed enterprise Java applications and contributed to full-stack development projects in the Japanese market.",
    skills: ["Java", "Spring Framework", "Backend Development", "API Design"],
  },
  {
    period: "2014 - 2016",
    company: "IBM Korea",
    role: "Java Software Engineer",
    description:
      "Built enterprise software solutions using Java technologies. Collaborated with international teams on large-scale projects.",
    skills: ["Java", "Enterprise Software", "Agile", "Team Collaboration"],
  },
  {
    period: "2012 - 2014",
    company: "Industrial Bank of Korea",
    role: "Bank Officer",
    description:
      "Managed banking operations and customer relationships, developing strong business acumen and customer service skills.",
    skills: ["Financial Services", "Customer Relations", "Operations", "Business Analysis"],
  },
]

export function Experience() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">Career Journey</h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-lg text-muted-foreground">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground md:text-right">{exp.period}</div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
