import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="relative bg-[#f8caca] min-h-screen w-full h-full overflow-hidden border-2"> {/* Ensure overflow-hidden */}
      <h2 className="text-center text-3xl font-semibold mb-16 mt-28 font-mali w-full">Features</h2>
      
      {/* Background Rounded Divs */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#AF0318] rounded-full blur-[100px]"></div> {/* Adjusted position and size */}
      <div className="absolute top-32 right-0 w-48 h-48 bg-[#AF0318] rounded-full blur-[100px]"></div> {/* Adjusted position and size */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-[#AF0318] rounded-full blur-[100px]"></div> {/* Adjusted position and size */}

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-40 px-2 md:px-4 lg:px-6 place-items-center max-w-7xl mx-auto">
        <FeatureCard title="Nutritional Scan" blurb="Snap a photo of your meal to instantly see its nutritional content." />
        <FeatureCard title="AI Meal Plans" blurb="Get personalized meal plans based on your health goals." />
        <FeatureCard title="Fridge Tracker" blurb="Manage your fridge by uploading or photographing your items." />
        <FeatureCard title="Grocery List" blurb="Automatically create a grocery list based on your meal plans." />
        <FeatureCard title="Community Sharing" blurb="Share recipes and successes with friends or the community." />
        <FeatureCard title="Health Sync" blurb="Sync your diet with fitness goals for a complete health view." />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  blurb: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, blurb }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-[0_6px_3px_rgba(0,0,0,0.3)] font-mali w-[26rem] h-52 transform transition-transform duration-300 hover:-translate-y-2">
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-center">{blurb}</p>
    </div>
  );
};

export default Features;
