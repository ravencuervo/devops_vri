import React from 'react';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('es-PE', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch { return dateStr; }
};

// Split text into 2 balanced columns by character count (works with single long paragraphs)
function splitToTwoColumns(paragraphs) {
    if (!paragraphs.length) return [[], []];
    const fullText = paragraphs.join('\n\n');
    const mid = Math.floor(fullText.length / 2);
    let splitIdx = mid;
    // Find nearest sentence end after midpoint
    for (let i = mid; i < Math.min(mid + 400, fullText.length - 1); i++) {
        if ('.!?'.includes(fullText[i]) && fullText[i + 1] === ' ') { splitIdx = i + 1; break; }
    }
    const leftText = fullText.slice(0, splitIdx).trim();
    const rightText = fullText.slice(splitIdx).trim();
    const toParas = (t) => t.split('\n\n').map(p => p.trim()).filter(Boolean);
    return [toParas(leftText), toParas(rightText)];
}

const paraStyle = { fontSize: '12px', lineHeight: '1.75', color: '#2a2a2a', marginBottom: '10px', textAlign: 'justify' };

const ColumnParagraphs = ({ paragraphs, dropCap }) => (
    <>
        {paragraphs.map((para, i) => (
            <p key={i} style={paraStyle}>
                {dropCap && i === 0 && para.length > 0 ? (
                    <>
                        <span style={{ float: 'left', fontSize: '52px', fontWeight: 900, lineHeight: '0.78', marginRight: '7px', marginTop: '5px', color: '#030D4F', fontFamily: 'Georgia, serif' }}>
                            {para[0]}
                        </span>
                        {para.slice(1)}
                    </>
                ) : para}
            </p>
        ))}
        {paragraphs.length === 0 && <p style={{ ...paraStyle, color: '#ccc', fontStyle: 'italic' }}>—</p>}
    </>
);

const NewsPaperTemplate = React.forwardRef(({ news }, ref) => {
    if (!news) return null;

    const allPhotos = [news.image, ...(news.images || [])].filter((img, i, s) => img && s.indexOf(img) === i);
    const mainPhoto = allPhotos[0];
    const galleryPhotos = allPhotos.slice(1);
    const paragraphs = news.content && typeof news.content === 'string'
        ? news.content.split('\n\n').map(p => p.trim()).filter(Boolean) : [];
    const [leftCol, rightCol] = splitToTwoColumns(paragraphs);
    const publishDate = formatDate(news.date || news.publishedAt);

    const page = { width: '794px', boxSizing: 'border-box', padding: '36px 48px', backgroundColor: '#ffffff', fontFamily: "'Georgia', 'Times New Roman', serif", color: '#1a1a1a' };
    const divider = { width: '1px', background: '#ddd', flexShrink: 0 };

    return (
        <div ref={ref} style={{ width: '794px', backgroundColor: '#ffffff' }}>

            {/* ── PAGE 1 ── */}
            <div style={page}>

                {/* HEADER */}
                <div style={{ borderBottom: '4px solid #1a1a1a', paddingBottom: '10px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                        <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555' }}>
                            Puno, Perú<br />{news.category || 'Noticia VRI'}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
                                VRI <span style={{ color: '#030D4F' }}>JOURNAL</span>
                            </div>
                            <div style={{ fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', marginTop: '3px' }}>
                                Universidad Nacional del Altiplano · Vicerrectorado de Investigación
                            </div>
                        </div>
                        <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', textAlign: 'right' }}>
                            Edición Digital<br />Ejemplar Gratuito
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', padding: '4px 0', display: 'flex', justifyContent: 'space-between', fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
                        <span>Vol. {new Date().getFullYear()} — No. {String(news.id || '001').padStart(3, '0')}</span>
                        <span style={{ fontStyle: 'italic' }}>{publishDate}</span>
                        <span>Divulgación Científica</span>
                    </div>
                </div>

                {/* HEADLINE */}
                <div style={{ textAlign: 'center', margin: '18px 0 12px' }}>
                    <h1 style={{ fontSize: '34px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.5px', margin: '0 0 8px', color: '#030D4F' }}>{news.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
                        <span style={{ height: '1px', width: '36px', background: '#aaa', display: 'inline-block' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', fontStyle: 'italic' }}>{news.category} · {publishDate}</span>
                        <span style={{ height: '1px', width: '36px', background: '#aaa', display: 'inline-block' }}></span>
                    </div>
                    {news.excerpt && (
                        <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#555', maxWidth: '560px', margin: '6px auto 0', lineHeight: 1.6, borderLeft: '3px solid #AEDD2B', paddingLeft: '12px', textAlign: 'left' }}>{news.excerpt}</p>
                    )}
                </div>

                {/* HERO PHOTO */}
                {mainPhoto && (
                    <div style={{ marginBottom: '14px' }}>
                        <div style={{ width: '100%', height: '300px', overflow: 'hidden', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                            <img src={mainPhoto} alt="principal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.1)' }} />
                        </div>
                        <p style={{ fontSize: '8px', color: '#888', fontStyle: 'italic', marginTop: '3px', textAlign: 'center' }}>
                            Fotografía principal · {news.category} · Prensa VRI — Universidad Nacional del Altiplano
                        </p>
                    </div>
                )}

                {/* DIVIDER */}
                <div style={{ borderTop: '3px solid #030D4F', borderBottom: '1px solid #030D4F', padding: '3px 0', margin: '10px 0 14px' }}></div>

                {/* 2-COLUMN BODY using TABLE (most reliable in html-to-image) */}
                <table style={{ width: '100%', borderSpacing: 0, borderCollapse: 'collapse', marginBottom: '16px' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '50%', verticalAlign: 'top', paddingRight: '14px', borderRight: '1px solid #ddd' }}>
                                <ColumnParagraphs paragraphs={leftCol} dropCap={true} />
                            </td>
                            <td style={{ width: '50%', verticalAlign: 'top', paddingLeft: '14px' }}>
                                <ColumnParagraphs paragraphs={rightCol} dropCap={false} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* GALLERY */}
                {galleryPhotos.length > 0 && (
                    <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '12px' }}>
                        <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', textAlign: 'center', color: '#888', marginBottom: '10px', fontStyle: 'italic' }}>
                            — Suplemento Fotográfico —
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {galleryPhotos.map((photo, idx) => (
                                <div key={idx} style={{ flex: galleryPhotos.length >= 3 ? '0 0 calc(33% - 7px)' : '0 0 calc(50% - 5px)' }}>
                                    <div style={{ width: '100%', height: galleryPhotos.length >= 3 ? '130px' : '170px', overflow: 'hidden', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                                        <img src={photo} alt={`fig${idx + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)' }} />
                                    </div>
                                    <p style={{ fontSize: '7.5px', fontStyle: 'italic', color: '#999', marginTop: '3px', textAlign: 'center' }}>Fig. {idx + 2} — Registro institucional VRI</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PDF ANNEXES */}
                {news.pdfs && news.pdfs.length > 0 && (
                    <div style={{ marginTop: '18px', borderTop: '3px double #030D4F', paddingTop: '12px' }}>
                        <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#030D4F', marginBottom: '8px' }}>▌ Documentos y Anexos Adjuntos</div>
                        {news.pdfs.map((doc, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', border: '1px solid #e0e0e0', backgroundColor: '#fafafa', marginBottom: '5px' }}>
                                <div style={{ width: '26px', height: '26px', backgroundColor: '#cc0000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900, flexShrink: 0 }}>PDF</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#030D4F', textTransform: 'uppercase' }}>Anexo {idx + 1}: {doc.title || `Documento ${idx + 1}`}</div>
                                    <div style={{ fontSize: '8px', color: '#999', fontStyle: 'italic' }}>Incluido como páginas adicionales al final de este PDF.</div>
                                </div>
                                <div style={{ fontSize: '8px', color: '#ccc', flexShrink: 0 }}>Ver págs. adjuntas →</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FOOTER */}
                <div style={{ marginTop: '20px', paddingTop: '8px', borderTop: '3px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#666' }}>
                    <span>Universidad Nacional del Altiplano — Puno, Perú</span>
                    <span style={{ color: '#030D4F', fontStyle: 'italic' }}>Vicerrectorado de Investigación</span>
                    <span>Fin del Reporte · {publishDate}</span>
                </div>
            </div>
        </div>
    );
});

NewsPaperTemplate.displayName = 'NewsPaperTemplate';
export default NewsPaperTemplate;
