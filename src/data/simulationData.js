// PASHUSETU DOMAIN & SIMULATION DATA MOCKS

export const FARM_METADATA = {
  id: 'KA-1023',
  district: 'Hassan District',
  state: 'Karnataka',
  farmer: 'Suresh Patel',
  herdSize: 42,
  coordinates: { lat: 13.0033, lng: 76.1004 }
};

export const ANIMAL_METADATA = {
  tag: 'CATTLE #17',
  breed: 'HF Cross (Female)',
  age: '4.2 Years',
  weight: '430 kg',
  collarId: 'IOT-BLE-094'
};

export const INPUT_MODULES = [
  { id: 'camera', label: 'CAMERA / CV', icon: 'camera', angle: 210 },
  { id: 'iot', label: 'IoT SENSORS', icon: 'activity', angle: 160 },
  { id: 'farmer', label: 'FARMER REPORT', icon: 'user-check', angle: 110 },
  { id: 'weather', label: 'WEATHER / CLIMATE', icon: 'cloud-rain', angle: 30 },
  { id: 'outbreak', label: 'OUTBREAK HISTORY', icon: 'database', angle: 330 },
  { id: 'nadres', label: 'NADRES 2.0', icon: 'shield-alert', angle: 270 },
  { id: 'pashudhan', label: 'BHARAT PASHUDHAN', icon: 'landmark', angle: 0 }
];

export const DECISION_TRACE_ITEMS = [
  { id: 'movement', label: 'abnormal movement', points: '+20', weight: 20 },
  { id: 'feeding', label: 'feeding reduction', points: '+15', weight: 15 },
  { id: 'temp', label: 'elevated temperature', points: '+18', weight: 18 },
  { id: 'lameness', label: 'lameness detected', points: '+12', weight: 12 },
  { id: 'outbreak_signal', label: 'regional outbreak signal', points: '+10', weight: 10 },
  { id: 'env_risk', label: 'environmental risk', points: '+12', weight: 12 }
];

export const JOURNEY_STEPS = [
  { id: 'REPORTED', label: 'REPORTED', code: '01' },
  { id: 'TRIAGED', label: 'TRIAGED', code: '02' },
  { id: 'ESCALATED', label: 'ESCALATED', code: '03' },
  { id: 'SAMPLED', label: 'SAMPLED', code: '04' },
  { id: 'CONFIRMED', label: 'CONFIRMED', code: '05' },
  { id: 'SURVEILLANCE', label: 'SURVEILLANCE', code: '06' }
];

export const SURVEILLANCE_STATS = {
  activeCases: 127,
  highRisk: 18,
  confirmedToday: '03',
  status: 'ACTIVE',
  alertZone: 'KARNATAKA — HASSAN CLUSTER',
  note: 'SIMULATION DATA — PROTOCOL DEMO'
};
