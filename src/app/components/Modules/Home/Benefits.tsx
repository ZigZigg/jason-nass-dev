import Image from 'next/image';

const Benefits = () => {
  return (
    <section className="bg-white py-[80px] xl:py-[100px]">
      <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] px-[16px] md:px-[0px] flex flex-col gap-[24px] xl:gap-[32px]">
        <h2 className="font-oswald font-semibold text-[36px] md:text-[42px] xl:text-[64px] text-[#205A93] uppercase leading-[1.48]">
          KEY BENEFITS
        </h2>
        <div className="flex flex-col xl:flex-row gap-8 w-full">
          {/* Benefit 1 */}
          <div id="benefit-1" className="xl:w-[616px] flex-shrink-0 border border-[#DADADA] p-[24px] xl:p-[32px] rounded-[12px] flex flex-col">
            <div className="pb-[20px] xl:pb-[40px]">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src="/images/benefits/trend-up-01.svg"
                  alt="Professional Development"
                  fill
                  className="object-contain stroke-[#212B36]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-roboto font-bold text-[18px] xl:text-[28px] text-[#212B36] leading-[1.2]">
                Professional Development - Access exclusive resources and training.
              </h3>
              <p className="font-roboto text-[16px] text-[#637381] leading-[1.5]">
                Gain insights from industry experts and enhance your skills with curated training programs.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div id="benefit-2" className="flex-1 border border-[#DADADA] p-[24px] xl:p-[32px] rounded-[12px] flex flex-col">
            <div className="pb-[20px] xl:pb-[60px]">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src="/images/benefits/globe-02.svg"
                  alt="Networking"
                  fill
                  className="object-contain stroke-[#212B36]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-roboto font-bold text-[18px] text-[#212B36] leading-[1.2]">
                Networking - Connect with leaders across the nation.
              </h3>
              <p className="font-roboto text-[16px] text-[#637381] leading-[1.5]">
                Expand your professional network and engage with top leaders nationwide.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div id="benefit-3" className="flex-1 border border-[#DADADA] p-[24px] xl:p-[32px] rounded-[12px] flex flex-col">
            <div className="pb-[20px] xl:pb-[60px]">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src="/images/benefits/announcement-01.svg"
                  alt="Advocacy"
                  fill
                  className="object-contain stroke-[#212B36]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-roboto font-bold text-[18px] text-[#212B36] leading-[1.2]">
                Advocacy - Representing your voice in education policy.
              </h3>
              <p className="font-roboto text-[16px] text-[#637381] leading-[1.5]">
                Stay informed and actively participate in shaping education policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits; 