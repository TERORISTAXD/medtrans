"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Settlement {
    n: string; // Name (Bulgarian)
    t: string; // Transliterated Name (Latin)
    p: string; // Province
    v: number; // 0 for town, 1 for village
    lat: number;
    lng: number;
}

interface LocationAutocompleteProps {
    value: string;
    onChange: (settlement: Settlement) => void;
    placeholder: string;
    label: string;
    icon?: any;
}

export function LocationAutocomplete({ value, onChange, placeholder, label, icon: Icon = MapPin }: LocationAutocompleteProps) {
    const t = useTranslations("PriceEstimator");
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState<Settlement[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [settlements, setSettlements] = useState<Settlement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Search normalization for Latin search
    const normalizeSearch = (text: string) => {
        let res = text.toLowerCase();
        // Handle common variations in Bulgarian transliteration
        res = res.replace(/iy(?=[aeiou]|$)/g, 'i'); // e.g., Sofiya -> Sofia
        return res;
    };

    // Initial data load
    useEffect(() => {
        const loadSettlements = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/data/settlements.json");
                const data = await response.json();
                setSettlements(data);
            } catch (error) {
                console.error("Failed to load settlements:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSettlements();
    }, []);

    // Filter results
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const searchTerm = normalizeSearch(query);
        const filtered = settlements.filter(s =>
            s.n.toLowerCase().includes(searchTerm) ||
            (s.t && s.t.toLowerCase().includes(searchTerm)) ||
            (s.p && s.p.toLowerCase().includes(searchTerm))
        ).slice(0, 20); // Show more matches in scrollable list

        setResults(filtered);
    }, [query, settlements]);

    // Handle clicks outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (settlement: Settlement) => {
        const nameWithPrefix = `${settlement.v === 0 ? "гр. " : "с. "}${settlement.n}`;
        setQuery(nameWithPrefix);
        onChange(settlement);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block px-1">
                {label}
            </label>
            <div className="relative group/input">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within/input:text-brand-red transition-colors z-10" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full bg-white border border-gray-100 p-4 pl-12 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red transition-all outline-none"
                />

                {query ? (
                    <button
                        onClick={() => { setQuery(""); setResults([]); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-red transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                ) : (
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-200" />
                )}
            </div>

            <AnimatePresence>
                {isOpen && (results.length > 0 || isLoading) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-400 text-sm italic">
                                    {t("loading_locations")}
                                </div>
                            ) : (
                                results.map((s, i) => (
                                    <button
                                        key={`${s.n}-${s.p}-${i}`}
                                        onClick={() => handleSelect(s)}
                                        className="w-full text-left p-4 hover:bg-brand-red/5 transition-colors border-b border-gray-50 last:border-0 group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-brand-red/5 flex items-center justify-center group-hover/item:bg-brand-red group-hover/item:text-white transition-colors">
                                                <MapPin className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">
                                                    <span className="text-brand-red mr-1">{s.v === 0 ? "гр." : "с."}</span>
                                                    {s.n}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.p}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}

                {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white p-4 rounded-2xl shadow-2xl z-50 text-center text-gray-400 text-sm border border-gray-50"
                    >
                        {t("no_results")}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
