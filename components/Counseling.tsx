import React, { useState } from 'react';
import { MessageCircle, Heart, HelpCircle, ArrowRight, User, BookOpen, ChevronRight, Users, FileText } from 'lucide-react';

const Counseling: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('g1');

  const FIGURE_STEPS = [
    { letter: 'F', title: "Formulate a Plan", desc: "Assemble team, timing, setting." },
    { letter: 'I', title: "Identify Needs", desc: "Assess parental understanding." },
    { letter: 'G', title: "Give Information", desc: "Simple language, visual aids." },
    { letter: 'U', title: "Uncertainty", desc: "Acknowledge limits of prediction." },
    { letter: 'R', title: "Recognize Emotions", desc: "Validate distress, allow silence." },
    { letter: 'E', title: "Establish Follow-up", desc: "Discuss next steps, support." }
  ];

  const DIAGNOSES = [
    { id: 'g1', label: 'Grade I GMH' },
    { id: 'g2', label: 'Grade II GMH-IVH' },
    { id: 'g3', label: 'Grade III GMH-IVH' },
    { id: 'pvhi', label: 'PVHI (Grade IV)' },
    { id: 'cpvl', label: 'Cystic PVL' },
    { id: 'porencephaly', label: 'Porencephalic Cyst' },
    { id: 'cbh', label: 'Cerebellar Hemorrhage' },
  ];

  const SCRIPTS: Record<string, { title: string; finding: string; uncertainty: string; emotion: string; plan: string }> = {
    g1: {
      title: "Grade I Germinal Matrix Hemorrhage",
      finding: "We saw a small amount of bleeding in the 'germinal matrix,' which is a fragile area with many blood vessels near the ventricles. The good news is that the bleeding is confined to this small area and has not spilled into the fluid spaces or the brain tissue.",
      uncertainty: "While it is always difficult to predict exactly how any premature baby will develop, babies with this specific finding typically develop very similarly to premature babies without any bleeding.",
      emotion: "I know hearing the word 'bleed' in the brain is incredibly frightening. It is very common to feel anxious about this.",
      plan: "We will continue to monitor your baby's head growth and development closely, but this usually resolves on its own without specific treatment."
    },
    g2: {
      title: "Grade II GMH-IVH",
      finding: "The ultrasound shows bleeding that started in the germinal matrix and has spilled into the ventricles (the fluid-filled spaces). However, the ventricles have not swelled up; they remain normal in size.",
      uncertainty: "Most children with this finding do well, but we will need to watch closely to ensure the fluid spaces don't get larger over time. Every child's brain heals differently.",
      emotion: "This is heavy news to receive. Take a moment. What is going through your mind right now?",
      plan: "We will repeat the ultrasound in [X] days to check the fluid levels. We are here to support you through this monitoring period."
    },
    g3: {
      title: "Grade III GMH-IVH",
      finding: "We see bleeding that has spilled into the ventricles, and because of the amount of blood, the ventricles have become enlarged (dilated). This puts some pressure on the surrounding brain tissue.",
      uncertainty: "It is hard to predict the long-term impact. Some children recover with minimal issues, while others may face challenges with movement or learning. We cannot know for certain today.",
      emotion: "I can see how upsetting this information is. It is completely normal to feel overwhelmed or angry that this happened.",
      plan: "We need to monitor the pressure closely. We will measure the head size daily and repeat ultrasounds frequently to decide if we need to intervene to help drain the fluid."
    },
    pvhi: {
      title: "Periventricular Hemorrhagic Infarction (PVHI)",
      finding: "The bleeding has blocked some of the veins that drain blood from the brain. This blockage caused a backup of pressure, leading to an injury (infarction) in the brain tissue itself, on the [Left/Right] side.",
      uncertainty: "This is a significant injury. Because it involves the brain tissue, there is a higher chance of future challenges, particularly with movement on the opposite side of the body. However, babies' brains are adaptable, and early therapy makes a difference.",
      emotion: "I am so sorry to have to tell you this. I know this is not what you hoped to hear. We are going to walk this path with you.",
      plan: "Our focus now is on protecting the brain from further stress. We will connect you with our developmental team early to start supporting your baby's potential."
    },
    cpvl: {
      title: "Cystic Periventricular Leukomalacia (cPVL)",
      finding: "We have found some small cysts (holes) in the white matter of the brain. This usually happens when those specific areas didn't get enough blood flow or oxygen for a period of time.",
      uncertainty: "These areas are important for sending signals to the muscles. There is a strong likelihood that this will affect walking or movement (Cerebral Palsy), but the severity can vary widely from child to child.",
      emotion: "It is heartbreaking to hear about a permanent injury. You might be feeling a sense of grief for the 'normal' course you expected.",
      plan: "We will order an MRI near discharge to see the full extent. Early Intervention therapy will be critical, and we will set that up before you go home."
    },
    porencephaly: {
      title: "Porencephalic Cyst",
      finding: "On the scan, we see a fluid-filled space (cyst) where there was previously brain tissue. This is likely the result of the old bleeding that has now resolved, leaving this mark behind.",
      uncertainty: "While the cyst itself won't grow or hurt him/her, it represents an area of permanent injury. We will have to wait and watch his/her development to see exactly what functions are affected.",
      emotion: "It is very hard to see a permanent reminder of a past complication. Whatever you are feeling right now is valid.",
      plan: "We will follow his/her neurological development very closely in clinic. The most important thing now is a loving, stimulating home environment."
    },
    cbh: {
      title: "Cerebellar Hemorrhage",
      finding: "We have identified bleeding in the cerebellum, which is the small part of the brain at the back that helps with balance and coordination.",
      uncertainty: "We are learning more about this type of injury every day. It can affect balance, but also learning and behavior. It is very difficult to give you a specific percentage chance of these issues right now.",
      emotion: "Uncertainty is one of the hardest parts of the NICU journey. It's okay to feel scared about the unknown.",
      plan: "We will monitor this area. An MRI later on will give us a better picture of the size of the injury than the ultrasound can."
    }
  };

  const currentScript = SCRIPTS[selectedId];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header / Intro */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 hidden sm:block">
            <MessageCircle size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Counseling Framework</h2>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Based on the FIGURE framework (Bernstein & Lemmon, 2021). Effective counseling requires balancing honesty about brain injury with hope for the child's potential.
            </p>
          </div>
        </div>
        
        {/* The FIGURE Acronym Visual */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {FIGURE_STEPS.map((step) => (
            <div key={step.letter} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center hover:bg-indigo-50 hover:border-indigo-100 transition-colors cursor-default group">
              <div className="text-2xl font-black text-indigo-200 group-hover:text-indigo-500 mb-1 transition-colors">{step.letter}</div>
              <div className="font-bold text-slate-800 text-xs uppercase mb-2">{step.title}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Selection Menu */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 flex items-center gap-2">
              <BookOpen size={18} /> Select Diagnosis
            </div>
            <div className="divide-y divide-slate-100">
              {DIAGNOSES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between
                    ${selectedId === d.id 
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                    }`}
                >
                  {d.label}
                  {selectedId === d.id && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
            <h4 className="font-bold mb-2 flex items-center gap-2"><User size={16}/> Provider Note</h4>
            <p>
              Always ask permission before sharing news.
              <br/>
              <em>"We have the results of the ultrasound. Is now a good time to discuss them?"</em>
            </p>
          </div>
        </div>

        {/* Right: The Script */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">{currentScript.title}</h3>

              <div className="space-y-6">
                
                {/* Give Information */}
                <div className="flex gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">G</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">Give Information</h4>
                     <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100 italic">
                       "{currentScript.finding}"
                     </p>
                   </div>
                </div>

                {/* Acknowledge Uncertainty */}
                <div className="flex gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">U</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">Acknowledge Uncertainty</h4>
                     <p className="text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100 italic">
                       "{currentScript.uncertainty}"
                     </p>
                   </div>
                </div>

                {/* Recognize Emotions */}
                <div className="flex gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">R</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">Recognize Emotions</h4>
                     <p className="text-slate-700 leading-relaxed bg-rose-50/50 p-3 rounded-lg border border-rose-100 italic">
                       "{currentScript.emotion}"
                     </p>
                   </div>
                </div>

                {/* Establish Follow-up */}
                <div className="flex gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">E</div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">Establish Follow-up</h4>
                     <p className="text-slate-700 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 italic">
                       "{currentScript.plan}"
                     </p>
                   </div>
                </div>

              </div>
            </div>
            
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
               <span>Script Example</span>
               <span className="flex items-center gap-1"><HelpCircle size={12}/> Tailor language to family's needs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Family Integrated Care Resources Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="text-rose-500" size={24} />
          Family Integrated Care Resources
        </h3>
          <p className="text-slate-600 mb-6">
            Engaging parents as partners in care is essential for neuroprotection. Below is the comprehensive guide for Family Integrated Care practices.
        </p>
        <a 
          href="https://drive.google.com/file/d/1SvdyhhRMm_osLMj9jOmwPYLSsTgkhcsh/view?usp=sharing" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 p-4 border border-rose-200 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors group"
        >
            <div className="bg-white p-2 rounded-full shadow-sm text-rose-500">
                <FileText size={20} />
            </div>
            <div>
                <div className="font-bold text-rose-900 group-hover:text-rose-700">Family Integrated Care Guide</div>
                <div className="text-sm text-rose-700/80">View PDF Document</div>
            </div>
        </a>
      </div>
    </div>
  );
};

export default Counseling;