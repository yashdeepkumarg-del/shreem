/**
 * Madhya Pradesh Districts Configuration for Interactive Craft Map
 */
import { MP_STORES, MPStore } from './mp-stores';

export interface MPDistrictConfig {
  id: string;
  name: string;
  geoName: string;
  code: string;
  division: string;
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
  centroid: [number, number] | number[];
  pinCoords: [number, number] | number[];
  landmarkName: string;
  landmarkImage: string;
  isFlagship: boolean;
  mapLabel: string;
  shadeName: string;
  cardPos?: { x: number; y: number; w: number; h: number } | null;
  curve?: string | null;
  stores: MPStore[];
  displayCount: string;
}

const RAW_DISTRICTS = [
  {
    "id": "ashoknagar",
    "name": "Ashoknagar (Chanderi)",
    "geoName": "Ashoknagar",
    "code": "CHD",
    "division": "Gwalior Division",
    "tagline": "GI Chanderi Silk Saree Guild • Sheer Cotton & Gold Zari Weaving Masterpieces",
    "color": "#047857",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Chanderi",
      "Ashoknagar",
      "Mungeroli"
    ],
    "centroid": [
      406,
      395
    ],
    "pinCoords": [
      406,
      395
    ],
    "landmarkName": "Koshak Mahal Chanderi",
    "landmarkImage": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 470,
      "y": 320,
      "w": 182,
      "h": 54
    },
    "curve": "M 406,395 C 440,395 445,347 470,347",
    "mapLabel": "Chanderi",
    "shadeName": "Chanderi Evergreen"
  },
  {
    "id": "bhopal",
    "name": "Bhopal",
    "geoName": "Bhopal",
    "code": "BHO",
    "division": "Bhopal Division",
    "tagline": "City of Lakes • Zari Zardozi Embroidery, Gond Tribal Art & Shamla Hills",
    "color": "#0F8A5F",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Bhopal",
      "Berasia",
      "Kolar"
    ],
    "centroid": [
      359,
      516
    ],
    "pinCoords": [
      359,
      516
    ],
    "landmarkName": "Upper Lake Heritage",
    "landmarkImage": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 310,
      "y": 440,
      "w": 172,
      "h": 54
    },
    "curve": "M 359,516 C 340,490 370,470 396,470",
    "mapLabel": "Bhopal",
    "shadeName": "Bhojpal Tangerine"
  },
  {
    "id": "chhatarpur",
    "name": "Chhatarpur (Khajuraho)",
    "geoName": "Chhatarpur",
    "code": "KHJ",
    "division": "Sagar Division",
    "tagline": "UNESCO World Heritage • Chandela Sandstone Sculptures & Temple Artistry",
    "color": "#0E6251",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Khajuraho",
      "Chhatarpur",
      "Nowgong"
    ],
    "centroid": [
      581,
      374
    ],
    "pinCoords": [
      581,
      374
    ],
    "landmarkName": "Kandariya Mahadeva Temple",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": true,
    "cardPos": {
      "x": 645,
      "y": 310,
      "w": 185,
      "h": 54
    },
    "curve": "M 581,374 C 615,374 625,337 645,337",
    "mapLabel": "Khajuraho",
    "shadeName": "Khajuraho Crimson"
  },
  {
    "id": "gwalior",
    "name": "Gwalior",
    "geoName": "Gwalior",
    "code": "GWL",
    "division": "Gwalior Division",
    "tagline": "Pearl of Fortresses • Sandstone Jaali, Classical Tansen Sangeet & Chanderi Weaves",
    "color": "#059669",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Gwalior",
      "Dabra",
      "Bhitarwar"
    ],
    "centroid": [
      432,
      239
    ],
    "pinCoords": [
      432,
      239
    ],
    "landmarkName": "Gwalior Fort",
    "landmarkImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 235,
      "y": 170,
      "w": 172,
      "h": 54
    },
    "curve": "M 432,239 C 390,239 390,197 407,197",
    "mapLabel": "Gwalior",
    "shadeName": "Imperial Emerald"
  },
  {
    "id": "indore",
    "name": "Indore",
    "geoName": "Indore",
    "code": "IND",
    "division": "Indore Division",
    "tagline": "Commercial Capital • Holkar Dynasty, Leather Toys & Sarafa Zari",
    "color": "#064E3B",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Indore",
      "Mhow",
      "Sanwer"
    ],
    "centroid": [
      201,
      598
    ],
    "pinCoords": [
      201,
      598
    ],
    "landmarkName": "Rajwada Palace",
    "landmarkImage": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 14,
      "y": 565,
      "w": 172,
      "h": 54
    },
    "curve": "M 201,598 C 160,598 175,592 186,592",
    "mapLabel": "Indore",
    "shadeName": "Rajwada Electric Magenta"
  },
  {
    "id": "jabalpur",
    "name": "Jabalpur",
    "geoName": "Jabalpur",
    "code": "JBL",
    "division": "Jabalpur Division",
    "tagline": "Marble Rock Enclave • Narmada Gorge Carving, Dhurrie Weaving & Gond Art",
    "color": "#1E4D2B",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Jabalpur",
      "Bhedaghat",
      "Sihora"
    ],
    "centroid": [
      612,
      543
    ],
    "pinCoords": [
      612,
      543
    ],
    "landmarkName": "Marble Rocks Bhedaghat",
    "landmarkImage": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 675,
      "y": 520,
      "w": 175,
      "h": 54
    },
    "curve": "M 612,543 C 640,543 650,547 675,547",
    "mapLabel": "Jabalpur",
    "shadeName": "Marble Golden Sun"
  },
  {
    "id": "khargone-west-nimar-",
    "name": "Khargone (Maheshwar)",
    "geoName": "Khargone (West Nimar)",
    "code": "MHW",
    "division": "Indore Division",
    "tagline": "GI Maheshwari Handlooms • Ahilyabai Holkar Fort & Narmada Silk Weaves",
    "color": "#08694D",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Maheshwar",
      "Khargone",
      "Barwaha"
    ],
    "centroid": [
      200,
      683
    ],
    "pinCoords": [
      200,
      683
    ],
    "landmarkName": "Ahilya Fort Maheshwar",
    "landmarkImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 60,
      "y": 735,
      "w": 185,
      "h": 54
    },
    "curve": "M 200,683 C 200,720 180,750 245,750",
    "mapLabel": "Maheshwar",
    "shadeName": "Maheshwar Queen Pink"
  },
  {
    "id": "ujjain",
    "name": "Ujjain",
    "geoName": "Ujjain",
    "code": "UJN",
    "division": "Ujjain Division",
    "tagline": "Sacred Mahakal Realm • Bhairavgarh Batik Printing & Vedic Brass Craft",
    "color": "#14532D",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Ujjain",
      "Nagda",
      "Tarana"
    ],
    "centroid": [
      190,
      532
    ],
    "pinCoords": [
      190,
      532
    ],
    "landmarkName": "Mahakaleshwar Temple",
    "landmarkImage": "https://images.unsplash.com/photo-1622396636133-ba43f812dd33?auto=format&fit=crop&w=600&q=80",
    "isFlagship": true,
    "cardPos": {
      "x": 14,
      "y": 460,
      "w": 172,
      "h": 54
    },
    "curve": "M 190,532 C 160,532 170,487 186,487",
    "mapLabel": "Ujjain",
    "shadeName": "Mahakal Cobalt"
  },
  {
    "id": "agar",
    "name": "Agar",
    "geoName": "Agar",
    "code": "AGA",
    "division": "Ujjain Division",
    "tagline": "Agar Artisanal Crafts & Heritage Cooperative",
    "color": "#166534",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Agar"
    ],
    "centroid": [
      230,
      479
    ],
    "pinCoords": [
      230,
      479
    ],
    "landmarkName": "Agar Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Agar",
    "shadeName": "Agar Malwa Deep Indigo"
  },
  {
    "id": "alirajpur",
    "name": "Alirajpur",
    "geoName": "Alirajpur",
    "code": "ALI",
    "division": "Indore Division",
    "tagline": "Alirajpur Artisanal Crafts & Heritage Cooperative",
    "color": "#065A42",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Alirajpur"
    ],
    "centroid": [
      62,
      641
    ],
    "pinCoords": [
      62,
      641
    ],
    "landmarkName": "Alirajpur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Alirajpur",
    "shadeName": "Noorjahan Salmon Coral"
  },
  {
    "id": "anuppur",
    "name": "Anuppur",
    "geoName": "Anuppur",
    "code": "ANU",
    "division": "Shahdol Division",
    "tagline": "Anuppur Artisanal Crafts & Heritage Cooperative",
    "color": "#185A42",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Anuppur"
    ],
    "centroid": [
      779,
      562
    ],
    "pinCoords": [
      779,
      562
    ],
    "landmarkName": "Anuppur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Anuppur",
    "shadeName": "Amarkantak Lavender"
  },
  {
    "id": "balaghat",
    "name": "Balaghat",
    "geoName": "Balaghat",
    "code": "BAL",
    "division": "Jabalpur Division",
    "tagline": "Balaghat Artisanal Crafts & Heritage Cooperative",
    "color": "#245E35",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Balaghat"
    ],
    "centroid": [
      649,
      686
    ],
    "pinCoords": [
      649,
      686
    ],
    "landmarkName": "Balaghat Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Balaghat",
    "shadeName": "Manganese Bronze"
  },
  {
    "id": "barwani",
    "name": "Barwani",
    "geoName": "Barwani",
    "code": "BAR",
    "division": "Indore Division",
    "tagline": "Barwani Artisanal Crafts & Heritage Cooperative",
    "color": "#0D7A58",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Barwani"
    ],
    "centroid": [
      126,
      695
    ],
    "pinCoords": [
      126,
      695
    ],
    "landmarkName": "Barwani Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Barwani",
    "shadeName": "Choolgiri Deep Berry"
  },
  {
    "id": "betul",
    "name": "Betul",
    "geoName": "Betul",
    "code": "BET",
    "division": "Narmadapuram Division",
    "tagline": "Betul Artisanal Crafts & Heritage Cooperative",
    "color": "#0E7043",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Betul"
    ],
    "centroid": [
      406,
      686
    ],
    "pinCoords": [
      406,
      686
    ],
    "landmarkName": "Betul Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Betul",
    "shadeName": "Satpura Ocean Blue"
  },
  {
    "id": "bhind",
    "name": "Bhind",
    "geoName": "Bhind",
    "code": "BHI",
    "division": "Chambal Division",
    "tagline": "Bhind Artisanal Crafts & Heritage Cooperative",
    "color": "#1E5631",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Bhind"
    ],
    "centroid": [
      489,
      198
    ],
    "pinCoords": [
      489,
      198
    ],
    "landmarkName": "Bhind Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Bhind",
    "shadeName": "Blush Petal"
  },
  {
    "id": "burhanpur",
    "name": "Burhanpur",
    "geoName": "Burhanpur",
    "code": "BUR",
    "division": "Indore Division",
    "tagline": "Burhanpur Artisanal Crafts & Heritage Cooperative",
    "color": "#05583E",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Burhanpur"
    ],
    "centroid": [
      259,
      740
    ],
    "pinCoords": [
      259,
      740
    ],
    "landmarkName": "Burhanpur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Burhanpur",
    "shadeName": "Asirgarh Royal Mulberry"
  },
  {
    "id": "chhindwara",
    "name": "Chhindwara",
    "geoName": "Chhindwara",
    "code": "CHH",
    "division": "Jabalpur Division",
    "tagline": "Chhindwara Artisanal Crafts & Heritage Cooperative",
    "color": "#2B703F",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Chhindwara"
    ],
    "centroid": [
      502,
      661
    ],
    "pinCoords": [
      502,
      661
    ],
    "landmarkName": "Chhindwara Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Chhindwara",
    "shadeName": "Patalkot Saffron"
  },
  {
    "id": "damoh",
    "name": "Damoh",
    "geoName": "Damoh",
    "code": "DAM",
    "division": "Sagar Division",
    "tagline": "Damoh Artisanal Crafts & Heritage Cooperative",
    "color": "#168F76",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Damoh"
    ],
    "centroid": [
      568,
      480
    ],
    "pinCoords": [
      568,
      480
    ],
    "landmarkName": "Damoh Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Damoh",
    "shadeName": "Nauradehi Coral"
  },
  {
    "id": "datia",
    "name": "Datia",
    "geoName": "Datia",
    "code": "DAT",
    "division": "Gwalior Division",
    "tagline": "Datia Artisanal Crafts & Heritage Cooperative",
    "color": "#065F46",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Datia"
    ],
    "centroid": [
      475,
      267
    ],
    "pinCoords": [
      475,
      267
    ],
    "landmarkName": "Datia Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Datia",
    "shadeName": "Mint Jade"
  },
  {
    "id": "dewas",
    "name": "Dewas",
    "geoName": "Dewas",
    "code": "DEW",
    "division": "Ujjain Division",
    "tagline": "Dewas Artisanal Crafts & Heritage Cooperative",
    "color": "#15803D",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Dewas"
    ],
    "centroid": [
      267,
      594
    ],
    "pinCoords": [
      267,
      594
    ],
    "landmarkName": "Dewas Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Dewas",
    "shadeName": "Chamunda Midnight Navy"
  },
  {
    "id": "dhar",
    "name": "Dhar (Bagh & Mandu)",
    "geoName": "Dhar",
    "code": "DHR",
    "division": "Indore Division",
    "tagline": "GI Bagh Print Haven • Natural River Dyes, Wooden Blocks & Jahaz Mahal Ruins",
    "color": "#046347",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Bagh",
      "Mandu",
      "Dhar"
    ],
    "centroid": [
      135,
      621
    ],
    "pinCoords": [
      135,
      621
    ],
    "landmarkName": "Jahaz Mahal Mandu",
    "landmarkImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Dhar",
    "shadeName": "Mandu Romance Fuchsia"
  },
  {
    "id": "dindori",
    "name": "Dindori",
    "geoName": "Dindori",
    "code": "DIN",
    "division": "Shahdol Division",
    "tagline": "Dindori Artisanal Crafts & Heritage Cooperative",
    "color": "#1E6B4F",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Dindori"
    ],
    "centroid": [
      717,
      579
    ],
    "pinCoords": [
      717,
      579
    ],
    "landmarkName": "Dindori Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Dindori",
    "shadeName": "Gond Indigo-Purple"
  },
  {
    "id": "guna",
    "name": "Guna",
    "geoName": "Guna",
    "code": "GUN",
    "division": "Gwalior Division",
    "tagline": "Guna Artisanal Crafts & Heritage Cooperative",
    "color": "#0D6E54",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Guna"
    ],
    "centroid": [
      340,
      400
    ],
    "pinCoords": [
      340,
      400
    ],
    "landmarkName": "Guna Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Guna",
    "shadeName": "Lush Pine"
  },
  {
    "id": "harda",
    "name": "Harda",
    "geoName": "Harda",
    "code": "HAR",
    "division": "Narmadapuram Division",
    "tagline": "Harda Artisanal Crafts & Heritage Cooperative",
    "color": "#074D2D",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Harda"
    ],
    "centroid": [
      332,
      649
    ],
    "pinCoords": [
      332,
      649
    ],
    "landmarkName": "Harda Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Harda",
    "shadeName": "Narmada Cerulean"
  },
  {
    "id": "jhabua",
    "name": "Jhabua",
    "geoName": "Jhabua",
    "code": "JHA",
    "division": "Indore Division",
    "tagline": "Jhabua Artisanal Crafts & Heritage Cooperative",
    "color": "#0A5C36",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Jhabua"
    ],
    "centroid": [
      93,
      580
    ],
    "pinCoords": [
      93,
      580
    ],
    "landmarkName": "Jhabua Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Jhabua",
    "shadeName": "Bhagoria Hot Pink"
  },
  {
    "id": "katni",
    "name": "Katni",
    "geoName": "Katni",
    "code": "KAT",
    "division": "Jabalpur Division",
    "tagline": "Katni Artisanal Crafts & Heritage Cooperative",
    "color": "#19582A",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Katni"
    ],
    "centroid": [
      653,
      487
    ],
    "pinCoords": [
      653,
      487
    ],
    "landmarkName": "Katni Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Katni",
    "shadeName": "Lemon Marigold"
  },
  {
    "id": "khandwa-east-nimar-",
    "name": "Khandwa (East Nimar)",
    "geoName": "Khandwa (East Nimar)",
    "code": "KHA",
    "division": "Indore Division",
    "tagline": "Khandwa (East Nimar) Artisanal Crafts & Heritage Cooperative",
    "color": "#0F8260",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Khandwa (East Nimar)"
    ],
    "centroid": [
      278,
      680
    ],
    "pinCoords": [
      278,
      680
    ],
    "landmarkName": "Khandwa (East Nimar) Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Khandwa",
    "shadeName": "Omkareshwar Orchid"
  },
  {
    "id": "mandla",
    "name": "Mandla",
    "geoName": "Mandla",
    "code": "MAN",
    "division": "Jabalpur Division",
    "tagline": "Mandla Artisanal Crafts & Heritage Cooperative",
    "color": "#1A6331",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Mandla"
    ],
    "centroid": [
      664,
      606
    ],
    "pinCoords": [
      664,
      606
    ],
    "landmarkName": "Mandla Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Mandla",
    "shadeName": "Kanha Warm Ochre"
  },
  {
    "id": "mandsaur",
    "name": "Mandsaur",
    "geoName": "Mandsaur",
    "code": "MAN",
    "division": "Ujjain Division",
    "tagline": "Mandsaur Artisanal Crafts & Heritage Cooperative",
    "color": "#196F3D",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Mandsaur"
    ],
    "centroid": [
      164,
      438
    ],
    "pinCoords": [
      164,
      438
    ],
    "landmarkName": "Mandsaur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Mandsaur",
    "shadeName": "Pashupatinath Sapphire"
  },
  {
    "id": "morena",
    "name": "Morena",
    "geoName": "Morena",
    "code": "MOR",
    "division": "Chambal Division",
    "tagline": "Morena Artisanal Crafts & Heritage Cooperative",
    "color": "#2D6A4F",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Morena"
    ],
    "centroid": [
      405,
      199
    ],
    "pinCoords": [
      405,
      199
    ],
    "landmarkName": "Morena Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Morena",
    "shadeName": "Coral Sunrise"
  },
  {
    "id": "hoshangabad",
    "name": "Narmadapuram (Hoshangabad)",
    "geoName": "Hoshangabad",
    "code": "NDP",
    "division": "Narmadapuram Division",
    "tagline": "Sacred Riverfront & Satpura Queen • Sethani Ghat & Pachmarhi Forest Botanicals",
    "color": "#0A5C36",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Narmadapuram",
      "Pachmarhi",
      "Itarsi"
    ],
    "centroid": [
      417,
      611
    ],
    "pinCoords": [
      417,
      611
    ],
    "landmarkName": "Sethani Ghat",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Hoshangabad",
    "shadeName": "Pachmarhi Sky Azure"
  },
  {
    "id": "narsimhapur",
    "name": "Narsimhapur",
    "geoName": "Narsimhapur",
    "code": "NAR",
    "division": "Jabalpur Division",
    "tagline": "Narsimhapur Artisanal Crafts & Heritage Cooperative",
    "color": "#206E37",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Narsimhapur"
    ],
    "centroid": [
      525,
      574
    ],
    "pinCoords": [
      525,
      574
    ],
    "landmarkName": "Narsimhapur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Narsimhapur",
    "shadeName": "Narmada Honey-Amber"
  },
  {
    "id": "neemuch",
    "name": "Neemuch",
    "geoName": "Neemuch",
    "code": "NEE",
    "division": "Ujjain Division",
    "tagline": "Neemuch Artisanal Crafts & Heritage Cooperative",
    "color": "#1E7E46",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Neemuch"
    ],
    "centroid": [
      139,
      395
    ],
    "pinCoords": [
      139,
      395
    ],
    "landmarkName": "Neemuch Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Neemuch",
    "shadeName": "Cornflower Sky"
  },
  {
    "id": "panna",
    "name": "Panna",
    "geoName": "Panna",
    "code": "PAN",
    "division": "Sagar Division",
    "tagline": "Panna Artisanal Crafts & Heritage Cooperative",
    "color": "#0B5345",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Panna"
    ],
    "centroid": [
      633,
      415
    ],
    "pinCoords": [
      633,
      415
    ],
    "landmarkName": "Panna Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Panna",
    "shadeName": "Panna Ruby"
  },
  {
    "id": "raisen",
    "name": "Raisen",
    "geoName": "Raisen",
    "code": "RAI",
    "division": "Bhopal Division",
    "tagline": "Raisen Artisanal Crafts & Heritage Cooperative",
    "color": "#10B981",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Raisen"
    ],
    "centroid": [
      430,
      544
    ],
    "pinCoords": [
      430,
      544
    ],
    "landmarkName": "Raisen Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Raisen",
    "shadeName": "Sanchi Sunset Rust"
  },
  {
    "id": "rajgarh",
    "name": "Rajgarh",
    "geoName": "Rajgarh",
    "code": "RAJ",
    "division": "Bhopal Division",
    "tagline": "Rajgarh Artisanal Crafts & Heritage Cooperative",
    "color": "#046A4E",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Rajgarh"
    ],
    "centroid": [
      294,
      475
    ],
    "pinCoords": [
      294,
      475
    ],
    "landmarkName": "Rajgarh Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Rajgarh",
    "shadeName": "Narsinghgarh Terracotta"
  },
  {
    "id": "ratlam",
    "name": "Ratlam",
    "geoName": "Ratlam",
    "code": "RAT",
    "division": "Ujjain Division",
    "tagline": "Ratlam Artisanal Crafts & Heritage Cooperative",
    "color": "#1B5E20",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Ratlam"
    ],
    "centroid": [
      133,
      514
    ],
    "pinCoords": [
      133,
      514
    ],
    "landmarkName": "Ratlam Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Ratlam",
    "shadeName": "Malwa Ultramarine"
  },
  {
    "id": "rewa",
    "name": "Rewa",
    "geoName": "Rewa",
    "code": "REW",
    "division": "Rewa Division",
    "tagline": "White Tiger Heritage • Intricate Betel Nut Carving & Vindhya Forest Elixirs",
    "color": "#0D5C3A",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Rewa",
      "Mauganj",
      "Govindgarh"
    ],
    "centroid": [
      770,
      379
    ],
    "pinCoords": [
      770,
      379
    ],
    "landmarkName": "Rewa Royal Fort",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Rewa",
    "shadeName": "White Tiger Cyan"
  },
  {
    "id": "sagar",
    "name": "Sagar",
    "geoName": "Sagar",
    "code": "SGR",
    "division": "Sagar Division",
    "tagline": "Heart of Bundelkhand • Brass Metal Vessels & Lakha Banjara Lake Heritage",
    "color": "#117A65",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Sagar",
      "Bina",
      "Rahatgarh"
    ],
    "centroid": [
      493,
      477
    ],
    "pinCoords": [
      493,
      477
    ],
    "landmarkName": "Lakha Banjara Lake",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Sagar",
    "shadeName": "Lakha Rose-Red"
  },
  {
    "id": "satna",
    "name": "Satna",
    "geoName": "Satna",
    "code": "SAT",
    "division": "Rewa Division",
    "tagline": "Satna Artisanal Crafts & Heritage Cooperative",
    "color": "#0B6E4F",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Satna"
    ],
    "centroid": [
      696,
      403
    ],
    "pinCoords": [
      696,
      403
    ],
    "landmarkName": "Satna Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Satna",
    "shadeName": "Chitrakoot Turquoise"
  },
  {
    "id": "sehore",
    "name": "Sehore",
    "geoName": "Sehore",
    "code": "SEH",
    "division": "Bhopal Division",
    "tagline": "Sehore Artisanal Crafts & Heritage Cooperative",
    "color": "#05805B",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Sehore"
    ],
    "centroid": [
      333,
      568
    ],
    "pinCoords": [
      333,
      568
    ],
    "landmarkName": "Sehore Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Sehore",
    "shadeName": "Chitawad Apricot"
  },
  {
    "id": "seoni",
    "name": "Seoni",
    "geoName": "Seoni",
    "code": "SEO",
    "division": "Jabalpur Division",
    "tagline": "Seoni Artisanal Crafts & Heritage Cooperative",
    "color": "#165026",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Seoni"
    ],
    "centroid": [
      584,
      640
    ],
    "pinCoords": [
      584,
      640
    ],
    "landmarkName": "Seoni Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Seoni",
    "shadeName": "Mowgli Safari Sand"
  },
  {
    "id": "shahdol",
    "name": "Shahdol",
    "geoName": "Shahdol",
    "code": "SHA",
    "division": "Shahdol Division",
    "tagline": "Shahdol Artisanal Crafts & Heritage Cooperative",
    "color": "#134E39",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Shahdol"
    ],
    "centroid": [
      759,
      500
    ],
    "pinCoords": [
      759,
      500
    ],
    "landmarkName": "Shahdol Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Shahdol",
    "shadeName": "Son Amethyst"
  },
  {
    "id": "shajapur",
    "name": "Shajapur",
    "geoName": "Shajapur",
    "code": "SHA",
    "division": "Ujjain Division",
    "tagline": "Shajapur Artisanal Crafts & Heritage Cooperative",
    "color": "#237A3B",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Shajapur"
    ],
    "centroid": [
      277,
      527
    ],
    "pinCoords": [
      277,
      527
    ],
    "landmarkName": "Shajapur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Shajapur",
    "shadeName": "Shajahanpur Iris"
  },
  {
    "id": "sheopur",
    "name": "Sheopur",
    "geoName": "Sheopur",
    "code": "SHE",
    "division": "Chambal Division",
    "tagline": "Sheopur Artisanal Crafts & Heritage Cooperative",
    "color": "#1B4332",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Sheopur"
    ],
    "centroid": [
      321,
      271
    ],
    "pinCoords": [
      321,
      271
    ],
    "landmarkName": "Sheopur Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Sheopur",
    "shadeName": "Rose Blossom"
  },
  {
    "id": "shivpuri",
    "name": "Shivpuri",
    "geoName": "Shivpuri",
    "code": "SHI",
    "division": "Gwalior Division",
    "tagline": "Shivpuri Artisanal Crafts & Heritage Cooperative",
    "color": "#0F766E",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Shivpuri"
    ],
    "centroid": [
      398,
      313
    ],
    "pinCoords": [
      398,
      313
    ],
    "landmarkName": "Shivpuri Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Shivpuri",
    "shadeName": "Forest Verdant"
  },
  {
    "id": "sidhi",
    "name": "Sidhi",
    "geoName": "Sidhi",
    "code": "SID",
    "division": "Rewa Division",
    "tagline": "Sidhi Artisanal Crafts & Heritage Cooperative",
    "color": "#047857",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Sidhi"
    ],
    "centroid": [
      794,
      437
    ],
    "pinCoords": [
      794,
      437
    ],
    "landmarkName": "Sidhi Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Sidhi",
    "shadeName": "Sanjay Deep Aqua"
  },
  {
    "id": "singrauli",
    "name": "Singrauli",
    "geoName": "Singrauli",
    "code": "SIN",
    "division": "Rewa Division",
    "tagline": "Singrauli Artisanal Crafts & Heritage Cooperative",
    "color": "#065F46",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Singrauli"
    ],
    "centroid": [
      851,
      437
    ],
    "pinCoords": [
      851,
      437
    ],
    "landmarkName": "Singrauli Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Singrauli",
    "shadeName": "Urjanagari Seafoam"
  },
  {
    "id": "tikamgarh",
    "name": "Tikamgarh",
    "geoName": "Tikamgarh",
    "code": "TIK",
    "division": "Sagar Division",
    "tagline": "Tikamgarh Artisanal Crafts & Heritage Cooperative",
    "color": "#0D5C4C",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Tikamgarh"
    ],
    "centroid": [
      511,
      354
    ],
    "pinCoords": [
      511,
      354
    ],
    "landmarkName": "Tikamgarh Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Tikamgarh",
    "shadeName": "Bundela Scarlet"
  },
  {
    "id": "umaria",
    "name": "Umaria",
    "geoName": "Umaria",
    "code": "UMA",
    "division": "Shahdol Division",
    "tagline": "Umaria Artisanal Crafts & Heritage Cooperative",
    "color": "#0F4331",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Umaria"
    ],
    "centroid": [
      709,
      507
    ],
    "pinCoords": [
      709,
      507
    ],
    "landmarkName": "Umaria Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Umaria",
    "shadeName": "Bandhavgarh Violet"
  },
  {
    "id": "vidisha",
    "name": "Vidisha",
    "geoName": "Vidisha",
    "code": "VID",
    "division": "Bhopal Division",
    "tagline": "Vidisha Artisanal Crafts & Heritage Cooperative",
    "color": "#0A7B58",
    "hoverColor": "#34D399",
    "activeColor": "#A7F3D0",
    "strokeColor": "#FFFFFF",
    "lightBg": "#EFF6EE",
    "badgeBg": "#DFEEDF",
    "badgeText": "#145C3C",
    "accentBorder": "#B8D5B8",
    "cities": [
      "Vidisha"
    ],
    "centroid": [
      400,
      472
    ],
    "pinCoords": [
      400,
      472
    ],
    "landmarkName": "Vidisha Heritage Hub",
    "landmarkImage": "/assets/monuments/madhya-pradesh.jpg",
    "isFlagship": false,
    "cardPos": null,
    "curve": null,
    "mapLabel": "Vidisha",
    "shadeName": "Besnagar Marigold"
  }
];

export const MP_DISTRICTS: MPDistrictConfig[] = RAW_DISTRICTS.map(d => {
  const stores = MP_STORES.filter(s => s.districtName.toLowerCase() === d.geoName.toLowerCase());
  return {
    ...d,
    stores,
    displayCount: stores.length + (stores.length === 1 ? ' Store' : ' Stores')
  };
});

export const FLAGSHIP_HUBS = MP_DISTRICTS.filter(d => d.isFlagship);

const DISTRICT_BY_ID = new Map<string, MPDistrictConfig>(MP_DISTRICTS.map(d => [d.id, d]));
const DISTRICT_BY_GEONAME = new Map<string, MPDistrictConfig>(MP_DISTRICTS.map(d => [d.geoName.toLowerCase(), d]));

export function getDistrictById(id: string): MPDistrictConfig | undefined {
  return DISTRICT_BY_ID.get(id);
}

export function getDistrictByGeoName(geoName: string): MPDistrictConfig | undefined {
  return DISTRICT_BY_GEONAME.get(geoName.toLowerCase());
}
