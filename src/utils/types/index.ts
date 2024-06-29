export interface FileWithPreview extends File {
  preview: string;
}

export interface LogType {
  id: string;
  created_at: string;
  name: string;
  actor_id: string;
  actor_name: string;
  type: string;
  result: string;
}

export interface LogActorType {
  actorId: string;
  actorName: string;
}

export interface ImageType {
  id: string;
  created_at: string;
  image: string;
  name: string | null;
  product_ids: string[];
  staff_ids: string[];
  drink_ids: string[];
}

export interface ProductType {
  id: string;
  created_at: string;
  brand: any;
  position: any;
  type: string;
}

export interface SpaceType {
  id: string;
  created_at: string;
  label: string;
  value: number;
}

export interface StaffType {
  id: string;
  created_at: string;
  position: any;
  value: number;
}

export interface DrinkerType {
  id: string;
  created_at: string;
  position: any;
  value: number;
}
