export type ProjectType = 'residential' | 'commercial' | 'infrastructure';

export interface Project {
  id: number;
  owner: string;
  city: string;
  district: string; // district or area within city
  coordinates: [number, number]; // [longitude, latitude]
  type: ProjectType;
  description: string;
  /** Optional image path for project card thumbnail */
  image?: string;
  /** Optional gallery of images (card uses first when no image) */
  images?: string[];
}

// Riyadh ~46.67, 24.69 | Taif 40.42, 21.27 | Medina 39.61, 24.52 | Hail 41.69, 27.52
export const SAUDI_PROJECTS: Project[] = [
  // Al Taif / Al Hawiya
  { id: 1, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.415, 21.268], type: 'residential', description: '198 Housing Units Turnkey' },
  { id: 2, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.418, 21.270], type: 'residential', description: '242 Housing Units Turnkey Works' },
  { id: 3, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.412, 21.272], type: 'residential', description: '88 Housing Units Concrete Works' },
  { id: 4, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.420, 21.266], type: 'residential', description: '242 Housing Units MEP Works' },
  { id: 5, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.416, 21.274], type: 'residential', description: '264 Housing Units Mini Panels Works' },
  { id: 6, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.422, 21.271], type: 'residential', description: '352 Housing Units Surface Preparation Work' },
  { id: 7, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.410, 21.269], type: 'residential', description: '17 Housing Buildings External Facade Works' },
  { id: 8, owner: 'NHC-COCC', city: 'Al Taif', district: 'Al Hawiya', coordinates: [40.419, 21.273], type: 'residential', description: '242 Housing Units Turnkey Works' },
  // Medina / Madinah
  { id: 9, owner: 'MOH-SAPC', city: 'Medina', district: 'Mahzour District', coordinates: [39.608, 24.522], type: 'residential', description: '198 Housing Units Turnkey' },
  { id: 10, owner: 'King Salman Social Center', city: 'Riyadh', district: 'Exit 10', coordinates: [46.752, 24.718], type: 'commercial', description: "Expansion of the Women's Section" },
  { id: 11, owner: 'Faculty of Tourism and Hospitality', city: 'Madinah', district: 'Prince Naif Street', coordinates: [39.615, 24.518], type: 'commercial', description: 'Faculty building' },
  // Riyadh districts
  { id: 12, owner: 'VIP Party', city: 'Riyadh', district: 'Al Hada District', coordinates: [46.682, 24.708], type: 'infrastructure', description: 'Underground Tanks' },
  { id: 13, owner: 'VIP Party', city: 'Riyadh', district: 'Al Rahmania District', coordinates: [46.688, 24.702], type: 'residential', description: 'Private Residential Palace' },
  { id: 14, owner: 'Al Monajem', city: 'Riyadh', district: 'Al-Sulay District', coordinates: [46.672, 24.692], type: 'residential', description: 'Concrete Walls' },
  { id: 15, owner: 'Al Monajem', city: 'Riyadh', district: 'Al-Sulay District', coordinates: [46.674, 24.690], type: 'commercial', description: 'Warehouse' },
  { id: 16, owner: 'Alfanar Company', city: 'Riyadh', district: 'Third Industrial / Al-Kharj Road', coordinates: [46.848, 24.148], type: 'commercial', description: 'Ceramic Factory Expansion' },
  { id: 17, owner: "Abnaa' Al Sayed", city: 'Riyadh', district: 'Al-Amariya Al-Rayyan Farms', coordinates: [46.602, 24.652], type: 'commercial', description: 'Reception Building, Gymnasium and Service Annexes', image: '/projects/mazraat-al-rayan.png' },
  { id: 18, owner: 'Al Yamamah Company', city: 'Riyadh', district: 'Al Sahafa District', coordinates: [46.662, 24.678], type: 'residential', description: 'Private Villa' },
  { id: 19, owner: 'Al Yamamah Company', city: 'Riyadh', district: 'Exit 2', coordinates: [46.722, 24.752], type: 'commercial', description: 'Hail Cement Factory' },
  { id: 20, owner: 'Public Pension Agency', city: 'Hail', district: 'Turbah', coordinates: [41.682, 27.498], type: 'commercial', description: 'Administrative Building – Residential and Administrative Buildings' },
  { id: 21, owner: 'Mohammed Ali Al Swailem Company', city: 'Riyadh', district: 'Al-Sulay District', coordinates: [46.670, 24.694], type: 'commercial', description: 'MASCO Ready Mix Concrete Factory' },
  { id: 22, owner: 'Al Babtain Contracting Company', city: 'Riyadh', district: 'Al Malaz District', coordinates: [46.698, 24.668], type: 'commercial', description: 'Offices' },
  { id: 23, owner: 'VIP Party', city: 'Riyadh', district: 'Al Sahafa District', coordinates: [46.664, 24.676], type: 'residential', description: 'Residential Building' },
  { id: 24, owner: 'VIP Party x2', city: 'Riyadh', district: 'Al-Taawun District', coordinates: [46.712, 24.692], type: 'residential', description: 'Residential Building' },
  { id: 25, owner: 'King Saud University', city: 'Riyadh', district: 'Prince Turki Road', coordinates: [46.692, 24.682], type: 'residential', description: 'Residential Building and Services' },
  { id: 26, owner: 'King Fahd National Library', city: 'Riyadh', district: 'Olaya', coordinates: [46.678, 24.698], type: 'commercial', description: 'Indoor Buildings' },
  { id: 27, owner: 'Al Salam Hospital', city: 'Riyadh', district: 'Al-Salam Neighborhood', coordinates: [46.668, 24.662], type: 'commercial', description: 'Capacity of 100 Beds' },
  { id: 28, owner: 'Down Syndrome School Compound', city: 'Riyadh', district: 'Hittin District', coordinates: [46.658, 24.648], type: 'residential', description: 'Private Villa' },
  { id: 29, owner: 'VIP Party', city: 'Riyadh', district: 'Diriyah', coordinates: [46.772, 24.728], type: 'residential', description: 'Residential Palace' },
  { id: 30, owner: 'Goodies Restaurant', city: 'Riyadh', district: 'Tahlia Street', coordinates: [46.678, 24.688], type: 'commercial', description: 'Restaurant' },
  { id: 31, owner: 'SAPAC Company', city: 'Riyadh', district: 'Takhassusi Road', coordinates: [46.672, 24.698], type: 'commercial', description: "The Company's Headquarters – Residential Building" },
  { id: 32, owner: 'Mansour Al Hammad Building Project', city: 'Riyadh', district: 'Al-Aqiq District', coordinates: [46.652, 24.638], type: 'commercial', description: 'Commercial Building, Exhibitions and Offices' },
  { id: 33, owner: 'EHC-AUC-AUX', city: 'Riyadh', district: 'Soweidi District', coordinates: [46.642, 24.628], type: 'commercial', description: 'Center Kitchen – Insulation and Tiles Work' },
  { id: 34, owner: 'Eastern Hospitality Company', city: 'Riyadh', district: 'Riyadh', coordinates: [46.675, 24.686], type: 'commercial', description: 'Head Office Renovation Project' },
  { id: 35, owner: 'King Abdullah Park', city: 'Riyadh', district: 'Al-Mizahmiah', coordinates: [46.618, 24.618], type: 'infrastructure', description: 'Landscape Works' },
  { id: 36, owner: 'Hyper Panda', city: 'Riyadh', district: 'Sultanah', coordinates: [46.658, 24.668], type: 'commercial', description: 'Private Mosque – Rock Flooring Works' },
  { id: 37, owner: 'VIP Party', city: 'Riyadh', district: 'Al Sahafa', coordinates: [46.666, 24.674], type: 'infrastructure', description: 'Wall Stone and Landscape Works' },
  { id: 38, owner: 'Private', city: 'Riyadh', district: 'Al Sahafa', coordinates: [46.660, 24.672], type: 'residential', description: '8 Private Villas & Chalets' },
  { id: 39, owner: 'Private', city: 'Riyadh', district: 'Exit 5', coordinates: [46.738, 24.738], type: 'infrastructure', description: 'Wall Stone and Landscape Works – Stone Waterfalls' },
  { id: 40, owner: 'Private', city: 'Riyadh', district: 'Al-Hasam District', coordinates: [46.632, 24.636], type: 'residential', description: 'Private Palace – 8 Private Villas' },
  { id: 41, owner: 'Private', city: 'Riyadh', district: 'Al-Dar Al-Bayda', coordinates: [46.648, 24.648], type: 'infrastructure', description: 'Flooring and Wall Stone Works – Stone Grafting Works' },
  { id: 42, owner: 'Two Schools Complex', city: 'Riyadh', district: 'Schools Project', coordinates: [46.650, 24.640], type: 'commercial', description: 'مجمعين مدارس – Two Schools Complex construction', images: ['/projects/madaris-1.png', '/projects/madaris-2.png', '/projects/madaris-3.png', '/projects/madaris-4.png', '/projects/madaris-5.png', '/projects/madaris-6.png', '/projects/madaris-7.png', '/projects/madaris-8.png'] },
  { id: 43, owner: 'Al Jawar Towers', city: 'Riyadh', district: 'عماير الجوار', coordinates: [46.655, 24.645], type: 'commercial', description: 'عماير الجوار – Al Jawar Towers / Buildings construction', images: ['/projects/al-jawar-1.png', '/projects/al-jawar-2.png', '/projects/al-jawar-3.png', '/projects/al-jawar-4.png', '/projects/al-jawar-5.png', '/projects/al-jawar-6.png', '/projects/al-jawar-7.png', '/projects/al-jawar-8.png', '/projects/al-jawar-9.png', '/projects/al-jawar-10.png', '/projects/al-jawar-11.png', '/projects/al-jawar-12.png', '/projects/al-jawar-13.png', '/projects/al-jawar-14.png', '/projects/al-jawar-15.png', '/projects/al-jawar-16.png', '/projects/al-jawar-17.png', '/projects/al-jawar-18.png', '/projects/al-jawar-19.png', '/projects/al-jawar-20.png', '/projects/al-jawar-21.png', '/projects/al-jawar-22.png', '/projects/al-jawar-23.png', '/projects/al-jawar-24.png', '/projects/al-jawar-25.png'] },
];
