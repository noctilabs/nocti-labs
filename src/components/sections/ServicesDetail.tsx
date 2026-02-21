'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = [
  {
    title: 'Commerce Engineering',
    description: 'As Medusa Experts, we deliver tailor-made Medusa solutions and headless commerce architectures that empower your business. From custom integrations to platform migrations, we engineer scalable commerce systems that grow with your business.',
    items: [
      'Headless Architecture',
      'Custom Apps & Integrations',
      'Platform Migrations',
      'Checkout Extensions',
      'Data Migration',
      'MVP Development',
    ],
  },
  {
    title: 'AI & Automation',
    description: 'We implement practical AI systems that enhance commerce operations. Our solutions leverage machine learning, intelligent workflows, and automation to drive efficiency and personalization across your digital ecosystem.',
    items: [
      'AI-driven Personalization',
      'Workflow Automation',
      'AI Agents',
      'Intelligent Commerce Consulting',
    ],
  },
  {
    title: 'UX & Experience Design',
    description: 'We design commerce experiences that convert. Our design approach combines strategic thinking with cutting-edge design systems and motion design to create omnichannel experiences that delight customers.',
    items: [
      'UX Strategy',
      'Interface Systems',
      'Design Systems',
      'Motion & Interaction',
      'Omnichannel Experience Design',
    ],
  },
  {
    title: 'Optimization & Growth',
    description: 'Commerce systems should evolve continuously. We provide ongoing optimization, performance improvements, and growth engineering to ensure your platform stays competitive and delivers measurable results.',
    items: [
      'Performance Optimization',
      'Growth Engineering',
      'Continuous Improvements & Feature Expansion',
      'Ongoing Technical Partnership',
    ],
  },
];

export default function ServicesDetail() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      {/* Label */}
      <h2 className="font-body text-[40px] font-bold mb-16">Services</h2>

      {/* Accordion */}
      <div className="space-y-8">
        {servicesData.map((service, idx) => (
          <div key={idx} className="border border-white border-opacity-20 rounded-lg overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="w-full p-8 flex items-center justify-between bg-black hover:bg-opacity-80 transition"
            >
              <h3 className="font-body text-[48px] font-bold text-left">{service.title}</h3>
              <span className="text-[32px] font-bold flex-shrink-0 ml-4">
                {expanded === idx ? '−' : '+'}
              </span>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {expanded === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black border-t border-white border-opacity-20 overflow-hidden"
                >
                  <div className="p-8 space-y-6">
                    {/* Description */}
                    <p className="font-body text-[24px] text-white opacity-90">
                      {service.description}
                    </p>

                    {/* Items List */}
                    <div className="space-y-3 pt-4">
                      {service.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="font-body text-[18px] text-white opacity-80 flex items-center gap-3">
                          <span>→</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
