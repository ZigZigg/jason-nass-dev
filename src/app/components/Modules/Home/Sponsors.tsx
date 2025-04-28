import Image from 'next/image';

type Props = {
  slice?: number;
}

const Sponsors = ({ slice }: Props) => {
  // Mock data for sponsors with actual sponsor SVGs
  const sponsors = [
    { id: 1, name: 'Sponsor 1', logo: '/images/sponsors/relume-black.svg' },
    { id: 2, name: 'Sponsor 2', logo: '/images/sponsors/webflow.svg' },
    { id: 3, name: 'Sponsor 3', logo: '/images/sponsors/relume-black.svg' },
    { id: 4, name: 'Sponsor 4', logo: '/images/sponsors/webflow.svg' },
    { id: 5, name: 'Sponsor 5', logo: '/images/sponsors/relume-black.svg' },
    { id: 6, name: 'Sponsor 6', logo: '/images/sponsors/webflow.svg' },
    { id: 7, name: 'Sponsor 7', logo: '/images/sponsors/relume-black.svg' },
  ];
  
  // Use the slice prop to limit the number of sponsors shown
  const displayedSponsors = slice ? sponsors.slice(0, slice) : sponsors;

  return (
    <section className="bg-[#F8F8F9]">
      <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] py-[80px] md:py-[32px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] md:gap-8 px-[0px]">
        <h2 className="font-roboto font-bold text-[18px] leading-[1.33] text-black px-[16px] md:px-[0px]">SPONSOR BY</h2>
        <div className="relative w-full md:w-[80%] xl:w-auto overflow-hidden">
          {/* Left gradient fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[40px] bg-gradient-to-r from-[#F8F8F9] to-transparent z-10 xl:hidden"></div>
          
          {/* Sponsors list with horizontal scroll */}
          <div 
            id="sponsors-list" 
            className="flex overflow-x-auto xl:overflow-visible items-center gap-[20px] md:gap-[40px] opacity-80 w-full md:w-auto px-[16px] md:px-0 no-scrollbar"
          >
            {displayedSponsors.map((sponsor) => (
              <div key={sponsor.id} className="relative h-[70px] md:h-[40px] w-[175px] md:w-[100px] flex-shrink-0">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Right gradient fade effect */}
          <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-gradient-to-l from-[#F8F8F9] to-transparent z-10 xl:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors; 