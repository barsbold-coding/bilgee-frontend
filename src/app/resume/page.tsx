'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { resumeAPI } from '@/lib/api';
import { Resume } from '@/types/api.types';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

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

  if (!resume) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No Resume Found</h1>
        <p className="mb-6">You haven't created a resume yet.</p>
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

      {/* Resume View - This will be the printable area */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{resume.title || 'My Resume'}</h1>
          {resume.summary && <p className="text-gray-700">{resume.summary}</p>}
        </div>

        {/* Experience Section */}
        {resume.experiences && resume.experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Work Experience</h2>
            <div className="space-y-6">
              {resume.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <h4 className="text-gray-700">{exp.company}</h4>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate && (
                        <>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {' - '}
                          {exp.endDate 
                            ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              }) 
                            : 'Present'}
                        </>
                      )}
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {resume.education && resume.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Education</h2>
            <div className="space-y-6">
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{edu.school}</h3>
                      <h4 className="text-gray-700">
                        {edu.degree}
                        {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate && (
                        <>
                          {new Date(edu.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {' - '}
                          {edu.endDate 
                            ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              }) 
                            : 'Present'}
                        </>
                      )}
                      {edu.location && <div>{edu.location}</div>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {resume.skills && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Skills</h2>
            <p className="text-gray-700">{resume.skills}</p>
          </div>
        )}

        {/* Languages Section */}
        {resume.languages && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Languages</h2>
            <p className="text-gray-700">{resume.languages}</p>
          </div>
        )}

        {/* Certifications Section */}
        {resume.certifications && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Certifications</h2>
            <p className="text-gray-700">{resume.certifications}</p>
          </div>
        )}
      </div>
    </div>
  );
}
