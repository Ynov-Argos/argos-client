export interface IdentityDocument {
  id: string;
  documentType: DocumentType;
  documentId: string;
  issueDate?: string;
  expirationDate?: string;
}

export interface Address {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

export interface ClientLegal {
  id: string;
  name: string;
  juridicalForm: string;
  registrationNumber?: string;
  vatNumber?: string;
  incorporationDate?: string;
  incorporationCountry?: string;
}

export interface ClientVessel {
  id: string;
  name: string;
  omiNumber: string;
  flag?: string;
}

export interface ClientNatural {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthPlace?: string;
  nationalities: string[];
  identityDocuments: IdentityDocument[];
}

export interface Client {
  id?: string;
  externalId?: string;
  type: ClientType;
  relationType: RelationType;
  name?: string;
  natural?: ClientNatural;
  legal?: ClientLegal;
  vessel?: ClientVessel;
  addresses: Address[];
  archivingDate?: Date;
}


export enum ClientType {
  NATURAL = 'NATURAL',
  LEGAL = 'LEGAL',
  VESSEL = 'VESSEL'
}
export enum RelationType {
  CLIENT = 'CLIENT',
  PROSPECT = 'PROSPECT',
  RELATION = 'RELATION',
  ARCHIVED = 'ARCHIVED'
}
export enum DocumentType {
  IDENTITY = 'IDENTITY',
  PASSPORT = 'PASSPORT',
  VISA = 'VISA',
  OTHER = 'OTHER'
}
