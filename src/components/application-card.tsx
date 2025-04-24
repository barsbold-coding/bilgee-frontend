import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Application } from "@/types/api.types";
import { Button } from "./ui/button";
import { formatDate } from '@/lib/utils';

export function ApplicationCard({ application }: { application: Application }) {
  const { internship, status, createdAt } = application;
  const router = useRouter();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200"
  };

  const statusLabels = {
    pending: "Хүлээгдэж байна",
    approved: "Зөвшөөрөгдсөн",
    rejected: "Зөвшөөрөгдөөгүй",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{internship?.title}</CardTitle>
            <CardDescription>{""} • {internship?.location}</CardDescription>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]} border`}>
            {statusLabels[status]}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{internship?.description}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">
              Хүсэлт гаргасан: {formatDate(createdAt)}
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(`/internships/${internship?.id}`)}>
              Дадлага харах
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
