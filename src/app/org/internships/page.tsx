'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { internshipsAPI } from '@/lib/api';
import { InternshipType, UserRole } from '@/types/api.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { formatDateRange } from '@/lib/utils';
import RoleGuard from '@/components/role-guard';
import { toast } from 'sonner';
import { ArrowLeftIcon, PlusIcon, UserIcon } from 'lucide-react';

export default function OrganizationInternships() {
  const [internships, setInternships] = useState<InternshipType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await internshipsAPI.getOwnInternships();
        setInternships(res.data.rows);
      } catch (error) {
        console.error('Failed to fetch internships:', error);
        toast.error('Дадлагуудыг авахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateInternship = () => {
    router.push('/org/internships/create');
  };

  const viewInternshipApplications = (internshipId: number) => {
    router.push(`/org/applications?internshipId=${internshipId}`);
  };

  const editInternship = (internshipId: number) => {
    router.push(`/org/internships/${internshipId}/edit`);
  };

  return (
    <RoleGuard allowedRoles={[UserRole.ORGANISATION]}>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Миний дадлагууд</h1>
          <div className="flex items-center justify-between mb-6 gap-2">
            <Button variant="outline" onClick={() => {router.back()}}>
              <ArrowLeftIcon className="size-4 mr-2" />
              Буцах
            </Button>
            <Button onClick={handleCreateInternship}>
              <PlusIcon className="size-4 mr-2" />
              Шинэ дадлага үүсгэх
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : internships.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-gray-500">Одоогоор дадлага алга байна. Шинэ дадлага үүсгэнэ үү.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {internships.map((internship) => (
              <Card key={internship.id}>
                <CardHeader>
                  <CardTitle>{internship.title}</CardTitle>
                  <CardDescription>
                    Хугацаа: {formatDateRange(internship.startDate, internship.endDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-medium">Байршил: {internship.location}</p>
                    {internship.salaryRange && (
                      <p className="text-sm font-medium mt-1">Цалин: {internship.salaryRange}</p>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {internship.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => viewInternshipApplications(internship.id)}
                      className="flex items-center"
                    >
                      <UserIcon className="size-4 mr-2" />
                      Өргөдлүүд харах
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => editInternship(internship.id)}
                    >
                      Засах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
