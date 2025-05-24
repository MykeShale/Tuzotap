
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QrCode, Star, Bell, MapPin, Settings } from 'lucide-react';

const CustomerDashboard = () => {
  const [totalPoints] = useState(1247);
  const [userName] = useState('Sarah Johnson');

  const recentActivity = [
    { business: 'Coffee Corner', points: 50, date: 'Today', action: 'Check-in' },
    { business: 'Fresh Cuts Salon', points: 100, date: 'Yesterday', action: 'Visit' },
    { business: 'Mario\'s Pizza', points: 75, date: '2 days ago', action: 'Check-in' },
  ];

  const availableRewards = [
    { business: 'Coffee Corner', reward: 'Free Coffee', pointsNeeded: 100, currentPoints: 150, id: 1 },
    { business: 'Fresh Cuts Salon', reward: 'Free Haircut', pointsNeeded: 500, currentPoints: 350, id: 2 },
    { business: 'Mario\'s Pizza', reward: 'Free Pizza', pointsNeeded: 300, currentPoints: 275, id: 3 },
  ];

  const nearbyBusinesses = [
    { name: 'Coffee Corner', category: 'Café', distance: '0.2 km', points: '50 pts/visit' },
    { name: 'Fresh Cuts Salon', category: 'Beauty', distance: '0.5 km', points: '100 pts/visit' },
    { name: 'Mario\'s Pizza', category: 'Restaurant', distance: '0.8 km', points: '75 pts/visit' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                <AvatarFallback className="bg-white/20 text-white">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Welcome back, {userName.split(' ')[0]}!</h1>
                <p className="text-white/80">You have {totalPoints} points</p>
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

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover-lift cursor-pointer tap-animation">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Scan QR</h3>
                <p className="text-sm text-gray-600">Check-in and earn points</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer tap-animation">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Find Places</h3>
                <p className="text-sm text-gray-600">Discover nearby businesses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Points Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-orange-500" />
              <span>Your Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold gradient-text">{totalPoints}</div>
              <p className="text-gray-600">Total Points Earned</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-teal-600">12</div>
                  <div className="text-sm text-gray-500">Businesses Visited</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-orange-600">5</div>
                  <div className="text-sm text-gray-500">Rewards Claimed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-pink-600">3</div>
                  <div className="text-sm text-gray-500">Available Rewards</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Rewards you can claim now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover-lift">
                <div className="flex-1">
                  <h4 className="font-semibold">{reward.reward}</h4>
                  <p className="text-sm text-gray-600">{reward.business}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{reward.currentPoints} / {reward.pointsNeeded} points</span>
                      <span>{Math.round((reward.currentPoints / reward.pointsNeeded) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(reward.currentPoints / reward.pointsNeeded) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  {reward.currentPoints >= reward.pointsNeeded ? (
                    <Button className="bg-gradient-primary text-white tap-animation">
                      Claim Now
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      {reward.pointsNeeded - reward.currentPoints} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.business}</p>
                    <p className="text-sm text-gray-600">{activity.action} • {activity.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  +{activity.points} pts
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nearby Businesses */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Businesses</CardTitle>
            <CardDescription>Participating businesses near you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyBusinesses.map((business, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover-lift cursor-pointer tap-animation">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{business.name}</p>
                    <p className="text-sm text-gray-600">{business.category} • {business.distance}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                  {business.points}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
