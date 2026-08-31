import heroResidential from "@/assets/hero-residential.jpg";
import heroCommercial from "@/assets/hero-commercial.jpg";
import heroInfrastructure from "@/assets/hero-infrastructure.jpg";
import heroUrban from "@/assets/hero-urban.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import detailFacade from "@/assets/detail-facade.jpg";
import aerialCity from "@/assets/aerial-city.jpg";

export const images = {
  heroResidential,
  heroCommercial,
  heroInfrastructure,
  heroUrban,
  aboutTeam,
  interiorLobby,
  detailFacade,
  aerialCity,
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
};

export type Service = {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  image: string;
  active: boolean;
};

export type ProjectStatus = "Planning" | "Ongoing" | "Completed" | "Concept";

export type Project = {
  id: string;
  name: string;
  category: "Residential" | "Commercial" | "Infrastructure" | "Mixed Use";
  location: string;
  status: ProjectStatus;
  description: string;
  overview: string;
  image: string;
  gallery: string[];
  highlights: string[];
  scope: string;
  active: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Infrastructure" | "Architecture" | "Interior" | "Development";
  image: string;
  description: string;
  featured: boolean;
  active: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  active: boolean;
};

export type Faq = { id: string; question: string; answer: string; active: boolean };

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  date: string;
  status: EnquiryStatus;
};

export type CompanyInfo = {
  businessName: string;
  shortName: string;
  legalSuffix: string;
  tagline: string;
  primaryCta: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  sunday: string;
  footerDescription: string;
};

export type AboutContent = {
  heading: string;
  paragraphs: string[];
  values: string[];
  image: string;
  ctaText: string;
  stats: { value: string; label: string }[];
};

export const initialCompanyInfo: CompanyInfo = {
  businessName: "AMAARAH BUILDCON INFRA PVT LTD",
  shortName: "AMAARAH",
  legalSuffix: "BUILDCON INFRA PVT LTD",
  tagline: "Building Spaces. Creating Possibilities.",
  primaryCta: "Request Consultation",
  phone: "6212521221",
  email: "amaarahinfrapvtltd@gmail.com",
  address:
    "2nd Floor, Dattwad Renaissance, Office No. S-209, 334, E Ward, Shahupuri, Kolhapur, Maharashtra 416001",
  workingHours: "Monday to Saturday, 10:00 AM – 5:30 PM",
  sunday: "Sunday: Closed",
  footerDescription:
    "An Indian real estate and corporate infrastructure firm based in Kolhapur, Maharashtra, delivering customized, cost-effective and comprehensive building solutions.",
};

export const initialAbout: AboutContent = {
  heading: "Building With Purpose. Delivering With Integrity.",
  paragraphs: [
    "AMAARAH BUILDCON INFRA PRIVATE LIMITED is an Indian real estate and corporate infrastructure firm based in Kolhapur, Maharashtra.",
    "The company focuses on customized, cost-effective infrastructure solutions and comprehensive building solutions — shaped around each project's objectives, site conditions and client requirements.",
    "Our work is guided by honesty, integrity and operational excellence, supported by a professional team with a strong understanding of the local market.",
  ],
  values: [
    "Honesty",
    "Integrity",
    "Operational Excellence",
    "Customized Solutions",
    "Professional Execution",
    "Local Expertise",
  ],
  image: aboutTeam,
  ctaText: "Discover AMAARAH",
  stats: [
    { value: "100%", label: "Customized Approach" },
    { value: "360°", label: "Project Solutions" },
    { value: "6 Days", label: "Office Availability" },
    { value: "1", label: "Dedicated Professional Team" },
  ],
};

export const initialBanners: Banner[] = [
  {
    id: "b1",
    title: "Building Spaces. Creating Possibilities.",
    subtitle: "REAL ESTATE • INFRASTRUCTURE • DEVELOPMENT",
    description:
      "AMAARAH BUILDCON INFRA PVT LTD delivers customized, cost-effective and comprehensive real estate and infrastructure solutions with a strong commitment to honesty, integrity and operational excellence.",
    image: heroResidential,
    ctaText: "Explore Our Projects",
    ctaLink: "/projects",
    active: true,
  },
  {
    id: "b2",
    title: "Commercial Infrastructure, Professionally Executed",
    subtitle: "CORPORATE INFRASTRUCTURE",
    description:
      "Infrastructure solutions for businesses and organizations, planned and coordinated with a focus on functionality and cost efficiency.",
    image: heroCommercial,
    ctaText: "Our Services",
    ctaLink: "/services",
    active: true,
  },
  {
    id: "b3",
    title: "Premium Building Solutions",
    subtitle: "COMPREHENSIVE BUILDING SOLUTIONS",
    description:
      "From planning and coordination to execution support, we work across the full lifecycle of a building requirement.",
    image: heroInfrastructure,
    ctaText: "Start a Conversation",
    ctaLink: "/contact",
    active: true,
  },
  {
    id: "b4",
    title: "Customized Real Estate Development",
    subtitle: "KOLHAPUR • MAHARASHTRA",
    description:
      "Locally rooted development solutions tailored to unique site, budget and usage requirements in and around Kolhapur district.",
    image: heroUrban,
    ctaText: "View Portfolio",
    ctaLink: "/portfolio",
    active: true,
  },
];

export const initialServices: Service[] = [
  {
    id: "real-estate-development",
    name: "Real Estate Development",
    icon: "▲",
    shortDescription:
      "Customized real estate solutions designed around project objectives, location and client requirements.",
    longDescription:
      "We approach every real estate requirement as a distinct problem to solve — assessing objectives, site realities and budget before recommending a development direction.",
    benefits: [
      "Requirement-led development planning",
      "Site and location sensitive approach",
      "Cost-conscious decision making",
      "Structured coordination across stakeholders",
    ],
    process: ["Understand", "Plan", "Design", "Coordinate", "Execute", "Deliver"],
    image: heroResidential,
    active: true,
  },
  {
    id: "corporate-infrastructure",
    name: "Corporate Infrastructure",
    icon: "◼",
    shortDescription: "Professional infrastructure solutions for businesses and organizations.",
    longDescription:
      "Infrastructure support for organizations that need practical, well-coordinated spaces — from planning workflows to execution supervision.",
    benefits: [
      "Organization-focused planning",
      "Functional space strategy",
      "Vendor and stakeholder coordination",
      "Transparent progress communication",
    ],
    process: ["Assess", "Plan", "Coordinate", "Execute"],
    image: heroCommercial,
    active: true,
  },
  {
    id: "building-solutions",
    name: "Building Solutions",
    icon: "▤",
    shortDescription:
      "Comprehensive building solutions focused on functionality, quality and cost efficiency.",
    longDescription:
      "End-to-end building support covering feasibility inputs, planning, coordination and quality-focused execution.",
    benefits: ["Functionality first", "Quality-focused execution", "Cost efficiency", "Single point of coordination"],
    process: ["Review", "Plan", "Execute", "Handover"],
    image: interiorLobby,
    active: true,
  },
  {
    id: "customized-project-solutions",
    name: "Customized Project Solutions",
    icon: "◆",
    shortDescription: "Tailored approaches for unique real estate and infrastructure requirements.",
    longDescription:
      "Some requirements do not fit a standard template. We build a bespoke approach around unusual sites, usage patterns or constraints.",
    benefits: ["Bespoke scope definition", "Flexible engagement models", "Constraint-driven planning", "Practical outcomes"],
    process: ["Discovery", "Options", "Selection", "Delivery"],
    image: detailFacade,
    active: true,
  },
  {
    id: "project-planning-coordination",
    name: "Project Planning & Coordination",
    icon: "⬒",
    shortDescription: "Structured planning and coordination for smoother project execution.",
    longDescription:
      "Planning discipline and coordination reduce delays and rework. We keep schedules, scope and stakeholders aligned.",
    benefits: ["Clear scheduling", "Defined responsibilities", "Reduced rework", "Regular reporting"],
    process: ["Baseline", "Schedule", "Monitor", "Report"],
    image: heroInfrastructure,
    active: true,
  },
  {
    id: "local-real-estate-solutions",
    name: "Local Real Estate Solutions",
    icon: "◎",
    shortDescription: "Focused solutions for projects in and around Kolhapur district.",
    longDescription:
      "Local understanding of Kolhapur and surrounding areas informs feasibility, sourcing and practical execution decisions.",
    benefits: ["Local market understanding", "Regional vendor network", "Site-aware planning", "Accessible team"],
    process: ["Local Study", "Feasibility", "Plan", "Execute"],
    image: aerialCity,
    active: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: "aarambh-residency",
    name: "Aarambh Residency",
    category: "Residential",
    location: "Kolhapur, Maharashtra",
    status: "Ongoing",
    description:
      "Demo project: a residential development concept illustrating our planning and coordination approach.",
    overview:
      "Aarambh Residency is a demonstration project used to illustrate how AMAARAH approaches residential development — from requirement study through planning, coordination and execution support.",
    image: heroResidential,
    gallery: [heroResidential, detailFacade, interiorLobby],
    highlights: [
      "Requirement-led unit planning",
      "Efficient circulation and daylight strategy",
      "Cost-conscious material selection",
      "Structured execution coordination",
    ],
    scope: "Planning, design coordination, execution supervision (illustrative scope).",
    active: true,
  },
  {
    id: "renaissance-business-hub",
    name: "Renaissance Business Hub",
    category: "Commercial",
    location: "Kolhapur, Maharashtra",
    status: "Planning",
    description: "Demo project: a commercial infrastructure concept for business occupiers.",
    overview:
      "A sample commercial infrastructure project demonstrating workplace-oriented planning, service coordination and phased delivery thinking.",
    image: heroCommercial,
    gallery: [heroCommercial, interiorLobby, aerialCity],
    highlights: [
      "Flexible floor plate strategy",
      "Service and utility coordination",
      "Occupier-focused amenity planning",
      "Phased delivery approach",
    ],
    scope: "Feasibility inputs, planning and coordination (illustrative scope).",
    active: true,
  },
  {
    id: "urban-edge-development",
    name: "Urban Edge Development",
    category: "Mixed Use",
    location: "Kolhapur, Maharashtra",
    status: "Concept",
    description: "Demo project: a mixed-use development concept combining retail and residential uses.",
    overview:
      "A conceptual mixed-use study exploring how retail, workspace and residential uses can share a single development footprint.",
    image: heroUrban,
    gallery: [heroUrban, aerialCity, detailFacade],
    highlights: [
      "Mixed-use zoning study",
      "Public realm and plaza planning",
      "Parking and access strategy",
      "Long-term phasing options",
    ],
    scope: "Concept development and feasibility study (illustrative scope).",
    active: true,
  },
];

export const initialPortfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: "Residential Facade Study",
    category: "Residential",
    image: heroResidential,
    description: "Sample portfolio: contemporary residential facade treatment.",
    featured: true,
    active: true,
  },
  {
    id: "p2",
    title: "Corporate Tower Elevation",
    category: "Commercial",
    image: heroCommercial,
    description: "Sample portfolio: commercial tower elevation reference.",
    featured: true,
    active: true,
  },
  {
    id: "p3",
    title: "Structural Works in Progress",
    category: "Infrastructure",
    image: heroInfrastructure,
    description: "Sample portfolio: structural execution stage reference.",
    featured: false,
    active: true,
  },
  {
    id: "p4",
    title: "Balcony Rhythm Detail",
    category: "Architecture",
    image: detailFacade,
    description: "Sample portfolio: architectural detail and shadow study.",
    featured: false,
    active: true,
  },
  {
    id: "p5",
    title: "Lobby Interior Concept",
    category: "Interior",
    image: interiorLobby,
    description: "Sample portfolio: material and light concept for a building lobby.",
    featured: true,
    active: true,
  },
  {
    id: "p6",
    title: "Urban Growth Corridor",
    category: "Development",
    image: aerialCity,
    description: "Sample portfolio: urban development context study.",
    featured: false,
    active: true,
  },
  {
    id: "p7",
    title: "Mixed-Use Plaza",
    category: "Development",
    image: heroUrban,
    description: "Sample portfolio: public realm within a mixed-use scheme.",
    featured: false,
    active: true,
  },
  {
    id: "p8",
    title: "Planning Session",
    category: "Architecture",
    image: aboutTeam,
    description: "Sample portfolio: project planning and coordination.",
    featured: false,
    active: true,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Demo Client",
    role: "Residential Project Owner (demo content)",
    quote: "Professional approach with a strong focus on customized solutions.",
    rating: 5,
    active: true,
  },
  {
    id: "t2",
    name: "Demo Client",
    role: "Commercial Occupier (demo content)",
    quote: "Clear planning, practical cost decisions and consistent communication throughout.",
    rating: 5,
    active: true,
  },
  {
    id: "t3",
    name: "Demo Client",
    role: "Infrastructure Stakeholder (demo content)",
    quote: "Coordination was structured and the team understood local execution realities well.",
    rating: 4,
    active: true,
  },
  {
    id: "t4",
    name: "Demo Client",
    role: "Corporate Client (demo content)",
    quote: "An integrity-first team that keeps the scope honest and the process transparent.",
    rating: 5,
    active: true,
  },
];

export const initialFaqs: Faq[] = [
  {
    id: "f1",
    question: "What services does AMAARAH provide?",
    answer:
      "Real estate development, corporate infrastructure, comprehensive building solutions, customized project solutions, and project planning & coordination.",
    active: true,
  },
  {
    id: "f2",
    question: "Where does AMAARAH operate?",
    answer: "We are based in Shahupuri, Kolhapur and focus on projects in and around Kolhapur district, Maharashtra.",
    active: true,
  },
  {
    id: "f3",
    question: "Does AMAARAH provide customized infrastructure solutions?",
    answer:
      "Yes. Every engagement is shaped around the specific objectives, site conditions and budget of the project rather than a fixed template.",
    active: true,
  },
  {
    id: "f4",
    question: "How can I discuss a project requirement?",
    answer:
      "Submit the enquiry form on the Contact page with your requirement details, or call the office during working hours.",
    active: true,
  },
  {
    id: "f5",
    question: "What are the office working hours?",
    answer: "Monday to Saturday, 10:00 AM – 5:30 PM. The office is closed on Sunday.",
    active: true,
  },
  {
    id: "f6",
    question: "How can I contact the company?",
    answer: "Call 6212521221 or email amaarahinfrapvtltd@gmail.com. You can also visit our Shahupuri, Kolhapur office.",
    active: true,
  },
];

export const initialEnquiries: Enquiry[] = [
  {
    id: "e1",
    name: "Demo Enquiry",
    phone: "9876543210",
    email: "demo.client@example.com",
    projectType: "Residential",
    location: "Kolhapur",
    budget: "₹25L – ₹50L",
    message: "Sample enquiry record included for demonstration of the admin dashboard.",
    date: "2026-08-20",
    status: "New",
  },
  {
    id: "e2",
    name: "Demo Enquiry",
    phone: "9812345678",
    email: "demo.business@example.com",
    projectType: "Commercial",
    location: "Shahupuri, Kolhapur",
    budget: "₹50L – ₹1Cr",
    message: "Sample commercial infrastructure requirement for demo purposes.",
    date: "2026-08-24",
    status: "Contacted",
  },
];

export const processSteps = [
  { no: "01", title: "Understand", text: "We study the requirement, site, usage and budget before proposing anything." },
  { no: "02", title: "Plan", text: "A practical plan is built around objectives, constraints and cost realities." },
  { no: "03", title: "Design", text: "Design directions are developed and refined with functionality in focus." },
  { no: "04", title: "Coordinate", text: "Stakeholders, vendors and schedules are aligned into one workflow." },
  { no: "05", title: "Execute", text: "Execution is supervised with attention to quality and sequencing." },
  { no: "06", title: "Deliver", text: "Work is handed over with documentation and post-delivery support." },
];

export const whyChoose = [
  { title: "Integrity First", text: "Built on honesty, transparency and professional values." },
  { title: "Customized Solutions", text: "Solutions designed around specific project requirements." },
  { title: "Cost-Conscious Planning", text: "Focused on practical and cost-effective project approaches." },
  { title: "Professional Team", text: "A specialized team managing local real estate initiatives." },
  { title: "End-to-End Approach", text: "Comprehensive support across planning and project requirements." },
  { title: "Local Understanding", text: "Strong focus on Kolhapur and surrounding areas." },
];

export const trustStrip = [
  "Real Estate & Infrastructure",
  "Kolhapur Based",
  "Customized Solutions",
  "Professional Team",
  "Cost-Effective Approach",
];
