
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 laravel-shadow">
            <CardHeader className="flex flex-col items-center pb-2">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="bg-laravel-100 text-laravel-600 text-xl">
                  {getInitials(user?.name || '')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
              <p className="text-gray-500">{user?.email}</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-sm text-gray-500">
                Member since {formatDate(user?.created_at || '')}
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2 space-y-6">
            <Card className="laravel-shadow">
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">User ID</div>
                      <div className="font-medium">{user?.id}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <div className="font-medium">{user?.email}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-medium">{user?.name}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Joined</div>
                      <div className="font-medium">{formatDate(user?.created_at || '')}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="laravel-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-500 italic">No recent activity to display.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
