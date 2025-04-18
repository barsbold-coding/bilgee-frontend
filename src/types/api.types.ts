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
  employer: {
    name: string;
  };
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
