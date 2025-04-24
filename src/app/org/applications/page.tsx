'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { applicationsAPI } from '@/lib/api';
import { Application, ApplicationStatus } from '@/types/api.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/utils';
import RoleGuard from '@/components/role-guard';
import { UserRole } from '@/types/api.types';
import { toast } from 'sonner';
import { Space } from '@/components/space';

export default function OrganizationApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await applicationsAPI.getAll({ internshipId: searchParams.get('internshipId') });
        setApplications(res.data.rows);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        toast.error('Өргөдлүүдийг авахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateApplicationStatus = async (appId: number, status: ApplicationStatus) => {
    try {
      // Note: You'll need to add this API endpoint
      await applicationsAPI.update(appId, { status });
      
      // Update local state to reflect the change
      setApplications(applications.map(app => 
        app.id === appId ? { ...app, status } : app
      ));
      
      toast.success('Статус амжилттай шинэчлэгдлээ');
    } catch (error) {
      console.error('Failed to update application status:', error);
      toast.error('Статусыг шинэчлэхэд алдаа гарлаа');
    }
  };

  const viewStudentResume = (applicationId: number) => {
    router.push(`/org/applications/${applicationId}/resume`);
  };

  return (
    <RoleGuard allowedRoles={[UserRole.ORGANISATION]}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Өргөдлүүд</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-gray-500">Одоогоор өргөдөл алга байна.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <CardTitle>{application.internship?.title}</CardTitle>
                  <CardDescription>
                    Өргөдөл илгээсэн: {formatDate(application.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">Статус:</p>
                      <Space direction="horizontal" />
                      <span className={`inline-block px-2 py-1 rounded text-sm ${
                        application.status === ApplicationStatus.APPROVED 
                          ? 'bg-green-100 text-green-800' 
                          : application.status === ApplicationStatus.REJECTED 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status === ApplicationStatus.APPROVED 
                          ? 'Зөвшөөрсөн' 
                          : application.status === ApplicationStatus.REJECTED 
                          ? 'Татгалзсан'
                          : 'Хүлээгдэж байгаа'}
                      </span>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => viewStudentResume(application.id)}
                    >
                      CV харах
                    </Button>
                  </div>
                  
                  {application.status === ApplicationStatus.PENDING && (
                    <div className="flex flex-col space-x-2 mt-4 gap-4">
                      <Button 
                        className="w-full bg-emerald-500 hover:bg-green-700"
                        onClick={() => updateApplicationStatus(application.id, ApplicationStatus.APPROVED)}
                      >
                        Зөвшөөрөх
                      </Button>
                      <Button 
                        className="w-full bg-rose-500 hover:bg-red-700"
                        onClick={() => updateApplicationStatus(application.id, ApplicationStatus.REJECTED)}
                      >
                        Татгалзах
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
