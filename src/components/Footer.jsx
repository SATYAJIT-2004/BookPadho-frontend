import { BookOpen, Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mt-20">
      {/* Glass container */}
      <div className="backdrop-blur-md bg-white/30 border-t border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-indigo-700" size={22} />
              <h3 className="text-lg font-semibold text-indigo-800">
                BookPadho
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A modern marketplace to buy and sell second-hand books.
              Simple, secure, and student-friendly.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-800 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-700 cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-indigo-700 cursor-pointer transition">
                Wishlist
              </li>
              <li className="hover:text-indigo-700 cursor-pointer transition">
                My Orders
              </li>
              <li className="hover:text-indigo-700 cursor-pointer transition">
                Profile
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-800 mb-3">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/SATYAJIT-2004"
                className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/satyajit-sahoo-068ab0287/"
                className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition"
              >
                <Mail size={18} />
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              © {new Date().getFullYear()} BookPadho. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
