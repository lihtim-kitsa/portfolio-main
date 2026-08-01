'use client';

import React, { useState } from 'react';
import DialogueBox from '@/components/DialogueBox';
import { Mail, ArrowUpRight } from 'lucide-react';
import { playHoverSound, playSelectSound } from '@/lib/audio';

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76 0-1.5-.5-2.8-1.4-3.8.14-.36.6-1.8-.14-3.8 0 0-1.1-.35-3.6 1.4-1-.28-2.2-.42-3.4-.42-1.2 0-2.4.14-3.4.42-2.5-1.75-3.6-1.4-3.6-1.4-.74 2-.28 3.44-.14 3.8-.9 1.4-1.3 1.4-3.8 0-5.23 3-6.42 6-6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const contacts = [
  { name: "EMAIL", value: "astik.mithil@gmail.com", url: "mailto:astik.mithil@gmail.com", icon: <Mail size={20} />, color: "#14b8a6" },
  { name: "LINKEDIN", value: "linkedin.com/in/mithil-astik", url: "https://linkedin.com/in/mithil-astik", icon: <LinkedinIcon size={20} />, color: "#3b82f6" },
  { name: "GITHUB", value: "github.com/lihtim-kitsa", url: "https://github.com/lihtim-kitsa", icon: <GithubIcon size={20} />, color: "#f3f4f6" },
  { name: "INSTAGRAM", value: "instagram.com/lihtimkitsa", url: "https://instagram.com/lihtimkitsa", icon: <InstagramIcon size={20} />, color: "#ec4899" }
];

export default function ContactTerminal() {
  const [dialogueDone, setDialogueDone] = useState(false);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <DialogueBox 
        text="* You encountered MITHIL!
* How would you like to connect?"
        speed={40}
        onComplete={() => setDialogueDone(true)}
      />

      {dialogueDone && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', animation: 'fadeIn 1s' }}>
          {contacts.map((contact, idx) => (
            <a 
              key={idx}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dialogue-box contact-card"
              style={{
                textDecoration: 'none',
                minHeight: 'auto',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = contact.color;
                playHoverSound();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'white';
              }}
              onClick={() => playSelectSound()}
            >
              <div style={{ color: contact.color, display: 'flex', alignItems: 'center' }}>
                {contact.icon}
              </div>
              <div className="contact-info" style={{ flex: 1, display: 'flex' }}>
                <span className="contact-name" style={{ color: contact.color, fontWeight: 'bold' }}>{contact.name}</span>
                <span className="contact-value" style={{ color: 'var(--text-secondary)' }}>{contact.value}</span>
              </div>
              <ArrowUpRight size={24} color="#52525b" />
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-card {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .contact-info {
          align-items: center;
          gap: 24px;
        }
        .contact-name {
          width: 120px;
        }
        .contact-value {
          word-break: break-all;
        }
        @media (max-width: 600px) {
          .contact-card {
            padding: 12px 16px;
            gap: 12px;
          }
          .contact-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .contact-name {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}

