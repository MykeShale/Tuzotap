
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'customer' | 'business'>('customer');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication with Supabase
    console.log('Auth attempt:', { authMode, userType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-scale-in">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">
            Welcome to TuzoTap
          </h1>
          <p className="text-gray-600">
            {authMode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-1 shadow-md">
            <div className="flex space-x-1">
              <Button
                variant={userType === 'customer' ? 'default' : 'ghost'}
                onClick={() => setUserType('customer')}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  userType === 'customer' 
                    ? 'bg-gradient-primary text-white' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Customer
              </Button>
              <Button
                variant={userType === 'business' ? 'default' : 'ghost'}
                onClick={() => setUserType('business')}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  userType === 'business' 
                    ? 'bg-gradient-primary text-white' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Business
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              {userType === 'business' && (
                <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-600 border-orange-200">
                  Business
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {userType === 'customer' 
                ? 'Start earning rewards at your favorite local spots'
                : 'Connect with your community and build customer loyalty'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Phone</Label>
                    <Input 
                      id="email" 
                      type="text" 
                      placeholder="Enter your email or phone number"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white tap-animation"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleAuth} className="space-y-4">
                  {userType === 'business' && (
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input 
                        id="businessName" 
                        type="text" 
                        placeholder="Your business name"
                        className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">{userType === 'customer' ? 'Full Name' : 'Owner Name'}</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Enter your full name"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white tap-animation"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            {/* Alternative Sign In */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-200 hover:bg-gray-50 tap-animation"
            >
              Sign in with Google
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Need help? {' '}
              <button className="text-orange-600 hover:text-orange-700 underline">
                Contact support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
