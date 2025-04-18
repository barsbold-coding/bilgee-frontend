'use client'
import React, { useEffect, useState } from 'react';
import { InternshipType } from '@/types/api.types';
import { internshipsAPI, favoritesAPI } from '@/lib/api';
import { formatDateRange } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Space } from '@/components/space';
import { HeartIcon, MapPinIcon, CalendarIcon, BanknoteIcon, ArrowLeftIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

const InternshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<InternshipType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        setLoading(true);
        const internshipId = parseInt(id as string);
        const response = await internshipsAPI.getById(internshipId);
        setInternship(response.data);
        
        // Check if this internship is favorited
        const favResponse = await favoritesAPI.check(internshipId);
        setIsFavorite(favResponse.data);
      } catch (err) {
        console.error('Error fetching internship details:', err);
        setError('Failed to load internship details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternshipDetails();
    }
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!internship) return;
    
    try {
      setFavLoading(true);
      if (isFavorite) {
        await favoritesAPI.remove(internship.id);
      } else {
        await favoritesAPI.add(internship.id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite status:', err);
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !internship) {
    return (
      <Card className="mx-auto max-w-3xl p-6">
        <CardContent>
          <div className="text-center">
            <h3 className="text-lg font-medium">Error</h3>
            <p className="text-muted-foreground">{error || 'Internship not found'}</p>
            <Space size={16} />
            <Button onClick={() => {}}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => {}} 
        className="mb-6 flex items-center"
      >
        <ArrowLeftIcon className="mr-2" size={16} />
        Back to listings
      </Button>

      <Card className="overflow-hidden">
        <div className="bg-primary h-16 w-full"></div>

        <CardHeader className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{internship.title}</CardTitle>
              <CardDescription className="text-lg">{internship.employer.name}</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={isFavorite ? "text-red-500" : ""}
            >
              <HeartIcon 
                className={isFavorite ? "fill-red-500" : ""} 
                size={18} 
              />
              <span className="ml-2">{isFavorite ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPinIcon className="mr-2 text-muted-foreground" size={18} />
              <span>{internship.location}</span>
            </div>
            
            <div className="flex items-center">
              <CalendarIcon className="mr-2 text-muted-foreground" size={18} />
              <span>{formatDateRange(internship.startDate, internship.endDate)}</span>
            </div>
            
            {internship.salaryRange && (
              <div className="flex items-center">
                <BanknoteIcon className="mr-2 text-muted-foreground" size={18} />
                <span>{internship.salaryRange}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <div className="prose max-w-none">
              {internship.description.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Internship ID: {internship.id}
          </div>
          <Button size="lg">Apply Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InternshipDetail;
