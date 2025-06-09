// mappings.ts

export const mappings = {
  Gender: { Female: 0, Male: 1 },
  Education: { Primary: 0, Secondary: 1, Tertiary: 2 },
  Marital_Status: { Divorced: 0, Married: 1, Single: 2 },
  Region: {
    "North Central": 0, "North East": 1, "North West": 2,
    "South East": 3, "South South": 4, "South West": 5,
  },
  State: {
    Abia: 0, Adamawa: 1, "Akwa Ibom": 2, Anambra: 3, Bauchi: 4, Bayelsa: 5, Benue: 6,
    Borno: 7, "Cross River": 8, Delta: 9, Ebonyi: 10, Edo: 11, Ekiti: 12, Enugu: 13,
    FCT: 14, Gombe: 15, Imo: 16, Jigawa: 17, Kaduna: 18, Kano: 19, Katsina: 20,
    Kebbi: 21, Kogi: 22, Kwara: 23, Lagos: 24, Nassarawa: 25, Niger: 26, Ogun: 27,
    Ondo: 28, Osun: 29, Oyo: 30, Plateau: 31, Rivers: 32, Sokoto: 33, Taraba: 34,
    Yobe: 35, Zamfara: 36,
  },
  Crop_Type: {
    Beans: 0, Cassava: 1, Cocoa: 2, Cotton: 3, Cowpea: 4, Groundnut: 5, Maize: 6,
    Millet: 7, "Oil Palm": 8, Plantain: 9, Rice: 10, Rubber: 11, Sesame: 12,
    Sorghum: 13, Soybeans: 14, Vegetables: 15, Yam: 16,
  },
  Livestock_Type: {
    Cattle: 0, Goats: 1, Pigs: 2, Poultry: 3, Sheep: 4, nan: 5,
  },
  Irrigation: { No: 0, Yes: 1 },
  Technology_Use: { No: 0, Yes: 1 },
  Previous_Loans: { No: 0, Yes: 1 },
  Repayment_Status: { Defaulted: 0, Late: 1, "Paid on Time": 2 },
  Savings_Behavior: { No: 0, Yes: 1 },
  Financial_Access: { No: 0, Yes: 1 },
  Extension_Services: { No: 0, Yes: 1 },
  Input_Usage: { All: 0, Some: 1, nan: 2 },
  Labor: { Both: 0, Family: 1, Hired: 2 },
};


export type Mappings = typeof mappings;
export type MappingKeys = keyof Mappings;

// Reverse the mapping (number => label) for UI rendering
export const reverseMappings: {
  [K in keyof typeof mappings]: { [key: number]: string }
} = {} as any;

for (const key in mappings) {
  const category = key as keyof typeof mappings;
  reverseMappings[category] = Object.entries(mappings[category]).reduce(
    (acc, [label, val]) => {
      acc[val as number] = label;
      return acc;
    },
    {} as { [key: number]: string }
  );
}

