'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ExperienceForm } from './experience-form';
import { EducationForm } from './education-form';
import { CreateResume, Resume, CreateExperience, CreateEducation } from '@/types/api.types';
import { ArrowLeftIcon } from 'lucide-react';

interface ResumeFormProps {
  initialData?: Resume;
  onSubmit: (data: CreateResume) => Promise<void>;
  isSaving: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onSubmit, isSaving }) => {
  const [formData, setFormData] = useState<CreateResume>({
    title: initialData?.title || '',
    summary: initialData?.summary || '',
    skills: initialData?.skills || '',
    languages: initialData?.languages || '',
    certifications: initialData?.certifications || '',
    experiences: initialData?.experiences || [],
    education: initialData?.education || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...(prev.experiences || []),
        {
          company: '',
          position: '',
          startDate: new Date(),
          location: '',
        },
      ],
    }));
  };

  const handleUpdateExperience = (index: number, experience: CreateExperience) => {
    setFormData((prev) => {
      const experiences = [...(prev.experiences || [])];
      experiences[index] = experience;
      return { ...prev, experiences };
    });
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => {
      const experiences = [...(prev.experiences || [])];
      experiences.splice(index, 1);
      return { ...prev, experiences };
    });
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: '',
          description: '',
          degree: '',
          fieldOfStudy: '',
          startDate: new Date(),
          endDate: new Date(),
          grade: '',
          location: '',
        },
      ],
    }));
  };

  const handleUpdateEducation = (index: number, education: CreateEducation) => {
    setFormData((prev) => {
      const educationList = [...(prev.education || [])];
      educationList[index] = education;
      return { ...prev, education: educationList };
    });
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => {
      const educationList = [...(prev.education || [])];
      educationList.splice(index, 1);
      return { ...prev, education: educationList };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Resume Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g., Software Developer Resume"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium mb-1">
            Professional Summary
          </label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary || ''}
            onChange={handleChange}
            placeholder="Write a brief summary of your professional background and goals..."
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddExperience}
          >
            Add Experience
          </Button>
        </div>
        
        {formData.experiences && formData.experiences.length > 0 ? (
          <div className="space-y-4">
            {formData.experiences.map((experience, index) => (
              <ExperienceForm
                key={index}
                experience={experience}
                onChange={(updatedExp) => handleUpdateExperience(index, updatedExp)}
                onRemove={() => handleRemoveExperience(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No experience added yet. Click &quot;Add Experience&quot; to get started.
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddEducation}
          >
            Add Education
          </Button>
        </div>
        
        {formData.education && formData.education.length > 0 ? (
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <EducationForm
                key={index}
                education={edu}
                onChange={(updatedEdu) => handleUpdateEducation(index, updatedEdu)}
                onRemove={() => handleRemoveEducation(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No education added yet. Click &quot Add Education&quot to get started.
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Skills & Qualifications</h2>
        
        <div>
          <label htmlFor="skills" className="block text-sm font-medium mb-1">
            Skills
          </label>
          <Textarea
            id="skills"
            name="skills"
            value={formData.skills || ''}
            onChange={handleChange}
            placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js)"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium mb-1">
            Languages
          </label>
          <Textarea
            id="languages"
            name="languages"
            value={formData.languages || ''}
            onChange={handleChange}
            placeholder="List languages you speak (e.g., English - Fluent, Spanish - Intermediate)"
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="certifications" className="block text-sm font-medium mb-1">
            Certifications
          </label>
          <Textarea
            id="certifications"
            name="certifications"
            value={formData.certifications || ''}
            onChange={handleChange}
            placeholder="List your certifications"
            rows={2}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 gap-2">
        <Button variant="outline" onClick={() => {}}>
          <ArrowLeftIcon />
          Буцах
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Хадгалаж байна...' : 'Хадгалах'}
        </Button>
      </div>
    </form>
  );
};
