'use client'

import { useState, useEffect } from 'react';
import { favoritesAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { InternshipType, UserRole } from '@/types/api.types';
import { InternshipCard } from '@/components/internship-card';
import RoleGuard from '@/components/role-guard';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favoriteInternships, setFavoriteInternships] = useState<InternshipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();
  const isStudent = user?.role === 'student';

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoritesResponse = await favoritesAPI.getAll();
        const favs = favoritesResponse.data.rows;
        const internships = favs.map((fav) => fav.internship);
        setFavoriteInternships(internships);
      } catch (err) {
        setError('Failed to load favorite internships. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && isStudent) {
      fetchFavorites();
    }
  }, [isAuthenticated, isStudent]);

  const toggleFavorite = async (internshipId: number) => {
    try {
      await favoritesAPI.remove(internshipId);
      // Remove the internship from the state
      setFavoriteInternships(prev => 
        prev.filter(internship => internship.id !== internshipId)
      );
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  return (
    <RoleGuard allowedRoles={[UserRole.STUDENT]}>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/internships">
              <Button variant="ghost" className="mr-2">
                <ArrowLeft className="mr-1" size={16} />
                Ажлын байранд буцах
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Миний хадгалсан дадлагууд</h1>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {favoriteInternships.length > 0 ? (
                favoriteInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    id={internship.id}
                    title={internship.title}
                    employer={internship.employer}
                    description={internship.description}
                    isFavorite={true}
                    toggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600 mb-4">Та одоогоор дадлагийн хөтөлбөр хадгалаагүй байна.</p>
                  <Link href="/internships">
                    <Button>
                      Дадлагийн хөтөлбөрүүдийг харах
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
