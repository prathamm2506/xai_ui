import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m12.75 8.3 6.75 3.884L26.25 8.3m-13.5 23.28v-7.755L6 19.94m27 0-6.75 3.885v7.754M6.405 12.408 19.5 19.954l13.095-7.546M19.5 35V19.94M33 25.914V13.962a2.98 2.98 0 0 0-1.5-2.585L21 5.4a3.01 3.01 0 0 0-3 0L7.5 11.377A3 3 0 0 0 6 13.962v11.953A2.98 2.98 0 0 0 7.5 28.5L18 34.477a3.01 3.01 0 0 0 3 0L31.5 28.5a3 3 0 0 0 1.5-2.585" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-semibold text-xl text-gray-800">LungCare AI</span>
            </div>
            

            <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-gray-600">
                Advancing early lung cancer detection with Explainable AI. Get accurate, transparent, and trustworthy diagnostic results you can understand and rely on.
            </p>

        </div>
        <div className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                <a href="/" className="text-gray-600 hover:text-violet-600 transition">LungCare AI</a> ©2025. All rights reserved. | Early Detection Saves Lives
            </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

