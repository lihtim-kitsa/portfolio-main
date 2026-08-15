import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '60vh' }}>
      <div className="dialogue-box" style={{ flexDirection: 'column', gap: '24px', maxWidth: '600px', textAlign: 'center', padding: '32px' }}>
        <h2 className="text-yellow" style={{ fontSize: '32px', fontWeight: 'bold' }}>
          * ERROR 404
        </h2>
        
        <div style={{ fontSize: '20px', lineHeight: '1.5' }}>
          * This is a 404 page on a website.<br/>
          * You cannot SAVE here.<br/>
          * There is nothing to interact with.
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link href="/" className="battle-action text-blue" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '24px' }}>
            ♥ [RETURN]
          </Link>
        </div>
      </div>
    </div>
  );
}
