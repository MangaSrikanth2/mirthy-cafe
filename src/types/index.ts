export interface MenuItem {
  id: string
  name: string
  frenchName?: string
  category: 'entremets' | 'viennoiserie' | 'cheesecakes' | 'coffee' | 'savory' | 'gelato'
  price: number
  description: string
  flavorNotes: string[]
  dietary: ('Eggless' | 'Contains Nuts' | 'Contains Dairy' | 'Signature' | 'Chef Special')[]
  image: string
  layers?: string[]
}

export interface BrandConfig {
  name: string
  logo?: string
  motto?: string
  tagline: string
  subtagline: string
  locationBrief: string
  address: {
    line1: string
    line2: string
    landmark: string
    city: string
    state: string
    pincode: string
    full: string
    mapCoordinates: {
      lat: number
      lng: number
    }
    googleMapsUrl: string
  }
  hours: {
    days: string
    time: string
    openHour: number
    closeHour: number
  }
  socials: {
    instagram: string
    instagramHandle: string
    phone: string
    whatsapp: string
    email: string
  }
}

export interface CraftFeature {
  number: string
  title: string
  subtitle: string
  description: string
  detail: string
}
