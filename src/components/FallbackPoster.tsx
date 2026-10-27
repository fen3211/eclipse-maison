export function FallbackPoster() {
  return (
    <div className="fallback" role="img" aria-label="Static illustration of the ECLIPSE flacon">
      <div className="fallback__glow" aria-hidden="true" />
      <svg className="fallback__bottle" viewBox="0 0 620 900" aria-hidden="true">
        <defs>
          <linearGradient id="fb-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#847769" />
            <stop offset="0.28" stopColor="#4a423a" />
            <stop offset="0.6" stopColor="#2a2520" />
            <stop offset="0.82" stopColor="#6f6457" />
            <stop offset="1" stopColor="#332c25" />
          </linearGradient>
          <linearGradient id="fb-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d08a3d" />
            <stop offset="0.5" stopColor="#a85c1e" />
            <stop offset="1" stopColor="#5d2a09" />
          </linearGradient>
          <linearGradient id="fb-cap" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor="#e0c39c" />
            <stop offset="0.3" stopColor="#9a7448" />
            <stop offset="0.6" stopColor="#5b3f28" />
            <stop offset="0.85" stopColor="#a37b50" />
            <stop offset="1" stopColor="#4b3422" />
          </linearGradient>
          <linearGradient id="fb-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="fb-shadow">
            <stop offset="0" stopColor="#000000" stopOpacity="0.7" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="fb-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <clipPath id="fb-body-clip">
            <path d="M205 745 L205 300 Q205 270 235 255 L285 230 L415 240 Q440 250 440 285 L440 745 Q440 775 410 775 L235 775 Q205 775 205 745 Z" />
          </clipPath>
        </defs>

        <ellipse cx="322" cy="806" rx="190" ry="42" fill="url(#fb-shadow)" filter="url(#fb-blur)" />

        <g>
          <rect x="284" y="214" width="52" height="48" rx="4" fill="#2c2823" />
          <path
            d="M205 745 L205 300 Q205 270 235 255 L285 230 L415 240 Q440 250 440 285 L440 745 Q440 775 410 775 L235 775 Q205 775 205 745 Z"
            fill="url(#fb-glass)"
            stroke="#9c8f7e"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <g clipPath="url(#fb-body-clip)">
            <path
              d="M217 446 Q310 432 428 446 L428 790 L217 790 Z"
              fill="url(#fb-liquid)"
              opacity="0.9"
            />
            <path
              d="M217 446 Q310 432 428 446 L428 470 Q310 456 217 470 Z"
              fill="#e5a25b"
              opacity="0.35"
            />
            <path
              d="M226 258 Q210 300 212 745 L240 748 Q232 340 252 268 Z"
              fill="url(#fb-highlight)"
            />
            <path
              d="M398 252 Q430 285 430 745 L414 748 Q418 320 384 258 Z"
              fill="#ffffff"
              opacity="0.06"
            />
            <path
              d="M205 320 Q330 300 440 320 L440 338 Q330 318 205 338 Z"
              fill="#ffffff"
              opacity="0.035"
            />
          </g>

          <path
            d="M205 745 L205 300 Q205 270 235 255 L285 230 L415 240 Q440 250 440 285 L440 745 Q440 775 410 775 L235 775 Q205 775 205 745 Z"
            fill="none"
            stroke="#d9cbb8"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
          <path
            d="M224 740 L224 305 Q224 284 244 272 L291 248"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.18"
            strokeWidth="2"
          />

          <rect x="265" y="236" width="90" height="30" rx="3" fill="url(#fb-cap)" />
          <rect x="255" y="166" width="110" height="78" rx="8" fill="url(#fb-cap)" />
          <rect x="261" y="176" width="98" height="58" rx="5" fill="none" stroke="#2e2118" strokeOpacity="0.35" />
          {[276, 292, 308, 324, 340, 356].map((x) => (
            <line key={x} x1={x} y1="182" x2={x} y2="228" stroke="#2e2118" strokeOpacity="0.22" />
          ))}
          <ellipse cx="310" cy="168" rx="54" ry="9" fill="#c4a47a" opacity="0.55" />
          <ellipse cx="310" cy="168" rx="34" ry="5" fill="#2a1e15" opacity="0.55" />

          <text
            x="322"
            y="706"
            textAnchor="middle"
            fill="#e9dfd0"
            fillOpacity="0.72"
            fontFamily="Georgia, serif"
            fontSize="13"
            letterSpacing="4"
          >
            ECLIPSE
          </text>
          <line x1="292" y1="716" x2="352" y2="716" stroke="#e9dfd0" strokeOpacity="0.35" />
          <text
            x="322"
            y="732"
            textAnchor="middle"
            fill="#e9dfd0"
            fillOpacity="0.45"
            fontFamily="Helvetica, sans-serif"
            fontSize="7"
            letterSpacing="2.4"
          >
            EXTRAIT DE PARFUM
          </text>
        </g>
      </svg>
      <p className="fallback__note">
        Static preview — WebGL is unavailable in this browser.
      </p>
    </div>
  )
}
