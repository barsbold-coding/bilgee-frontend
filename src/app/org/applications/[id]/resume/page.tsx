'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { applicationsAPI, usersAPI } from '@/lib/api';
import { Resume, User, UserRole } from '@/types/api.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import RoleGuard from '@/components/role-guard';
import { toast } from 'sonner';
import { ResumeCard } from '@/components/resume-card';

// Student information component
const StudentInfoCard = ({ student }: { student: User | null }) => {
  if (!student) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-3xl">Оюутны мэдээлэл</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2">
            <span className="font-medium col-span-3">Нэр:</span>
            <span className="col-span-9">{student.name}</span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <span className="font-medium col-span-3">Имэйл:</span>
            <span className="col-span-9">{student.email}</span>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <span className="font-medium col-span-3">Утас:</span>
            <span className="col-span-9">{student.phoneNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ViewStudentResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [student, setStudent] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const appId = Number(params.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resumeRes = await applicationsAPI.getApplicationResume(appId);
        setResume(resumeRes.data);
      } catch (error) {
        console.error('Failed to fetch resume:', error);
        toast.error('CV-г авахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    if (appId) {
      fetchData();
    }
  }, [appId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (resume) {
          const studentRes = await usersAPI.getById(resume.studentId);
          setStudent(studentRes.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Алдаа гарлаа')
      }
    }

    if (resume?.studentId) {
      fetchData();
    }
  }, [resume]);

  const goBack = () => {
    router.push('/org/applications');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="container mx-auto py-8">
        <Button onClick={goBack} variant="outline" className="mb-4">
          Буцах
        </Button>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">Энэ оюутан CV оруулаагүй байна.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={[UserRole.ORGANISATION]}>
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="flex justify-end">
          <Button onClick={goBack} variant="outline" className="mb-4">
            Буцах
          </Button>
        </div>
        
        <StudentInfoCard student={student} />
        <ResumeCard resume={resume} />
      </div>
    </RoleGuard>
  );
}
