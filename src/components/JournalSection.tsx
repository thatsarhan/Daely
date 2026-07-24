import React from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export function JournalSection() {
  return (
    <section id="journal" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#F7A8C9] font-bold block mb-3">
              The Summer Edit
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2F2F35] tracking-tight">
              Daely Journal
            </h2>
          </div>
          <p className="text-[#2F2F35]/70 text-base max-w-md mt-4 md:mt-0">
            Stories on morning light, minimalist design, coastal getaways, and mindful everyday care.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-[#FFF9F6] rounded-[32px] overflow-hidden border border-black/5 flex flex-col justify-between hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2F2F35] text-[11px] font-semibold">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#2F2F35]/50 mb-3 font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#2F2F35] mb-3 group-hover:text-[#E07A9E] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#2F2F35]/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-black/5 text-xs font-semibold text-[#2F2F35]">
                <span>By {article.author}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#E07A9E]">
                  <span>Read Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
