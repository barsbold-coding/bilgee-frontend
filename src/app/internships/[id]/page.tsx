'use client'
import React, { useEffect, useState } from 'react';
import { Application, ApplicationStatus, InternshipType } from '@/types/api.types';
import { internshipsAPI, favoritesAPI, applicationsAPI } from '@/lib/api';
import { formatDateRange } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Space } from '@/components/space';
import { HeartIcon, MapPinIcon, CalendarIcon, BanknoteIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function InternshipDetail() {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<InternshipType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        setLoading(true);
        const internshipId = parseInt(id as string);
        const response = await internshipsAPI.getById(internshipId);
        setInternship(response.data);
        
        // Check if this internship is favorited
        const favResponse = await favoritesAPI.check(internshipId);
        setFavorite(favResponse.data.isFavourite);
        
        // Check if user has already applied to this internship
        try {
          const res = await applicationsAPI.getByInternship(internshipId);
          if (res.data && res.data.rows.length > 0) {
            const [userApplication] = res.data.rows;
            if (userApplication) {
              setApplicationStatus(userApplication.status);
            }
          }
        } catch (appErr) {
          console.error('Error checking application status:', appErr);
          // Non-critical error, continue without application status
        }
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
      setFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite status:', err);
    } finally {
      setFavLoading(false);
    }
  };

  const handleApply = async () => {
    if (!internship) return;
    
    try {
      setIsApplying(true);
      await applicationsAPI.create(internship.id);
      setApplicationStatus(ApplicationStatus.PENDING);
      toast("Application Submitted", {
        description: "Your application has been successfully submitted.",
        // variant: "default",
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      toast("Application Failed", {
        description: "Failed to submit your application. Please try again.",
        // variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const getApplicationButton = () => {
    if (applicationStatus === ApplicationStatus.PENDING) {
      return (
        <Button size="lg" variant="outline" disabled>
          <CheckCircleIcon className="mr-2" size={18} />
          Application Pending
        </Button>
      );
    } else if (applicationStatus === ApplicationStatus.APPROVED) {
      return (
        <Button size="lg" variant="outline" className="bg-green-50 text-green-600 border-green-200" disabled>
          <CheckCircleIcon className="mr-2" size={18} />
          Application Approved
        </Button>
      );
    } else if (applicationStatus === ApplicationStatus.REJECTED) {
      return (
        <Button size="lg" variant="outline" className="bg-red-50 text-red-600 border-red-200" disabled>
          Application Rejected
        </Button>
      );
    } else {
      return (
        <Button 
          size="lg" 
          onClick={handleApply} 
          disabled={isApplying}
        >
          {isApplying ? <Spinner size="sm" className="mr-2" /> : null}
          Apply Now
        </Button>
      );
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
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
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
          <div />
          {getApplicationButton()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InternshipDetail;
