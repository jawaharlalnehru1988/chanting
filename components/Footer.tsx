import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16" data-purpose="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center text-white">
                <span className="font-display font-bold">ॐ</span>
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-white">Govinda Japa</span>
            </div>
            <p className="max-w-md mb-8">
              Dedicated to providing tools and community for the practice of Mantra Meditation and Vedic wisdom for a peaceful, Krishna-conscious life.
            </p>
            <div className="flex gap-4">
              <a className="hover:text-saffron-500 transition-colors" href="#">Instagram</a>
              <a className="hover:text-saffron-500 transition-colors" href="#">YouTube</a>
              <a className="hover:text-saffron-500 transition-colors" href="#">Facebook</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-display font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a className="hover:text-white transition-colors" href="#">Vedic Articles</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Books Store</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Temple Finder</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Donations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a className="hover:text-white transition-colors" href="#">Chanting Guide</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-white transition-colors" href="#">FAQ</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2023 Govinda Japa Digital. All spiritual rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
