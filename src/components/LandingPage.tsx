import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Star, MapPin, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('customer');

  const features = [
    {
      icon: QrCode,
      title: 'Quick Check-ins',
      description: 'Scan QR codes or use check-in codes for instant points'
    },
    {
      icon: Star,
      title: 'Earn Rewards',
      description: 'Collect points and unlock amazing rewards at your favorite spots'
    },
    {
      icon: MapPin,
      title: 'Find Businesses',
      description: 'Discover participating local businesses near you'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified about new rewards and special offers'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge variant="outline" className="mx-auto bg-white/80 text-orange-600 border-orange-200">
              🎉 Launching Soon
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
              TuzoTap
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The beautiful loyalty rewards app that helps local businesses 
              <span className="gradient-text font-semibold"> connect with their community</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-lg hover-lift tap-animation px-8 py-3 text-lg"
                >
                  Get Started as Customer
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 hover-lift tap-animation px-8 py-3 text-lg"
                >
                  Join as Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Two Apps, One Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're a customer looking for rewards or a business owner wanting to build loyalty, we've got you covered.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'customer' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('customer')}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeTab === 'customer' 
                    ? 'bg-gradient-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                For Customers
              </Button>
              <Button
                variant={activeTab === 'business' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('business')}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeTab === 'business' 
                    ? 'bg-gradient-primary text-white shadow-md' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                For Businesses
              </Button>
            </div>
          </div>
        </div>

        {/* App Preview Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Customer App Preview */}
          <Card className={`glass-card hover-lift transition-all duration-500 ${
            activeTab === 'customer' ? 'animate-scale-in' : 'opacity-50'
          }`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl gradient-text">Customer App</CardTitle>
              <CardDescription className="text-lg">
                Earn points, unlock rewards, discover local gems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-inner">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Quick Scan</p>
                      <p className="text-sm text-gray-500">Tap to check-in</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-teal-700">Your Points</p>
                        <p className="text-2xl font-bold text-teal-600">1,247</p>
                      </div>
                      <Star className="w-8 h-8 text-teal-500 animate-bounce-gentle" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business App Preview */}
          <Card className={`glass-card hover-lift transition-all duration-500 ${
            activeTab === 'business' ? 'animate-scale-in' : 'opacity-50'
          }`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl gradient-text">Business Dashboard</CardTitle>
              <CardDescription className="text-lg">
                Manage rewards, track customers, grow your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-inner">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Dashboard</p>
                      <p className="text-sm text-gray-500">Manage everything</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-orange-700">Today's Check-ins</p>
                        <p className="text-2xl font-bold text-orange-600">42</p>
                      </div>
                      <Bell className="w-8 h-8 text-orange-500 animate-pulse-glow" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose TuzoTap?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for the modern local business ecosystem with beautiful design and powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover-lift bg-white border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Community?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of local businesses and customers creating meaningful connections through rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-gray-50 hover-lift tap-animation px-8 py-3 text-lg"
              >
                Start Your Free Trial
              </Button>
            </Link>
            <Link to="/auth">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover-lift tap-animation px-8 py-3 text-lg"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold gradient-text mb-4">TuzoTap</h3>
          <p className="text-gray-400 mb-6">
            Connecting communities, one tap at a time.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 TuzoTap. Built by <a href="https://github.com/MykeShale" target='_blank'><strong>DevMyke</strong></a> with ❤️ for local businesses.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
