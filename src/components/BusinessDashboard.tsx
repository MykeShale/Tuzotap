
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Star, Bell, Settings, MapPin, Calendar } from 'lucide-react';

const BusinessDashboard = () => {
  const [businessName] = useState('Coffee Corner');
  const [ownerName] = useState('Mike Chen');
  const [todayCheckins] = useState(42);
  const [totalCustomers] = useState(1250);
  const [rewardsRedeemed] = useState(23);

  const recentCheckins = [
    { customer: 'Sarah J.', time: '2 mins ago', points: 50, visits: 15 },
    { customer: 'John D.', time: '5 mins ago', points: 50, visits: 8 },
    { customer: 'Emma W.', time: '12 mins ago', points: 50, visits: 22 },
    { customer: 'Alex M.', time: '18 mins ago', points: 50, visits: 3 },
  ];

  const topCustomers = [
    { name: 'Sarah Johnson', visits: 45, totalPoints: 2250, lastVisit: 'Today' },
    { name: 'John Davis', visits: 38, totalPoints: 1900, lastVisit: 'Yesterday' },
    { name: 'Emma Wilson', visits: 32, totalPoints: 1600, lastVisit: '2 days ago' },
  ];

  const rewardSettings = [
    { action: 'Visit Check-in', points: 50, description: 'Points earned per visit' },
    { action: 'Birthday Bonus', points: 200, description: 'Special birthday reward' },
    { action: 'Referral Bonus', points: 100, description: 'For referring new customers' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarImage src="/placeholder-business.jpg" alt={businessName} />
                <AvatarFallback className="bg-white/20 text-white">
                  {businessName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{businessName}</h1>
                <p className="text-white/80">Owner: {ownerName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{todayCheckins}</div>
              <div className="text-sm text-gray-600">Today's Check-ins</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-600 border-green-200">
                +15% from yesterday
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{totalCustomers}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
              <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-600 border-blue-200">
                Active members
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{rewardsRedeemed}</div>
              <div className="text-sm text-gray-600">Rewards Redeemed</div>
              <Badge variant="outline" className="mt-2 bg-orange-50 text-orange-600 border-orange-200">
                This month
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* QR Code and Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>Your Business QR Code</span>
                  </CardTitle>
                  <CardDescription>Customers scan this to check-in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-200 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">QR Code for {businessName}</p>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-primary text-white">
                        Download QR Code
                      </Button>
                      <Button variant="outline" className="w-full">
                        Print QR Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Check-ins</CardTitle>
                  <CardDescription>Latest customer activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentCheckins.map((checkin, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-primary text-white text-xs">
                            {checkin.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{checkin.customer}</p>
                          <p className="text-xs text-gray-600">{checkin.time} • {checkin.visits} visits</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                        +{checkin.points}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Your most loyal customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border hover-lift">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-full text-white font-semibold">
                        {index + 1}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gray-100">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.visits} visits • {customer.totalPoints} points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last visit</p>
                      <p className="font-medium">{customer.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reward Settings</CardTitle>
                <CardDescription>Configure how customers earn points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewardSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <h4 className="font-semibold">{setting.action}</h4>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                        {setting.points} points
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-gradient-primary text-white mt-4">
                  Add New Reward Rule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
                <CardDescription>Manage your business profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Business Information</span>
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Business Name</p>
                        <p className="font-medium">{businessName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium">Café & Coffee Shop</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">123 Main St, Downtown</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Operating Hours</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>7:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>8:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>9:00 AM - 7:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <Button className="bg-gradient-primary text-white">
                    Update Business Info
                  </Button>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
