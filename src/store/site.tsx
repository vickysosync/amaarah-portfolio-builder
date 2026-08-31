import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialAbout,
  initialBanners,
  initialCompanyInfo,
  initialEnquiries,
  initialFaqs,
  initialPortfolio,
  initialProjects,
  initialServices,
  initialTestimonials,
  type AboutContent,
  type Banner,
  type CompanyInfo,
  type Enquiry,
  type Faq,
  type PortfolioItem,
  type Project,
  type Service,
  type Testimonial,
} from "@/data/mock";

const STORAGE_KEY = "amaarah-site-state-v1";

type SiteState = {
  banners: Banner[];
  services: Service[];
  projects: Project[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  faqs: Faq[];
  enquiries: Enquiry[];
  company: CompanyInfo;
  about: AboutContent;
  isAuthed: boolean;
};

const defaultState: SiteState = {
  banners: initialBanners,
  services: initialServices,
  projects: initialProjects,
  portfolio: initialPortfolio,
  testimonials: initialTestimonials,
  faqs: initialFaqs,
  enquiries: initialEnquiries,
  company: initialCompanyInfo,
  about: initialAbout,
  isAuthed: false,
};

type Ctx = SiteState & {
  hydrated: boolean;
  setBanners: (v: Banner[]) => void;
  setServices: (v: Service[]) => void;
  setProjects: (v: Project[]) => void;
  setPortfolio: (v: PortfolioItem[]) => void;
  setTestimonials: (v: Testimonial[]) => void;
  setFaqs: (v: Faq[]) => void;
  setEnquiries: (v: Enquiry[]) => void;
  setCompany: (v: CompanyInfo) => void;
  setAbout: (v: AboutContent) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "date" | "status">) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const SiteContext = createContext<Ctx | null>(null);

export const ADMIN_EMAIL = "admin@amaarah.com";
export const ADMIN_PASSWORD = "admin123";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  const patch = useCallback(
    <K extends keyof SiteState>(key: K) =>
      (value: SiteState[K]) =>
        setState((s) => ({ ...s, [key]: value })),
    [],
  );

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      hydrated,
      setBanners: patch("banners"),
      setServices: patch("services"),
      setProjects: patch("projects"),
      setPortfolio: patch("portfolio"),
      setTestimonials: patch("testimonials"),
      setFaqs: patch("faqs"),
      setEnquiries: patch("enquiries"),
      setCompany: patch("company"),
      setAbout: patch("about"),
      addEnquiry: (e) =>
        setState((s) => ({
          ...s,
          enquiries: [
            {
              ...e,
              id: `e${Date.now()}`,
              date: new Date().toISOString().slice(0, 10),
              status: "New" as const,
            },
            ...s.enquiries,
          ],
        })),
      login: (email, password) => {
        const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        if (ok) setState((s) => ({ ...s, isAuthed: true }));
        return ok;
      },
      logout: () => setState((s) => ({ ...s, isAuthed: false })),
    }),
    [state, hydrated, patch],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

export function uid(prefix: string) {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}
