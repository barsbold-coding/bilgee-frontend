'use client';

import React, { useState, useEffect } from 'react';
import { usersAPI } from '@/lib/api';
import { User, UserRole } from '@/types/api.types';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== UserRole.ADMIN)) {
      toast("Access Denied", {
        description: "You don't have permission to view this page.",
      });
      router.push('/');
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(true);
      try {
        const { data } = await usersAPI.getOrgs({});
        // Filter only organizations
        setOrganizations(data.rows);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        toast("Error", {
          description: "Failed to load organizations. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Handle organization verification
  const handleVerification = async (id: number, verified: boolean) => {
    try {
      await usersAPI.approve(id);
      
      // Update local state to reflect changes
      setOrganizations(prevOrgs => 
        prevOrgs.map(org => 
          org.id === id ? { ...org, verified } : org
        )
      );
      
      toast(verified ? "Organization Approved" : "Organization Declined", {
        description: `The organization has been ${verified ? "approved" : "declined"} successfully.`,
      });
    } catch (error) {
      console.error("Failed to update organization:", error);
      toast("Error", {
        description: "Failed to update organization status. Please try again.",
      });
    }
  };

  // Filter organizations based on active tab
  const filteredOrganizations = organizations.filter(org => {
    if (activeTab === 'all') return true;
    if (activeTab === 'verified') return org.verified;
    if (activeTab === 'unverified') return !org.verified;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Organizations</h1>
      
      <Tabs 
        defaultValue="all" 
        className="mb-6"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredOrganizations.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No organizations found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrganizations.map((org) => (
            <Card key={org.id} className="overflow-hidden">
              <CardHeader className="bg-slate-50">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{org.name}</CardTitle>
                  <Badge variant={org.verified ? "default" : "outline"}>
                    {org.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm">{org.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm">{org.phoneNumber}</p>
                  </div>
                </div>
                
                {!org.verified && (
                  <div className="flex gap-4 mt-6">
                    <Button 
                      variant="default" 
                      className="flex-1"
                      onClick={() => handleVerification(org.id, true)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleVerification(org.id, false)}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
