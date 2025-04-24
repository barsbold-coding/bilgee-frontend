'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { resumeAPI } from '@/lib/api';
import { Resume } from '@/types/api.types';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ResumeCard } from '@/components/resume-card';

export default function ResumeViewPage() {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeAPI.getMyResume();
        setResume(response.data);
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleEdit = () => {
    router.push('/resume/edit');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!resume) return

  if (resume?.absent) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No Resume Found</h1>
        <p className="mb-6">Танд одоогоор үүсгэсэн CV байхгүй байна.</p>
        <Button onClick={() => router.push('/resume/edit')}>Create Resume</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold">Миний CV</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            CV засах
          </Button>
          <Button onClick={handlePrint}>Хэвлэх / PDF болгон хадгалах</Button>
        </div>
      </div>
      <ResumeCard resume={resume} />
    </div>
  );
}
