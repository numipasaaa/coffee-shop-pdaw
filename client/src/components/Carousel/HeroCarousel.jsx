import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../../app/css/App.css";

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample carousel data - you would replace this with your actual content
    const slides = [
        {
            image: "/api/placeholder/1400/700",
            smallHeading: "TRADITIONAL & DELICIOUS",
            largeHeading: "Traditional Ice Cream",
            subHeading: "Since 1950",
            buttonText: "Learn More",
            buttonLink: "#"
        },
        {
            image: "/api/placeholder/1400/700",
            smallHeading: "FRESH & NATURAL",
            largeHeading: "Handcrafted Flavors",
            subHeading: "Made Daily",
            buttonText: "See Menu",
            buttonLink: "#"
        },
        {
            image: "/api/placeholder/1400/700",
            smallHeading: "FAMILY OWNED",
            largeHeading: "Quality Ingredients",
            subHeading: "Since 1950",
            buttonText: "Our Story",
            buttonLink: "#"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div className="hero-carousel">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="carousel-content">
                        <h3>{slide.smallHeading}</h3>
                        <h1>{slide.largeHeading}</h1>
                        <h2>{slide.subHeading}</h2>
                        <button className="cta-button">{slide.buttonText}</button>
                    </div>
                </div>
            ))}

            <button className="carousel-control prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>

            <button className="carousel-control next" onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
}