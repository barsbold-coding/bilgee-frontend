'use client';

import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ResumeForm } from '@/components/resume/resume-form';
import { resumeAPI } from '@/lib/api';
import { CreateResume, Resume } from '@/types/api.types';
import { Spinner } from '@/components/ui/spinner'; // You'll need to create this component

export default function ResumePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

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
  }, [isAuthenticated, router]);

  const handleSaveResume = async (resumeData: CreateResume) => {
    setSaving(true);
    try {
      if (resume?.id) {
        const response = await resumeAPI.update(resume.id, resumeData);
        setResume(response.data);
      } else {
        const response = await resumeAPI.create(resumeData);
        setResume(response.data);
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Failed to save resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
      <div className="bg-card p-6 rounded-lg shadow-md">
        <ResumeForm 
          initialData={resume || undefined} 
          onSubmit={handleSaveResume} 
          isSaving={saving}
        />
      </div>
    </div>
  );
}
