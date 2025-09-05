export interface NavigationItem {
  href: string;
  label: string;
  icon?: string; // Icon identifier (e.g., "super10")
  isSpecial?: boolean; // For items like Super10 that need special styling
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { 
    href: "/super10", 
    label: "Super10", 
    icon: "super10", // We'll handle the JSX in the components
    isSpecial: true
  },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/certificate", label: "Certificate" },
  { href: "/contact", label: "Contact" },
  { href: "/candidate/enquiry", label: "Enquiry" }
];

// Helper function to get navigation items with optional filtering
export const getNavigationItems = (options?: {
  includeSpecial?: boolean;
  excludeItems?: string[];
}): NavigationItem[] => {
  let items = [...NAVIGATION_ITEMS];
  
  if (options?.excludeItems) {
    items = items.filter(item => !options.excludeItems!.includes(item.href));
  }
  
  if (options?.includeSpecial === false) {
    items = items.filter(item => !item.isSpecial);
  }
  
  return items;
};
