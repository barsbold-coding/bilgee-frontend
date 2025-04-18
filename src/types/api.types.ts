enum UserRole {
  STUDENT = 'student',
  ORGANISATION = 'organisation',
  ADMIN = 'admin',
}

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: UserRole;
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
  employer: User;
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
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
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
  title?: string;
  summary?: string;
  skills?: string;
  languages?: string;
  certifications?: string;
  experiences?: CreateExperience[];
  education?: CreateEducation[];
  createdAt: string;
  updatedAt: string;
};
