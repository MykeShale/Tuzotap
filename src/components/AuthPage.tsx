import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  businessName?: string;
}

const AuthPage = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'customer' | 'business'>('customer');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (authMode === 'signup') {
      if (!formData.email || !formData.password || !formData.name || !formData.phone) {
        toast.error('Please fill in all required fields');
        return false;
      }
      if (userType === 'business' && !formData.businessName) {
        toast.error('Please enter your business name');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        return false;
      }
    }
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (authMode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success('Successfully signed in!');
        navigate('/dashboard');
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              user_type: userType,
              full_name: formData.name,
              phone: formData.phone,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        // If business user, create business profile
        if (userType === 'business' && formData.businessName && data.user) {
          const { error: businessError } = await supabase
            .from('businesses')
            .insert({
              owner_id: data.user.id,
              name: formData.businessName,
            });

          if (businessError) throw businessError;
        }

        toast.success('Account created successfully! Please check your email for verification.');
        setAuthMode('signin');
        setFormData({
          email: '',
          password: '',
          name: '',
          phone: '',
          businessName: '',
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Error signing in with Google');
    }
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
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white tap-animation"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
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
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required={userType === 'business'}
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
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white tap-animation"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
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
              onClick={handleGoogleSignIn}
              disabled={loading}
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
