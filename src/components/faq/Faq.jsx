import React from 'react'

const Faq = () => {

    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: "How does XAI help in lung cancer detection?",
            answer: "Our Explainable AI (XAI) technology provides clear visual explanations for each prediction. When you upload a lung scan, our AI highlights the specific regions of concern with heatmaps and provides detailed reasoning for classifying results as Normal, Benign, or Malignant. This transparency helps both patients and healthcare professionals understand and trust the AI's diagnosis."
        },
        {
            question: "What is the accuracy of the lung cancer detection system?",
            answer: "Our XAI-powered lung cancer detection system achieves up to 98.5% accuracy in classifying lung scans. The system has been trained on extensive medical datasets and validated by certified radiologists. Every result includes confidence scores so you know how certain the AI is about its prediction."
        },
        {
            question: "What do the three classification results mean?",
            answer: "Our system classifies lung scans into three categories: Normal (no signs of cancer), Benign (non-cancerous abnormalities), and Malignant (cancerous growths). Each classification comes with detailed explanations about what the AI detected, why it made that determination, and recommended next steps."
        },
        {
            question: "Is my medical data secure and private?",
            answer: "Yes, absolutely. We take data privacy very seriously. Our platform is fully HIPAA compliant, uses enterprise-grade encryption for all data transmission and storage, and we never share your personal health information. All scans are processed securely and can be deleted at any time."
        },
    ];

  return (
    <section className="py-20 px-4 bg-gray-50 flex flex-col justify-center items-center" id='faq'>
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
                <button className='px-4 h-8 border border-violet-400 bg-violet-600 text-white text-xs rounded-lg'>FAQ's</button>
                <h1 className="text-3xl md:text-[40px]/12 font-medium text-gray-800 text-center mt-6">Common Questions</h1>
                <p className="text-base text-gray-600 mt-4 pb-8 text-center max-w-xl">
                    Learn more about our XAI-powered lung cancer detection technology and how it can help with early detection.
                </p>
                {faqs.map((faq, index) => (
                    <div className="border-b border-gray-200 py-4 cursor-pointer w-full hover:bg-white/50 transition duration-300 rounded-lg px-4" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-800">
                                {faq.question}
                            </h3>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out text-violet-600`}>
                                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className={`text-sm text-gray-600 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
    </section>
  )
}

export default Faq

