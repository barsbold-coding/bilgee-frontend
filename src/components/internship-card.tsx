import { User } from "@/types/api.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Space } from "./space";

type InternshipCardProps = {
  id: number;
  title: string;
  employer: User;
  description: string;
  isFavourite: boolean;
  toggleFavorite: (internshipId: number) => Promise<void>
}

export function InternshipCard({ id, title, employer, description, toggleFavorite }: InternshipCardProps) {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{employer.name}</CardDescription>
          </CardHeader>
          <Space size={24} />
          <CardContent className="flex justify-between">
            <p className="w-[60%]">{description}</p>
            <Button variant="outline">
              <Link href={`/internship/${id}`}>
                Дэлгэрэнгүй
              </Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}


// <div key={internship.id} className="bg-white rounded-lg shadow-md p-6">
//   <div className="flex justify-between items-start">
//     <div>
//       <h2 className="text-xl font-semibold mb-2">{internship.title}</h2>
//       <p className="text-gray-600 mb-1">{internship.employer.name}</p>
//     </div>
    
//     {isAuthenticated && isStudent && (
//       <button
//         onClick={() => toggleFavorite(internship.id)}
//         className="text-2xl focus:outline-none"
//         aria-label={favorites.has(internship.id) ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorites.has(internship.id) ? "❤️" : "🤍"}
//       </button>
//     )}
//   </div>
  
//   <p className="text-gray-700 mb-4 line-clamp-3">{internship.description}</p>
//   <Button variant="outline">
//     <Link href={`/internships/${internship.id}`}>
//       Дэлгэрэнгүй
//     </Link>
//   </Button>
// </div>
