import { STORES } from './stores';
import type { Store } from './stores';
import { MONUMENT_IMAGES } from './monumentImages';

export interface StateConfig {
  id: string;
  name: string;
  geoName: string; // Must exactly match TopoJSON properties.ST_NM
  code: string;
  direction: 'North' | 'South' | 'East' | 'West' | 'Centre';
  tagline: string;
  color: string;
  hoverColor: string;
  activeColor: string;
  strokeColor: string;
  lightBg: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  cities: string[];
  centroid: [number, number]; // [lng, lat] approximate visual center
  stores: Store[];
  landmarkImage: string;
  landmarkBase64: string;
  landmarkName: string;
  displayCount: string;
  pinCoords: [number, number]; // SVG canvas pin anchor [x, y]
  cardPosition: {
    top: number; // percentage or px
    left: number;
    anchorSide: 'left' | 'right';
  };
}

export const HIGHLIGHTED_STATES: StateConfig[] = [
  // 1. NORTH: Himachal Pradesh
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    geoName: "Himachal Pradesh",
    code: "HP",
    direction: "North",
    tagline: "Himalayan Crown • Pine Forests, High Meadows & Pure Mountain Honey",
    color: "#8DBA91",
    hoverColor: "#28764D",
    activeColor: "#145C3C",
    strokeColor: "#145C3C",
    lightBg: "#EFF6EE",
    badgeBg: "#DFEEDF",
    badgeText: "#145C3C",
    accentBorder: "#B8D5B8",
    cities: ["Shimla", "Manali"],
    centroid: [77.1734, 31.9],
    stores: STORES.filter((s) => s.stateId === "himachal-pradesh"),
    landmarkImage: "/assets/monuments/himachal.jpg",
    landmarkBase64: MONUMENT_IMAGES['himachal-pradesh'],
    landmarkName: "Himalayan Heritage",
    displayCount: "2 Stores",
    pinCoords: [362, 230],
    cardPosition: {
      top: 152,
      left: 425,
      anchorSide: "left"
    }
  },

  // 2. WEST: Gujarat
  {
    id: "gujarat",
    name: "Gujarat",
    geoName: "Gujarat",
    code: "GJ",
    direction: "West",
    tagline: "Arabian Shoreline • Khadi Looms, Bandhani & Maritime Trade",
    color: "#79AA7E",
    hoverColor: "#28764D",
    activeColor: "#145C3C",
    strokeColor: "#145C3C",
    lightBg: "#EFF6EE",
    badgeBg: "#DFEEDF",
    badgeText: "#145C3C",
    accentBorder: "#B8D5B8",
    cities: ["Ahmedabad", "Surat", "Vadodara"],
    centroid: [71.5, 22.5],
    stores: STORES.filter((s) => s.stateId === "gujarat"),
    landmarkImage: "/assets/monuments/gujarat.jpg",
    landmarkBase64: MONUMENT_IMAGES['gujarat'],
    landmarkName: "Statue of Unity",
    displayCount: "5 Stores",
    pinCoords: [230, 475],
    cardPosition: {
      top: 362,
      left: 16,
      anchorSide: "right"
    }
  },

  // 3. CENTRE: Madhya Pradesh
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    geoName: "Madhya Pradesh",
    code: "MP",
    direction: "Centre",
    tagline: "Heart of India • Ancient Forests, Gond Art & Handloom Havens",
    color: "#639A70",
    hoverColor: "#28764D",
    activeColor: "#145C3C",
    strokeColor: "#145C3C",
    lightBg: "#EFF6EE",
    badgeBg: "#DFEEDF",
    badgeText: "#145C3C",
    accentBorder: "#B8D5B8",
    cities: ["Indore", "Bhopal", "Jabalpur", "Ujjain", "Gwalior"],
    centroid: [78.2679, 23.5],
    stores: STORES.filter((s) => s.stateId === "madhya-pradesh"),
    landmarkImage: "/assets/monuments/madhya-pradesh.jpg",
    landmarkBase64: MONUMENT_IMAGES['madhya-pradesh'],
    landmarkName: "Khajuraho Temple",
    displayCount: "8 Stores",
    pinCoords: [390, 475],
    cardPosition: {
      top: 555,
      left: 470,
      anchorSide: "left"
    }
  },

  // 4. EAST: West Bengal
  {
    id: "west-bengal",
    name: "West Bengal",
    geoName: "West Bengal",
    code: "WB",
    direction: "East",
    tagline: "Bengal Delta • Terracotta Artistry, Muslin & Darjeeling Aromas",
    color: "#4F895F",
    hoverColor: "#28764D",
    activeColor: "#145C3C",
    strokeColor: "#145C3C",
    lightBg: "#EFF6EE",
    badgeBg: "#DFEEDF",
    badgeText: "#145C3C",
    accentBorder: "#B8D5B8",
    cities: ["Kolkata", "Darjeeling", "Siliguri"],
    centroid: [87.8550, 23.5],
    stores: STORES.filter((s) => s.stateId === "west-bengal"),
    landmarkImage: "/assets/monuments/west-bengal.jpg",
    landmarkBase64: MONUMENT_IMAGES['west-bengal'],
    landmarkName: "Victoria Memorial",
    displayCount: "6 Stores",
    pinCoords: [605, 465],
    cardPosition: {
      top: 420,
      left: 690,
      anchorSide: "left"
    }
  },

  // 5. SOUTH: Karnataka
  {
    id: "karnataka",
    name: "Karnataka",
    geoName: "Karnataka",
    code: "KA",
    direction: "South",
    tagline: "Deccan Plateau • Sandalwood, Silk Weaves & Silicon Innovation",
    color: "#397850",
    hoverColor: "#28764D",
    activeColor: "#145C3C",
    strokeColor: "#145C3C",
    lightBg: "#EFF6EE",
    badgeBg: "#DFEEDF",
    badgeText: "#145C3C",
    accentBorder: "#B8D5B8",
    cities: ["Bengaluru", "Mysuru", "Mangaluru"],
    centroid: [75.7139, 14.5],
    stores: STORES.filter((s) => s.stateId === "karnataka"),
    landmarkImage: "/assets/monuments/karnataka.jpg",
    landmarkBase64: MONUMENT_IMAGES['karnataka'],
    landmarkName: "Vidhana Soudha",
    displayCount: "4 Stores",
    pinCoords: [335, 680],
    cardPosition: {
      top: 720,
      left: 80,
      anchorSide: "right"
    }
  }
];

// Quick Lookup Maps for O(1) performance
export const STATE_BY_ID_MAP = new Map<string, StateConfig>(
  HIGHLIGHTED_STATES.map((s) => [s.id, s])
);

export const STATE_BY_GEONAME_MAP = new Map<string, StateConfig>(
  HIGHLIGHTED_STATES.map((s) => [s.geoName, s])
);

export function getStateById(id: string): StateConfig | undefined {
  return STATE_BY_ID_MAP.get(id);
}

export function getStateByGeoName(geoName: string): StateConfig | undefined {
  return STATE_BY_GEONAME_MAP.get(geoName);
}

export function isStateHighlighted(geoName: string): boolean {
  return STATE_BY_GEONAME_MAP.has(geoName);
}

export function getTotalHighlightedStoresCount(): number {
  return HIGHLIGHTED_STATES.reduce((sum, s) => sum + s.stores.length, 0);
}
