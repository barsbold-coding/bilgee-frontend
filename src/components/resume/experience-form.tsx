import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateExperience } from '@/types/api.types';
import { Card } from '@/components/ui/card';

interface ExperienceFormProps {
  experience: CreateExperience;
  onChange: (experience: CreateExperience) => void;
  onRemove: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  onChange,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...experience,
      [name]: value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...experience,
      [name]: value ? new Date(value) : undefined,
    });
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <Card className="p-4 border">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company
            </label>
            <Input
              id="company"
              name="company"
              value={experience.company || ''}
              onChange={handleChange}
              placeholder="Company name"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-1">
              Position
            </label>
            <Input
              id="position"
              name="position"
              value={experience.position || ''}
              onChange={handleChange}
              placeholder="Job title"
              required
            />
          </div>
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
              value={formatDate(experience.startDate)}
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
              value={formatDate(experience.endDate)}
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
            value={experience.location || ''}
            onChange={handleChange}
            placeholder="e.g., San Francisco, CA or Remote"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={experience.description || ''}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements"
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
