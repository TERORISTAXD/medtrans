"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
}

export function TestimonialCarousel({ testimonials, title, badge }: { testimonials: Testimonial[], title: string, badge: string }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 8000);
        return () => clearInterval(timer);
    }, [totalPages]);

    const next = () => setCurrentPage((prev) => (prev + 1) % totalPages);
    const prev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

    const currentTestimonials = testimonials.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <section className="section-padding bg-gradient-to-br from-brand-red-dark to-brand-red relative overflow-hidden py-24 sm:py-32">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            
            <div className="container-max relative z-20">
                <AnimatedContainer className="text-center mb-20">
                    <span className="text-sm font-bold uppercase tracking-widest text-brand-red-light bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">{badge}</span>
                    <h2 className="mt-6 text-4xl font-black text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">{title}</h2>
                </AnimatedContainer>

                <div className="relative px-4">
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                            >
                                {currentTestimonials.map((testimonial, idx) => (
                                    <div 
                                        key={idx} 
                                        className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl flex flex-col h-full hover:bg-white/10 transition-[background-color] duration-300 group will-change-transform transform-gpu"
                                    >
                                        <div className="mb-6 flex gap-1">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <p className="mb-8 text-lg font-medium leading-relaxed text-blue-50/90 italic flex-grow">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-white font-black text-xl shadow-lg transform group-hover:scale-110 transition-transform">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-white whitespace-nowrap">{testimonial.name}</p>
                                                <p className="text-xs font-bold text-brand-red-light uppercase tracking-wider">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-16 border-t border-white/10 pt-8">
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        currentPage === i ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={prev} 
                                className="group p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10 active:scale-95 flex items-center gap-2"
                            >
                                <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button 
                                onClick={next} 
                                className="group p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10 active:scale-95 flex items-center gap-2"
                            >
                                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
