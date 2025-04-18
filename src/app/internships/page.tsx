'use client'

import { useState, useEffect } from 'react';
import { internshipsAPI, favoritesAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { InternshipType } from '@/types/api.types';
import { Button } from '@/components/ui/button';

export default function InternshipsPage() {
  const [internships, setInternships] = useState<InternshipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  const { isAuthenticated, user } = useAuth();
  const isStudent = user?.role === 'student';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internshipsResponse = await internshipsAPI.getAll();
        console.log(internshipsResponse.data);
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
  }, [isAuthenticated, isStudent]);

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

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Зарлагдсан ажлын байрнууд</h1>
        
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
              <div key={internship.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{internship.title}</h2>
                    <p className="text-gray-600 mb-1">{internship.employer.name}</p>
                  </div>
                  
                  {isAuthenticated && isStudent && (
                    <button
                      onClick={() => toggleFavorite(internship.id)}
                      className="text-2xl focus:outline-none"
                      aria-label={favorites.has(internship.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorites.has(internship.id) ? "❤️" : "🤍"}
                    </button>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{internship.description}</p>
                <Button variant="outline">
                  <Link href={`/internships/${internship.id}`}>
                    Дэлгэрэнгүй
                  </Link>
                </Button>
              </div>
            ))}
            
            {internships.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 mb-4">Одоогоор идэвхтэй дадлагийн хөтөлөр байхгүй😢...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

