import AdvancedTerminal from '@/components/AdvancedTerminal';

export const metadata = {
  title: 'Terminal - MithilOS',
  description: 'Advanced interactive command line sandbox.',
};

export default function TerminalPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Welcome to the ultimate sandbox. Type <span style={{ color: 'var(--accent)' }}>help</span> to get started.
      </div>
      <AdvancedTerminal />
    </div>
  );
}
