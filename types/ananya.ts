export interface NavLink { id: string; label: string; href: string; active?: boolean; }
export interface CtaButton { label: string; href: string; }
export interface LogoConfig { src: string; alt: string; width?: number; height?: number; }
export interface ImageConfig { src: string; alt: string; }
export interface FooterLink { label: string; href: string; }
export interface SocialLink { platform: string; label: string; url: string; }
export interface BrandItem { id: string; name: string; logo?: string | null; }
