export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: { start: number; end: number }[];
};

export const ROOMS: Room[] = [
  { id: 'cedar', name: 'Cedar Study Room', capacity: 8, equipment: ['projector', 'whiteboard'], blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'orion', name: 'Orion Studio', capacity: 14, equipment: ['projector', 'whiteboard', 'camera'], blocked: false, bookings: [{ start: 780, end: 840 }] },
  { id: 'comet', name: 'Comet Lab', capacity: 24, equipment: ['projector', 'power'], blocked: true, bookings: [] },
  { id: 'delta', name: 'Delta Workshop', capacity: 12, equipment: ['whiteboard', 'power'], blocked: false, bookings: [{ start: 660, end: 720 }] },
  { id: 'nova', name: 'Nova Seminar Room', capacity: 32, equipment: ['projector', 'whiteboard', 'camera', 'power'], blocked: false, bookings: [{ start: 900, end: 960 }] },
];

export const EQUIPMENT: Record<string, string> = {
  projector: 'Projector', whiteboard: 'Whiteboard', camera: 'Camera', power: 'Power outlets',
};
