'use client'

import { useState, useEffect } from 'react';
import { internshipsAPI, favoritesAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { InternshipType, UserRole } from '@/types/api.types';
import { InternshipCard } from '@/components/internship-card';
import RoleGuard from '@/components/role-guard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, BookmarkIcon } from 'lucide-react';
import Link from 'next/link';

export default function InternshipsPage() {
  const [internships, setInternships] = useState<InternshipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user } = useAuth();
  const isStudent = user?.role === 'student';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const internshipsResponse = await internshipsAPI.getAll({
          title: searchQuery
        });
        setInternships(internshipsResponse.data.rows);
        
        if (isAuthenticated && isStudent) {
          const favoritesResponse = await favoritesAPI.getAll();
          const favoriteIds = new Set<number>(
            favoritesResponse.data.rows.map((fav: { internshipId: number }) => fav.internshipId)
          );
          setFavorites(favoriteIds);
        }
      } catch (err) {
        setError('Failed to load internships. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, isStudent, searchQuery]);

  const toggleFavorite = async (internshipId: number) => {
    try {
      if (favorites.has(internshipId)) {
        await favoritesAPI.remove(internshipId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(internshipId);
          return newFavorites;
        });
      } else {
        await favoritesAPI.add(internshipId);
        setFavorites(prev => new Set([...prev, internshipId]));
      }
    } catch (err) {
      console.error('Failed to update favorite status:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <RoleGuard allowedRoles={[UserRole.STUDENT]}>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Зарлагдсан ажлын байрнууд</h1>
            
            <Link href="/favorites">
              <Button variant="outline">
                <BookmarkIcon className="mr-2" size={16} />
                Миний хадгалсан дадлагууд
              </Button>
            </Link>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              placeholder="Хайх дадлагын нэр..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="mr-2" size={16} />
              Хайх
            </Button>
          </form>
          
          {loading ? (
            <div className="flex justify-center">
              <p>Loading internships...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {internships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  id={internship.id}
                  title={internship.title}
                  employer={internship.employer}
                  description={internship.description}
                  isFavorite={favorites.has(internship.id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
              
              {internships.length === 0 && (
                <div className="text-center py-10">
                  {searchQuery ? (
                    <p className="text-gray-600 mb-4">Хайлтад тохирох дадлагийн хөтөлбөр олдсонгүй</p>
                  ) : (
                    <p className="text-gray-600 mb-4">Одоогоор идэвхтэй дадлагийн хөтөлөр байхгүй😢...</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
