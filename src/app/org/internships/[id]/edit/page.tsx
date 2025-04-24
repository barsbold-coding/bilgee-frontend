'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internshipsAPI } from '@/lib/api';
import { UserRole, Internship } from '@/types/api.types';
import RoleGuard from '@/components/role-guard';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

function DateInput({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  required = false 
}: { 
  id: string,
  name: string, 
  label: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <Input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default function EditInternship() {
  const router = useRouter();
  const params = useParams();
  const internshipId = Number(params.id);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryRange: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchInternship = async () => {
      if (!internshipId) return;
      
      setIsLoading(true);
      try {
        const response = await internshipsAPI.getById(internshipId);
        const internship = response.data;
        
        // Format dates for the date input fields (YYYY-MM-DD)
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };

        setFormData({
          title: internship.title,
          description: internship.description,
          location: internship.location,
          salaryRange: internship.salaryRange || '',
          startDate: formatDate(internship.startDate),
          endDate: formatDate(internship.endDate)
        });
      } catch (error) {
        console.error('Failed to fetch internship:', error);
        toast.error('Дадлагын мэдээлэл авахад алдаа гарлаа');
        router.push('/org/internships');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Format dates correctly for the API
      const internshipData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      };

      await internshipsAPI.update(internshipId, internshipData);
      toast.success('Дадлага амжилттай шинэчлэгдлээ');
      router.push('/org/internships');
    } catch (error) {
      console.error('Failed to update internship:', error);
      toast.error('Дадлага шинэчлэхэд алдаа гарлаа');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={[UserRole.ORGANISATION]}>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Дадлага засах</h1>
          <Button 
            variant="outline" 
            onClick={() => router.push('/org/internships')}
          >
            Буцах
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Дадлагын мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Гарчиг <span className="text-destructive">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Frontend Developer Internship"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Тайлбар <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the internship responsibilities, requirements, and other details..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Байршил <span className="text-destructive">*</span>
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Ulaanbaatar, Remote"
                  required
                />
              </div>

              <div>
                <label htmlFor="salaryRange" className="block text-sm font-medium mb-1">
                  Цалингийн хэмжээ
                </label>
                <Input
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g., $500-$800 per month"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  id="startDate"
                  name="startDate"
                  label="Эхлэх өдөр"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />

                <DateInput
                  id="endDate"
                  name="endDate"
                  label="Дуусах өдөр"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Хадгалж байна...
                    </>
                  ) : (
                    'Дадлага шинэчлэх'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
