export enum UserRole {
  STUDENT = 'student',
  ORGANISATION = 'organisation',
  ADMIN = 'admin',
}
export enum UserStatus {
  VERIFIED = 'verified',
  PENDING  = 'pending',
  DECLINED = 'declined'
}

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: UserStatus;
  role: UserRole;
}

export type UserQueryType = {
  verified?: boolean;
}

export type RegisterUserType = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: UserRole;
};

export type UpdateUserType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  role?: UserRole;
};

export type CredentialsType = {
  email: string;
  password: string;
};

export type InternshipType = {
  id: number;
  title: string;
  description: string;
  location: string;
  salaryRange?: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive';
  applicationCount: number;
  employer: User;
}

export type InternshipQueryType = {
  title?: string;
  description?: string;
  salaryRange?: string;
  startDate?: Date;
  endDate?: Date;
}
export type CreateInternshipType = {
  title: string;
  description: string;
  location: string;
  salaryRange?: string;
  startDate: Date;
  endDate: Date;
}

export type UpdateInternshipType = {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  salaryRange?: string;
  startDate?: Date;
  endDate?: Date;
}

export type CreateEducation = {
  id?: number;
  resumeId?: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  grade: string;
  description: string;
  location: string;
};

export type CreateExperience = {
  id?: number;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
};

export type CreateResume = {
  title?: string;
  summary?: string;
  skills?: string;
  languages?: string;
  certifications?: string;
  experiences?: CreateExperience[];
  education?: CreateEducation[];
};

export type Resume = {
  id: number;
  studentId: number;
  title?: string;
  summary?: string;
  skills?: string;
  languages?: string;
  certifications?: string;
  experiences?: CreateExperience[];
  education?: CreateEducation[];
  createdAt: string;
  updatedAt: string;
  absent?: boolean;
};

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type Application = {
  id: number;
  internshipId: number;
  status: ApplicationStatus;
  internship?: InternshipType
  createdAt: Date;
}

export type ApplicationUpdate = {
  status?: ApplicationStatus;
}

export type Notification = {
  id: number;
  title: string;
  description: string;
  seenAt: Date;
}

export type NotificationCreate = {
  title: string;
  description: string;
  userId: number;
}

export type NotificationQuery = {
  title?: string;
  description?: string;
  seen?: boolean;
}
