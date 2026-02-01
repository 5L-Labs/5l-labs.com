import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function OpenEmbeddingsBadge() {
    return (
        <div className={styles.badgeWrapper}>
            <Link
                to="https://www.open-embeddings.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Embeddings"
                title="Open Embeddings"
                className={styles.badgeLink}
            >
                OE
            </Link>
        </div>
    );
}
