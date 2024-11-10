'use client'

import React, { useState, useEffect, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, Brain, Zap, Trophy, Users, PlusCircle, Settings, ChevronRight } from 'lucide-react'

const focusEnergyData = [
  { name: 'Mon', focus: 4, energy: 3 },
  { name: 'Tue', focus: 3, energy: 4 },
  { name: 'Wed', focus: 5, energy: 4 },
  { name: 'Thu', focus: 2, energy: 3 },
  { name: 'Fri', focus: 4, energy: 5 },
  { name: 'Sat', focus: 3, energy: 2 },
  { name: 'Sun', focus: 4, energy: 3 },
]

const progressData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 50 },
  { name: 'Week 4', progress: 65 },
]

const DreamyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0
    const colors = ['#E6E6FA', '#FFF0F5', '#E0FFFF'] // Lavender, LavenderBlush, LightCyan

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i]
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin((x + i * 100 + time) / 100) * 50 + canvas.height / 2
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

export function AdhdProductivityLoginApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starRef = useRef<HTMLDivElement>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [visibilityOption, setVisibilityOption] = useState('anonymous')
  const [showTotalPoints, setShowTotalPoints] = useState(true)
  const [selectedPersonalization, setSelectedPersonalization] = useState('')
  const [showCongratulations, setShowCongratulations] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const meteors: { x: number; y: number; size: number; speed: number; tail: number[] }[] = []
    for (let i = 0; i < 20; i++) {
      meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 3 + 1,
        tail: []
      })
    }

    let hue = 0
    const drawMeteors = () => {
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      meteors.forEach(meteor => {
        ctx.beginPath()
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - 20, meteor.y + 20)
        gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`)
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = meteor.size
        ctx.moveTo(meteor.x, meteor.y)
        ctx.lineTo(meteor.x - 20, meteor.y + 20)
        ctx.stroke()
        meteor.x += meteor.speed
        meteor.y -= meteor.speed
        if (meteor.x > canvas.width || meteor.y < 0) {
          meteor.x = Math.random() * canvas.width
          meteor.y = canvas.height + Math.random() * 100
        }
      })
      hue = (hue + 1) % 360
    }

    const animate = () => {
      drawMeteors()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    if (starRef.current) {
      starRef.current.style.left = `${e.clientX}px`
      starRef.current.style.top = `${e.clientY}px`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating login process
    setTimeout(() => {
      setIsLoading(false)
      setIsLoggedIn(true)
    }, 2000)
  }

  const handlePersonalizationSelect = (option: string) => {
    setSelectedPersonalization(option)
    // Simulating a delay before showing congratulations
    setTimeout(() => {
      setShowCongratulations(true)
      setTimeout(() => setShowCongratulations(false), 3000)
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      <DreamyBackground />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      <div 
        ref={starRef} 
        className="absolute w-5 h-5 pointer-events-none z-20"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.1s, top 0.1s',
        }}
      >
        <svg viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5 0L31.4251 18.3647H50.7553L35.1651 29.7205L41.0902 48.0853L25.5 36.7295L9.90983 48.0853L15.8349 29.7205L0.244717 18.3647H19.5749L25.5 0Z" fill="gold"/>
        </svg>
      </div>
      {!isLoggedIn ? (
        <Card className="w-96 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0 shadow-xl z-30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-black">Welcome to Dreamland</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white bg-opacity-20 text-black placeholder-gray-600 border-0 focus:ring-2 focus:ring-purple-400 transition-all"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  className="bg-white bg-opacity-20 text-black placeholder-gray-600 border-0 focus:ring-2 focus:ring-purple-400 transition-all"
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white text-purple-600 hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-black hover:text-purple-800 underline underline-offset-2 transition-colors">Forgot password?</a>
              <span className="mx-2 text-black">|</span>
              <a href="#" className="text-black hover:text-purple-800 underline underline-offset-2 transition-colors">Register</a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8 relative z-10 p-8">
          <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-black">Welcome to Your Productivity Galaxy!</CardTitle>
              <CardDescription className="text-gray-700">Customize your experience and track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge variant="secondary" className="text-lg py-1 px-3 bg-white bg-opacity-20 text-black">Ability Awakener Galaxy</Badge>
                <Button className="bg-white bg-opacity-20 text-black hover:bg-opacity-30"><Rocket className="mr-2 h-4 w-4" /> Set Daily Goal</Button>
                <Button variant="outline" className="border-black border-opacity-50 text-black hover:bg-white hover:bg-opacity-10"><Brain className="mr-2 h-4 w-4" /> View Achievements</Button>
              </div>
              
              <Tabs defaultValue="personalization" className="w-full">
                <TabsList className="bg-white bg-opacity-20">
                  <TabsTrigger value="personalization" className="text-black data-[state=active]:bg-white data-[state=active]:bg-opacity-30">Personalization</TabsTrigger>
                  <TabsTrigger value="privacy" className="text-black data-[state=active]:bg-white data-[state=active]:bg-opacity-30">Privacy Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="personalization">
                  <div className="grid gap-4">
                    <h3 className="text-lg font-semibold text-black">Choose Your Reading Style</h3>
                    <div className="flex gap-4">
                      <Button onClick={() => handlePersonalizationSelect('dime')} variant={selectedPersonalization === 'dime' ? 'default' : 'outline'}>Dime</Button>
                      <Button onClick={() => handlePersonalizationSelect('highlight')} variant={selectedPersonalization === 'highlight' ? 'default' : 'outline'}>Highlight</Button>
                      <Button onClick={() => handlePersonalizationSelect('summarize')} variant={selectedPersonalization === 'summarize' ? 'default' : 'outline'}>Summarize</Button>
                    </div>
                    {selectedPersonalization && (
                      <Card>
                        <CardContent className="pt-6">
                          <p className="mb-2 text-black">Preview:</p>
                          {selectedPersonalization === 'dime' && (
                            <p className="text-black">To be, or not to be, <span className="text-blue-600 transition-opacity duration-1000 opacity-100">that is the question</span>...</p>
                          )}
                          {selectedPersonalization === 'highlight' && (
                            <p className="text-black">To be, or not to be, <span className="bg-yellow-200">that is the question</span>...</p>
                          )}
                          {selectedPersonalization === 'summarize' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-black">Original</h4>
                                <p className="text-black">To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them...</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-black">Summary</h4>
                                <p className="text-black">Hamlet contemplates the value of life versus death, questioning whether it's better to face life's hardships or to end them through death.</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                </Card>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="privacy">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility" className="text-black">Leaderboard Visibility</Label>
                      <Select onValueChange={setVisibilityOption} defaultValue={visibilityOption}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hidden">Hidden</SelectItem>
                          <SelectItem value="anonymous">Anonymous</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-total-points"
                        checked={showTotalPoints}
                        onCheckedChange={setShowTotalPoints}
                      />
                      <Label htmlFor="show-total-points" className="text-black">Show Total Points</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {showCongratulations && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-bold mb-4 text-black">Congratulations!</h2>
                <p className="text-black">Your personalization has been saved.</p>
              </div>
            </div>
          )}

          <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black">Insight & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="focus-energy">
                <TabsList>
                  <TabsTrigger value="focus-energy">Focus & Energy</TabsTrigger>
                  <TabsTrigger value="task-completion">Task Completion</TabsTrigger>
                  <TabsTrigger value="progress">Progress Trajectory</TabsTrigger>
                </TabsList>
                <TabsContent value="focus-energy">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={focusEnergyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="focus" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="energy" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4">
                    <h4 className="font-semibold text-black">AI Insights</h4>
                    <p className="text-black">Your focus peaks on Wednesdays. Consider scheduling important tasks for this day.</p>
                  </div>
                </TabsContent>
                <TabsContent value="task-completion">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center">
                        <div className="font-semibold text-black">{day}</div>
                        <div className={`h-20 ${Math.random() > 0.5 ? 'bg-green-200' : 'bg-green-400'} rounded`}></div>
                      </div>
                    ))}
                  </div>
                  <p className="text-black">Task completion heat map: Darker colors indicate higher productivity.</p>
                </TabsContent>
                <TabsContent value="progress">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="progress" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline" className="text-lg py-1 px-3 text-black">Current Level: Ability Awakener</Badge>
                    <Button size="sm">View Milestones <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {visibilityOption !== 'hidden' && (
            <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">Ability Awakener Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-black"><Trophy className="mr-2 h-4 w-4 text-yellow-500" /> {visibilityOption === 'public' ? 'SpaceCaptain' : 'User1'}</span>
                    {showTotalPoints && <Badge>4500 pts</Badge>}
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-black"><Zap className="mr-2 h-4 w-4 text-blue-500" /> {visibilityOption === 'public' ? 'FocusMaster' : 'User2'}</span>
                    {showTotalPoints && <Badge>4200 pts</Badge>}
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-black"><Brain className="mr-2 h-4 w-4 text-green-500" /> {visibilityOption === 'public' ? 'CreativeGenius' : 'User3'}</span>
                    {showTotalPoints && <Badge>3800 pts</Badge>}
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="join">
                <TabsList>
                  <TabsTrigger value="join">Join Groups</TabsTrigger>
                  <TabsTrigger value="create">Create Group</TabsTrigger>
                  <TabsTrigger value="manage">My Groups</TabsTrigger>
                </TabsList>
                <TabsContent value="join">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="text-black">Focus Builders</span>
                      <Button size="sm">Join</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-black">Creative Burst</span>
                      <Button size="sm">Join</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-black">Productivity Ninjas</span>
                      <Button size="sm">Join</Button>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="create">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="group-name" className="text-black">Group Name</Label>
                      <Input id="group-name" placeholder="Enter group name" />
                    </div>
                    <div>
                      <Label htmlFor="group-description" className="text-black">Description</Label>
                      <Input id="group-description" placeholder="Describe your group" />
                    </div>
                    <Button type="submit">Create Group</Button>
                  </form>
                </TabsContent>
                <TabsContent value="manage">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="text-black">ADHD Warriors</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-black">Time Hackers</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle ${isLoading ? '100%' : '0%'} at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)`,
          opacity: isLoading ? 1 : 0,
        }}
      />
    </div>
  )
}