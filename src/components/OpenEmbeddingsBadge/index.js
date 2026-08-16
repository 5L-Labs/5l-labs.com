import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function OpenEmbeddingsBadge() {
    return (
        <div className={styles.badgeWrapper}>
            <Link
                to="https://www.open-embeddings.org/"
                className={styles.badgeLink}
                aria-label="Open Embeddings"
            >
                OE
            </Link>
        </div>
    );
}
