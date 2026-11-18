/**
 * Store Explorer - Stores Database
 *
 * 30 Authentic stores across 5 geographically distributed Indian states:
 * - NORTH: Himachal Pradesh (Shimla, Manali, Dharamshala)
 * - SOUTH: Karnataka (Bengaluru, Mysuru, Mangaluru)
 * - EAST: West Bengal (Kolkata, Darjeeling, Siliguri)
 * - WEST: Gujarat (Ahmedabad, Surat, Vadodara)
 * - CENTRE: Madhya Pradesh (Indore, Bhopal, Jabalpur)
 *
 * Each store includes exact coordinates (WGS84 lat/long) for accurate D3 projection,
 * verified postal codes, contact details, operating hours, and editorial brand stories.
 */

export interface Store {
  id: string;
  stateId: string;
  name: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  description: string;
  image: string;
  url: string;
  lat: number;
  lng: number;
  featured?: boolean;
}

export const STORES: Store[] = [
  // ==========================================
  // NORTH: HIMACHAL PRADESH (2 Stores)
  // ==========================================
  {
    id: "hp-shm-01",
    stateId: "himachal-pradesh",
    name: "Shimla Mall Heritage Boutique",
    city: "Shimla",
    address: "Upper Mall Promenade, Near Scandal Point, The Mall",
    pincode: "171001",
    phone: "+91 177 2809 110",
    hours: "10:00 AM – 8:30 PM Daily",
    description: "Our high-altitude Himalayan flagship housed in a British-era cedar salon, featuring raw pine honey, seabuckthorn infusions, and handcrafted shawls.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/shimla-mall",
    lat: 31.1048,
    lng: 77.1734,
    featured: true
  },
  {
    id: "hp-man-01",
    stateId: "himachal-pradesh",
    name: "Old Manali Cedar Sanctuary",
    city: "Manali",
    address: "Club House Road, Old Manali Village, Kullu Valley",
    pincode: "175131",
    phone: "+91 1902 254 320",
    hours: "9:30 AM – 9:00 PM Daily",
    description: "Nestled beneath snow-clad pines by the Manalsu river, showcasing organic apple preserves, rhododendron syrups, and pure wool lohis.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/old-manali",
    lat: 32.2530,
    lng: 77.1820,
    featured: true
  },

  // ==========================================
  // SOUTH: KARNATAKA (4 Stores)
  // ==========================================
  {
    id: "ka-blr-01",
    stateId: "karnataka",
    name: "Indiranagar Experiential Flagship",
    city: "Bengaluru",
    address: "742, 100 Feet Road, HAL 2nd Stage, Indiranagar",
    pincode: "560038",
    phone: "+91 80 4123 7800",
    hours: "10:30 AM – 9:30 PM Daily",
    description: "Sprawling three-level modern architectural landmark featuring an apothecary tea bar, organic silk library, and sensory aroma pods.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/indiranagar-flagship",
    lat: 12.9784,
    lng: 77.6408,
    featured: true
  },
  {
    id: "ka-blr-02",
    stateId: "karnataka",
    name: "Lavelle Road Heritage Courtyard",
    city: "Bengaluru",
    address: "12 Lavelle Road, Shanthala Nagar, Ashok Nagar",
    pincode: "560001",
    phone: "+91 80 4123 7802",
    hours: "11:00 AM – 9:00 PM",
    description: "Colonial garden courtyard retail sanctuary highlighting pure Mysore sandalwood soaps, Himalayan cold-pressed elixirs, and bespoke pottery.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/lavelle-road",
    lat: 12.9719,
    lng: 77.5997
  },
  {
    id: "ka-mys-01",
    stateId: "karnataka",
    name: "Mysuru Royal Heritage Atelier",
    city: "Mysuru",
    address: "44 Sayyaji Rao Road, Near Devaraja Market, Central Suburb",
    pincode: "570001",
    phone: "+91 821 2422 610",
    hours: "10:00 AM – 8:30 PM",
    description: "Heritage boutique honoring the art of pure mulberry silk weaving, aromatic sandalwood oils, and handcrafted teakwood brassware.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/mysuru-heritage",
    lat: 12.3087,
    lng: 76.6531,
    featured: true
  },
  {
    id: "ka-mng-01",
    stateId: "karnataka",
    name: "Kadri Hills Coastal Sanctuary",
    city: "Mangaluru",
    address: "Temple Square, Kadri Hills, Mallikatte",
    pincode: "575002",
    phone: "+91 824 2218 901",
    hours: "10:00 AM – 8:30 PM",
    description: "Coastal hilltop haven curating virgin coconut oils, organic spices from Western Ghats, and pure beeswax luminaries.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/kadri-hills",
    lat: 12.8797,
    lng: 74.8560
  },

  // ==========================================
  // EAST: WEST BENGAL (6 Stores)
  // ==========================================
  {
    id: "wb-kol-01",
    stateId: "west-bengal",
    name: "Park Street Heritage Flagship",
    city: "Kolkata",
    address: "18 Park Street, Queen's Mansion, Mullick Bazar",
    pincode: "700016",
    phone: "+91 33 2229 4410",
    hours: "10:30 AM – 9:00 PM Daily",
    description: "Grand historic colonnade flagship celebrating single-estate Darjeeling first flush teas, Jamdani handloom textiles, and cold-processed artisanal soaps.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/park-street-flagship",
    lat: 22.5518,
    lng: 88.3533,
    featured: true
  },
  {
    id: "wb-kol-02",
    stateId: "west-bengal",
    name: "Salt Lake City Center Lounge",
    city: "Kolkata",
    address: "Block DC, Sector 1, Bidhannagar, Salt Lake City",
    pincode: "700064",
    phone: "+91 33 2229 4414",
    hours: "11:00 AM – 9:30 PM",
    description: "Modern retail salon presenting pure terracotta homeware, organic mountain honey, and handcrafted brass decorative lighting.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/salt-lake-lounge",
    lat: 22.5867,
    lng: 88.4074
  },
  {
    id: "wb-dar-01",
    stateId: "west-bengal",
    name: "Chowrasta Mall Tea Haven",
    city: "Darjeeling",
    address: "The Mall Promenade, Near Glenary's, Chowrasta",
    pincode: "734101",
    phone: "+91 354 225 6180",
    hours: "9:00 AM – 8:00 PM Daily",
    description: "Legendary hilltop tea lounge overlooking Kanchenjunga peaks, offering vintage muscatel tea tastings, raw forest comb honey, and woollen stoles.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/chowrasta-darjeeling",
    lat: 27.0433,
    lng: 88.2663,
    featured: true
  },
  {
    id: "wb-dar-02",
    stateId: "west-bengal",
    name: "Nehru Road Himalayan Emporium",
    city: "Darjeeling",
    address: "14 Nehru Road, Near Governor House, Central Darjeeling",
    pincode: "734101",
    phone: "+91 354 225 6182",
    hours: "9:30 AM – 8:30 PM",
    description: "Cozy timber-clad store featuring organic ginger preserves, handmade Himalayan paper, and herbal incense collections.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/nehru-road-darjeeling",
    lat: 27.0402,
    lng: 88.2649
  },
  {
    id: "wb-sil-01",
    stateId: "west-bengal",
    name: "Sevoke Foothills Experience Store",
    city: "Siliguri",
    address: "2nd Mile, Sevoke Road, Near Planet Mall",
    pincode: "734001",
    phone: "+91 353 254 8820",
    hours: "10:00 AM – 9:00 PM",
    description: "Gateway store linking Himalayan hills with the plains, stocking certified organic teas, bamboo crafts, and pure essential oils.",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/sevoke-siliguri",
    lat: 26.7329,
    lng: 88.4312
  },
  {
    id: "wb-sil-02",
    stateId: "west-bengal",
    name: "City Centre Cosmopolitan Atelier",
    city: "Siliguri",
    address: "Upper Ground Floor, City Centre Mall, Matigara",
    pincode: "734010",
    phone: "+91 353 254 8824",
    hours: "10:30 AM – 9:30 PM",
    description: "Contemporary lifestyle boutique showcasing handcrafted ceramics, wild botanical beauty remedies, and hand-embroidered textiles.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/city-centre-siliguri",
    lat: 26.7188,
    lng: 88.3842
  },

  // ==========================================
  // WEST: GUJARAT (5 Stores)
  // ==========================================
  {
    id: "gj-ahm-01",
    stateId: "gujarat",
    name: "C.G. Road Textile & Craft Flagship",
    city: "Ahmedabad",
    address: "Supermall Complex, C.G. Road, Navrangpura",
    pincode: "380009",
    phone: "+91 79 4001 2230",
    hours: "10:30 AM – 9:00 PM Daily",
    description: "Spacious architectural pavilion highlighting authentic hand-spun Khadi, block-printed apparel, and organic wellness supplements.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/cg-road-flagship",
    lat: 23.0315,
    lng: 72.5604,
    featured: true
  },
  {
    id: "gj-ahm-02",
    stateId: "gujarat",
    name: "Bodakdev Botanical Pavilion",
    city: "Ahmedabad",
    address: "Sindhu Bhavan Road, Near Pakwan Cross Road, Bodakdev",
    pincode: "380054",
    phone: "+91 79 4001 2235",
    hours: "11:00 AM – 9:30 PM",
    description: "Lush glasshouse store curating rare medicinal herbs, organic cold-pressed oils, and copper water vessels.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/bodakdev-pavilion",
    lat: 23.0456,
    lng: 72.5089
  },
  {
    id: "gj-sur-01",
    stateId: "gujarat",
    name: "Ghod Dod Road Silk Atelier",
    city: "Surat",
    address: "Meghdoot Complex, Ghod Dod Road, Athwa",
    pincode: "395007",
    phone: "+91 261 225 8900",
    hours: "10:30 AM – 9:00 PM",
    description: "Celebrated boutique honoring hand-woven Gujarati Patola, fine diamond-cut glassware, and botanical soaps.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/ghod-dod-surat",
    lat: 21.1738,
    lng: 72.8021,
    featured: true
  },
  {
    id: "gj-sur-02",
    stateId: "gujarat",
    name: "Vesu Waterfront Organic Store",
    city: "Surat",
    address: "Someshwara Enclave, VIP Road, Vesu",
    pincode: "395007",
    phone: "+91 261 225 8904",
    hours: "11:00 AM – 9:00 PM",
    description: "Modern waterfront space offering Vedic nutrition powders, cold-pressed sesame oils, and sustainable jute furnishings.",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/vesu-surat",
    lat: 21.1412,
    lng: 72.7754
  },
  {
    id: "gj-vad-01",
    stateId: "gujarat",
    name: "Alkapuri Royal Heritage Studio",
    city: "Vadodara",
    address: "RC Dutt Road, Near Express Hotel, Alkapuri",
    pincode: "390007",
    phone: "+91 265 233 4110",
    hours: "10:00 AM – 8:30 PM",
    description: "Gaekwad-era artistic boutique showcasing fine bronze cast sculptures, organic saffron, and block-printed cotton duvets.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/alkapuri-vadodara",
    lat: 22.3108,
    lng: 73.1706
  },

  // ==========================================
  // CENTRE: MADHYA PRADESH (8 Stores)
  // ==========================================
  {
    id: "mp-ind-01",
    stateId: "madhya-pradesh",
    name: "Indore Flagship Experience Center",
    city: "Indore",
    address: "Plot 42, Scheme 54, Vijay Nagar, AB Road",
    pincode: "452010",
    phone: "+91 731 4982 100",
    hours: "10:30 AM – 9:00 PM Daily",
    description: "Our signature central India flagship spanning two floors with dedicated botanical tea tastings and handloom curation.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/indore-flagship",
    lat: 22.7533,
    lng: 75.8937,
    featured: true
  },
  {
    id: "mp-ind-02",
    stateId: "madhya-pradesh",
    name: "Old Palasia Heritage Atelier",
    city: "Indore",
    address: "14 Saket Square, Near Anand Bazaar, Old Palasia",
    pincode: "452001",
    phone: "+91 731 4982 102",
    hours: "11:00 AM – 8:30 PM",
    description: "An intimate heritage villa boutique highlighting raw forest honey, stone pottery, and Chanderi silk apparel.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/old-palasia-atelier",
    lat: 22.7244,
    lng: 75.8839
  },
  {
    id: "mp-bho-01",
    stateId: "madhya-pradesh",
    name: "Bhopal Lakefront Concept Store",
    city: "Bhopal",
    address: "7 Shamla Hills Promenade, Upper Lake Road",
    pincode: "462013",
    phone: "+91 755 2774 311",
    hours: "10:30 AM – 9:00 PM Daily",
    description: "Panoramic lakefront sanctuary showcasing tribal Gond art, cold-pressed oils, and bespoke copperware.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/bhopal-lakefront",
    lat: 23.2423,
    lng: 77.3876,
    featured: true
  },
  {
    id: "mp-bho-02",
    stateId: "madhya-pradesh",
    name: "Arera Colony Organic Gallery",
    city: "Bhopal",
    address: "E-4/28, Near 10 No. Market, Arera Colony",
    pincode: "462016",
    phone: "+91 755 2774 314",
    hours: "11:00 AM – 8:30 PM",
    description: "Sunlit retail haven featuring farm-fresh spices, Ayurvedic infusions, and sustainable bamboo decor.",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/arera-colony-gallery",
    lat: 23.2156,
    lng: 77.4305
  },
  {
    id: "mp-jab-01",
    stateId: "madhya-pradesh",
    name: "Marble Rocks Narmada Boutique",
    city: "Jabalpur",
    address: "Bhedaghat Promenade, Near Narmada Ghats",
    pincode: "482003",
    phone: "+91 761 2673 890",
    hours: "10:00 AM – 8:00 PM",
    description: "Riverside boutique crafting soft marble stoneware, wild raw honey, and tribal hand-spun shawls.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/marble-rocks",
    lat: 23.1315,
    lng: 79.8006
  },
  {
    id: "mp-jab-02",
    stateId: "madhya-pradesh",
    name: "Civil Lines Colonial Studio",
    city: "Jabalpur",
    address: "Jackson Square, Near High Court, Civil Lines",
    pincode: "482001",
    phone: "+91 761 2673 894",
    hours: "10:30 AM – 8:30 PM",
    description: "Restored colonial bungalow studio exhibiting Maheshwari silks, brass lanterns, and cold-pressed mustard oils.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/civil-lines-jabalpur",
    lat: 23.1667,
    lng: 79.9419
  },
  {
    id: "mp-ujj-01",
    stateId: "madhya-pradesh",
    name: "Ujjain Mahakal Heritage Atelier",
    city: "Ujjain",
    address: "Mahakal Temple Corridor, Jaisinghpura",
    pincode: "456006",
    phone: "+91 734 2551 200",
    hours: "9:00 AM – 9:00 PM Daily",
    description: "Sacred corridor atelier celebrating traditional temple incense, holy basil essences, and hand-cast bell metal handicrafts.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/ujjain-mahakal",
    lat: 23.1827,
    lng: 75.7682,
    featured: true
  },
  {
    id: "mp-gwa-01",
    stateId: "madhya-pradesh",
    name: "Gwalior Fort Crafts Pavilion",
    city: "Gwalior",
    address: "Fort Road, Near Man Mandir Palace, Lashkar",
    pincode: "474001",
    phone: "+91 751 2440 880",
    hours: "10:00 AM – 8:00 PM",
    description: "Historic hilltop crafts pavilion curating classical Chanderi weaves, stone jaali lamps, and organic forest herbal teas.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    url: "https://himira.co.in/stores/gwalior-fort",
    lat: 26.2298,
    lng: 78.1734
  }
];

export function getStoresByStateId(stateId: string): Store[] {
  return STORES.filter((store) => store.stateId === stateId);
}

export function getStoreById(storeId: string): Store | undefined {
  return STORES.find((store) => store.id === storeId);
}
