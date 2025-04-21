
import { ClipboardList, BookOpen, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FEF6F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-6 leading-tight">
            Prepare for<br/>Your SSC Exams
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Ace your SSC exams with ours practice tests.
          </p>
          <Link to="/exam-categories">
            <Button className="bg-[#002B5B] hover:bg-[#002B5B]/90 text-white px-8 py-2 rounded">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="relative">
          <img
            src="https://pdssugngoavqfycfsjjq.supabase.co/storage/v1/object/public/images//4c87ea66-421a-47de-b6e7-e4ad19c345a9.png"
            alt="Student preparing for exam"
            className="w-full rounded-lg"
          />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#002B5B] mb-4">Key Features</h2>
          <p className="text-gray-600">
            Our comprehensive platform is designed to help you excel in your banking exams with
            specialized tools and resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#FEF6F1] rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-[#002B5B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Practice Tests</h3>
            <p className="text-gray-600">
              Access thousands of practice questions with detailed explanations to strengthen your exam preparation.
            </p>
          </div>

          <div className="p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#FEF6F1] rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#002B5B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Study Materials</h3>
            <p className="text-gray-600">
              Comprehensive study guides and notes covering all topics required for banking exams.
            </p>
          </div>

          <div className="p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#FEF6F1] rounded-full flex items-center justify-center mb-4">
              <LightbulbIcon className="w-6 h-6 text-[#002B5B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002B5B] mb-3">Expert Guidance</h3>
            <p className="text-gray-600">
              Learn from banking industry experts with personalized feedback and tips for success.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002B5B] text-white py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">SSCPREP</h2>
            <p className="text-gray-300 mb-6">
              Helping students achieve success in banking exams with comprehensive preparation resources.
            </p>
            <div className="space-x-4">
              <a href="#" className="text-white hover:text-opacity-80">Privacy Policy</a>
              <a href="#" className="text-white hover:text-opacity-80">Terms of Service</a>
              <a href="#" className="text-white hover:text-opacity-80">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-300 mb-4">
              Get the latest updates and study tips directly to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-[#002B5B] hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          © 2025 SSCPREP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
