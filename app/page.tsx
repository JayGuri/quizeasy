import { Card, CardContent } from "@/components/ui/card"
import { Brain, Lock, Search, Sparkles, Mail, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <p className="subtitle">Explore our Quizzing Platform</p>
            <h1 className="hero-heading">
              Discover the
              <br />
              Power of Learning
            </h1>
            <p className="subtitle max-w-[700px]">
              Welcome to our Quizzing Platform, where we transform the way you acquire knowledge. Designed with
              accessibility in mind
            </p>
            <Link
              href="/quiz-options"
              className="bg-primary hover:bg-primary/90 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="about">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Personalized Quizzes</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tailored to your needs, our quizzes adapt to your progress, ensuring you master the content at your own
                pace
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Brain className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Unlock Your Potential</h3>
                <p className="text-muted-foreground text-center">
                  By providing personalized feedback and adjusting the difficulty based on your performance
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Inclusive Design</h3>
                <p className="text-muted-foreground text-center">
                  Our platform is designed with accessibility in mind, ensuring that individuals with diverse needs can
                  fully engage
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seamless Exploration</h3>
                <p className="text-muted-foreground text-center">
                  Navigating our platform is a breeze, allowing you to effortlessly access the resources and tools you
                  need
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Comprehensive Support</h3>
                <p className="text-muted-foreground text-center">
                  Our platform offers a comprehensive suite of features and support to enhance your learning experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted" id="contact">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contact Us</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch with our team for support or inquiries
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl grid gap-8 md:grid-cols-3 mt-8">
              <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">quizzeasyy@gmail.com</p>
                  <Button variant="outline" asChild>
                    <a href="mailto:quizzeasyy@gmail.com<">Send Email</a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+91 8879854245</p>
                  <Button variant="outline" asChild>
                    <a href="tel:+15551234567">Call Now</a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="transform transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p className="text-muted-foreground">9AM - 5PM IST</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

