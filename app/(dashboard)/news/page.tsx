"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Calendar, Share2, BookmarkPlus, ExternalLink, ChevronRight, Filter } from "lucide-react"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  // Mock news data
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "New Early Warning System Deployed in Western Ghats",
      summary:
        "The Disaster Management Authority has deployed a new AI-powered early warning system for landslides in the Western Ghats region.",
      content: `<p>The Disaster Management Authority has successfully deployed a new AI-powered early warning system for landslides in the Western Ghats region. This state-of-the-art system uses a combination of rainfall data, soil moisture sensors, and geological assessments to predict potential landslides up to 72 hours in advance.</p>
      <p>The system has been installed at 24 critical locations across the Western Ghats, covering high-risk areas in Kerala, Karnataka, and Tamil Nadu. Officials expect this new technology to significantly improve response times and potentially save hundreds of lives during the monsoon season.</p>
      <p>"This is a major step forward in our disaster preparedness efforts," said Dr. Rajesh Kumar, Director of the Disaster Management Authority. "The early warning system gives us the crucial time needed to evacuate residents from danger zones before a landslide occurs."</p>
      <p>Local communities have already been trained on how to respond to alerts from the new system, with regular drills scheduled throughout the year. The technology will be continuously monitored and improved based on performance data collected during the upcoming monsoon season.</p>`,
      category: "technology",
      author: "Priya Sharma",
      authorRole: "Science Correspondent",
      publishedAt: "2025-03-05T10:30:00Z",
      readTime: "4 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Kerala Science Journal",
      featured: true,
    },
    {
      id: 2,
      title: "Government Allocates ₹500 Crore for Landslide Prevention",
      summary:
        "The central government has allocated ₹500 crore for landslide prevention and mitigation measures in high-risk areas.",
      content: `<p>In a significant move to address the growing threat of landslides in mountainous regions, the central government has allocated ₹500 crore for prevention and mitigation measures. The funds will be primarily directed toward the states of Kerala, Uttarakhand, Himachal Pradesh, and the northeastern states, which have experienced devastating landslides in recent years.</p>
      <p>The allocation, announced by the Finance Minister during the budget presentation, will support various initiatives including slope stabilization projects, drainage improvement, retaining wall construction, and the implementation of early warning systems.</p>
      <p>"This funding represents our commitment to protecting vulnerable communities from natural disasters," said the Minister for Disaster Management. "We are taking a proactive approach rather than simply responding after tragedies occur."</p>
      <p>Local authorities will work with geological experts to identify the most critical areas for intervention. The projects are expected to begin implementation within the next three months, before the onset of the monsoon season.</p>
      <p>Environmental experts have welcomed the move but emphasized the need for sustainable approaches that work with natural systems rather than against them. "We need to ensure these funds are used for solutions that don't create new problems down the line," said Dr. Meena Rawat, an environmental scientist specializing in Himalayan ecology.</p>`,
      category: "government",
      author: "Rahul Desai",
      authorRole: "Political Correspondent",
      publishedAt: "2025-03-02T14:15:00Z",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "National Herald",
      featured: true,
    },
    {
      id: 3,
      title: "Research Shows Deforestation Increasing Landslide Risk by 40%",
      summary:
        "A new study by the Environmental Research Institute reveals that deforestation has increased landslide risk by 40% in certain regions.",
      content: `<p>A comprehensive study conducted by the Environmental Research Institute has found that deforestation has increased landslide risk by approximately 40% in several mountainous regions across India. The research, which analyzed data from the past 15 years, establishes a clear correlation between forest cover loss and landslide frequency.</p>
      <p>The study focused on areas in the Western Ghats and Himalayan regions, comparing satellite imagery of forest cover with historical landslide data. Researchers found that areas that lost more than 30% of their forest cover experienced a dramatic increase in landslide events during monsoon seasons.</p>
      <p>"Trees play a crucial role in binding soil and regulating water flow on slopes," explained Dr. Ananya Sen, lead researcher on the project. "When we remove this natural protection, we're essentially destabilizing entire hillsides."</p>
      <p>The findings have significant implications for land use policies and disaster management strategies. The researchers recommend implementing stricter controls on deforestation in high-risk areas and initiating large-scale reforestation projects to mitigate landslide risks.</p>
      <p>Local environmental activists have cited the study in their ongoing campaigns against illegal logging and mining operations in ecologically sensitive areas. "This research confirms what we've been saying for years," said Vijay Prakash of the Forest Protection Coalition. "We cannot separate environmental protection from disaster prevention."</p>`,
      category: "research",
      author: "Dr. Ananya Sen",
      authorRole: "Environmental Scientist",
      publishedAt: "2025-02-28T09:45:00Z",
      readTime: "6 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Environmental Research Institute",
      featured: false,
    },
    {
      id: 4,
      title: "Landslide Safety Workshop for Schools Launched",
      summary:
        "A new educational program teaching landslide safety to school children has been launched in five districts.",
      content: `<p>A new educational program aimed at teaching landslide safety to school children has been launched in five districts identified as high-risk zones. The initiative, developed by the Disaster Management Authority in collaboration with the Education Department, will reach over 200 schools and approximately 50,000 students in its first phase.</p>
      <p>The program includes interactive workshops, educational videos, and practical drills designed to help children understand warning signs of landslides and appropriate safety measures. Teachers will also receive specialized training to incorporate disaster preparedness into their regular curriculum.</p>
      <p>"Children are often the most vulnerable during disasters, but they can also be powerful agents of change in their communities," said Lakshmi Nair, Education Coordinator for the program. "When children learn about disaster preparedness, they take that knowledge home to their families."</p>
      <p>The workshops cover topics such as recognizing early warning signs of landslides, creating family emergency plans, and understanding evacuation procedures. Students will also participate in mock drills to practice their response to emergency situations.</p>
      <p>Initial feedback from participating schools has been overwhelmingly positive, with teachers reporting high levels of engagement from students. The program is scheduled to expand to an additional ten districts by the end of the year.</p>`,
      category: "education",
      author: "Lakshmi Nair",
      authorRole: "Education Coordinator",
      publishedAt: "2025-02-25T11:20:00Z",
      readTime: "4 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Education Times",
      featured: false,
    },
    {
      id: 5,
      title: "Darjeeling Landslide: Rescue Operations Complete, 15 Rescued",
      summary:
        "Rescue operations have concluded after the recent landslide in Darjeeling, with 15 people successfully rescued from affected areas.",
      content: `<p>Rescue operations have successfully concluded following the recent landslide in Darjeeling, West Bengal, with 15 people rescued from affected areas. The landslide, triggered by heavy rainfall last week, had damaged several buildings and blocked key roads in the popular tourist destination.</p>
      <p>National Disaster Response Force (NDRF) teams, along with local police and fire services, worked tirelessly for three days to locate and rescue individuals trapped by the disaster. Specialized equipment, including thermal imaging cameras and rescue dogs, was deployed to locate survivors under the debris.</p>
      <p>"This was a challenging operation due to the continuing rainfall and unstable terrain," said Commander Suresh of the NDRF. "But thanks to the coordinated efforts of all agencies involved, we were able to reach everyone in time."</p>
      <p>Local authorities have now shifted focus to rehabilitation efforts and clearing blocked roads. Temporary shelters have been established for displaced residents, and engineers are assessing structural damage to buildings in the affected area.</p>
      <p>Meteorological officials warn that the region remains at risk for additional landslides as the monsoon season continues. Residents in high-risk areas have been advised to remain vigilant and follow safety guidelines issued by the district administration.</p>`,
      category: "incident",
      author: "Mohammed Ibrahim",
      authorRole: "Field Reporter",
      publishedAt: "2025-02-20T16:40:00Z",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Kerala Daily",
      featured: false,
    },
    {
      id: 6,
      title: "New Mobile App Helps Citizens Report Landslide Risks",
      summary:
        "The Geological Survey of India has launched a new mobile application that allows citizens to report potential landslide risks in their areas.",
      content: `<p>The Geological Survey of India (GSI) has launched a new mobile application that enables citizens to report potential landslide risks in their areas. The app, named "LandslideWatch," aims to harness crowdsourced data to improve early detection of landslide-prone conditions.</p>
      <p>Users can submit reports of concerning signs such as unusual land movements, cracks in hillsides, or changes in water drainage patterns. Each submission is geotagged and includes options to upload photos and provide detailed descriptions. GSI officials review these reports and dispatch field teams to investigate high-priority concerns.</p>
      <p>"This app transforms every citizen into a potential contributor to our landslide monitoring network," said Dr. Vikram Mathur, Director of GSI's Landslide Studies Division. "It significantly expands our monitoring capabilities, especially in remote areas where we don't have permanent monitoring stations."</p>
      <p>The application also provides educational resources about landslide risks and safety measures. Users receive notifications about landslide warnings in their registered areas and can access evacuation routes and emergency contact information.</p>
      <p>Since its launch two weeks ago, the app has already received over 5,000 downloads and 120 reports from users across various states. GSI officials have confirmed that several of these reports have led to the identification of previously unknown risk areas.</p>`,
      category: "technology",
      author: "Tanya Khanna",
      authorRole: "Tech Correspondent",
      publishedAt: "2025-02-15T13:10:00Z",
      readTime: "4 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Tech Today",
      featured: false,
    },
    {
      id: 7,
      title: "International Conference on Landslide Risk Management to be Held in Kochi",
      summary:
        "Kochi will host an international conference on landslide risk management next month, bringing together experts from 15 countries.",
      content: `<p>Kochi is set to host a major international conference on landslide risk management next month, bringing together experts from 15 countries. The three-day event, organized by the National Institute of Disaster Management in collaboration with the International Consortium on Landslides, will focus on innovative approaches to landslide prediction, prevention, and mitigation.</p>
      <p>The conference will feature keynote addresses from leading geologists and disaster management specialists, along with panel discussions, technical sessions, and field visits to landslide-affected areas in Kerala. Participants will share research findings, case studies, and best practices from around the world.</p>
      <p>"This conference comes at a critical time when many regions are experiencing increased landslide activity due to climate change and human interventions," said Professor James Chen from the International Consortium on Landslides. "The exchange of knowledge and expertise will benefit all participating countries."</p>
      <p>A special session will be dedicated to indigenous and traditional knowledge about land management that has helped certain communities mitigate landslide risks for generations. The conference will also showcase new technologies for landslide monitoring and early warning systems.</p>
      <p>Local authorities view the conference as an opportunity to gain valuable insights for addressing the recurring landslide challenges in the Western Ghats region. "We hope to adapt some of the global best practices to our local context," said the Kerala State Disaster Management Authority chairperson.</p>`,
      category: "events",
      author: "Sanjay Menon",
      authorRole: "Events Correspondent",
      publishedAt: "2025-02-10T08:30:00Z",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Conference Bulletin",
      featured: false,
    },
    {
      id: 8,
      title: "Climate Change Increasing Frequency of Landslides, Study Finds",
      summary:
        "A new climate study indicates that changing rainfall patterns due to climate change are increasing the frequency and intensity of landslides in mountainous regions.",
      content: `<p>A comprehensive new study published in the Journal of Climate Science has found that changing rainfall patterns due to climate change are significantly increasing both the frequency and intensity of landslides in mountainous regions across South Asia. The research, which analyzed data from the past three decades, shows a 27% increase in landslide events correlating with changes in precipitation patterns.</p>
      <p>The study highlights that while the total annual rainfall in many regions hasn't necessarily increased, the pattern of rainfall has changed dramatically. "We're seeing more intense, concentrated rainfall events rather than distributed precipitation," explained Dr. Kavita Patel, the study's lead author. "This creates ideal conditions for triggering landslides, as the ground doesn't have time to absorb the water gradually."</p>
      <p>Particularly concerning is the finding that landslides are now occurring in areas that historically had low landslide risk. The researchers attribute this to a combination of altered rainfall patterns and land use changes, creating new vulnerability zones that local disaster management authorities may not be monitoring closely.</p>
      <p>The study projects that without significant climate mitigation efforts, landslide frequency could increase by an additional 40-60% by 2050 in the most vulnerable regions. The researchers recommend integrating climate change projections into landslide risk assessments and developing more robust early warning systems that account for changing precipitation patterns.</p>
      <p>"This isn't just an environmental issue—it's a major public safety concern," said Dr. Patel. "Communities that have never had to worry about landslides before may now be at risk, and they need to be informed and prepared."</p>`,
      category: "climate",
      author: "Dr. Kavita Patel",
      authorRole: "Climate Scientist",
      publishedAt: "2025-02-05T10:15:00Z",
      readTime: "7 min read",
      imageUrl: "/placeholder.svg?height=400&width=600",
      source: "Journal of Climate Science",
      featured: false,
    },
  ]

  // Filter articles based on search query and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === "all" || article.category === activeTab
    return matchesSearch && matchesCategory
  })

  // Get featured articles
  const featuredArticles = newsArticles.filter((article) => article.featured)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">News & Updates</h1>
        <p className="text-muted-foreground">
          Stay informed with the latest news, research, and updates about landslide management
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="technology">Technology</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="incident">Incidents</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected article view */}
          {selectedArticle ? (
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[200px] sm:h-[300px] w-full">
                  <img
                    src={selectedArticle.imageUrl || "/placeholder.svg"}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <Button
                    variant="ghost"
                    className="mb-4 pl-0 text-muted-foreground"
                    onClick={() => setSelectedArticle(null)}
                  >
                    ← Back to all news
                  </Button>

                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {selectedArticle.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{formatDate(selectedArticle.publishedAt)}</span>
                    <span className="text-sm text-muted-foreground">• {selectedArticle.readTime}</span>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold">{selectedArticle.title}</h2>

                  <div className="mb-6 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{selectedArticle.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedArticle.author}</p>
                      <p className="text-sm text-muted-foreground">{selectedArticle.authorRole}</p>
                    </div>
                  </div>

                  <div
                    className="prose prose-sm max-w-none dark:prose-invert sm:prose-base"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />

                  <div className="mt-8 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Source: {selectedArticle.source}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookmarkPlus className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Featured articles */}
              {featuredArticles.length > 0 && searchQuery === "" && activeTab === "all" && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">Featured News</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {featuredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <div className="relative h-[200px] w-full">
                          <img
                            src={article.imageUrl || "/placeholder.svg"}
                            alt={article.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                          </div>
                        </div>
                        <CardHeader className="p-4 pb-0">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {article.category}
                            </Badge>
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <CardTitle className="mt-2 line-clamp-2">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <CardDescription className="line-clamp-2">{article.summary}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{article.author[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{article.author}</span>
                          </div>
                          <Button
                            variant="ghost"
                            className="p-0 h-auto font-medium"
                            onClick={() => setSelectedArticle(article)}
                          >
                            Read More <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All articles */}
              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  {searchQuery
                    ? "Search Results"
                    : activeTab === "all"
                      ? "Latest News"
                      : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} News`}
                </h2>

                {filteredArticles.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No articles found</p>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-[150px] sm:h-auto sm:w-[200px]">
                            <img
                              src={article.imageUrl || "/placeholder.svg"}
                              alt={article.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="capitalize">
                                {article.category}
                              </Badge>
                              <span>{formatDate(article.publishedAt)}</span>
                              <span>• {article.readTime}</span>
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-xl font-semibold">{article.title}</h3>
                            <p className="mb-4 line-clamp-2 text-muted-foreground">{article.summary}</p>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{article.author[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{article.author}</span>
                              </div>
                              <Button
                                variant="ghost"
                                className="p-0 h-auto font-medium"
                                onClick={() => setSelectedArticle(article)}
                              >
                                Read More <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        {!selectedArticle && (
          <div className="w-full md:w-[300px] space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <Button
                    variant={activeTab === "all" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeTab === "technology" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("technology")}
                  >
                    Technology
                  </Button>
                  <Button
                    variant={activeTab === "research" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("research")}
                  >
                    Research
                  </Button>
                  <Button
                    variant={activeTab === "government" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("government")}
                  >
                    Government
                  </Button>
                  <Button
                    variant={activeTab === "education" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("education")}
                  >
                    Education
                  </Button>
                  <Button
                    variant={activeTab === "incident" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("incident")}
                  >
                    Incidents
                  </Button>
                  <Button
                    variant={activeTab === "events" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("events")}
                  >
                    Events
                  </Button>
                  <Button
                    variant={activeTab === "climate" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveTab("climate")}
                  >
                    Climate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-0 p-4">
                    {newsArticles
                      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                      .slice(0, 5)
                      .map((article, index) => (
                        <div key={article.id}>
                          <div className="py-3">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(article.publishedAt)}</span>
                            </div>
                            <h4
                              className="line-clamp-2 font-medium hover:text-primary cursor-pointer"
                              onClick={() => setSelectedArticle(article)}
                            >
                              {article.title}
                            </h4>
                          </div>
                          {index < 4 && <Separator />}
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Geological Survey of India
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      National Disaster Management Authority
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Meteorological Department
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Landslide Research Journal
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Type definition for news articles
interface NewsArticle {
  id: number
  title: string
  summary: string
  content: string
  category: string
  author: string
  authorRole: string
  publishedAt: string
  readTime: string
  imageUrl: string
  source: string
  featured: boolean
}

