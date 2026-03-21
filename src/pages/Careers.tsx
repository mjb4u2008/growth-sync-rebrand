import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const departments = [
  {
    name: "Engineering",
    count: 7,
    roles: [
      { title: "Founding AI Engineer", location: "Remote / LA" },
      { title: "Staff Backend Engineer", location: "Remote / LA" },
      { title: "Senior Frontend Engineer, Product", location: "Remote" },
      { title: "Applied ML Engineer, Personalization", location: "Remote / LA" },
      { title: "Infrastructure Engineer", location: "Remote" },
      { title: "Founding Engineer, Integrations", location: "Remote" },
      { title: "Engineering Manager, AI Platform", location: "Remote / LA" },
    ]
  },
  {
    name: "Product & Design",
    count: 3,
    roles: [
      { title: "Founding Product Designer", location: "Remote / LA" },
      { title: "Brand Design Lead", location: "Remote" },
      { title: "Design Engineer", location: "Remote" },
    ]
  },
  {
    name: "Go-to-Market",
    count: 5,
    roles: [
      { title: "Head of GTM", location: "LA" },
      { title: "Founding Account Executive", location: "Remote / LA" },
      { title: "Growth Marketing Lead", location: "Remote" },
      { title: "Customer Success Lead", location: "Remote" },
      { title: "Partnerships Lead, Platforms", location: "Remote / LA" },
    ]
  },
  {
    name: "Social & Content",
    count: 3,
    roles: [
      { title: "Head of Social", location: "Remote / LA" },
      { title: "Content Lead", location: "Remote" },
      { title: "Community & Creator Relations Lead", location: "Remote" },
    ]
  }
];

const totalRoles = departments.reduce((sum, dept) => sum + dept.roles.length, 0);

export default function Careers() {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Careers | GrowthSync</title>
        <meta name="description" content="Join GrowthSync — we're building the future of social commerce. See open roles in engineering, design, go-to-market, and content." />
      </Helmet>

      {/* Hero — minimal, left-aligned, typographic */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-display font-bold text-gray-950 tracking-tight mb-5 leading-[1.1]"
          >
            Careers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            We're a lean, fast-moving team building what we believe is the next unicorn in social commerce. {totalRoles} roles open.
          </motion.p>
        </div>
      </section>

      {/* Roles — clean list rows grouped by department */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-12">
          <div className="space-y-12 md:space-y-16">
            {departments.map((dept, deptIndex) => (
              <motion.div
                key={deptIndex}
                initial={{ opacity: 0, y: 15 }}
                {...(deptIndex === 0
                  ? { animate: { opacity: 1, y: 0 } }
                  : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
                )}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{dept.name}</h2>
                  <span className="text-sm text-gray-300">{dept.count}</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {dept.roles.map((role, roleIndex) => {
                    const subject = encodeURIComponent(`GrowthSync — ${role.title}`);
                    const body = encodeURIComponent(`Hi GrowthSync team,\n\nI'm interested in the ${role.title} role (${role.location}).\n\nPlease submit your resume and a brief blurb about yourself here.\n\nThank you!`);
                    return (
                      <a
                        key={roleIndex}
                        href={`mailto:mike@rmgrowth.com?subject=${subject}&body=${body}`}
                        className="group flex items-center justify-between py-5 md:py-6"
                      >
                        <span className="text-base md:text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                          {role.title}
                        </span>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400">
                            <MapPin className="w-3.5 h-3.5" /> {role.location}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-16 md:mt-20 pt-8 border-t border-gray-100">
            <p className="text-gray-500">
              Don't see your role? Email <a href="mailto:mike@rmgrowth.com?subject=GrowthSync%20%E2%80%94%20General%20Interest" className="text-gray-900 font-medium hover:underline">mike@rmgrowth.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
