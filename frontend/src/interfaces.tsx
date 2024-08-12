// src/interfaces.ts

export interface Pet {
  id: number;
  name: string;
  age: number;
  race: string;
  type: string;
  pet_status: string;
}

export interface Adopter {
  id: number;
  username: string;
  name: number;
  lastname: number;
}

export interface Volunteer {
    id: number;
    username: string;
    name: number;
    lastname: number;
}

export interface Adoption {
  id: number;
  adopted_pet: Pet;
  adopter: Adopter;
  adoption_date: string;
  adoption_status: string;
}

export interface AttributeMap {
  [key: string]: any;
}

export interface JWTData {
    user_id: string;
  }

  export interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (
      email: string,
      password: string,
      name: string,
      lastName: string,
      userType: string
    ) => Promise<void>;
    logout: () => void;
    fetchUser: () => void;
  }
