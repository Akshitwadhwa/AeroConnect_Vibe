import { Plane } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-center">
        <Plane className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Flight Tracker
        </h1>
      </div>
    </header>
  );
};

export default Header;