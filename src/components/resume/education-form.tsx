import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateEducation } from '@/types/api.types';
import { Card } from '@/components/ui/card';

interface EducationFormProps {
  education: CreateEducation;
  onChange: (education: CreateEducation) => void;
  onRemove: () => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onChange,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...education,
      [name]: value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...education,
      [name]: value ? new Date(value) : undefined,
    });
  };

  // Format date for input
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <Card className="p-4 border">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="school" className="block text-sm font-medium mb-1">
              School
            </label>
            <Input
              id="school"
              name="school"
              value={education.school || ''}
              onChange={handleChange}
              placeholder="University or school name"
              required
            />
          </div>
          <div>
            <label htmlFor="degree" className="block text-sm font-medium mb-1">
              Degree
            </label>
            <Input
              id="degree"
              name="degree"
              value={education.degree || ''}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="fieldOfStudy" className="block text-sm font-medium mb-1">
            Field of Study
          </label>
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={education.fieldOfStudy || ''}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">
              Start Date
            </label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formatDate(education.startDate)}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">
              End Date
            </label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formatDate(education.endDate)}
              onChange={handleDateChange}
              placeholder="Present"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={education.location || ''}
            onChange={handleChange}
            placeholder="e.g., Boston, MA"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={education.description || ''}
            onChange={handleChange}
            placeholder="Additional information about your education"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onRemove}
            className="text-destructive"
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};
