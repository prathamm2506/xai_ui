import React from 'react'

const Features = () => {

    const featuresData = [
        {
            icon: <svg className='text-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
            title: "Explainable AI Results",
            description: "Understand exactly why our AI classifies scans as Normal, Benign, or Malignant with heatmaps and visual explanations."
        },
        {
            icon: <svg className='text-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
            title: "Real-Time Analysis",
            description: "Get instant lung cancer risk assessment with our high-speed AI processing pipeline. Results in minutes, not hours."
        },
        {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999V7.9999Z" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.29999 7L12 12L20.7 7" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 22V12" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='text-gray-800'/></svg>,
            title: "Three-Way Classification",
            description: "Advanced classification system detects Normal, Benign, and Malignant conditions with high precision rates."
        },
        {
            icon: <svg className='text-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
            title: "Trust & Transparency",
            description: "Every AI prediction comes with detailed explanations, confidence scores, and visualization of why certain decisions were made."
        },
        {
            icon: <svg className='text-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>,
            title: "Doctor Collaboration",
            description: "Healthcare professionals can review, validate, and add notes to AI predictions for comprehensive patient care."
        },
        {
            icon: <svg className='text-gray-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" /><path d="m12 15 5 6H7Z" /></svg>,
            title: "HIPAA Compliant",
            description: "Your patient data is secure with enterprise-grade encryption and full HIPAA compliance for medical applications."
        }
    ];

  return (
    <>
            
            <section className="py-20 px-4 bg-gray-50 flex flex-col justify-center items-center gap-6" id='features'>
                <button className='px-4 h-8 border border-violet-400 bg-violet-600 text-white text-xs rounded-lg'>Features</button>
                <h2 className="text-3xl md:text-[40px]/12 font-medium text-gray-800 max-w-lg text-center leading-tight">Advanced XAI-Powered Lung Cancer Detection</h2>
                <p className='text-base/7 text-gray-600 max-w-xl text-center'>Early detection saves lives. Our explainable AI provides accurate, transparent, and reliable lung cancer risk assessment.</p>
                <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {featuresData.map((feature, index) => (
                        <div key={index} className='bg-white border border-white rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300 shadow-sm'>
                            <div className='text-violet-600'>{feature.icon}</div>
                            <p className='font-medium text-lg text-gray-800'>{feature.title}</p>
                            <p className='text-sm/5 text-gray-600'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
  )
}

export default Features

