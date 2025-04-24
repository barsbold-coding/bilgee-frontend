import { Resume, User } from "@/types/api.types";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

type ResumeCardType = {
  resume: Resume;
  student?: User;
}

export function ResumeCard({ resume }: ResumeCardType) {
  return (
    <Card className="max-w-4xl mx-auto p-6 mb-8">
      {/* Header */}
      <CardHeader className="pb-4 mb-2 border-b">
        <CardTitle className="text-3xl mb-2">{resume.title || 'My Resume'}</CardTitle>
        {resume.summary && <CardDescription className="text-base text-gray-700">{resume.summary}</CardDescription>}
      </CardHeader>

      <CardContent className="px-0 space-y-8">
        {/* Experiences Section */}
        {resume.experiences && resume.experiences.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Ажлын туршлага</h2>
            <div className="space-y-4 pl-8">
              {resume.experiences.map((exp, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 pr-6 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <h4 className="text-gray-700">{exp.company}</h4>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate && (
                        <>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {' - '}
                          {exp.endDate 
                            ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              }) 
                            : 'Present'}
                        </>
                      )}
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {resume.education && resume.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Боловсрол</h2>
            <div className="space-y-4 pl-8">
              {resume.education.map((edu, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 pr-6 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{edu.institution}</h3>
                      <h4 className="text-gray-700">
                        {edu.degree}
                        {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate && (
                        <>
                          {new Date(edu.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {' - '}
                          {edu.endDate 
                            ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              }) 
                            : 'Present'}
                        </>
                      )}
                      {edu.location && <div>{edu.location}</div>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {resume.skills && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Чадварууд</h2>
            <p className="text-gray-700 px-8">{resume.skills}</p>
          </div>
        )}

        {/* Languages Section */}
        {resume.languages && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Хэл</h2>
            <p className="text-gray-700 px-8">{resume.languages}</p>
          </div>
        )}

        {/* Certifications Section */}
        {resume.certifications && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Сертификат</h2>
            <p className="text-gray-700 px-8">{resume.certifications}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
