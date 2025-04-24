import { Resume, User } from "@/types/api.types";

type ResumeCardType = {
  resume: Resume;
  student?: User; 
}

export function ResumeCard({ resume }: ResumeCardType) {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{resume.title || 'My Resume'}</h1>
        {resume.summary && <p className="text-gray-700">{resume.summary}</p>}
      </div>

      {resume.experiences && resume.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Ажлын туршлага</h2>
          <div className="space-y-6">
            {resume.experiences.map((exp, index) => (
              <div key={index} className="mb-4">
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

      {resume.education && resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Боловсрол</h2>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4">
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
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Чадварууд</h2>
          <p className="text-gray-700">{resume.skills}</p>
        </div>
      )}

      {/* Languages Section */}
      {resume.languages && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Хэл</h2>
          <p className="text-gray-700">{resume.languages}</p>
        </div>
      )}

      {/* Certifications Section */}
      {resume.certifications && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Сертификат</h2>
          <p className="text-gray-700">{resume.certifications}</p>
        </div>
      )}
    </div>
  );
}
