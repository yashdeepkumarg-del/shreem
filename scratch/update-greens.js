import fs from 'node:fs';
import path from 'node:path';

const GREEN_PALETTE = {
  // Gwalior Division (5)
  'ashoknagar': '#047857',
  'gwalior': '#059669',
  'datia': '#065F46',
  'guna': '#0D6E54',
  'shivpuri': '#0F766E',

  // Bhopal Division (5)
  'bhopal': '#0F8A5F',
  'raisen': '#10B981',
  'sehore': '#05805B',
  'rajgarh': '#046A4E',
  'vidisha': '#0A7B58',

  // Sagar Division (5)
  'chhatarpur': '#0E6251',
  'sagar': '#117A65',
  'damoh': '#168F76',
  'panna': '#0B5345',
  'tikamgarh': '#0D5C4C',

  // Indore Division (8)
  'indore': '#064E3B',
  'dhar': '#046347',
  'jhabua': '#0A5C36',
  'alirajpur': '#065A42',
  'khargone-west-nimar-': '#08694D',
  'barwani': '#0D7A58',
  'khandwa-east-nimar-': '#0F8260',
  'burhanpur': '#05583E',

  // Jabalpur Division (7)
  'jabalpur': '#1E4D2B',
  'balaghat': '#245E35',
  'chhindwara': '#2B703F',
  'katni': '#19582A',
  'mandla': '#1A6331',
  'narsimhapur': '#206E37',
  'seoni': '#165026',

  // Ujjain Division (7)
  'ujjain': '#14532D',
  'agar': '#166534',
  'dewas': '#15803D',
  'mandsaur': '#196F3D',
  'neemuch': '#1E7E46',
  'ratlam': '#1B5E20',
  'shajapur': '#237A3B',

  // Shahdol Division (4)
  'shahdol': '#134E39',
  'anuppur': '#185A42',
  'dindori': '#1E6B4F',
  'umaria': '#0F4331',

  // Narmadapuram Division (3)
  'hoshangabad': '#0A5C36',
  'betul': '#0E7043',
  'harda': '#074D2D',

  // Chambal Division (3)
  'bhind': '#1E5631',
  'morena': '#2D6A4F',
  'sheopur': '#1B4332',

  // Rewa Division (4)
  'rewa': '#0D5C3A',
  'satna': '#0B6E4F',
  'sidhi': '#047857',
  'singrauli': '#065F46'
};

const configPath = path.join(process.cwd(), 'src', 'app', 'data', 'mp-districts.config.ts');
let content = fs.readFileSync(configPath, 'utf8');

// Parse RAW_DISTRICTS
const rawStart = content.indexOf('const RAW_DISTRICTS = [');
const rawEnd = content.indexOf('];', rawStart);

if (rawStart === -1 || rawEnd === -1) {
  console.error('Could not locate RAW_DISTRICTS');
  process.exit(1);
}

const rawJsonStr = content.substring(rawStart + 'const RAW_DISTRICTS = '.length, rawEnd + 1);
const districts = JSON.parse(rawJsonStr);

console.log(`Loaded ${districts.length} districts.`);

let updatedCount = 0;
districts.forEach(d => {
  const greenHex = GREEN_PALETTE[d.id] || '#059669';
  d.color = greenHex;
  d.hoverColor = '#34D399';
  d.activeColor = '#A7F3D0';
  d.strokeColor = '#FFFFFF';
  updatedCount++;
});

console.log(`Updated ${updatedCount} districts with shades of green, hoverColor #34D399, activeColor #A7F3D0.`);

const newRawStr = JSON.stringify(districts, null, 2);
const newContent = content.substring(0, rawStart + 'const RAW_DISTRICTS = '.length) + newRawStr + content.substring(rawEnd + 1);

fs.writeFileSync(configPath, newContent, 'utf8');
console.log('Successfully wrote updated mp-districts.config.ts!');
