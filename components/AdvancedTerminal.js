'use client';

import React, { useState, useEffect, useRef } from 'react';
import { playTextBlip } from '@/lib/audio';
import { MatrixRain } from '@/components/MatrixRain';

const AVAILABLE_COMMANDS = [
  'help', 'clear', 'whoami', 'sudo', 'matrix', 'ls', 'cat',
  'history', 'cowsay', 'fortune', 'ping', 'play', 'ssh',
  'predict', 'curl', 'exit'
];

const ASCII_BIO = `
  __  __ _ _   _     _ _ 
 |  \\/  (_) |_| |__ (_) |
 | |\\/| | | __| '_ \\| | |
 | |  | | | |_| | | | | |
 |_|  |_|_|\\__|_| |_|_|_|
                         
 Full Stack Developer & ML Enthusiast.
 Building things that look cool and work fast.
`;

const ASCII_RESUME = `
=========================================
          MITHIL ASTIK - RESUME          
=========================================
> EXPERIENCE
  - Software Engineer @ TechCorp
  - ML Researcher @ Univ
> SKILLS
  - JavaScript, React, Next.js
  - Python, PyTorch, TensorFlow
> EDUCATION
  - B.S. Computer Science
=========================================
`;

const COWSAY = (msg) => `
 ${'_'.repeat(msg.length + 2)}
< ${msg} >
 ${'-'.repeat(msg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;

export default function AdvancedTerminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isPanicking, setIsPanicking] = useState(false);

  // Game state
  const [gameState, setGameState] = useState(null); // 'guess-the-number'
  const [gameTarget, setGameTarget] = useState(0);

  // SSH state
  const [sshState, setSshState] = useState(null); // 'guestbook'

  const inputRef = useRef(null);
  const endRef = useRef(null);
  const hasBooted = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = async () => {
      await new Promise(r => setTimeout(r, 300));
      setHistory([{ type: 'system', content: 'Phoenix ROM BIOS PLUS Version 1.10' }]);
      await new Promise(r => setTimeout(r, 200));
      setHistory(prev => [...prev, { type: 'system', content: 'Copyright (C) 1985-2026 Phoenix Technologies Ltd.' }]);
      await new Promise(r => setTimeout(r, 400));
      setHistory(prev => [...prev, { type: 'system', content: 'Checking RAM... 640K OK' }]);
      await new Promise(r => setTimeout(r, 300));
      setHistory(prev => [...prev, { type: 'system', content: 'Loading MithilOS kernel... Done.' }]);
      await new Promise(r => setTimeout(r, 600));
      setHistory(prev => [...prev, { type: 'system', content: 'Starting Advanced Terminal Server... OK' }]);
      await new Promise(r => setTimeout(r, 200));
      setHistory(prev => [...prev, { type: 'system', content: "Type 'help' to see available commands." }]);
      inputRef.current?.focus();
    };

    bootSequence();
  }, []);

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    if (commandHistory[commandHistory.length - 1] !== trimmed && sshState === null && gameState === null) {
      setCommandHistory(prev => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    setHistory(prev => [...prev, { type: 'command', content: trimmed }]);

    // Handle game input
    if (gameState === 'guess-the-number') {
      const guess = parseInt(trimmed);
      if (isNaN(guess)) {
        pushOutput("Please enter a valid number, or type 'exit' to quit.", 'text');
      } else if (guess === gameTarget) {
        pushOutput("🎉 YOU GOT IT! You are a true hacker.", 'success');
        setGameState(null);
      } else if (guess < gameTarget) {
        pushOutput("Higher...", 'text');
      } else {
        pushOutput("Lower...", 'text');
      }
      if (trimmed.toLowerCase() === 'exit') setGameState(null);
      return;
    }

    // Handle SSH input
    if (sshState === 'guestbook') {
      if (trimmed.toLowerCase() === 'exit') {
        pushOutput("Connection closed by foreign host.", 'text');
        setSshState(null);
        return;
      }

      try {
        const stored = JSON.parse(localStorage.getItem('guestbook') || '[]');
        stored.push({ date: new Date().toLocaleDateString(), msg: trimmed });
        localStorage.setItem('guestbook', JSON.stringify(stored));
        pushOutput("Message saved to /var/log/guestbook.txt. Type 'exit' to disconnect.", 'success');
      } catch (e) {
        pushOutput("Failed to save message.", 'error');
      }
      return;
    }

    // Parse pipes
    const pipeParts = trimmed.split('|').map(s => s.trim());
    let currentOutput = null;

    for (let i = 0; i < pipeParts.length; i++) {
      const part = pipeParts[i];
      const args = part.split(' ').filter(Boolean);
      const baseCmd = args[0].toLowerCase();
      const rest = args.slice(1).join(' ');

      if (baseCmd === 'grep' && currentOutput) {
        const lines = currentOutput.split('\\n');
        const matched = lines.filter(l => l.toLowerCase().includes(rest.toLowerCase()));
        currentOutput = matched.length ? matched.join('\\n') : '';
        continue;
      }

      currentOutput = executeBaseCommand(baseCmd, rest, trimmed);
      if (typeof currentOutput === 'object' && currentOutput !== null && i < pipeParts.length - 1) {
        // If it's a react node and we try to pipe, just stringify it for grep
        pushOutput("Cannot pipe non-text output.", 'error');
        return;
      }
    }

    if (currentOutput !== null && currentOutput !== undefined) {
      if (typeof currentOutput === 'string') {
        pushOutput(currentOutput, 'text');
      } else {
        setHistory(prev => [...prev, { type: 'output', content: currentOutput }]);
      }
    }
  };

  const executeBaseCommand = (baseCmd, rest, fullCmd) => {
    switch (baseCmd) {
      case 'help':
        return `Available commands:\nhelp, clear, whoami, sudo, ls, cat, history, cowsay, ping, play, ssh, predict, curl, matrix, exit`;
      case 'whoami':
        return ASCII_BIO;
      case 'sudo':
        if (rest === 'make me a sandwich') return "Okay.";
        return "Nice try. This incident will be reported.";
      case 'ls':
        if (rest === 'skills/') return "frontend.js  backend.py  ml_models.pt  devops.yaml";
        return "skills/  projects/  resume.pdf  guestbook.txt";
      case 'cat':
        if (rest === 'skills/frontend.js') return "export const frontend = ['React', 'Next.js', 'Tailwind', 'Three.js'];";
        if (rest === '/etc/passwd') return "root:x:0:0:root:/root:/bin/bash\nmithil:x:1000:1000:Too busy coding to set a password:/home/mithil:/bin/zsh";
        return `cat: ${rest}: No such file or directory`;
      case 'history':
        return commandHistory.concat([fullCmd]).map((c, i) => `${i + 1}  ${c}`).join('\n');
      case 'cowsay':
        return COWSAY(rest || "Moo");
      case 'fortune':
        return "You will soon discover a hidden easter egg.";
      case 'ping':
        return `PING ${rest || 'localhost'} (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms\nRequest timeout: Server is on coffee break.`;
      case 'curl':
        if (rest === 'resume.pdf') return ASCII_RESUME;
        return `curl: (6) Could not resolve host: ${rest}`;
      case 'matrix':
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 10000);
        return "Wake up, Neo...";
      case 'predict':
        if (!rest) return "Error: predict requires input text. (e.g. predict Will I get hired?)";
        return `[TensorFlow.js Mock] Loading weights... Done.\nAnalyzing semantic tokens... Done.\nPrediction: 99.9% probability of SUCCESS. You should definitely hire Mithil.`;
      case 'rm':
        if (rest === '-rf /') {
          setIsPanicking(true);
          setTimeout(() => setIsPanicking(false), 4000);
          return "KERNEL PANIC: Unrecoverable system error.";
        }
        return "Permission denied.";
      case 'clear':
        setHistory([]);
        return null;
      case 'exit':
        return "Nice try, you're stuck here. (Just kidding, close the tab whenever).";
      case 'play':
        setGameState('guess-the-number');
        setGameTarget(Math.floor(Math.random() * 100) + 1);
        return "Let's play Guess The Number! I'm thinking of a number between 1 and 100.\nEnter your guess:";
      case 'ssh':
        if (rest === 'guestbook') {
          setSshState('guestbook');
          const msgs = (() => {
            try { return JSON.parse(localStorage.getItem('guestbook') || '[]'); } catch(e) { return []; }
          })();
          const recent = msgs.slice(-3).map(m => `[${m.date}] guest: ${m.msg}`).join('\n');
          return `Connecting to guestbook...\nConnected.\n\n--- RECENT MESSAGES ---\n${recent || 'No messages yet.'}\n\nEnter your message to leave a mark (or type 'exit'):`;
        }
        return "ssh: Could not resolve hostname";
      default:
        return `Command not found: ${baseCmd}`;
    }
  };

  const pushOutput = (text, type = 'text') => {
    if (type === 'text') {
      const lines = text.split('\\n');
      setHistory(prev => [...prev, { 
        type: 'output', 
        content: (
          <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
            {lines.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )
      }]);
    } else if (type === 'error') {
      setHistory(prev => [...prev, { type: 'output', content: <div style={{ color: 'var(--error)' }}>{text}</div> }]);
    } else if (type === 'success') {
      setHistory(prev => [...prev, { type: 'output', content: <div style={{ color: 'var(--accent)' }}>{text}</div> }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setHistory(prev => [...prev, { type: 'command', content: input + '^C' }]);
      setInput('');
      setGameState(null);
      setSshState(null);
    }
  };

  const handleInput = (e) => {
    playTextBlip();
    setInput(e.target.value);
  };

  if (isPanicking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '600px', backgroundColor: 'var(--bg-base)' }}>
        <div style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 'bold', animation: 'blink 1s infinite' }}>
          [KERNEL PANIC] - SYSTEM HALTED
        </div>
      </div>
    );
  }

  let promptStr = 'guest@mithil-os:~$';
  if (gameState) promptStr = 'game> ';
  if (sshState) promptStr = 'guestbook> ';

  return (
    <>
      {showMatrix && <MatrixRain />}
      <div className="crt-overlay" style={{ height: 'calc(100vh - 180px)', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        <div className="term-card mono" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-surface)' }} onClick={() => inputRef.current?.focus()}>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.map((item, idx) => (
              <div key={idx}>
                {item.type === 'command' && (
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      {promptStr}
                    </span>
                    <span>{item.content}</span>
                  </div>
                )}
                {item.type === 'system' && (
                  <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.content}</div>
                )}
                {item.type === 'output' && item.content}
              </div>
            ))}
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{promptStr}</span>
              <input 
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  outline: 'none',
                  flex: 1,
                  width: '100%'
                }}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={endRef} />
          </div>

          {/* Mobile Quick Keys */}
          <div className="hide-on-desktop" style={{ 
            gap: '8px', 
            marginTop: '12px', 
            paddingTop: '12px', 
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap'
          }}>
            {['Tab', 'Up', 'Down', 'Ctrl+C'].map(key => (
              <button
                key={key}
                onClick={() => {
                  let simulatedEvent = { key, preventDefault: () => {} };
                  if (key === 'Ctrl+C') { simulatedEvent.key = 'c'; simulatedEvent.ctrlKey = true; }
                  if (key === 'Up') simulatedEvent.key = 'ArrowUp';
                  if (key === 'Down') simulatedEvent.key = 'ArrowDown';
                  handleKeyDown(simulatedEvent);
                  inputRef.current?.focus();
                }}
                style={{
                  background: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'inherit'
                }}
              >
                {key}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
