import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div>
      <section className='flex flex-col items-center bg-gray-50 px-4 py-4' >
                <nav className="flex items-center justify-between gap-8 bg-white/60 border border-white rounded-full px-4 md:px-2 py-2.5 w-full max-w-3xl" >
                    <a href="/" className='flex items-center md:pl-3'>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m12.75 8.3 6.75 3.884L26.25 8.3m-13.5 23.28v-7.755L6 19.94m27 0-6.75 3.885v7.754M6.405 12.408 19.5 19.954l13.095-7.546M19.5 35V19.94M33 25.914V13.962a2.98 2.98 0 0 0-1.5-2.585L21 5.4a3.01 3.01 0 0 0-3 0L7.5 11.377A3 3 0 0 0 6 13.962v11.953A2.98 2.98 0 0 0 7.5 28.5L18 34.477a3.01 3.01 0 0 0 3 0L31.5 28.5a3 3 0 0 0 1.5-2.585" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ml-2 font-semibold text-gray-800">LungCare AI</span>
                    </a>
                    <div className='w-0.5 h-8 bg-gray-50 hidden md:flex'></div>
                    <div id="menu" className={`max-md:absolute max-md:bg-white/70 max-md:h-[785px] max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center gap-8 z-50 md:gap-10 flex-1 ${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
                        <a href="#features" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Features</a>
                        <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">Pricing</a>
                        <a href="#faq" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-700 text-sm">FAQ</a>

                        <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-violet-500 active:bg-violet-600 text-white p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:pr-1">
                        <Link to='/signup'><button className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
                            Get Started Free
                        </button></Link>

                        <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden text-gray-700 p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                                <path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-12 rounded-full bg-white/50 border border-white">
                    <div className="relative flex size-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm text-black/60">XAI-Powered Lung Cancer Detection</p>
                </div>

                <h1 className='text-4xl md:text-[56px]/19 text-center max-w-2xl mt-8 text-gray-800 leading-tight font-medium'>Early Lung Cancer Detection with Explainable AI</h1>
                <p className="text-sm text-gray-600 text-center max-w-[630px] mt-4">
                    Get accurate lung cancer risk assessment (Normal, Benign, Malignant) with full AI transparency. 
                    Understand why our AI makes each prediction with clear, explainable results.
                </p>

                <div className='flex gap-3 mt-10'>
                    <Link to='/signup'><button className="bg-violet-600 hover:bg-violet-700 text-white text-xs md:text-sm px-6 py-3 rounded-lg transition cursor-pointer">
                        Start Free Analysis
                    </button></Link>
                    {/* <button className="bg-white hover:bg-white/5 border border-violet-400 text-gray-600 text-xs md:text-sm px-5 py-3 rounded-lg transition cursor-pointer">
                        View Demo
                    </button> */}
                </div>

                <div className='w-full max-w-[800px] h-[3px] mt-10 bg-gray-200'></div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-12 max-w-[930px] w-full'>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>98.5%</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Detection Accuracy</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>50k+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Scans Analyzed</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>24/7</h2>
                        <p className='text-xs md:text-sm text-gray-500'>AI Availability</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>100%</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Transparent AI</p>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Hero

