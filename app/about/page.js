import DialogueBox from '@/components/DialogueBox';

export const metadata = {
  title: 'About',
  description: 'About Mithil Astik',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <DialogueBox 
          text="* Ah... I see you want to know more about me."
          speed={50}
        />
      </div>

      <div className="dialogue-box" style={{ flexDirection: 'column', fontSize: '24px', lineHeight: '1.4', marginBottom: '32px' }}>
        <p style={{ marginBottom: '16px' }}>
          * Hi! I'm <span className="text-yellow">Mithil Astik</span>, a developer living at the crossroads of ML engineering, web development, and quantum computing. 
        </p>
        <p>
          * I love building systems that are not just functional but genuinely resilient and efficient. Currently, I'm exploring Rust, building PINNs and having fun graphic designing.
        </p>
      </div>

      <div className="dialogue-box" style={{ flexDirection: 'column', fontSize: '24px' }}>
        <h2 className="text-green" style={{ marginBottom: '16px', borderBottom: '2px solid white', paddingBottom: '8px' }}>
          CURRENT QUESTS
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>* Building performant CLI tools in Rust</div>
          <div>* Deep interest in security architectures</div>
          <div>* Exploring WebAssembly and systems programming</div>
          <div>* Talk to me about Linux, APIs, and open-source</div>
          <div>* Making complex systems understandable</div>
          <div>* Always learning, always shipping</div>
        </div>
      </div>
    </div>
  );
}

