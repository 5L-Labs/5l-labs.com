import React from 'react';
import Link from '@docusaurus/Link';

export default function OpenEmbeddingsBadge() {


    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 2147483647, // Max z-index
        }}>
            <Link
                to="https://www.open-embeddings.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Open Embeddings website"
                title="Open Embeddings"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#003366', // Dark blue
                    color: 'white',
                    borderRadius: '8px',
                    border: '2px solid white', // Added border for visibility
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                OE
            </Link>
        </div>
    );
}
