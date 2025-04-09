
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const passwordSchema = z.object({
  current_password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  new_password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  password_confirmation: z.string(),
}).refine((data) => data.new_password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const Settings = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      password_confirmation: "",
    },
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleProfileSubmit = (data: any) => {
    // In a real app, this would be an API call
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handlePasswordSubmit = (data: any) => {
    // In a real app, this would be an API call
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully",
    });
    passwordForm.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="laravel-shadow">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        {...profileForm.register("name")}
                        className={profileForm.formState.errors.name ? "border-red-500" : ""}
                      />
                      {profileForm.formState.errors.name && (
                        <p className="text-sm text-red-500">{String(profileForm.formState.errors.name.message)}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...profileForm.register("email")}
                        className={profileForm.formState.errors.email ? "border-red-500" : ""}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{String(profileForm.formState.errors.email.message)}</p>
                      )}
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="laravel-shadow">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Current Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        {...passwordForm.register("current_password")}
                        className={passwordForm.formState.errors.current_password ? "border-red-500" : ""}
                      />
                      {passwordForm.formState.errors.current_password && (
                        <p className="text-sm text-red-500">{String(passwordForm.formState.errors.current_password.message)}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <Input
                        id="new_password"
                        type="password"
                        {...passwordForm.register("new_password")}
                        className={passwordForm.formState.errors.new_password ? "border-red-500" : ""}
                      />
                      {passwordForm.formState.errors.new_password && (
                        <p className="text-sm text-red-500">{String(passwordForm.formState.errors.new_password.message)}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password_confirmation">Confirm New Password</Label>
                      <Input
                        id="password_confirmation"
                        type="password"
                        {...passwordForm.register("password_confirmation")}
                        className={passwordForm.formState.errors.password_confirmation ? "border-red-500" : ""}
                      />
                      {passwordForm.formState.errors.password_confirmation && (
                        <p className="text-sm text-red-500">{String(passwordForm.formState.errors.password_confirmation.message)}</p>
                      )}
                    </div>
                    
                    <Button type="submit">Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
