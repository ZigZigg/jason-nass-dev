import React from 'react';
import Hero from '../../components/Modules/Home/Hero';
import Sponsors from '../../components/Modules/Home/Sponsors';
import Benefits from '../../components/Modules/Home/Benefits';
import Testimonial from '../../components/Modules/Home/Testimonial';
import TrendingNews from '../../components/Modules/Home/TrendingNews';
import CallToAction from '../../components/Modules/Home/CallToAction';
import LeadershipToolkit from '@/app/components/Modules/Home/Leadership/LeadershipToolkit';


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
        <Hero />
        <Sponsors />
        <LeadershipToolkit />
        <Benefits />
        <Testimonial />
        <TrendingNews />
        <CallToAction />
    </div>
  );
}