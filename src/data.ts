/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, FAQItem, Coupon } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'led-lights',
    name: 'LED Lights',
    description: 'Transform your room with smart ambient color projection and smart strips.',
    icon: 'Lightbulb',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anime-posters',
    name: 'Anime Posters',
    description: 'Premium heavy-duty matte vinyl prints featuring iconic anime aesthetics.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'wall-decor',
    name: 'Wall Decor',
    description: 'Bespoke posters, collage kits and mirrors that express your distinct vibe.',
    icon: 'LayoutGrid',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'desk-decor',
    name: 'Desk Decor',
    description: 'Unusual clocks, vaporwave lamps and levitating ambient sculpture.',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'neon-signs',
    name: 'Neon Signs',
    description: 'Vibrant custom neon flexible tubes with high-impact color luminescence.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'photo-clip-lights',
    name: 'Photo Clip Lights',
    description: 'Cascade your favorite moments with delicate glowing micro-LED clips.',
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'aesthetic-accessories',
    name: 'Aesthetic Accessories',
    description: 'Wearable items, dynamic sunglasses, bags, and room gadgets for Gen-Z.',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gaming-room-decor',
    name: 'Gaming Room Decor',
    description: 'Smart hexagonal tiles, heavy ambient panels, and smart sync controllers.',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80'
  }
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'nebula-projector',
    name: 'Astro Glimpse Nebula Projector',
    category: 'led-lights',
    price: 1899,
    originalPrice: 3499,
    description: 'Immerse yourself in infinite stars. This premium starry sky projector recreates a revolving galaxy of glowing nebulae and cosmic supernovas right on your ceiling, fully adjustable via a smart app or physical remote. Pair it with dark luxury sheets to experience the complete deep space look.',
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    specifications: {
      'Interface Source': 'USB-C Cable Powered (included)',
      'Projection Range': '15 to 50 Square Meters (Ideal for standard bedrooms)',
      'Control Methods': 'Dedicated Smartphone Android/iOS App & RF Wireless Remote',
      'Laser Wavelength': '532 nm Green Laser Emitters',
      'RGB Galaxy LED': 'Premium 5W Tri-Color Diode Array'
    },
    features: [
      '32 separate color combinations with high-intensity laser projections',
      'Acoustic Sync Engine that pulses colors with your background music',
      'Built-in configurable multi-turn sleep timers for safety',
      'Ultra-quiet silent magnetic rotational motor'
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aaditya Sharma',
        rating: 5,
        comment: 'Absolutely legendary! Makes my room look exactly like those aesthetic lofi YouTube setups. The App sync is buttery smooth.',
        date: '2026-05-18'
      },
      {
        id: 'rev-2',
        userName: 'Sanya Gupta',
        rating: 4.5,
        comment: 'Extremely stunning galaxy colors. Deduction of half a star only because the remote requires AAA batteries which were not inside the box.',
        date: '2026-05-20'
      }
    ]
  },
  {
    id: 'cyberpunk-neon-wings',
    name: 'Lumino Cyberpunk Wings Neon Sign',
    category: 'neon-signs',
    price: 2999,
    originalPrice: 5999,
    description: 'Make a bold electric statement with our signature multi-layer flexible neon wings. Mounted on premium structural crystal acrylic sheets, this gorgeous neon glowing art utilizes low-voltage energy-efficient LED pipes that never heat up. Hang it behind your bed for state-of-the-art gaming aesthetics.',
    stock: 4, // Low stock triggers alert!
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    specifications: {
      'Mount Material': 'High-Impact 5mm Architectural Clear Acrylic Backboard',
      'Silicon Tube Size': 'Flexible 8mm Heavy-Duty LED Silicon Tubing',
      'Working Voltage': '12V Low Voltage DC Power Adapter (Included)',
      'Lifespan Rating': 'Up to 50,000 active service hours',
      'Total Width': '28 Inches (Perfect focal point dimensions)'
    },
    features: [
      'Dual-wing structure with specialized deep pink and cyan neon contrasting shades',
      'Complete pre-drilled wall mounting structural installation kit',
      'Adjustable 10-level inline electrical dimmer switches included',
      'Advanced hum-free silent power supply engineering'
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Kabir Malhotra',
        rating: 5,
        comment: 'This is the crown jewel of my game room! Brightness is amazing, can be lowered for sleeping. Shipping was secure.',
        date: '2026-05-12'
      }
    ]
  },
  {
    id: 'lofi-tokyo-posters',
    name: 'Retro Lofi Tokyo Matte Poster Kit (Set of 6)',
    category: 'anime-posters',
    price: 499,
    originalPrice: 999,
    description: 'Transform boring white bare walls into a cozy Tokyo retro lofi haven. This curated collection features 6 high-density heavy cardstock prints of nostalgic vintage anime and synthwave cityscapes. Each poster is meticulously engineered with high-contrast warm glow filters.',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    isTrending: false,
    isNewArrival: true,
    isBestSeller: true,
    specifications: {
      'Paper Substance': 'Heavy 300 GSM Non-Glossy German Fine Matte Paper',
      'Print Technology': '12-Color Premium Anti-Fade Giclee Ink Architecture',
      'Individual Poster Size': 'A4 Size (8.3 x 11.7 Inches)',
      'Package Set': '6 Distinct Cohesive Architectural Views'
    },
    features: [
      'Industrial anti-glare matte coating prevents ceiling LED reflection glare',
      'Shipment includes double-sided damage-free acrylic poster adhesive tabs',
      'Arrives inside a rigid heavy-duty protective cardboard tube'
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Priya Sen',
        rating: 4.8,
        comment: 'The paper quality is thick and luxury, totally worth every rupee. Looks majestic with my yellow warm clip lights surrounding it.',
        date: '2026-05-15'
      }
    ]
  },
  {
    id: 'hexagonal-sync-panels',
    name: 'AeroHex Smart RGB Sync Hex Panels (Set of 9)',
    category: 'gaming-room-decor',
    price: 3499,
    originalPrice: 6999,
    description: 'Design your own glowing architectural light sculpture with 9 interlocking modular LED hexagonal panels. Controlled via desktop software or your smartphone app, they dynamically scan audio waves, display state-of-the-art gaming gradients, and synch with gameplay states for an immersive space build.',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true,
    specifications: {
      'Panel Dimension': '6.4 x 5.6 x 1.1 Inches per Hexagon element',
      'Output Power': '24W Professional Dual-Voltage Adapter Array (Power up to 30 panels)',
      'Smart Assistant': 'Direct integration: Amazon Alexa, Google Home, SmartLife App',
      'Color Palette': '16.7 Million Colors with Multi-Zone Addressability'
    },
    features: [
      'Snap-and-go modular connectors transfer both power and data lines instantly',
      'Intelligent high-sensitivity internal microphone for dynamic lofi music reactive pulses',
      'Vibrant custom gaming profiles pre-programmed based on aesthetic subcultures'
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Naman Juneja',
        rating: 5,
        comment: 'Insanely awesome build quality. Setup took barely 15 mins. Placed them in a custom arrow design, look beautiful on streams.',
        date: '2026-05-22'
      }
    ]
  },
  {
    id: 'levitating-moon-lamp',
    name: 'Gravity-Defying Magnetic Levitating Moon Lamp',
    category: 'desk-decor',
    price: 2499,
    originalPrice: 4999,
    description: 'Revolve a realistic miniature moon of pure textured light above your study desk. Utilizing high-strength magnetic levitation and induction wireless power transfer, this 3D-printed moon hovers freely in mid-air and spins perpetually without physical contact. Features three warm glow temperature modes.',
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    isTrending: true,
    isNewArrival: true,
    isBestSeller: false,
    specifications: {
      'Moon Diameter': '6 Inches (Exact 3D laser topographic scaling)',
      'Levitation Gap': '15mm to 20mm above solid walnut base',
      'Light Output Modes': 'Warm Yellow (3000K), Warm White (4500K), Cool White (6000K)',
      'Base Material': 'Sustainably Sourced Polished Walnut Veneer base',
      'Power Source': 'Standard 12V Inductive Electromagnetic Base Plug'
    },
    features: [
      'Advanced Touch Control on the walnut base triggers instantaneous color changes',
      '3D-textured surface derived directly from NASA topographic satellite imagery',
      'Silent, low-friction perpetual rotational spin'
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Ananya Roy',
        rating: 5,
        comment: 'This is the most hypnotic desk accessory ever made. Guests are always questioning if there are hidden strings! Looks expensive.',
        date: '2026-05-19'
      }
    ]
  },
  {
    id: 'sunset-glow-lamp',
    name: 'Aesthetic Sunset Sol Glow Projector',
    category: 'desk-decor',
    price: 1199,
    originalPrice: 2199,
    description: 'Capture the warm, comforting aura of the golden hour in your room forever. Our heavy-duty metal sunset light utilizes a custom high-refraction optical glass lens that throws a wide, ultra-rich circular gradient of deep copper-orange and soft purple. Perfect for lofi photo shoots.',
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    isTrending: false,
    isNewArrival: false,
    isBestSeller: true,
    specifications: {
      'Chassis Material': 'Surgical Grade Heavy Iron & Aluminium Alloys',
      'Lens Architecture': 'High-Index Spherical Quartz Condensing Lens',
      'Vertical Rotation': '180 Degrees fully sweep-adjustable bracket head',
      'Cable Mechanism': '4.9 Feet Premium Braided USB Cable with Inline On/Off Switch'
    },
    features: [
      'Heat-dissipating aluminum core keeps the lamp cool to the touch even after 12 hours',
      'Extremely crisp, high-saturation color throw without chromatic aberration',
      'Sturdy heavy base prevents accidental tip-over'
    ],
    reviews: []
  },
  {
    id: 'polaroid-collage-kit',
    name: 'Neon Lofi Polaroid Aesthetic Wall Collage (Set of 50)',
    category: 'wall-decor',
    price: 799,
    originalPrice: 1599,
    description: 'Design the ultimate custom indie bedroom wall. This massive collage kit provides 50 premium satin-finish, polaroid-themed photo cards covering vaporwave palettes, retro vinyl cover art, glowing night markets, and lofi room mood boards. Tailored specifically for girls & boys seeking that authentic aesthetic.',
    stock: 3, // Low stock triggers alert!
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    isTrending: false,
    isNewArrival: true,
    isBestSeller: true,
    specifications: {
      'Card Stock Density': 'Premium 350 GSM German Art Board with Satin UV coat',
      'Dimensions': '4 x 6 Inches postcard style cuts',
      'Quantity': '50 Distinct non-repeating photographic templates'
    },
    features: [
      'Waterproof, scratch-resistant coating prevents damage over years',
      'Perfect color harmony with pink, neon, sunset and deep lofi light setups',
      'Supplied in an iconic textured, matte-black holographic Roomixa gift box'
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'Rishi Jain',
        rating: 4.5,
        comment: 'Insanely great choice of photos. They all match perfectly. It covered a large portion of my accent wall.',
        date: '2026-05-10'
      }
    ]
  },
  {
    id: 'photo-glow-clips',
    name: 'Luminous Micro-LED Photo Clip String Lights',
    category: 'photo-clip-lights',
    price: 399,
    originalPrice: 799,
    description: 'Drape your personal polaroid snapshots, travel prints, and customized messages in a gentle, atmospheric copper warmth. This 16-foot micro-LED silver wire features 20 transparent heavy-gauge high-grip photo peg clips which emit an eye-safe warm white sparkle.',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    isTrending: false,
    isNewArrival: false,
    isBestSeller: false,
    specifications: {
      'Total Length': '16.4 Feet (5 Meters) of insulated flexible wiring',
      'Clips Included': '20 Heavy-Duty Transparent Polycarbonate LED Clips',
      'Power Source': 'Dual USB-A & AA Battery Compartment backup system',
      'Light Temperature': '2500K Ambient Ultra-Warm Golden Glow'
    },
    features: [
      'IP44 Splash-proof insulation allows use near open balcony spaces',
      'Cold-glowing LED nodes do not pose fire risks to paper polaroids',
      'High-grade transparent grip pegs hold up to 30g cards without slipping'
    ],
    reviews: [
      {
        id: 'rev-8',
        userName: 'Megha Nair',
        rating: 5,
        comment: 'Makes my hostel room feel so incredibly cozy and warm at night. Perfect to hang polaroids from my college trips.',
        date: '2026-05-21'
      }
    ]
  }
];

export const ALL_COUPONS: Coupon[] = [
  {
    code: 'ROOMIXA10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 999,
    description: 'Get 10% OFF on premium room decor. Minimum order of ₹999.'
  },
  {
    code: 'FESTIVE500',
    discountType: 'fixed',
    discountValue: 500,
    minPurchase: 2499,
    description: 'Get Flat ₹500 OFF on order value exceeding ₹2,499.'
  },
  {
    code: 'NEONGlow',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 1499,
    description: 'Get 15% OFF on premium Neon products and Smart LEDs.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Shipping',
    question: 'How long does shipment delivery take inside India?',
    answer: 'At Roomixa, we dispatch all orders within 24 to 48 hours. Depending on your location (Metro areas average 2-4 working days, other regions 5-7 working days), your tracking ID will update in real-time. Everything is dispatched with prime shipping partners.'
  },
  {
    id: 'faq-2',
    category: 'Payment',
    question: 'Does Roomixa support Cash on Delivery (COD)?',
    answer: 'Yes! We support COD across 18,000+ pincodes in India. We do not charge extra for standard COD shipping. Standard ₹49 delivery charge is waived on orders above ₹1,499.'
  },
  {
    id: 'faq-3',
    category: 'Quality',
    question: 'Are Roomixa LED & Neon Signs safe to keep on all night?',
    answer: 'Absolutely. We utilize highly efficient, low-temperature, commercial-grade 12V LED tubing and smart diodes. These do not make buzzing sounds, contain zero toxic mercury gases, and remain completely cold to the Touch even after 24 hours of non-stop ignition.'
  },
  {
    id: 'faq-4',
    category: 'Returns',
    question: 'What is your refund/replace guarantee?',
    answer: 'We provide an elite 7-day hassle-free structural replacement or full refund policy on all undamaged original boxes in case of transit breakage or technical anomalies. Contact us via our WhatsApp hotline: +91 7822884303 or admin email zkbusinesshub@gmail.com with unboxing footage!'
  }
];
