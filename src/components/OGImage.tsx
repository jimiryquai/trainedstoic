import React from 'react';

interface OGImageProps {
  title: string;
  author?: string;
  publishedDate?: string;
  description?: string;
  tags?: string[];
}

export default function OGImage({
  title,
  author = "Trained Stoic",
  publishedDate,
  description,
  tags = []
}: OGImageProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Split long titles into multiple lines
  const splitTitle = (title: string): string[] => {
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= 45) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word);
        }
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines.slice(0, 3); // Maximum 3 lines
  };

  const titleLines = splitTitle(title);
  const formattedDate = formatDate(publishedDate);

  return (
    <div
      style={{
        height: '630px',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
        padding: '80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          opacity: 0.5,
        }}
      />
      
      {/* Header with Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '60px',
          zIndex: 1,
        }}
      >
        {/* Bird Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            marginRight: '20px',
            color: '#1f2937',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 7h.01" />
            <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
            <path d="m20 7 2 .5-2 .5" />
            <path d="M10 18v3" />
            <path d="M14 17.75V21" />
            <path d="M7 18a6 6 0 0 0 3.84-10.61" />
          </svg>
        </div>
        
        {/* Site Name */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0,
            letterSpacing: '-0.025em',
          }}
        >
          Trained Stoic
        </h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          zIndex: 1,
        }}
      >
        {/* Article Title */}
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          {titleLines.map((line, index) => (
            <h2
              key={index}
              style={{
                fontSize: titleLines.length === 1 ? '72px' : titleLines.length === 2 ? '60px' : '48px',
                fontWeight: '800',
                color: '#111827',
                margin: 0,
                lineHeight: '1.1',
                marginBottom: index < titleLines.length - 1 ? '8px' : 0,
                letterSpacing: '-0.02em',
              }}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: '24px',
              color: '#6b7280',
              margin: 0,
              marginBottom: '40px',
              lineHeight: '1.5',
              maxWidth: '900px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '40px',
            paddingTop: '40px',
            borderTop: '2px solid #e5e7eb',
          }}
        >
          {/* Author and Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff',
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: 0,
                    lineHeight: '1.2',
                  }}
                >
                  {author}
                </span>
                {formattedDate && (
                  <span
                    style={{
                      fontSize: '16px',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.2',
                    }}
                  >
                    {formattedDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                  }}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}