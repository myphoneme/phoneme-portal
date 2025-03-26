import React from 'react';
import { Pen, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Pen size={24} className="text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">DevBlog</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 DevBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}