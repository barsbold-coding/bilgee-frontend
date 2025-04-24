'use client';

import { useEffect, useState } from 'react';
import { applicationsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ApplicationCard } from '@/components/application-card';
import { Application } from '@/types/api.types';

// type Application = {
//   id: number;
//   status: 'pending' | 'approved' | 'rejected';
//   createdAt: string;
//   internship: {
//     id: number;
//     title: string;
//     company: string;
//     location: string;
//     deadline: string;
//     description: string;
//   };
// };

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

    const fetchApplications = async () => {
      try {
        const response = await applicationsAPI.getOwn();
        setApplications(response.data.rows);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Миний хүсэлтүүд</h1>
        <Button onClick={() => router.push('/internships')}>Дадлага хайх</Button>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-muted-foreground">Та хараахан дадлагын хүсэлт гаргаагүй байна.</p>
              <Button className="mt-4" onClick={() => router.push('/internships')}>
                Дадлага хайх
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}
