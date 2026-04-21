import React, { useState } from 'react';
import { NavLink, Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  FileBox, 
  Image as ImageIcon, 
  Settings, 
  FileStack, 
  QrCode, 
  Code2, 
  Minimize2, 
  Maximize2, 
  FileImage,
  Repeat
} from 'lucide-react';
import { Header, Footer } from './layouts/Layout';
import { CompressImage } from './pages/tools/CompressImage';
import { JPGToPDF } from './pages/tools/JPGToPDF';
import { QRCodeGenerator } from './pages/tools/QRCodeGenerator';
import { cn } from './lib/utils';

// Placeholder Pages
const HomePage = () => {
    const tools = [
        { name: 'JPG to PDF', path: '/tools/jpg-to-pdf', icon: FileStack, color: 'bg-red-100 text-red-600', description: 'Convert images into high-quality PDF documents' },
        { name: 'Compress Image', path: '/tools/compress-image', icon: Minimize2, color: 'bg-blue-100 text-blue-600', description: 'Reduce image file size with minimal loss' },
        { name: 'QR Code Generator', path: '/tools/qr-code-generator', icon: QrCode, color: 'bg-green-100 text-green-600', description: 'Create customizable QR codes for free' },
        { name: 'Resize Image', path: '/tools/resize-image', icon: Maximize2, color: 'bg-purple-100 text-purple-600', description: 'Change dimensions of your image files' },
        { name: 'Merge PDF', path: '/tools/merge-pdf', icon: FileStack, color: 'bg-orange-100 text-orange-600', description: 'Merge multiple PDF files into one' },
        { name: 'Converter', path: '/tools/image-converter', icon: Repeat, color: 'bg-indigo-100 text-indigo-600', description: 'Convert between JPG, PNG, WebP & more' },
    ];

    return (
        <main className="flex-1">
            <section className="bg-slate-50 py-24 dark:bg-slate-950/40">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
                   <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-50">
                     Free online tools for PDFs, images,<br className="hidden sm:block" /> and everyday tasks.
                   </h1>
                   <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                     Simple, secure, and fast tools for everyone. 
                     No uploads, no database, no registration. 
                     Everything happens in your browser.
                   </p>
                   <div className="mt-10 flex flex-wrap justify-center gap-4">
                      <Link to="/tools" className="rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25">
                         Explore All Tools
                      </Link>
                      <Link to="/about" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800">
                         How it works
                      </Link>
                   </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12">
               <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Popular Tools</h2>
                  <Link to="/tools" className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">See all &rarr;</Link>
               </div>
               <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                      <Link key={tool.name} to={tool.path} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/20">
                          <div className={cn("inline-flex items-center justify-center rounded-xl p-3", tool.color)}>
                             <tool.icon className="h-6 w-6" />
                          </div>
                          <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-50">{tool.name}</h3>
                          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tool.description}</p>
                          <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-300 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900">
                             <ArrowRight className="h-4 w-4" />
                          </div>
                      </Link>
                  ))}
               </div>
            </section>

            <section className="bg-white py-24 dark:bg-slate-950">
               <div className="mx-auto max-w-4xl px-6 sm:px-12">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Why Choose YuTools?</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">We prioritize privacy, speed, and simplicity.</p>
                  </div>
                  <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
                     <div className="flex gap-6">
                        <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                           <FileBox className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900 dark:text-slate-50">Privacy First</h3>
                           <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">Your files never leave your device. We use browser-side processing whenever possible, ensuring your sensitive data remains local.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                           <Settings className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900 dark:text-slate-50">Free Forever</h3>
                           <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">No subscriptions, no account required. Just open YuTools and start processing your files for free, anytime.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
        </main>
    )
}

const ArrowRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const AboutPage = () => (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:px-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50">About YuTools</h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            YuTools is a suite of lightweight, high-performance utility tools designed to simplify your digital tasks without compromising your privacy. 
            Unlike traditional tools that require you to upload your files to their servers, our platform processes most files directly in your web browser. 
        </p>
        <h2 className="mt-12 text-2xl font-bold">Our Philosophy</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
           Digital privacy shouldn't be a luxury. We believe in building tools that are:
        </p>
        <ul className="mt-6 space-y-4 list-disc list-inside text-slate-600 dark:text-slate-400">
           <li><strong>Accessible:</strong> Free for everyone, everywhere.</li>
           <li><strong>Private:</strong> Local processing is our default choice.</li>
           <li><strong>Fast:</strong> No server-side wait times or upload/download bottlenecks.</li>
        </ul>
    </div>
)

const App = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
            <Header />
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/tools/compress-image" element={<CompressImage />} />
                    <Route path="/tools/jpg-to-pdf" element={<JPGToPDF />} />
                    <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
                    {/* Add redirections for unfinished tools to homepage for now */}
                    <Route path="/tools/*" element={<HomePage />} />
                    <Route path="*" element={<div className="flex items-center justify-center py-24"><h1 className="text-4xl font-bold">404 - Not Found</h1></div>} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;
