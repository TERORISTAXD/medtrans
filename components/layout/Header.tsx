"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

const PHONE_PLEVEN = "0890 150 160";
const PHONE_PLEVEN_HREF = "tel:+359890150160";
const PHONE_TARNOVO = "0888 645 380";
const PHONE_TARNOVO_HREF = "tel:+359888645380";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Nav");
    const tCommon = useTranslations("Common");
    const locale = useLocale();

    const languages = {
        bg: { flag: "/images/flags/bg.svg", label: "Български" },
        en: { flag: "/images/flags/en.svg", label: "English" },
    };

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/services", label: t("services") },
        { href: "/fleet", label: t("fleet") },
        { href: "/contact", label: t("contact") },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setLangOpen(false);
    }, [pathname]);

    const switchLanguage = (newLocale: "bg" | "en") => {
        router.replace(pathname, { locale: newLocale });
        setLangOpen(false);
    };

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/95 border-b border-gray-100 backdrop-blur-md"
                        : "bg-white shadow-sm"
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-2 sm:gap-4 sm:h-18">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1.5 sm:gap-3 shrink-0 group">
                            <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 transform-gpu transition-transform duration-300 group-hover:scale-110">
                                <Image
                                    src="/images/logo.png"
                                    alt="MedTrans Logo"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-black tracking-tighter text-gray-900">
                                Med<span className="text-brand-red">Trans</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href as Parameters<typeof Link>[0]["href"]}
                                    className={cn(
                                        "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150",
                                        pathname === link.href
                                            ? "bg-brand-red/10 text-brand-red font-semibold"
                                            : "text-gray-900 hover:text-brand-red hover:bg-brand-red/5"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Language + Mobile Toggle */}
                        <div className="flex items-center gap-1.5 sm:gap-3">
                            {/* Language Switcher */}
                            <div className="relative shrink-0">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex h-8 w-10 sm:h-9 sm:w-auto items-center justify-center gap-2 rounded-full border border-gray-200 px-0 sm:px-2.5 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                                    aria-expanded={langOpen}
                                    title={languages[locale as keyof typeof languages]?.label}
                                >
                                    <div className="relative h-4 w-6 sm:h-5 sm:w-7 overflow-hidden rounded-sm shadow-sm">
                                        <Image
                                            src={languages[locale as keyof typeof languages]?.flag}
                                            alt=""
                                            width={28}
                                            height={20}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </button>

                                {langOpen && (
                                    <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5 focus:outline-none z-[60]">
                                        <div className="py-0.5">
                                            <button
                                                onClick={() => switchLanguage("bg")}
                                                className={cn(
                                                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 hover:text-brand-red",
                                                    locale === "bg" ? "bg-brand-red/5 text-brand-red font-semibold" : "text-gray-700"
                                                )}
                                            >
                                                <Image src="/images/flags/bg.svg" alt="" width={20} height={14} className="h-3.5 w-5 rounded-sm object-cover shadow-sm" />
                                                <span>Български</span>
                                            </button>
                                            <button
                                                onClick={() => switchLanguage("en")}
                                                className={cn(
                                                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 hover:text-brand-red",
                                                    locale === "en" ? "bg-brand-red/5 text-brand-red font-semibold" : "text-gray-700"
                                                )}
                                            >
                                                <Image src="/images/flags/en.svg" alt="" width={20} height={14} className="h-3.5 w-5 rounded-sm object-cover shadow-sm" />
                                                <span>English</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>


                                <div className="relative group/callbtn">
                                    <button
                                        className="pulse-ring relative flex items-center gap-2 rounded-lg bg-brand-red px-2 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-red-dark hover:shadow-lg will-change-transform active:scale-95"
                                        aria-label="Call us now"
                                    >
                                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse-slow shrink-0" />
                                        <span className="hidden min-[400px]:inline">{locale === 'bg' ? 'Обадете се' : 'Call'}</span>
                                        <span className="hidden sm:inline-block">{locale === 'bg' ? 'сега' : 'now'}</span>
                                    </button>

                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover/callbtn:opacity-100 group-hover/callbtn:visible transition-all z-50">
                                        <div className="text-xs font-bold text-gray-400 uppercase px-3 py-1.5 mb-1">{tCommon("call_now")}</div>
                                        <a href={PHONE_PLEVEN_HREF} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-brand-red/5 hover:text-brand-red text-sm font-semibold text-gray-700 transition-colors">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <div>Плевен<div className="text-xs font-bold">{PHONE_PLEVEN}</div></div>
                                        </a>
                                        <a href={PHONE_TARNOVO_HREF} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-brand-red/5 hover:text-brand-red text-sm font-semibold text-gray-700 transition-colors">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <div>В. Търново<div className="text-xs font-bold">{PHONE_TARNOVO}</div></div>
                                        </a>
                                    </div>
                                </div>

                            {/* Mobile hamburger */}
                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="border-t border-gray-100 bg-white md:hidden animate-fade-in">
                        <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href as Parameters<typeof Link>[0]["href"]}
                                    className={cn(
                                        "rounded-md px-4 py-3 text-base font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-brand-red/10 text-brand-red font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-2 flex flex-col gap-2">
                                <a
                                    href={PHONE_PLEVEN_HREF}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-brand-red/10 px-4 py-3 text-sm font-bold text-brand-red"
                                >
                                    <Phone className="h-4 w-4" />
                                    Плевен: {PHONE_PLEVEN}
                                </a>
                                <a
                                    href={PHONE_TARNOVO_HREF}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-3 text-sm font-bold text-white shadow-md"
                                >
                                    <Phone className="h-4 w-4" />
                                    В. Търново: {PHONE_TARNOVO}
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
            {/* Spacer so content starts below fixed header */}
            <div className="h-16 sm:h-18" aria-hidden="true" />
        </>
    );
}
